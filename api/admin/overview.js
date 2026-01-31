// api/admin/overview.js - Admin dashboard overview stats
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
    const userResult = await sql`SELECT * FROM users WHERE id = ${payload.userId}`;
    const user = userResult.rows[0];
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!user.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Get overview statistics
    const [
      totalUsersResult,
      activeUsersResult,
      newUsersTodayResult,
      totalRevenueResult,
      completionRateResult,
      avgSessionResult
    ] = await Promise.all([
      // Total users
      sql`SELECT COUNT(*) as count FROM users`,
      
      // Active users (active in last 30 days based on simulation activity)
      sql`
        SELECT COUNT(DISTINCT user_id) as count 
        FROM simulation_scores 
        WHERE completed_at > NOW() - INTERVAL '30 days'
      `,
      
      // New users today
      sql`SELECT COUNT(*) as count FROM users WHERE created_at::date = CURRENT_DATE`,
      
      // Total revenue from payment_history
      sql`
        SELECT COALESCE(SUM(amount), 0) as total 
        FROM payment_history 
        WHERE status = 'succeeded'
      `,
      
      // Completion rate (completed simulations vs total)
      sql`
        SELECT 
          COUNT(CASE WHEN grade IS NOT NULL THEN 1 END) as completed,
          COUNT(*) as total
        FROM simulation_scores
      `,
      
      // Average session time
      sql`
        SELECT COALESCE(AVG(duration_minutes), 0) as avg_duration 
        FROM simulation_scores 
        WHERE duration_minutes IS NOT NULL
      `
    ]);

    // Calculate monthly revenue (this month)
    const monthlyRevenueResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM payment_history 
      WHERE status = 'succeeded'
        AND created_at >= DATE_TRUNC('month', CURRENT_DATE)
    `;

    // Get subscription breakdown
    const subscriptionBreakdownResult = await sql`
      SELECT 
        subscription_tier,
        COUNT(*) as count
      FROM users
      GROUP BY subscription_tier
    `;

    // Active now (users with activity in last 15 minutes) - approximate
    const activeNowResult = await sql`
      SELECT COUNT(DISTINCT user_id) as count 
      FROM simulation_scores 
      WHERE completed_at > NOW() - INTERVAL '15 minutes'
    `;

    // Recent activity for the feed
    const recentActivityResult = await sql`
      SELECT 
        ss.user_id,
        u.name,
        u.email,
        ss.simulation_id,
        ss.score,
        ss.grade,
        ss.completed_at
      FROM simulation_scores ss
      JOIN users u ON ss.user_id = u.id
      ORDER BY ss.completed_at DESC
      LIMIT 10
    `;

    const totalUsers = parseInt(totalUsersResult.rows[0]?.count || 0);
    const activeUsers = parseInt(activeUsersResult.rows[0]?.count || 0);
    const completionData = completionRateResult.rows[0];
    const completionRate = completionData.total > 0 
      ? Math.round((completionData.completed / completionData.total) * 100) 
      : 0;

    // Build subscription object
    const subscriptions = { free: 0, pro: 0, enterprise: 0 };
    subscriptionBreakdownResult.rows.forEach(row => {
      const tier = (row.subscription_tier || 'free').toLowerCase();
      if (tier === 'professional' || tier === 'pro') {
        subscriptions.pro = parseInt(row.count);
      } else if (tier === 'enterprise') {
        subscriptions.enterprise = parseInt(row.count);
      } else {
        subscriptions.free = parseInt(row.count);
      }
    });

    // Format recent activity
    const recentActivity = recentActivityResult.rows.map(row => {
      const timeAgo = getTimeAgo(new Date(row.completed_at));
      return {
        id: row.user_id,
        user: row.name || row.email.split('@')[0],
        action: `Completed ${formatSimName(row.simulation_id)} with grade ${row.grade || 'N/A'}`,
        time: timeAgo
      };
    });

    const overview = {
      totalUsers,
      activeUsers,
      totalRevenue: Math.round(parseInt(totalRevenueResult.rows[0]?.total || 0) / 100), // Convert cents to dollars
      monthlyRevenue: Math.round(parseInt(monthlyRevenueResult.rows[0]?.total || 0) / 100),
      completionRate,
      avgSessionTime: `${Math.round(parseFloat(avgSessionResult.rows[0]?.avg_duration || 0))} min`,
      newUsersToday: parseInt(newUsersTodayResult.rows[0]?.count || 0),
      activeNow: parseInt(activeNowResult.rows[0]?.count || 0),
      subscriptions,
      recentActivity
    };

    return res.status(200).json({ overview });

  } catch (error) {
    console.error('Admin overview error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

// Helper function to format time ago
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

// Helper to format simulation name
function formatSimName(simId) {
  if (!simId) return 'Simulation';
  return simId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
