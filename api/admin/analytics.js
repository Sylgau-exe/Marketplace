// api/admin/analytics.js - Admin analytics and simulation stats
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

    // Get all analytics data in parallel
    const [
      popularSimsResult,
      weeklyActivityResult,
      gradeDistributionResult,
      hourlyDistributionResult
    ] = await Promise.all([
      // Popular simulations
      sql`
        SELECT 
          simulation_id as name,
          COUNT(*) as plays,
          COUNT(CASE WHEN grade IS NOT NULL THEN 1 END) as completions,
          ROUND(AVG(score)) as avg_score,
          MAX(score) as top_score
        FROM simulation_scores
        GROUP BY simulation_id
        ORDER BY plays DESC
        LIMIT 10
      `,
      
      // Weekly activity (last 7 days)
      sql`
        SELECT 
          TO_CHAR(completed_at, 'Dy') as day,
          DATE(completed_at) as date,
          COUNT(DISTINCT user_id) as users,
          COUNT(*) as sessions
        FROM simulation_scores
        WHERE completed_at > NOW() - INTERVAL '7 days'
        GROUP BY DATE(completed_at), TO_CHAR(completed_at, 'Dy')
        ORDER BY date
      `,
      
      // Grade distribution
      sql`
        SELECT 
          COALESCE(grade, 'N/A') as grade,
          COUNT(*) as count
        FROM simulation_scores
        GROUP BY grade
        ORDER BY 
          CASE grade 
            WHEN 'A+' THEN 1 WHEN 'A' THEN 2 WHEN 'A-' THEN 3
            WHEN 'B+' THEN 4 WHEN 'B' THEN 5 WHEN 'B-' THEN 6
            WHEN 'C+' THEN 7 WHEN 'C' THEN 8 WHEN 'C-' THEN 9
            WHEN 'D+' THEN 10 WHEN 'D' THEN 11 WHEN 'D-' THEN 12
            WHEN 'F' THEN 13
            ELSE 14
          END
      `,
      
      // Hourly activity distribution
      sql`
        SELECT 
          EXTRACT(HOUR FROM completed_at) as hour,
          COUNT(*) as count
        FROM simulation_scores
        WHERE completed_at > NOW() - INTERVAL '30 days'
        GROUP BY EXTRACT(HOUR FROM completed_at)
        ORDER BY hour
      `
    ]);

    // Format popular simulations
    const popularSimulations = popularSimsResult.rows.map(row => ({
      name: formatSimName(row.name),
      id: row.name,
      plays: parseInt(row.plays),
      completions: parseInt(row.completions),
      avgScore: parseInt(row.avg_score) || 0,
      topScore: parseInt(row.top_score) || 0,
      completionRate: row.plays > 0 ? Math.round((row.completions / row.plays) * 100) : 0
    }));

    // Format weekly activity - ensure all days are present
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyMap = new Map();
    weeklyActivityResult.rows.forEach(row => {
      weeklyMap.set(row.day, {
        users: parseInt(row.users),
        sessions: parseInt(row.sessions)
      });
    });
    
    const weeklyActivity = days.map(day => ({
      day,
      users: weeklyMap.get(day)?.users || 0,
      sessions: weeklyMap.get(day)?.sessions || 0
    }));

    // Format grade distribution - consolidate to A/B/C/D/F
    const gradeGroups = { A: 0, B: 0, C: 0, D: 0, F: 0, 'N/A': 0 };
    let totalGrades = 0;
    
    gradeDistributionResult.rows.forEach(row => {
      const grade = row.grade;
      const count = parseInt(row.count);
      totalGrades += count;
      
      if (grade?.startsWith('A')) gradeGroups.A += count;
      else if (grade?.startsWith('B')) gradeGroups.B += count;
      else if (grade?.startsWith('C')) gradeGroups.C += count;
      else if (grade?.startsWith('D')) gradeGroups.D += count;
      else if (grade === 'F') gradeGroups.F += count;
      else gradeGroups['N/A'] += count;
    });

    // Convert to percentages
    const gradeDistribution = {};
    Object.entries(gradeGroups).forEach(([grade, count]) => {
      if (grade !== 'N/A') {
        gradeDistribution[grade] = totalGrades > 0 ? Math.round((count / totalGrades) * 100) : 0;
      }
    });

    // Format hourly distribution
    const hourlyDistribution = Array(24).fill(0);
    hourlyDistributionResult.rows.forEach(row => {
      hourlyDistribution[parseInt(row.hour)] = parseInt(row.count);
    });

    // Calculate additional metrics
    const totalPlays = popularSimulations.reduce((sum, s) => sum + s.plays, 0);
    const totalCompletions = popularSimulations.reduce((sum, s) => sum + s.completions, 0);
    const overallCompletionRate = totalPlays > 0 ? Math.round((totalCompletions / totalPlays) * 100) : 0;

    return res.status(200).json({
      analytics: {
        popularSimulations,
        weeklyActivity,
        gradeDistribution,
        hourlyDistribution,
        summary: {
          totalPlays,
          totalCompletions,
          completionRate: overallCompletionRate,
          uniqueSimulations: popularSimulations.length
        }
      }
    });

  } catch (error) {
    console.error('Admin analytics error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

// Helper to format simulation name
function formatSimName(simId) {
  if (!simId) return 'Unknown';
  return simId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
