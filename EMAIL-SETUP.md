# BizSimHub Email Setup Guide
## Using Resend for Transactional Emails

---

## Overview

BizSimHub uses **Resend** for transactional emails:
- 📬 Contact form submissions → sent to your inbox
- 👋 Welcome emails → sent to new users on registration
- 🔑 Password reset emails (ready to implement)
- ✉️ Email verification (ready to implement)

**Why Resend?**
- Modern, developer-friendly API
- **3,000 free emails/month** (generous free tier)
- Great deliverability
- Simple setup with Vercel

---

## Quick Setup (10 minutes)

### Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address

### Step 2: Get Your API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it "BizSimHub Production"
4. Copy the key (starts with `re_`)

### Step 3: Add Domain (Recommended)

For production, add your domain for better deliverability:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter: `bizsimhub.com`
4. Add the DNS records shown to your domain registrar
5. Click **Verify**

> **Note:** Without a verified domain, emails will come from `onboarding@resend.dev` (fine for testing)

### Step 4: Configure Vercel Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `RESEND_API_KEY` | `re_xxxxxxxxx` | Production, Preview, Development |
| `FROM_EMAIL` | `BizSimHub <noreply@bizsimhub.com>` | Production |
| `ADMIN_EMAIL` | `sgauthier@executiveproducer.ca` | All |

**For development without verified domain:**
```
FROM_EMAIL=BizSimHub <onboarding@resend.dev>
```

### Step 5: Deploy

Push your changes or redeploy:
```bash
vercel --prod
```

---

## Environment Variables Reference

```env
# Required
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional (have defaults)
FROM_EMAIL=BizSimHub <noreply@bizsimhub.com>
ADMIN_EMAIL=sgauthier@executiveproducer.ca
```

---

## Email Templates Included

### 1. Contact Form Email
**Sent to:** Admin (your email)  
**Triggered by:** Contact form submission  
**Features:**
- Beautiful HTML template with your branding
- Shows sender name, email, company, subject, message
- Reply-To set to sender's email (just hit reply!)

### 2. Welcome Email
**Sent to:** New user  
**Triggered by:** User registration  
**Features:**
- Personalized greeting
- Quick start guide with features
- CTA button to dashboard
- Social links

### 3. Password Reset Email (Template Ready)
**Sent to:** User requesting reset  
**Features:**
- Secure reset link
- 1-hour expiration warning
- Clear instructions

### 4. Email Verification (Template Ready)
**Sent to:** New user  
**Features:**
- Verification link
- Simple, clear design

---

## Testing Locally

1. Create a `.env.local` file:
```env
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=BizSimHub <onboarding@resend.dev>
ADMIN_EMAIL=sgauthier@executiveproducer.ca
```

2. Test the contact form at `/contact`

3. Check your inbox for the email!

---

## API Endpoints

### POST /api/contact
Handles contact form submissions.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "subject": "general",
  "message": "Hello, I have a question...",
  "newsletter": true
}
```

**Response (success):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully. We'll get back to you within 24 hours."
}
```

---

## Troubleshooting

### "Email service not configured"
- Check `RESEND_API_KEY` is set in Vercel
- Redeploy after adding environment variables

### Emails going to spam
- Add and verify your domain in Resend
- Set up SPF, DKIM, and DMARC records

### Can't receive test emails
- Check `ADMIN_EMAIL` is set correctly
- Check spam folder
- Verify Resend API key is valid

---

## Costs

**Free Tier (Resend):**
- 3,000 emails/month
- 1 custom domain
- Basic analytics

**Pro Tier ($20/month):**
- 50,000 emails/month
- Multiple domains
- Advanced analytics

For BizSimHub launch, free tier should be plenty!

---

## Files Reference

| File | Purpose |
|------|---------|
| `/lib/email.js` | Email service with all templates |
| `/api/contact.js` | Contact form API endpoint |
| `/api/auth/register.js` | Sends welcome email on signup |
| `/public/contact.html` | Contact form page |

---

## Future Enhancements

- [ ] Add newsletter integration (Mailchimp/ConvertKit)
- [ ] Implement forgot password flow
- [ ] Add email verification on registration
- [ ] Email analytics dashboard
- [ ] Unsubscribe handling

---

*Setup guide for BizSimHub - January 2026*
