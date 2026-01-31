// api/auth/google/callback.js - Handle Google OAuth callback
import { UserDB } from '../../../lib/db.js';
import { generateToken } from '../../../lib/auth.js';

export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) {
    return res.redirect('/?error=google_auth_failed');
  }

  if (!code) {
    return res.redirect('/?error=no_code');
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    
    // Get the host from the request or use env var
    const host = req.headers.host;
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${protocol}://${host}/api/auth/google/callback`;

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      return res.redirect('/?error=token_exchange_failed');
    }

    // Get user info from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userInfoResponse.json();

    if (!googleUser.email) {
      return res.redirect('/?error=no_email');
    }

    // Find or create user
    let user = await UserDB.findByEmail(googleUser.email);

    if (!user) {
      // Create new user (no password for Google users)
      user = await UserDB.createGoogleUser(
        googleUser.email,
        googleUser.name || googleUser.email.split('@')[0],
        googleUser.id
      );
    } else if (!user.google_id) {
      // Link existing account to Google
      await UserDB.linkGoogleAccount(user.id, googleUser.id);
    }

    // Generate JWT token
    const token = generateToken(user);

    // Redirect to frontend with token
    res.redirect(`/?token=${token}`);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('/?error=auth_failed');
  }
}
