// api/auth/me.js
import { UserDB } from '../../lib/db.js';
import { getUserFromRequest, sanitizeUser, cors } from '../../lib/auth.js';

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

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
}
