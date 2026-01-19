import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase with service role for admin operations
const supabaseUrl = 'https://wfoyzgnowlpgpexygajs.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Stripe webhook secret for signature verification
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET

// Map Stripe price IDs to plan names
// You'll need to update these with your actual Stripe price IDs
const PRICE_TO_PLAN = {
  // Add your actual Stripe price IDs here after checking Stripe dashboard
  // Format: 'price_xxxxx': 'plan_name'
}

// Map Stripe product names to plan names (fallback)
const PRODUCT_TO_PLAN = {
  'ProjectManagerTool Starter': 'starter',
  'ProjectManagerTool Professional': 'professional',
  'ProjectManagerTool Unlimited': 'unlimited',
  'Starter Plan': 'starter',
  'Professional Plan': 'professional',
  'Unlimited Plan': 'unlimited',
}

export async function POST(request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    // For now, we'll parse the event directly
    // In production, you should verify the signature with Stripe
    let event
    
    try {
      event = JSON.parse(body)
    } catch (err) {
      console.error('Error parsing webhook body:', err)
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    console.log('Stripe webhook received:', event.type)

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      
      const customerEmail = session.customer_email || session.customer_details?.email
      const customerId = session.customer
      const subscriptionId = session.subscription
      
      console.log('Checkout completed for:', customerEmail)

      if (!customerEmail) {
        console.error('No customer email in session')
        return NextResponse.json({ error: 'No customer email' }, { status: 400 })
      }

      // Get the plan from line items or metadata
      let planName = session.metadata?.plan

      // If no plan in metadata, try to get from line items
      if (!planName && session.line_items?.data?.[0]) {
        const priceId = session.line_items.data[0].price?.id
        const productName = session.line_items.data[0].description
        
        planName = PRICE_TO_PLAN[priceId] || PRODUCT_TO_PLAN[productName]
      }

      // Fallback: determine plan from amount
      if (!planName) {
        const amount = session.amount_total / 100 // Convert cents to dollars
        if (amount === 9) planName = 'starter'
        else if (amount === 19) planName = 'professional'
        else if (amount === 49) planName = 'unlimited'
      }

      if (!planName) {
        console.error('Could not determine plan from session')
        planName = 'starter' // Default fallback
      }

      console.log('Updating user plan:', customerEmail, '->', planName)

      // Update user in Supabase
      const { data, error } = await supabase
        .from('users')
        .update({
          plan: planName,
          stripe_customer_id: customerId,
          updated_at: new Date().toISOString()
        })
        .eq('email', customerEmail)
        .select()

      if (error) {
        console.error('Error updating user:', error)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }

      if (!data || data.length === 0) {
        // User doesn't exist yet - create them
        console.log('User not found, creating new user:', customerEmail)
        
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            email: customerEmail,
            name: session.customer_details?.name || customerEmail.split('@')[0],
            plan: planName,
            stripe_customer_id: customerId,
            selected_tools: [],
            is_tester: false,
            auth_provider: 'stripe'
          })
          .select()

        if (createError) {
          console.error('Error creating user:', createError)
          return NextResponse.json({ error: 'Database error' }, { status: 500 })
        }

        console.log('Created new user:', newUser)
      } else {
        console.log('Updated user:', data)
      }

      return NextResponse.json({ received: true, plan: planName })
    }

    // Handle subscription updates
    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object
      console.log('Subscription updated:', subscription.id)
      // Handle plan changes, cancellations, etc.
    }

    // Handle subscription cancellation
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object
      const customerId = subscription.customer

      console.log('Subscription cancelled for customer:', customerId)

      // Downgrade user to free plan
      const { error } = await supabase
        .from('users')
        .update({
          plan: 'free',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_customer_id', customerId)

      if (error) {
        console.error('Error downgrading user:', error)
      }
    }

    return NextResponse.json({ received: true })

  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// Stripe sends POST requests, but we can add GET for testing
export async function GET() {
  return NextResponse.json({ 
    status: 'Stripe webhook endpoint active',
    supported_events: [
      'checkout.session.completed',
      'customer.subscription.updated', 
      'customer.subscription.deleted'
    ]
  })
}
