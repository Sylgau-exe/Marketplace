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
    question: 'Can I try the tools before paying?',
    answer: 'Yes! Create a free account to browse all tools, view example projects, and see how everything works. You only pay when you want to start creating your own projects.',
  },
  {
    question: 'What happens when new tools are added?',
    answer: 'Unlimited plan subscribers get automatic access to all new tools at no extra cost. Starter and Professional users can swap their tool selections to include new tools.',
  },
  {
    question: 'Can I change my selected tools?',
    answer: 'Yes! You can change which tools you have access to once per billing cycle. This gives you flexibility to try different tools as your needs evolve.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely! Upgrade or downgrade anytime. When upgrading, you get immediate access to more tools. Downgrades take effect at your next billing cycle.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For Enterprise plans, we can arrange invoicing and bank transfers.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. No long-term contracts. Cancel your subscription anytime and retain access until the end of your current billing period.',
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
            Browse all tools for free. Pay only when you're ready to create.
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
