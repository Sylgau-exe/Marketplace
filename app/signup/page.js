'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Check, Sparkles, Eye, Lock, Loader2 } from 'lucide-react'
import { plans, tools } from '@/lib/tools-config'
import { createUser, getUserByEmail } from '@/lib/supabase'

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  container: {
    width: '100%',
    maxWidth: 520,
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    marginBottom: 32,
  },
  card: {
    background: '#12121a',
    borderRadius: 20,
    padding: 40,
    border: '1px solid rgba(255,255,255,0.06)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
  },
  icon: {
    width: 64,
    height: 64,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.5)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.8)',
  },
  input: {
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s',
  },
  planSelector: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  planOption: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '16px',
    background: 'rgba(255,255,255,0.03)',
    border: '2px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  planOptionSelected: {
    borderColor: '#6366f1',
    background: 'rgba(99, 102, 241, 0.1)',
  },
  planRadio: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  planRadioSelected: {
    borderColor: '#6366f1',
    background: '#6366f1',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontWeight: 600,
    color: 'white',
    marginBottom: 2,
  },
  planDesc: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
  },
  planPrice: {
    fontWeight: 700,
    color: '#a5b4fc',
    textAlign: 'right',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: 10,
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: 8,
    textDecoration: 'none',
  },
  btnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  btnSecondary: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  benefits: {
    marginTop: 24,
    padding: 20,
    background: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 12,
    border: '1px solid rgba(99, 102, 241, 0.2)',
  },
  benefitsTitle: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#a5b4fc',
    marginBottom: 12,
  },
  benefit: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  freeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 12px',
    background: 'rgba(34, 197, 94, 0.15)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: 8,
    color: '#4ade80',
    fontSize: '0.8rem',
    fontWeight: 500,
    marginBottom: 20,
  },
  footer: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.5)',
  },
  link: {
    color: '#a5b4fc',
    textDecoration: 'none',
  },
  success: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  successIcon: {
    width: 80,
    height: 80,
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  },
  successTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'white',
    marginBottom: 12,
  },
  successText: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 24,
    lineHeight: 1.6,
  },
  stepIndicator: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  step: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
  },
  stepActive: {
    background: '#6366f1',
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#fca5a5',
    padding: '12px 16px',
    borderRadius: 8,
    fontSize: '0.9rem',
    marginBottom: 20,
  },
}

const availablePlans = plans.filter(p => p.id !== 'enterprise')

// Stripe Payment Links
const stripeLinks = {
  starter: 'https://buy.stripe.com/7sY3cocWy7tu0Ru4xt3Ru04',
  professional: 'https://buy.stripe.com/bJe8wI3lY1568jWd3Z3Ru05',
  unlimited: 'https://buy.stripe.com/aFa00ccWy012cAc1lh3Ru06'
}

