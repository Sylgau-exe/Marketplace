'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Check, Sparkles, Eye, Lock, Loader2, Grid } from 'lucide-react'
import { plans, tools } from '@/lib/tools-config'
import { createUser, getUserByEmail, updateUser } from '@/lib/supabase'

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
  // App selection styles
  appGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
  },
  appOption: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: '20px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '2px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
  },
  appOptionSelected: {
    borderColor: '#6366f1',
    background: 'rgba(99, 102, 241, 0.15)',
  },
  appOptionDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  appIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  appName: {
    fontWeight: 600,
    color: 'white',
    fontSize: '0.9rem',
  },
  appCheckmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    background: '#6366f1',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionCount: {
    textAlign: 'center',
    marginBottom: 16,
    padding: '10px 16px',
    background: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 8,
    color: '#a5b4fc',
    fontSize: '0.9rem',
  },
  selectedApps: {
    marginTop: 16,
    padding: 16,
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
  },
  selectedAppsTitle: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 8,
  },
  selectedAppsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedAppTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 12px',
    background: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 6,
    color: '#a5b4fc',
    fontSize: '0.85rem',
  },
}

const availablePlans = plans.filter(p => p.id !== 'enterprise')

// Stripe Payment Links
const stripeLinks = {
  starter: 'https://buy.stripe.com/7sY3cocWy7tu0Ru4xt3Ru04',
  professional: 'https://buy.stripe.com/bJe8wI3lY1568jWd3Z3Ru05',
  unlimited: 'https://buy.stripe.com/aFa00ccWy012cAc1lh3Ru06'
}

// Available tools for selection
const selectableTools = tools.filter(t => t.status !== 'coming-soon')

// Max apps per plan
const maxAppsPerPlan = {
  starter: 1,
  professional: 3,
  unlimited: 999
}

