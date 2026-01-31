// api/auth/register.js
import bcrypt from 'bcryptjs';
import { UserDB } from '../../lib/db.js';
import { generateToken, sanitizeUser, cors } from '../../lib/auth.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Email service helper (dynamic import for CommonJS compatibility)
async function sendWelcomeEmailSafe(name, email) {
  try {
    const { sendWelcomeEmail } = await import('../../lib/email.js');
    await sendWelcomeEmail({ name, email });
    console.log(`Welcome email sent to: ${email}`);
  } catch (error) {
    // Don't fail registration if email fails
    console.error('Welcome email failed (non-blocking):', error.message);
  }
}

export default async function handler(req, res) {
  cors(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await UserDB.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserDB.create(email, passwordHash, name);

    // Create Stripe customer
    try {
      const customer = await stripe.customers.create({
        email: email,
        name: name,
        metadata: { userId: user.id.toString() }
      });
      await UserDB.update(user.id, { stripe_customer_id: customer.id });
      user.stripe_customer_id = customer.id;
    } catch (stripeError) {
      console.error('Stripe customer creation failed:', stripeError.message);
    }

    // Send welcome email (non-blocking)
    sendWelcomeEmailSafe(name, email);

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
}
