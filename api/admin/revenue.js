// api/admin/revenue.js - Admin revenue and financial stats
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

    // Get all revenue data in parallel
    const [
      subscriptionsResult,
      mrrResult,
      lastMonthMrrResult,
      totalRevenueResult,
      recentTransactionsResult,
      churnedUsersResult,
      monthlyRevenueHistoryResult
    ] = await Promise.all([
      // Subscription breakdown by tier
      sql`
        SELECT 
          LOWER(COALESCE(subscription_tier, 'free')) as tier,
          subscription_status as status,
          COUNT(*) as count
        FROM users
        GROUP BY LOWER(COALESCE(subscription_tier, 'free')), subscription_status
      `,
      
      // Calculate current MRR (Monthly Recurring Revenue)
      // Based on active subscriptions
      sql`
        SELECT 
          COALESCE(SUM(
            CASE 
              WHEN LOWER(subscription_tier) IN ('pro', 'professional') AND subscription_status = 'active' THEN 29
              WHEN LOWER(subscription_tier) = 'enterprise' AND subscription_status = 'active' THEN 199
              ELSE 0
            END
          ), 0) as mrr
        FROM users
      `,
      
      // Last month's MRR for growth calculation
      sql`
        SELECT 
          COALESCE(SUM(amount), 0) as total
        FROM payment_history
        WHERE status = 'succeeded'
          AND created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
          AND created_at < DATE_TRUNC('month', CURRENT_DATE)
      `,
      
      // Total all-time revenue
      sql`
        SELECT COALESCE(SUM(amount), 0) as total
        FROM payment_history
        WHERE status = 'succeeded'
      `,
      
      // Recent transactions
      sql`
        SELECT 
          ph.id,
          u.name as user_name,
          u.email,
          ph.amount,
          u.subscription_tier as plan,
          ph.created_at as date,
          ph.status,
          ph.description
        FROM payment_history ph
        JOIN users u ON ph.user_id = u.id
        ORDER BY ph.created_at DESC
        LIMIT 20
      `,
      
      // Churned users count (for churn rate)
      sql`
        SELECT COUNT(*) as count
        FROM users
        WHERE subscription_status = 'canceled'
          OR (subscription_status = 'inactive' AND subscription_tier != 'free')
      `,
      
      // Monthly revenue history (last 6 months)
      sql`
        SELECT 
          DATE_TRUNC('month', created_at) as month,
          SUM(amount) as total
        FROM payment_history
        WHERE status = 'succeeded'
          AND created_at > NOW() - INTERVAL '6 months'
        GROUP BY DATE_TRUNC('month', created_at)
        ORDER BY month DESC
      `
    ]);

    // Process subscription breakdown
    const subscriptions = { free: 0, professional: 0, enterprise: 0 };
    let activeSubscribers = 0;
    let totalPaidUsers = 0;
    
    subscriptionsResult.rows.forEach(row => {
      const tier = row.tier;
      const count = parseInt(row.count);
      const isActive = row.status === 'active';
      
      if (tier === 'professional' || tier === 'pro') {
        subscriptions.professional += count;
        if (isActive) {
          activeSubscribers += count;
          totalPaidUsers += count;
        }
      } else if (tier === 'enterprise') {
        subscriptions.enterprise += count;
        if (isActive) {
          activeSubscribers += count;
          totalPaidUsers += count;
        }
      } else {
        subscriptions.free += count;
      }
    });

    const mrr = parseInt(mrrResult.rows[0]?.mrr || 0);
    const lastMonthRevenue = parseInt(lastMonthMrrResult.rows[0]?.total || 0) / 100; // Convert cents
    const totalRevenue = parseInt(totalRevenueResult.rows[0]?.total || 0) / 100; // Convert cents
    const churnedUsers = parseInt(churnedUsersResult.rows[0]?.count || 0);

    // Calculate growth rate
    const growth = lastMonthRevenue > 0 
      ? Math.round(((mrr - lastMonthRevenue) / lastMonthRevenue) * 100 * 10) / 10
      : 0;

    // Calculate churn rate
    const totalPaidEver = totalPaidUsers + churnedUsers;
    const churnRate = totalPaidEver > 0 
      ? Math.round((churnedUsers / totalPaidEver) * 100 * 10) / 10
      : 0;

    // Calculate LTV (simplified: ARPU / churn rate)
    const arpu = totalPaidUsers > 0 ? mrr / totalPaidUsers : 0;
    const ltv = churnRate > 0 ? Math.round((arpu / (churnRate / 100)) * 12) : Math.round(arpu * 24);

    // Format recent transactions
    const recentTransactions = recentTransactionsResult.rows.map(row => ({
      id: `txn_${row.id}`,
      user: row.user_name || row.email?.split('@')[0] || 'Unknown',
      amount: Math.round(parseInt(row.amount) / 100), // Convert cents to dollars
      plan: formatPlan(row.plan),
      date: formatDate(row.date),
      status: row.status,
      description: row.description
    }));

    // Format monthly revenue history
    const monthlyHistory = monthlyRevenueHistoryResult.rows.map(row => ({
      month: new Date(row.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      revenue: Math.round(parseInt(row.total) / 100)
    }));

    return res.status(200).json({
      revenue: {
        mrr,
        arr: mrr * 12,
        growth,
        churnRate,
        ltv,
        totalRevenue: Math.round(totalRevenue),
        subscriptions,
        recentTransactions,
        monthlyHistory,
        metrics: {
          activeSubscribers,
          totalPaidUsers,
          avgRevenuePerUser: Math.round(arpu)
        }
      }
    });

  } catch (error) {
    console.error('Admin revenue error:', error);
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

function formatDate(date) {
  if (!date) return 'N/A';
  return new Date(date).toISOString().split('T')[0];
}
