// api/init-db.js - Run once to initialize database tables
import { initializeDatabase } from '../lib/db.js';

export default async function handler(req, res) {
  // Simple protection - require a secret key
  const { secret } = req.query;
  
  if (secret !== process.env.INIT_DB_SECRET && secret !== 'setup') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await initializeDatabase();
    
    if (result.success) {
      res.json({ message: 'Database initialized successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Init DB error:', error);
    res.status(500).json({ error: error.message });
  }
}
