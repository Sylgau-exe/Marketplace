// api/stripe/create-portal-session.js
import Stripe from 'stripe';
import { UserDB } from '../../lib/db.js';
import { getUserFromRequest, cors } from '../../lib/auth.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  cors(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const decoded = getUserFromRequest(req);
    if (!decoded) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await UserDB.findById(decoded.userId);

    if (!user || !user.stripe_customer_id) {
      return res.status(400).json({ error: 'No subscription found' });
    }

    const frontendUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.FRONTEND_URL || 'http://localhost:5173';

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: frontendUrl
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Portal session error:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
}