export default function SignupPage() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  })

  useEffect(() => {
    const planParam = searchParams.get('plan')
    if (planParam && plans.find(p => p.id === planParam)) {
      setSelectedPlan(planParam)
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (step === 1) {
      // Check if email already exists
      setLoading(true)
      try {
        const existingUser = await getUserByEmail(formData.email)
        if (existingUser) {
          setError('An account with this email already exists. Please sign in instead.')
          setLoading(false)
          return
        }
      } catch (err) {
        // No user found, that's good - continue
      }
      setLoading(false)
      setStep(2)
    } else {
      // Create account
      setLoading(true)
      try {
        const userData = {
          email: formData.email,
          name: formData.name,
          company: formData.company || null,
          plan: selectedPlan === 'free' ? 'free' : selectedPlan,
          selectedTools: []
        }

        // Save to Supabase
        const newUser = await createUser(userData)

        // Also save to localStorage for client-side access control
        localStorage.setItem('pmt_user', JSON.stringify({
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          plan: newUser.plan,
          selectedTools: newUser.selected_tools || [],
          createdAt: newUser.created_at
        }))

        setStep(3)
      } catch (err) {
        console.error('Signup error:', err)
        setError(err.message || 'Failed to create account. Please try again.')
      }
      setLoading(false)
    }
  }

  const selectedPlanData = plans.find(p => p.id === selectedPlan) || { 
    name: 'Free', 
    price: 0, 
    description: 'Browse tools & examples' 
  }

  if (step === 3) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.success}>
              <div style={styles.successIcon}>
                <Check size={40} color="white" />
              </div>
              <h1 style={styles.successTitle}>
                {selectedPlan === 'free' ? 'Account Created!' : 'Almost There!'}
              </h1>
              <p style={styles.successText}>
                {selectedPlan === 'free' 
                  ? 'Your free account is ready. You can now browse all tools and view examples. Upgrade anytime to start creating your own projects.'
                  : `You've selected the ${selectedPlanData.name} plan. Complete your payment to get started with full access to your selected tools.`
                }
              </p>
              {selectedPlan === 'free' ? (
                <Link href="/dashboard/" style={styles.btn}>
                  Go to Dashboard →
                </Link>
              ) : (
                <a 
                  href={`${stripeLinks[selectedPlan]}?prefilled_email=${encodeURIComponent(formData.email)}`}
                  style={styles.btn}
                >
                  Complete Payment - ${selectedPlanData.price}/mo →
                </a>
              )}
              {selectedPlan !== 'free' && (
                <Link href="/dashboard/" style={{ ...styles.btn, ...styles.btnSecondary, marginTop: 12 }}>
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link href="/" style={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div style={styles.card}>
          <div style={styles.stepIndicator}>
            <div style={{ ...styles.step, ...styles.stepActive }}></div>
            <div style={{ ...styles.step, ...(step >= 2 ? styles.stepActive : {}) }}></div>
          </div>

          <div style={styles.header}>
            <div style={styles.icon}>
              {step === 1 ? <Sparkles size={32} color="white" /> : <Lock size={32} color="white" />}
            </div>
            <h1 style={styles.title}>
              {step === 1 ? 'Create Your Account' : 'Choose Your Plan'}
            </h1>
            <p style={styles.subtitle}>
              {step === 1 
                ? 'Start exploring professional PM tools' 
                : 'Select how you want to use the platform'}
            </p>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          {step === 1 ? (
            <>
              <div style={styles.freeBadge}>
                <Eye size={14} />
                Free accounts can browse all tools & examples
              </div>

              <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input 
                    type="text" 
                    style={styles.input}
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    disabled={loading}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Work Email</label>
                  <input 
                    type="email" 
                    style={styles.input}
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    disabled={loading}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Company (Optional)</label>
                  <input 
                    type="text" 
                    style={styles.input}
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    disabled={loading}
                  />
                </div>

                <button 
                  type="submit" 
                  style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}
                  disabled={loading}
                >
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Checking...</> : 'Continue →'}
                </button>
              </form>
            </>
          ) : (
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.planSelector}>
                {/* Free Option */}
                <div 
                  style={{ 
                    ...styles.planOption, 
                    ...(selectedPlan === 'free' ? styles.planOptionSelected : {}) 
                  }}
                  onClick={() => !loading && setSelectedPlan('free')}
                >
                  <div style={{ 
                    ...styles.planRadio, 
                    ...(selectedPlan === 'free' ? styles.planRadioSelected : {}) 
                  }}>
                    {selectedPlan === 'free' && <Check size={12} color="white" />}
                  </div>
                  <div style={styles.planInfo}>
                    <div style={styles.planName}>Free Account</div>
                    <div style={styles.planDesc}>Browse tools & view examples</div>
                  </div>
                  <div style={styles.planPrice}>$0</div>
                </div>

                {/* Paid Plans */}
                {availablePlans.map(plan => (
                  <div 
                    key={plan.id}
                    style={{ 
                      ...styles.planOption, 
                      ...(selectedPlan === plan.id ? styles.planOptionSelected : {}) 
                    }}
                    onClick={() => !loading && setSelectedPlan(plan.id)}
                  >
                    <div style={{ 
                      ...styles.planRadio, 
                      ...(selectedPlan === plan.id ? styles.planRadioSelected : {}) 
                    }}>
                      {selectedPlan === plan.id && <Check size={12} color="white" />}
                    </div>
                    <div style={styles.planInfo}>
                      <div style={styles.planName}>
                        {plan.name}
                        {plan.popular && <span style={{ 
                          marginLeft: 8, 
                          fontSize: '0.7rem', 
                          background: '#6366f1', 
                          color: 'white', 
                          padding: '2px 6px', 
                          borderRadius: 4 
                        }}>Best Value</span>}
                      </div>
                      <div style={styles.planDesc}>{plan.description}</div>
                    </div>
                    <div style={styles.planPrice}>${plan.price}/mo</div>
                  </div>
                ))}
              </div>

              <div style={styles.benefits}>
                <div style={styles.benefitsTitle}>
                  {selectedPlan === 'free' ? 'Free account includes:' : `${selectedPlanData.name} plan includes:`}
                </div>
                {selectedPlan === 'free' ? (
                  <>
                    <div style={styles.benefit}>
                      <Check size={16} color="#10b981" /> Browse all {tools.filter(t => t.status !== 'coming-soon').length} tools
                    </div>
                    <div style={styles.benefit}>
                      <Check size={16} color="#10b981" /> View example projects
                    </div>
                    <div style={styles.benefit}>
                      <Check size={16} color="#10b981" /> Preview all features
                    </div>
                  </>
                ) : (
                  selectedPlanData.features?.slice(0, 4).map((feature, i) => (
                    <div key={i} style={styles.benefit}>
                      <Check size={16} color="#10b981" /> {feature}
                    </div>
                  ))
                )}
              </div>

              <button 
                type="submit" 
                style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Creating Account...</>
                ) : (
                  selectedPlan === 'free' ? 'Create Free Account' : 'Continue to Payment'
                )}
              </button>
              
              <button 
                type="button" 
                style={{ ...styles.btn, ...styles.btnSecondary }}
                onClick={() => setStep(1)}
                disabled={loading}
              >
                ← Back
              </button>
            </form>
          )}

          <div style={styles.footer}>
            Already have an account? <Link href="/login" style={styles.link}>Sign in</Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
