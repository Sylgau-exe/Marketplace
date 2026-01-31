// lib/db.js - Database helper for Vercel Postgres
import { sql } from '@vercel/postgres';

// Initialize tables (run once or use migrations)
export async function initializeDatabase() {
  try {
    // Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        subscription_tier VARCHAR(50) DEFAULT 'free',
        subscription_status VARCHAR(50) DEFAULT 'inactive',
        stripe_customer_id VARCHAR(255),
        stripe_subscription_id VARCHAR(255),
        subscription_start_date TIMESTAMP,
        subscription_end_date TIMESTAMP,
        organization VARCHAR(255),
        role VARCHAR(255),
        google_id VARCHAR(255),
        auth_provider VARCHAR(50) DEFAULT 'email'
      )
    `;
    
    // Add google_id column if it doesn't exist (for existing tables)
    await sql`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='google_id') THEN
          ALTER TABLE users ADD COLUMN google_id VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='auth_provider') THEN
          ALTER TABLE users ADD COLUMN auth_provider VARCHAR(50) DEFAULT 'email';
        END IF;
      END $$;
    `;

    // Simulation scores table
    await sql`
      CREATE TABLE IF NOT EXISTS simulation_scores (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        simulation_id VARCHAR(100) NOT NULL,
        scenario_id VARCHAR(100) NOT NULL,
        score INTEGER NOT NULL,
        grade VARCHAR(2),
        duration_minutes INTEGER,
        decisions_made INTEGER,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        budget_score INTEGER,
        schedule_score INTEGER,
        scope_score INTEGER,
        quality_score INTEGER
      )
    `;

    // Payment history table
    await sql`
      CREATE TABLE IF NOT EXISTS payment_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        stripe_payment_intent_id VARCHAR(255),
        stripe_invoice_id VARCHAR(255),
        amount INTEGER NOT NULL,
        currency VARCHAR(10) DEFAULT 'usd',
        status VARCHAR(50) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Subscription events table
    await sql`
      CREATE TABLE IF NOT EXISTS subscription_events (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        stripe_event_id VARCHAR(255) UNIQUE,
        event_type VARCHAR(100) NOT NULL,
        event_data JSONB,
        processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_stripe ON users(stripe_customer_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_scores_user ON simulation_scores(user_id)`;
    
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error: error.message };
  }
}

// User operations
export const UserDB = {
  async create(email, passwordHash, name) {
    const result = await sql`
      INSERT INTO users (email, password_hash, name, auth_provider)
      VALUES (${email}, ${passwordHash}, ${name}, 'email')
      RETURNING *
    `;
    return result.rows[0];
  },

  async createGoogleUser(email, name, googleId) {
    const result = await sql`
      INSERT INTO users (email, name, google_id, auth_provider)
      VALUES (${email}, ${name}, ${googleId}, 'google')
      RETURNING *
    `;
    return result.rows[0];
  },

  async linkGoogleAccount(userId, googleId) {
    const result = await sql`
      UPDATE users SET google_id = ${googleId}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId}
      RETURNING *
    `;
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    return result.rows[0] || null;
  },

  async findById(id) {
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    return result.rows[0] || null;
  },

  async findByStripeCustomerId(customerId) {
    const result = await sql`SELECT * FROM users WHERE stripe_customer_id = ${customerId}`;
    return result.rows[0] || null;
  },

  async update(id, updates) {
    const { name, organization, role, subscription_tier, subscription_status, 
            stripe_customer_id, stripe_subscription_id, subscription_start_date, 
            subscription_end_date } = updates;
    
    const result = await sql`
      UPDATE users SET
        name = COALESCE(${name}, name),
        organization = COALESCE(${organization}, organization),
        role = COALESCE(${role}, role),
        subscription_tier = COALESCE(${subscription_tier}, subscription_tier),
        subscription_status = COALESCE(${subscription_status}, subscription_status),
        stripe_customer_id = COALESCE(${stripe_customer_id}, stripe_customer_id),
        stripe_subscription_id = COALESCE(${stripe_subscription_id}, stripe_subscription_id),
        subscription_start_date = COALESCE(${subscription_start_date}, subscription_start_date),
        subscription_end_date = COALESCE(${subscription_end_date}, subscription_end_date),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0];
  },

  async updateSubscription(id, tier, status, stripeSubId = null) {
    const result = await sql`
      UPDATE users SET
        subscription_tier = ${tier},
        subscription_status = ${status},
        stripe_subscription_id = ${stripeSubId},
        subscription_start_date = CASE WHEN ${status} = 'active' THEN CURRENT_TIMESTAMP ELSE subscription_start_date END,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0];
  }
};

// Score operations
export const ScoreDB = {
  async create(userId, simulationId, scenarioId, scoreData) {
    const result = await sql`
      INSERT INTO simulation_scores (
        user_id, simulation_id, scenario_id, score, grade,
        duration_minutes, decisions_made,
        budget_score, schedule_score, scope_score, quality_score
      ) VALUES (
        ${userId}, ${simulationId}, ${scenarioId}, ${scoreData.score}, ${scoreData.grade},
        ${scoreData.durationMinutes || null}, ${scoreData.decisionsMade || null},
        ${scoreData.budgetScore || null}, ${scoreData.scheduleScore || null},
        ${scoreData.scopeScore || null}, ${scoreData.qualityScore || null}
      )
      RETURNING id
    `;
    return result.rows[0]?.id;
  },

  async getUserScores(userId) {
    const result = await sql`
      SELECT * FROM simulation_scores 
      WHERE user_id = ${userId} 
      ORDER BY completed_at DESC
    `;
    return result.rows;
  },

  async getUserBestScores(userId) {
    const result = await sql`
      SELECT simulation_id, scenario_id, MAX(score) as best_score, COUNT(*) as attempts
      FROM simulation_scores 
      WHERE user_id = ${userId}
      GROUP BY simulation_id, scenario_id
    `;
    return result.rows;
  },

  async getLeaderboard(simulationId, limit = 10) {
    const result = await sql`
      SELECT u.id as user_id, u.name, MAX(s.score) as best_score, COUNT(*) as attempts
      FROM simulation_scores s
      JOIN users u ON s.user_id = u.id
      WHERE s.simulation_id = ${simulationId}
      GROUP BY u.id, u.name
      ORDER BY best_score DESC
      LIMIT ${limit}
    `;
    return result.rows;
  }
};

// Payment operations
export const PaymentDB = {
  async create(userId, paymentData) {
    await sql`
      INSERT INTO payment_history (
        user_id, stripe_payment_intent_id, stripe_invoice_id,
        amount, currency, status, description
      ) VALUES (
        ${userId}, ${paymentData.paymentIntentId || null}, ${paymentData.invoiceId || null},
        ${paymentData.amount}, ${paymentData.currency || 'usd'},
        ${paymentData.status}, ${paymentData.description || null}
      )
    `;
  }
};

// Event tracking
export const EventDB = {
  async create(eventId, eventType, eventData, userId = null) {
    try {
      await sql`
        INSERT INTO subscription_events (stripe_event_id, event_type, event_data, user_id)
        VALUES (${eventId}, ${eventType}, ${JSON.stringify(eventData)}, ${userId})
        ON CONFLICT (stripe_event_id) DO NOTHING
      `;
    } catch (e) {
      // Ignore duplicate events
    }
  },

  async exists(eventId) {
    const result = await sql`SELECT 1 FROM subscription_events WHERE stripe_event_id = ${eventId}`;
    return result.rows.length > 0;
  }
};
