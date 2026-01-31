// ============================================
// EMAIL SERVICE - Using Resend
// ============================================
// Handles all transactional emails for BizSimHub
// - Contact form submissions
// - Welcome emails on registration
// - Password reset emails
// - Email confirmations
// ============================================

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'BizSimHub <noreply@bizsimhub.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sgauthier@executiveproducer.ca';

/**
 * Send an email using Resend API
 */
export async function sendEmail({ to, subject, html, text, replyTo }) {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    throw new Error('Email service not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      reply_to: replyTo,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Resend API error:', data);
    throw new Error(data.message || 'Failed to send email');
  }

  return data;
}

/**
 * Send contact form submission to admin
 */
export async function sendContactFormEmail({ firstName, lastName, email, company, subject, message }) {
  const subjectLine = `[BizSimHub Contact] ${subject} - from ${firstName} ${lastName}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #6366f1; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { margin-top: 4px; font-size: 16px; }
        .message-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">From</div>
            <div class="value">${firstName} ${lastName}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          ${company ? `
          <div class="field">
            <div class="label">Company</div>
            <div class="value">${company}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${subject}</div>
          </div>
          <div class="message-box">
            <div class="label">Message</div>
            <div class="value" style="white-space: pre-wrap;">${message}</div>
          </div>
        </div>
        <div class="footer">
          Reply directly to this email to respond to ${firstName}
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
New Contact Form Submission
===========================

From: ${firstName} ${lastName}
Email: ${email}
${company ? `Company: ${company}` : ''}
Subject: ${subject}

Message:
${message}

---
Reply to this email to respond to ${firstName}
  `;

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: subjectLine,
    html,
    text,
    replyTo: email,
  });
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail({ name, email }) {
  const firstName = name.split(' ')[0];
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f3f4f6; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0 0 8px 0; font-size: 28px; }
        .header p { margin: 0; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .welcome { font-size: 18px; margin-bottom: 24px; }
        .features { background: #f9fafb; border-radius: 12px; padding: 24px; margin: 24px 0; }
        .feature { display: flex; align-items: flex-start; margin-bottom: 16px; }
        .feature:last-child { margin-bottom: 0; }
        .feature-icon { font-size: 20px; margin-right: 12px; }
        .feature-text { font-size: 15px; }
        .cta { text-align: center; margin: 32px 0; }
        .cta a { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; }
        .footer { text-align: center; padding: 24px; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; }
        .social { margin-top: 16px; }
        .social a { color: #6366f1; text-decoration: none; margin: 0 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>🎓 Welcome to BizSimHub!</h1>
            <p>Learn business by doing</p>
          </div>
          <div class="content">
            <p class="welcome">Hi ${firstName},</p>
            <p>Thanks for joining BizSimHub! You're now part of a community of professionals and students mastering business skills through hands-on simulations.</p>
            
            <div class="features">
              <div class="feature">
                <span class="feature-icon">🎯</span>
                <span class="feature-text"><strong>Project Apex</strong> - Our flagship PM simulation with 4 industry scenarios</span>
              </div>
              <div class="feature">
                <span class="feature-icon">📊</span>
                <span class="feature-text"><strong>Track Progress</strong> - See your improvement with detailed analytics</span>
              </div>
              <div class="feature">
                <span class="feature-icon">🏆</span>
                <span class="feature-text"><strong>Compete</strong> - Join the leaderboard and earn achievements</span>
              </div>
            </div>
            
            <div class="cta">
              <a href="https://bizsimhub.com/dashboard">Start Your First Simulation →</a>
            </div>
            
            <p>If you have any questions, just reply to this email. We're here to help!</p>
            
            <p>Happy learning!<br>
            <strong>The BizSimHub Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 BizSimHub. All rights reserved.</p>
            <div class="social">
              <a href="https://twitter.com/BizSimHub">Twitter</a> •
              <a href="https://linkedin.com/company/bizsimhub">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Welcome to BizSimHub, ${firstName}!

Thanks for joining! You're now part of a community mastering business skills through hands-on simulations.

Here's what you can do:
🎯 Project Apex - Our flagship PM simulation with 4 industry scenarios
📊 Track Progress - See your improvement with detailed analytics  
🏆 Compete - Join the leaderboard and earn achievements

Get started: https://bizsimhub.com/dashboard

Questions? Just reply to this email.

Happy learning!
The BizSimHub Team
  `;

  return sendEmail({
    to: email,
    subject: `Welcome to BizSimHub, ${firstName}! 🎓`,
    html,
    text,
    replyTo: ADMIN_EMAIL,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail({ name, email, resetToken, resetUrl }) {
  const firstName = name.split(' ')[0];
  const fullResetUrl = resetUrl || `https://bizsimhub.com/reset-password?token=${resetToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f3f4f6; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 40px 30px; }
        .cta { text-align: center; margin: 32px 0; }
        .cta a { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; }
        .warning { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0; font-size: 14px; }
        .footer { text-align: center; padding: 24px; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>🔑 Reset Your Password</h1>
          </div>
          <div class="content">
            <p>Hi ${firstName},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            
            <div class="cta">
              <a href="${fullResetUrl}">Reset Password</a>
            </div>
            
            <div class="warning">
              ⚠️ This link expires in 1 hour. If you didn't request this reset, you can safely ignore this email.
            </div>
            
            <p>If the button doesn't work, copy and paste this URL into your browser:</p>
            <p style="word-break: break-all; color: #6366f1;">${fullResetUrl}</p>
          </div>
          <div class="footer">
            <p>© 2026 BizSimHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Reset Your Password

Hi ${firstName},

We received a request to reset your password. Visit this link to create a new password:

${fullResetUrl}

This link expires in 1 hour. If you didn't request this reset, you can safely ignore this email.

- The BizSimHub Team
  `;

  return sendEmail({
    to: email,
    subject: 'Reset your BizSimHub password',
    html,
    text,
  });
}

/**
 * Send email verification
 */
export async function sendVerificationEmail({ name, email, verificationToken, verificationUrl }) {
  const firstName = name.split(' ')[0];
  const fullVerifyUrl = verificationUrl || `https://bizsimhub.com/verify-email?token=${verificationToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f3f4f6; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 40px 30px; }
        .cta { text-align: center; margin: 32px 0; }
        .cta a { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; }
        .footer { text-align: center; padding: 24px; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>✉️ Verify Your Email</h1>
          </div>
          <div class="content">
            <p>Hi ${firstName},</p>
            <p>Thanks for signing up for BizSimHub! Please verify your email address by clicking the button below:</p>
            
            <div class="cta">
              <a href="${fullVerifyUrl}">Verify Email Address</a>
            </div>
            
            <p>If the button doesn't work, copy and paste this URL into your browser:</p>
            <p style="word-break: break-all; color: #6366f1;">${fullVerifyUrl}</p>
          </div>
          <div class="footer">
            <p>© 2026 BizSimHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Verify Your Email

Hi ${firstName},

Thanks for signing up for BizSimHub! Please verify your email address by visiting:

${fullVerifyUrl}

- The BizSimHub Team
  `;

  return sendEmail({
    to: email,
    subject: 'Verify your BizSimHub email',
    html,
    text,
  });
}
