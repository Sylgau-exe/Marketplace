'use client'

import Link from 'next/link'
import { plans } from '@/lib/tools-config'
import { Check, ArrowLeft, HelpCircle } from 'lucide-react'

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0f',
    paddingTop: 100,
    paddingBottom: 100,
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    marginBottom: 40,
  },
  header: {
    textAlign: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: '3rem',
    fontWeight: 700,
    marginBottom: 16,
    color: 'white',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: 'rgba(255,255,255,0.5)',
    maxWidth: 600,
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
    marginBottom: 80,
  },
  card: {
    background: '#12121a',
    borderRadius: 16,
    padding: 32,
    border: '1px solid rgba(255,255,255,0.06)',
    position: 'relative',
  },
  cardPopular: {
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
  price: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 8,
  },
  priceAmount: {
    fontSize: '3rem',
    fontWeight: 700,
    color: 'white',
  },
  pricePeriod: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.5)',
  },
  description: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 24,
  },
  features: {
    marginBottom: 24,
  },
  feature: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 12,
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '12px 24px',
    borderRadius: 8,
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    border: 'none',
    width: '100%',
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
  faq: {
    maxWidth: 800,
    margin: '0 auto',
  },
  faqTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  faqItem: {
    background: '#12121a',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    border: '1px solid rgba(255,255,255,0.06)',
  },
  faqQuestion: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'white',
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  faqAnswer: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.6,
  },
}

const faqs = [
  {
    question: 'What happens when new tools are added?',
    answer: 'All new tools are automatically included in your subscription at no extra cost. As we release Roadmap Studio, Risk Radar, and future tools, you\'ll have immediate access.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, the change takes effect at your next billing cycle.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, Professional and Team plans come with a 14-day free trial. No credit card required to start. You\'ll have full access to all features during the trial.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and for Enterprise plans, we can arrange invoicing and bank transfers.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. There are no long-term contracts. You can cancel your subscription at any time, and you\'ll retain access until the end of your current billing period.',
  },
]

export default function PricingPage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link href="/" style={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div style={styles.header}>
          <h1 style={styles.title}>Simple, Transparent Pricing</h1>
          <p style={styles.subtitle}>
            One subscription gives you access to all tools — now and in the future. 
            No hidden fees, no surprises.
          </p>
        </div>

        <div style={styles.grid}>
          {plans.map(plan => (
            <div 
              key={plan.id} 
              style={{ 
                ...styles.card, 
                ...(plan.popular ? styles.cardPopular : {}) 
              }}
            >
              {plan.popular && <span style={styles.popularBadge}>Most Popular</span>}
              <h3 style={styles.planName}>{plan.name}</h3>
              <div style={styles.price}>
                {plan.price !== null ? (
                  <>
                    <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.5)' }}>$</span>
                    <span style={styles.priceAmount}>{plan.price}</span>
                    <span style={styles.pricePeriod}>/{plan.period}</span>
                  </>
                ) : (
                  <span style={{ ...styles.priceAmount, fontSize: '2rem' }}>Custom</span>
                )}
              </div>
              <p style={styles.description}>{plan.description}</p>
              <div style={styles.features}>
                {plan.features.map((feature, i) => (
                  <div key={i} style={styles.feature}>
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
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div style={styles.faq}>
          <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={styles.faqItem}>
              <h3 style={styles.faqQuestion}>
                <HelpCircle size={20} color="#6366f1" />
                {faq.question}
              </h3>
              <p style={styles.faqAnswer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