export default function SignupPage() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [selectedApps, setSelectedApps] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  })

  useEffect(() => {
    const planParam = searchParams.get('plan')
    if (planParam && ['starter', 'professional', 'unlimited'].includes(planParam)) {
      setSelectedPlan(planParam)
    }
  }, [searchParams])

  // Reset selected apps when plan changes
  useEffect(() => {
    setSelectedApps([])
  }, [selectedPlan])

  const handleAppToggle = (appId) => {
    const maxApps = maxAppsPerPlan[selectedPlan] || 0
    
    if (selectedApps.includes(appId)) {
      // Remove app
      setSelectedApps(selectedApps.filter(id => id !== appId))
    } else {
      // Add app if under limit
      if (selectedApps.length < maxApps) {
        setSelectedApps([...selectedApps, appId])
      }
    }
  }

  const needsAppSelection = selectedPlan === 'starter' || selectedPlan === 'professional'
  const totalSteps = needsAppSelection ? 4 : 3

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (step === 1) {
      // Validate and move to plan selection
      if (!formData.name || !formData.email) {
        setError('Please fill in all required fields')
        return
      }
      
      setLoading(true)
      try {
        const existingUser = await getUserByEmail(formData.email)
        if (existingUser) {
          setError('An account with this email already exists. Please sign in instead.')
          setLoading(false)
          return
        }
        setStep(2)
      } catch (err) {
        console.error('Error checking email:', err)
      }
      setLoading(false)
      
    } else if (step === 2) {
      // Plan selected, move to app selection or create account
      if (needsAppSelection) {
        setStep(3) // Go to app selection
      } else {
        // Free or Unlimited - create account directly
        await createAccount()
      }
      
    } else if (step === 3 && needsAppSelection) {
      // Validate app selection
      const maxApps = maxAppsPerPlan[selectedPlan]
      if (selectedApps.length === 0) {
        setError(`Please select ${maxApps === 1 ? 'an app' : 'your apps'}`)
        return
      }
      if (selectedApps.length > maxApps) {
        setError(`You can only select ${maxApps} app${maxApps > 1 ? 's' : ''} with the ${selectedPlan} plan`)
        return
      }
      // Create account with selected apps
      await createAccount()
    }
  }

  const createAccount = async () => {
    setLoading(true)
    try {
      const newUser = await createUser({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        plan: selectedPlan,
        selected_tools: selectedPlan === 'unlimited' ? selectableTools.map(t => t.id) : selectedApps
      })

      localStorage.setItem('pmt_user', JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        plan: newUser.plan,
        selectedTools: newUser.selected_tools || [],
        isTester: newUser.is_tester || false,
        createdAt: newUser.created_at
      }))

      setStep(needsAppSelection ? 4 : 3)
    } catch (err) {
      console.error('Signup error:', err)
      setError(err.message || 'Failed to create account. Please try again.')
    }
    setLoading(false)
  }

  const selectedPlanData = plans.find(p => p.id === selectedPlan) || { 
    name: 'Free', 
    price: 0, 
    description: 'Browse tools & examples' 
  }

  const getStepIcon = () => {
    if (step === 1) return <Sparkles size={32} color="white" />
    if (step === 2) return <Lock size={32} color="white" />
    if (step === 3 && needsAppSelection) return <Grid size={32} color="white" />
    return <Check size={32} color="white" />
  }

  const getStepTitle = () => {
    if (step === 1) return 'Create Your Account'
    if (step === 2) return 'Choose Your Plan'
    if (step === 3 && needsAppSelection) return 'Select Your Apps'
    return selectedPlan === 'free' ? 'Account Created!' : 'Almost There!'
  }

  const getStepSubtitle = () => {
    if (step === 1) return 'Start exploring professional PM tools'
    if (step === 2) return 'Select how you want to use the platform'
    if (step === 3 && needsAppSelection) {
      const max = maxAppsPerPlan[selectedPlan]
      return `Choose ${max} app${max > 1 ? 's' : ''} to include in your ${selectedPlanData.name} plan`
    }
    return ''
  }

  // Final confirmation step
  const finalStep = needsAppSelection ? 4 : 3
  if (step === finalStep) {
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
                  : `You've selected the ${selectedPlanData.name} plan. Complete your payment to get started.`
                }
              </p>
              
              {/* Show selected apps for paid plans */}
              {selectedPlan !== 'free' && selectedPlan !== 'unlimited' && selectedApps.length > 0 && (
                <div style={styles.selectedApps}>
                  <div style={styles.selectedAppsTitle}>Your selected apps:</div>
                  <div style={styles.selectedAppsList}>
                    {selectedApps.map(appId => {
                      const app = selectableTools.find(t => t.id === appId)
                      return app ? (
                        <span key={appId} style={styles.selectedAppTag}>
                          {app.icon} {app.name}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
              )}
              
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
            {[...Array(totalSteps - 1)].map((_, i) => (
              <div key={i} style={{ ...styles.step, ...(step >= i + 1 ? styles.stepActive : {}) }}></div>
            ))}
          </div>

          <div style={styles.header}>
            <div style={styles.icon}>
              {getStepIcon()}
            </div>
            <h1 style={styles.title}>{getStepTitle()}</h1>
            <p style={styles.subtitle}>{getStepSubtitle()}</p>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          {/* Step 1: Account Info */}
          {step === 1 && (
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
          )}

          {/* Step 2: Plan Selection */}
          {step === 2 && (
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
                      <div style={styles.planDesc}>
                        {plan.id === 'starter' && 'Choose 1 app'}
                        {plan.id === 'professional' && 'Choose 3 apps'}
                        {plan.id === 'unlimited' && 'All apps included'}
                      </div>
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
                      <Check size={16} color="#10b981" /> Browse all tools
                    </div>
                    <div style={styles.benefit}>
                      <Check size={16} color="#10b981" /> View example projects
                    </div>
                    <div style={styles.benefit}>
                      <Check size={16} color="#10b981" /> Preview all features
                    </div>
                  </>
                ) : (
                  <>
                    {selectedPlan === 'starter' && (
                      <div style={styles.benefit}>
                        <Check size={16} color="#10b981" /> Full access to 1 app of your choice
                      </div>
                    )}
                    {selectedPlan === 'professional' && (
                      <div style={styles.benefit}>
                        <Check size={16} color="#10b981" /> Full access to 3 apps of your choice
                      </div>
                    )}
                    {selectedPlan === 'unlimited' && (
                      <div style={styles.benefit}>
                        <Check size={16} color="#10b981" /> Full access to all apps
                      </div>
                    )}
                    <div style={styles.benefit}>
                      <Check size={16} color="#10b981" /> Unlimited projects
                    </div>
                    <div style={styles.benefit}>
                      <Check size={16} color="#10b981" /> PDF exports
                    </div>
                  </>
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
                  selectedPlan === 'free' ? 'Create Free Account' : 
                  needsAppSelection ? 'Continue to App Selection →' : 'Continue to Payment →'
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

          {/* Step 3: App Selection (for Starter/Professional) */}
          {step === 3 && needsAppSelection && (
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.selectionCount}>
                {selectedApps.length} of {maxAppsPerPlan[selectedPlan]} app{maxAppsPerPlan[selectedPlan] > 1 ? 's' : ''} selected
              </div>

              <div style={styles.appGrid}>
                {selectableTools.map(tool => {
                  const isSelected = selectedApps.includes(tool.id)
                  const maxReached = selectedApps.length >= maxAppsPerPlan[selectedPlan] && !isSelected
                  
                  return (
                    <div
                      key={tool.id}
                      style={{
                        ...styles.appOption,
                        ...(isSelected ? styles.appOptionSelected : {}),
                        ...(maxReached ? styles.appOptionDisabled : {}),
                        position: 'relative'
                      }}
                      onClick={() => !maxReached && handleAppToggle(tool.id)}
                    >
                      {isSelected && (
                        <div style={styles.appCheckmark}>
                          <Check size={12} color="white" />
                        </div>
                      )}
                      <div style={{ ...styles.appIcon, background: `${tool.color}20` }}>
                        {tool.icon}
                      </div>
                      <div style={styles.appName}>{tool.name}</div>
                    </div>
                  )
                })}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 8 }}>
                You can change your selection later by contacting support.
              </p>

              <button 
                type="submit" 
                style={{ 
                  ...styles.btn, 
                  ...(loading || selectedApps.length === 0 ? styles.btnDisabled : {}) 
                }}
                disabled={loading || selectedApps.length === 0}
              >
                {loading ? (
                  <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Creating Account...</>
                ) : (
                  'Continue to Payment →'
                )}
              </button>
              
              <button 
                type="button" 
                style={{ ...styles.btn, ...styles.btnSecondary }}
                onClick={() => setStep(2)}
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
