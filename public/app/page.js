'use client'

import { useState } from 'react'
import Link from 'next/link'
import { tools, plans } from '@/lib/tools-config'
import { 
  ArrowRight, Check, Menu, X, Sparkles, Shield, Zap, 
  Users, BarChart3, Clock, ChevronRight, Star
} from 'lucide-react'

// ============ STYLES ============
const styles = {
  // Layout
  page: {
    minHeight: '100vh',
    background: '#0a0a0f',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
  },
  // Header
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: '16px 0',
    background: 'rgba(10, 10, 15, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  headerInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'white',
    textDecoration: 'none',
  },
  logoIcon: {
    width: 36,
    height: 36,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
  },
  navLink: {
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  navButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  // Buttons
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '10px 20px',
    borderRadius: 8,
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    border: 'none',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
  },
  btnSecondary: {
    background: 'rgba(255,255,255,0.05)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  btnLarge: {
    padding: '14px 28px',
    fontSize: '1rem',
  },
  // Hero
  hero: {
    paddingTop: 160,
    paddingBottom: 100,
    textAlign: 'center',
    background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 14px',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: 50,
    fontSize: '0.85rem',
    color: '#a5b4fc',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 24,
    color: 'white',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: 'rgba(255,255,255,0.6)',
    maxWidth: 600,
    margin: '0 auto 40px',
    lineHeight: 1.6,
  },
  heroCtas: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  // Tools Section
  section: {
    padding: '100px 0',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: 60,
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: 16,
    color: 'white',
  },
  sectionSubtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.5)',
    maxWidth: 500,
    margin: '0 auto',
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 24,
  },
  toolCard: {
    background: '#12121a',
    borderRadius: 16,
    padding: 32,
    border: '1px solid rgba(255,255,255,0.06)',
    transition: 'all 0.3s',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  toolIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.75rem',
    marginBottom: 20,
  },
  toolName: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: 4,
    color: 'white',
  },
  toolTagline: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 16,
  },
  toolDescription: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.6,
    marginBottom: 20,
  },
  toolStatus: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    borderRadius: 50,
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  toolFeatures: {
    marginTop: 20,
    paddingTop: 20,
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  toolFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 8,
  },
  // Pricing Section
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
    alignItems: 'start',
  },
  priceCard: {
    background: '#12121a',
    borderRadius: 16,
    padding: 32,
    border: '1px solid rgba(255,255,255,0.06)',
    position: 'relative',
  },
  priceCardPopular: {
    border: '1px solid rgba(99, 102, 241, 0.5)',
    boxShadow: '0 0 40px rgba(99, 102, 241, 0.15)',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '4px 16px',
    borderRadius: 50,
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  planName: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'white',
    marginBottom: 8,
  },
  planPrice: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 8,
  },
  planPriceAmount: {
    fontSize: '3rem',
    fontWeight: 700,
    color: 'white',
  },
  planPricePeriod: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.5)',
  },
  planDescription: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 24,
  },
  planFeatures: {
    marginBottom: 24,
  },
  planFeature: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 12,
  },
  // Features Grid
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 32,
  },
  featureCard: {
    padding: 24,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: 'rgba(99, 102, 241, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    color: '#818cf8',
  },
  featureTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'white',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.6,
  },
  // CTA Section
  ctaSection: {
    padding: '100px 0',
    textAlign: 'center',
    background: 'linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.05) 100%)',
  },
  // Footer
  footer: {
    padding: '60px 0 40px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  footerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 24,
  },
  footerLinks: {
    display: 'flex',
    gap: 24,
  },
  footerLink: {
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  footerCopy: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '0.85rem',
  },
}

