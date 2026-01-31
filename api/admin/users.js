// api/admin/users.js - Admin users management
import { sql } from '@vercel/postgres';
import { verifyToken } from '../../lib/auth.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify admin authentication
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Check if user is admin
    const adminCheck = await sql`SELECT is_admin FROM users WHERE id = ${payload.userId}`;
    if (!adminCheck.rows[0]?.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Query params
    const { search, plan, status, page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Build the query with user stats
    let query = sql`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.subscription_tier as plan,
        u.subscription_status as status,
        u.created_at as joined,
        u.updated_at as last_active,
        u.stripe_customer_id,
        u.organization,
        u.role,
        u.auth_provider,
        u.is_admin,
        u.is_tester,
        COALESCE(stats.simulations, 0) as simulations,
        COALESCE(stats.completions, 0) as completions,
        COALESCE(stats.best_score, 0) as best_score,
        COALESCE(stats.avg_score, 0) as avg_score,
        stats.last_played
      FROM users u
      LEFT JOIN (
        SELECT 
          user_id,
          COUNT(*) as simulations,
          COUNT(CASE WHEN grade IS NOT NULL THEN 1 END) as completions,
          MAX(score) as best_score,
          ROUND(AVG(score)) as avg_score,
          MAX(completed_at) as last_played
        FROM simulation_scores
        GROUP BY user_id
      ) stats ON u.id = stats.user_id
      ORDER BY u.created_at DESC
      LIMIT ${parseInt(limit)}
      OFFSET ${offset}
    `;

    const usersResult = await query;

    // Get total count for pagination
    const countResult = await sql`SELECT COUNT(*) as total FROM users`;

    // Format users data
    const users = usersResult.rows.map(row => ({
      id: row.id,
      name: row.name || row.email.split('@')[0],
      email: row.email,
      plan: formatPlan(row.plan),
      status: formatStatus(row.status),
      joined: formatDate(row.joined),
      lastActive: getTimeAgo(row.last_played || row.last_active || row.joined),
      simulations: parseInt(row.simulations),
      completions: parseInt(row.completions),
      bestScore: parseInt(row.best_score),
      avgScore: parseInt(row.avg_score),
      organization: row.organization,
      role: row.role,
      authProvider: row.auth_provider,
      hasStripe: !!row.stripe_customer_id,
      isAdmin: row.is_admin || false,
      isTester: row.is_tester || false
    }));

    return res.status(200).json({ 
      users,
      pagination: {
        total: parseInt(countResult.rows[0]?.total || 0),
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(parseInt(countResult.rows[0]?.total || 0) / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Admin users error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

// Helper functions
function formatPlan(plan) {
  if (!plan) return 'Free';
  const planMap = {
    'free': 'Free',
    'pro': 'Professional',
    'professional': 'Professional',
    'enterprise': 'Enterprise'
  };
  return planMap[plan.toLowerCase()] || plan;
}

function formatStatus(status) {
  if (!status) return 'active';
  return status.toLowerCase();
}

function formatDate(date) {
  if (!date) return 'N/A';
  return new Date(date).toISOString().split('T')[0];
}

function getTimeAgo(date) {
  if (!date) return 'Never';
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
  return `${Math.floor(seconds / 2592000)} months ago`;
}
