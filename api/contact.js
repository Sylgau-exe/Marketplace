// ============================================
// API: Contact Form Submission
// POST /api/contact
// ============================================

import { sendContactFormEmail } from '../lib/email.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, company, subject, message, newsletter } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['firstName', 'lastName', 'email', 'subject', 'message']
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Send the contact form email to admin
    await sendContactFormEmail({
      firstName,
      lastName,
      email,
      company: company || '',
      subject,
      message,
    });

    // TODO: If newsletter checkbox is checked, add to mailing list
    if (newsletter) {
      // Future: integrate with email marketing service (Mailchimp, ConvertKit, etc.)
      console.log(`Newsletter signup requested for: ${email}`);
    }

    // Log the contact submission
    console.log(`Contact form submitted: ${firstName} ${lastName} <${email}> - ${subject}`);

    return res.status(200).json({ 
      success: true,
      message: 'Your message has been sent successfully. We\'ll get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return res.status(500).json({ 
      error: 'Failed to send message. Please try again or email us directly at sgauthier@executiveproducer.ca',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