// ============ COMPONENTS ============
const ToolCard = ({ tool }) => {
  const statusColors = {
    'live': { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', text: 'Live' },
    'beta': { bg: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', text: 'Beta' },
    'coming-soon': { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', text: 'Coming Soon' },
  }
  const status = statusColors[tool.status]

  return (
    <Link href={tool.status !== 'coming-soon' ? tool.route : '#'} style={{ textDecoration: 'none' }}>
      <div 
        style={styles.toolCard}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = tool.color
          e.currentTarget.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <div style={{ ...styles.toolIcon, background: `${tool.color}15` }}>
          {tool.icon}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <h3 style={styles.toolName}>{tool.name}</h3>
          <span style={{ 
            ...styles.toolStatus, 
            background: status.bg, 
            color: status.color 
          }}>
            {status.text}
          </span>
        </div>
        <p style={styles.toolTagline}>{tool.tagline}</p>
        <p style={styles.toolDescription}>{tool.description}</p>
        <div style={styles.toolFeatures}>
          {tool.features.slice(0, 4).map((feature, i) => (
            <div key={i} style={styles.toolFeature}>
              <Check size={14} color={tool.color} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        {tool.status !== 'coming-soon' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, color: tool.color, fontSize: '0.9rem', fontWeight: 600 }}>
            Launch Tool <ArrowRight size={16} />
          </div>
        )}
      </div>
    </Link>
  )
}

const PricingCard = ({ plan }) => (
  <div style={{ 
    ...styles.priceCard, 
    ...(plan.popular ? styles.priceCardPopular : {}) 
  }}>
    {plan.popular && <span style={styles.popularBadge}>Most Popular</span>}
    <h3 style={styles.planName}>{plan.name}</h3>
    <div style={styles.planPrice}>
      {plan.price !== null ? (
        <>
          <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.5)' }}>$</span>
          <span style={styles.planPriceAmount}>{plan.price}</span>
          <span style={styles.planPricePeriod}>/{plan.period}</span>
        </>
      ) : (
        <span style={{ ...styles.planPriceAmount, fontSize: '2rem' }}>Custom</span>
      )}
    </div>
    <p style={styles.planDescription}>{plan.description}</p>
    <div style={styles.planFeatures}>
      {plan.features.map((feature, i) => (
        <div key={i} style={styles.planFeature}>
          <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
          <span>{feature}</span>
        </div>
      ))}
    </div>
    <Link 
      href={plan.id === 'enterprise' ? '/contact' : '/signup'} 
      style={{ 
        ...styles.btn, 
        ...(plan.popular ? styles.btnPrimary : styles.btnSecondary),
        width: '100%',
      }}
    >
      {plan.cta}
    </Link>
  </div>
)

// ============ MAIN PAGE ============
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <Link href="/" style={styles.logo}>
            <span style={styles.logoIcon}>⚡</span>
            <span>ProjectManagerTool</span>
          </Link>
          <nav style={{ ...styles.nav, display: 'flex' }}>
            <Link href="#tools" style={styles.navLink}>Tools</Link>
            <Link href="/pricing" style={styles.navLink}>Pricing</Link>
            <Link href="#" style={styles.navLink}>Resources</Link>
          </nav>
          <div style={styles.navButtons}>
            <Link href="/login" style={{ ...styles.btn, ...styles.btnSecondary }}>
              Log In
            </Link>
            <Link href="/signup" style={{ ...styles.btn, ...styles.btnPrimary }}>
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <span style={styles.badge}>
            <Sparkles size={14} />
            PMO Hub now in Beta
          </span>
          <h1 style={styles.heroTitle}>
            All Your PM Tools.<br />
            <span className="gradient-text">One Platform.</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Professional project management tools designed to work together. 
            Create charters, manage portfolios, track risks, and more — with a single subscription.
          </p>
          <div style={styles.heroCtas}>
            <Link href="/signup" style={{ ...styles.btn, ...styles.btnPrimary, ...styles.btnLarge }}>
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <Link href="#tools" style={{ ...styles.btn, ...styles.btnSecondary, ...styles.btnLarge }}>
              Explore Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Catalog */}
      <section id="tools" style={{ ...styles.section, background: '#08080c' }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Professional PM Tools</h2>
            <p style={styles.sectionSubtitle}>
              A growing suite of tools built for modern project managers
            </p>
          </div>
          <div style={styles.toolsGrid}>
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Features/Benefits */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Why Choose Our Platform?</h2>
            <p style={styles.sectionSubtitle}>
              Everything you need to manage projects like a pro
            </p>
          </div>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><Zap size={24} /></div>
              <h3 style={styles.featureTitle}>Unified Experience</h3>
              <p style={styles.featureDescription}>
                All tools share the same design language and work seamlessly together. Your data flows between tools automatically.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><Shield size={24} /></div>
              <h3 style={styles.featureTitle}>One Subscription</h3>
              <p style={styles.featureDescription}>
                No more juggling multiple subscriptions. One plan gives you access to all current and future tools.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><Users size={24} /></div>
              <h3 style={styles.featureTitle}>Team Collaboration</h3>
              <p style={styles.featureDescription}>
                Share projects, templates, and insights across your team. Everyone stays aligned and informed.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><BarChart3 size={24} /></div>
              <h3 style={styles.featureTitle}>Powerful Analytics</h3>
              <p style={styles.featureDescription}>
                Get insights across all your projects with unified dashboards and customizable reports.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><Clock size={24} /></div>
              <h3 style={styles.featureTitle}>Always Evolving</h3>
              <p style={styles.featureDescription}>
                New tools and features added regularly. Your subscription includes all future releases.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><Star size={24} /></div>
              <h3 style={styles.featureTitle}>Expert Support</h3>
              <p style={styles.featureDescription}>
                Our PM experts are here to help you succeed. Get guidance on best practices and tool usage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ ...styles.section, background: '#08080c' }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Simple, Transparent Pricing</h2>
            <p style={styles.sectionSubtitle}>
              One subscription, all tools. No hidden fees.
            </p>
          </div>
          <div style={styles.pricingGrid}>
            {plans.map(plan => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitle, marginBottom: 16 }}>
            Ready to Transform Your PM Workflow?
          </h2>
          <p style={{ ...styles.sectionSubtitle, marginBottom: 40 }}>
            Join thousands of project managers who trust our platform.
          </p>
          <Link href="/signup" style={{ ...styles.btn, ...styles.btnPrimary, ...styles.btnLarge }}>
            Start Your Free Trial <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={{ ...styles.container, ...styles.footerInner }}>
          <Link href="/" style={styles.logo}>
            <span style={styles.logoIcon}>⚡</span>
            <span>ProjectManagerTool</span>
          </Link>
          <div style={styles.footerLinks}>
            <Link href="/privacy" style={styles.footerLink}>Privacy</Link>
            <Link href="/terms" style={styles.footerLink}>Terms</Link>
            <Link href="/contact" style={styles.footerLink}>Contact</Link>
          </div>
          <span style={styles.footerCopy}>
            © {new Date().getFullYear()} ProjectManagerTool. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  )
}
