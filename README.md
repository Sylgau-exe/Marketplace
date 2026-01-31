# ProjectManagerTool Platform

A SaaS platform integrating multiple project management tools under a single subscription.

## 🏗️ Architecture

```
projectmanagertool.com/
├── /                    → Landing page (tool catalog)
├── /pricing             → Unified pricing page
├── /dashboard           → User dashboard (after login)
├── /tools/
│   ├── /charterpro      → CharterPro (redirects to app)
│   └── /pmo-hub         → PMO Hub app
├── /charterpro/         → CharterPro HTML app (static)
│   ├── dashboard.html   → CharterPro dashboard
│   ├── project-charter-app.html → Charter creator
│   └── ...              → Other CharterPro pages
└── /api/                → Backend APIs (to be implemented)
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: CSS-in-JS (inline styles)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Hosting**: Vercel
- **Data**: localStorage (upgrade to database for production)

## 📁 Project Structure

```
projectmanagertool/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout
│   ├── page.js              # Landing page
│   ├── pricing/
│   │   └── page.js          # Pricing page
│   ├── dashboard/
│   │   ├── layout.js        # Dashboard layout (with sidebar)
│   │   └── page.js          # User dashboard
│   └── tools/
│       ├── layout.js        # Tools layout (with sidebar)
│       ├── charterpro/
│       │   └── page.js      # Redirects to /charterpro/dashboard.html
│       └── pmo-hub/
│           └── page.js      # PMO Hub tool
├── public/
│   └── charterpro/          # CharterPro HTML app (static files)
│       ├── dashboard.html
│       ├── project-charter-app.html
│       ├── login.html
│       ├── settings.html
│       ├── samples/         # Sample PDF charters
│       └── ...
├── components/
│   └── tools/               # Shared tool components
├── lib/
│   └── tools-config.js      # Tools catalog & pricing config
└── package.json
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
npm start
```

## 📤 Deployment to Vercel

### Option A: GitHub Integration (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

## 🔧 Configuration

### Adding a New Tool

1. **Add to catalog** (`lib/tools-config.js`):

```javascript
{
  id: 'new-tool',
  name: 'New Tool',
  tagline: 'Tool description',
  description: 'Longer description...',
  icon: '🆕',
  color: '#6366f1',
  status: 'coming-soon', // 'live', 'beta', or 'coming-soon'
  features: ['Feature 1', 'Feature 2'],
  route: '/tools/new-tool',
}
```

2. **Create the page** (`app/tools/new-tool/page.js`):

```javascript
'use client'
export default function NewToolPage() {
  return <div>New Tool Content</div>
}
```

### Modifying Pricing Plans

Edit `lib/tools-config.js`:

```javascript
export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    features: ['...'],
    // ...
  },
  // Add more plans
]
```

## 🔐 Adding Authentication (Recommended for Production)

### Option 1: Clerk (Easiest)

```bash
npm install @clerk/nextjs
```

### Option 2: NextAuth.js

```bash
npm install next-auth
```

### Option 3: Supabase Auth

```bash
npm install @supabase/supabase-js
```

## 💾 Adding a Database (Recommended for Production)

### Option 1: Supabase (PostgreSQL)

```bash
npm install @supabase/supabase-js
```

### Option 2: PlanetScale (MySQL)

```bash
npm install @planetscale/database
```

### Option 3: MongoDB Atlas

```bash
npm install mongodb
```

## 💳 Adding Payments (Stripe)

```bash
npm install stripe @stripe/stripe-js
```

See `/app/api/stripe/` for webhook examples.

## 🌐 Custom Domain Setup

1. In Vercel Dashboard → Settings → Domains
2. Add `projectmanagertool.com`
3. Configure DNS:

```
Type: A     Name: @    Value: 76.76.21.21
Type: CNAME Name: www  Value: cname.vercel-dns.com
```

## 📊 Current Tools

| Tool | Status | Description |
|------|--------|-------------|
| CharterPro | ✅ Live | Project charter generator |
| PMO Hub | 🧪 Beta | Portfolio management office |
| Roadmap Studio | 🔜 Coming | Visual product roadmaps |
| Risk Radar | 🔜 Coming | Risk management system |

## 🛣️ Roadmap

- [ ] User authentication
- [ ] Database integration
- [ ] Stripe payments
- [ ] Team collaboration
- [ ] API for integrations
- [ ] Mobile apps

## 📝 License

MIT License - feel free to use for personal or commercial projects.
