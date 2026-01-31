// api/simulations/scores.js
import { ScoreDB } from '../../lib/db.js';
import { getUserFromRequest, cors } from '../../lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const decoded = getUserFromRequest(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    if (req.method === 'GET') {
      // Get user's scores
      const scores = await ScoreDB.getUserScores(decoded.userId);
      const bestScores = await ScoreDB.getUserBestScores(decoded.userId);
      return res.json({ scores, bestScores });
    }

    if (req.method === 'POST') {
      // Record a new score
      const { simulationId, scenarioId, score, grade, budgetScore, scheduleScore, scopeScore, qualityScore, decisionsMade } = req.body;

      if (!simulationId || !scenarioId || score === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const scoreId = await ScoreDB.create(decoded.userId, simulationId, scenarioId, {
        score,
        grade,
        budgetScore,
        scheduleScore,
        scopeScore,
        qualityScore,
        decisionsMade
      });

      return res.status(201).json({ message: 'Score recorded', scoreId });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Scores error:', error);
    res.status(500).json({ error: 'Failed to process scores' });
  }
}
