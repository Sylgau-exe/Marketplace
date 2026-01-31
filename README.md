# 🎓 BizSimHub v1
#
Business simulation marketplace - fully deployed on Vercel.   

## 🚀 Quick Deploy

### 1. Push to GitHub
Upload all files to a new GitHub repository.

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects Vite - just click **Deploy**

### 3. Add Vercel Postgres Database
1. In Vercel Dashboard → Your Project → **Storage**
2. Click **Create Database** → **Postgres**
3. Name it `bizsimhub-db` → **Create**
4. Click **Connect** to link it to your project
5. Environment variables are auto-added ✅

### 4. Initialize Database Tables
After deployment, visit:
```
https://your-app.vercel.app/api/init-db?secret=setup
```
You should see: `{"message":"Database initialized successfully"}`

### 5. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

```
JWT_SECRET=your-secret-key-minimum-32-characters-long

# Stripe (from dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_PRO_ANNUAL=price_...
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_...
STRIPE_PRICE_ENTERPRISE_ANNUAL=price_...

# Frontend (optional)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 6. Set Up Stripe Webhook
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-app.vercel.app/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### 7. Create Stripe Products
In Stripe Dashboard → Products:
- **Pro Plan**: $29/month and $290/year
- **Enterprise Plan**: $199/month and $1990/year

Copy each price ID to the environment variables.

---

## 📁 Project Structure

```
bizsimhub/
├── api/                    # Vercel Serverless Functions
│   ├── auth/
│   │   ├── register.js
│   │   ├── login.js
│   │   └── me.js
│   ├── stripe/
│   │   ├── create-checkout-session.js
│   │   ├── create-portal-session.js
│   │   ├── subscription.js
│   │   └── webhook.js
│   ├── simulations/
│   │   ├── scores.js
│   │   └── leaderboard.js
│   └── init-db.js
├── lib/                    # Shared code
│   ├── db.js              # Vercel Postgres helpers
│   └── auth.js            # JWT helpers
├── src/                    # React frontend
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

## 🔧 Local Development

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your Vercel project (pulls env vars)
vercel link

# Run locally with Vercel functions
vercel dev
```

## 💳 Test Cards

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Declined |

---

## 📄 License

MIT License - Sylvain Deschamps
