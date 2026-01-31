// api/stripe/webhook.js
import Stripe from 'stripe';
import { UserDB, PaymentDB, EventDB } from '../../lib/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Vercel requires raw body for webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Check if we've already processed this event
  if (await EventDB.exists(event.id)) {
    console.log('Event already processed:', event.id);
    return res.json({ received: true });
  }

  console.log('Processing webhook event:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = parseInt(session.metadata.userId);
        const planId = session.metadata.planId;

        if (userId && planId) {
          await UserDB.updateSubscription(userId, planId, 'active', session.subscription);
          console.log(`✅ Subscription activated for user ${userId}: ${planId}`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const user = await UserDB.findByStripeCustomerId(subscription.customer);

        if (user) {
          const status = subscription.status === 'active' ? 'active' :
                        subscription.status === 'past_due' ? 'past_due' : 'inactive';
          await UserDB.update(user.id, {
            subscription_status: status,
            subscription_end_date: subscription.cancel_at 
              ? new Date(subscription.cancel_at * 1000).toISOString() 
              : null
          });
          console.log(`✅ Subscription updated for user ${user.id}: ${status}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const user = await UserDB.findByStripeCustomerId(subscription.customer);

        if (user) {
          await UserDB.updateSubscription(user.id, 'free', 'inactive', null);
          console.log(`✅ Subscription cancelled for user ${user.id}`);
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        const user = await UserDB.findByStripeCustomerId(invoice.customer);

        if (user) {
          await PaymentDB.create(user.id, {
            invoiceId: invoice.id,
            paymentIntentId: invoice.payment_intent,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: 'paid',
            description: 'Subscription payment'
          });
          console.log(`✅ Payment recorded for user ${user.id}: $${invoice.amount_paid / 100}`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const user = await UserDB.findByStripeCustomerId(invoice.customer);

        if (user) {
          await UserDB.update(user.id, { subscription_status: 'past_due' });
          await PaymentDB.create(user.id, {
            invoiceId: invoice.id,
            amount: invoice.amount_due,
            currency: invoice.currency,
            status: 'failed',
            description: 'Payment failed'
          });
          console.log(`⚠️ Payment failed for user ${user.id}`);
        }
        break;
      }
    }

    // Log the event
    const userId = event.data.object.metadata?.userId 
      ? parseInt(event.data.object.metadata.userId) 
      : null;
    await EventDB.create(event.id, event.type, event.data.object, userId);

  } catch (error) {
    console.error('Webhook processing error:', error);
  }

  res.json({ received: true });
}
