// api/stripe/subscription.js
import Stripe from 'stripe';
import { UserDB } from '../../lib/db.js';
import { getUserFromRequest, cors } from '../../lib/auth.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  cors(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const decoded = getUserFromRequest(req);
    if (!decoded) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await UserDB.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let stripeSubscription = null;

    if (user.stripe_subscription_id) {
      try {
        stripeSubscription = await stripe.subscriptions.retrieve(user.stripe_subscription_id);
      } catch (e) {
        console.error('Failed to retrieve subscription:', e.message);
      }
    }

    res.json({
      tier: user.subscription_tier,
      status: user.subscription_status,
      stripeSubscriptionId: user.stripe_subscription_id,
      startDate: user.subscription_start_date,
      endDate: user.subscription_end_date,
      stripeDetails: stripeSubscription ? {
        status: stripeSubscription.status,
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
      } : null
    });
  } catch (error) {
    console.error('Subscription fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
}
