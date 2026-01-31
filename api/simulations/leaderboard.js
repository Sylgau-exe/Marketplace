// api/simulations/leaderboard.js
import { ScoreDB } from '../../lib/db.js';
import { cors } from '../../lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { simulationId, limit = 10 } = req.query;

    if (!simulationId) {
      return res.status(400).json({ error: 'simulationId is required' });
    }

    const leaderboard = await ScoreDB.getLeaderboard(simulationId, parseInt(limit));
    res.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}
