// api/admin/toggle-admin.js - Toggle admin status for a user
import { sql } from '@vercel/postgres';
import { verifyToken } from '../../lib/auth.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
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

    // Check if requesting user is admin
    const adminCheck = await sql`SELECT is_admin FROM users WHERE id = ${payload.userId}`;
    if (!adminCheck.rows[0]?.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Get target user ID from request body
    const { userId, isAdmin } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Prevent admin from removing their own admin status
    if (userId === payload.userId && isAdmin === false) {
      return res.status(400).json({ error: 'Cannot remove your own admin status' });
    }

    // Update user's admin status
    const result = await sql`
      UPDATE users 
      SET is_admin = ${isAdmin}
      WHERE id = ${userId}
      RETURNING id, email, name, is_admin
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ 
      success: true, 
      user: result.rows[0],
      message: `Admin status ${isAdmin ? 'granted' : 'revoked'} for ${result.rows[0].email}`
    });

  } catch (error) {
    console.error('Toggle admin error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
