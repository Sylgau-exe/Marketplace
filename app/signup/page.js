'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Check, Sparkles, Eye, Lock, Loader2, Grid } from 'lucide-react'
import { plans, tools } from '@/lib/tools-config'
import { createUser, getUserByEmail, updateUser, signInWithGoogle, getSession, getOrCreateOAuthUser } from '@/lib/supabase'

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
  // Google button styles
  btnGoogle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: '14px 24px',
    background: 'white',
    border: 'none',
    borderRadius: 10,
    color: '#1f1f1f',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    margin: '24px 0',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.4)',
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
    padding: '20px 12px',
    background: 'rgba(255,255,255,0.03)',
    border: '2px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
  },
  appOptionSelected: {
    borderColor: '#6366f1',
    background: 'rgba(99, 102, 241, 0.1)',
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
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'white',
  },
  appCheckmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionCount: {
    textAlign: 'center',
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 16,
  },
}

// Google Icon SVG Component
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

// Define available plans
const availablePlans = [
  { id: 'starter', name: 'Starter', price: 9, apps: 1 },
  { id: 'professional', name: 'Professional', price: 19, apps: 3, popular: true },
  { id: 'unlimited', name: 'Unlimited', price: 49, apps: 'all' },
]

// Define selectable tools
const selectableTools = [
  { id: 'dmaic-generator', name: 'DMAIC Generator', icon: '📊', color: '#6366f1' },
  { id: 'charterpro', name: 'CharterPro', icon: '📋', color: '#8b5cf6' },
  { id: 'roi-calculator', name: 'ROI Calculator', icon: '💰', color: '#10b981' },
  { id: 'tco-calculator', name: 'TCO Calculator', icon: '📈', color: '#f59e0b' },
  { id: 'risk-register', name: 'Risk Register', icon: '⚠️', color: '#ef4444' },
]

// Max apps per plan
const maxAppsPerPlan = {
  starter: 1,
  professional: 3,
  unlimited: selectableTools.length
}

// Stripe payment links
const stripeLinks = {
  starter: 'https://buy.stripe.com/7sY3cocWy7tu0Ru4xt3Ru04',
  professional: 'https://buy.stripe.com/bJe8wI3lY1568jWd3Z3Ru05',
  unlimited: 'https://buy.stripe.com/aFa00ccWy012cAc1lh3Ru06'
}

export default function SignupPage() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [selectedApps, setSelectedApps] = useState([])
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  })

  // Handle OAuth callback
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const oauthParam = searchParams.get('oauth')
      
      if (oauthParam === 'callback') {
        setLoading(true)
        try {
          const session = await getSession()
          
          if (session?.user) {
            // Get or create user in our database
            const user = await getOrCreateOAuthUser(session.user)
            
            // Store in localStorage
            localStorage.setItem('pmt_user', JSON.stringify({
              email: user.email,
              name: user.name,
              company: user.company,
              plan: user.plan,
              selectedTools: user.selected_tools || [],
              isTester: user.is_tester || false,
              createdAt: user.created_at
            }))
            
            // Pre-fill form data
            setFormData({
              name: user.name || session.user.user_metadata?.full_name || '',
              email: user.email,
              company: user.company || ''
            })
            
            // If existing user with plan, go to dashboard
            if (user.plan !== 'free' || user.selected_tools?.length > 0) {
              window.location.href = '/dashboard'
              return
            }
            
            // New user - go to plan selection
            setStep(2)
          }
        } catch (err) {
          console.error('OAuth callback error:', err)
          setError('Failed to complete sign in. Please try again.')
        }
        setLoading(false)
      }
    }
    
    handleOAuthCallback()
  }, [searchParams])

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

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError('')
    
    try {
      await signInWithGoogle('/signup?oauth=callback')
    } catch (err) {
      console.error('Google sign in error:', err)
      setError('Failed to sign in with Google. Please try again.')
      setGoogleLoading(false)
    }
  }

  const handleAppToggle = (appId) => {
    const maxApps = maxAppsPerPlan[selectedPlan] || 0
    
    if (selectedApps.includes(appId)) {
      setSelectedApps(selectedApps.filter(id => id !== appId))
    } else {
      if (selectedApps.length < maxApps) {
        setSelectedApps([...selectedApps, appId])
      }
    }
  }

  const needsAppSelection = selectedPlan === 'starter' || selectedPlan === 'professional'
  const totalSteps = needsAppSelection ? 4 : 3
  const selectedPlanData = availablePlans.find(p => p.id === selectedPlan)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (step === 1) {
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
      if (needsAppSelection) {
        setStep(3)
      } else {
        await createAccount()
      }
      
    } else if (step === 3 && needsAppSelection) {
      const maxApps = maxAppsPerPlan[selectedPlan]
      if (selectedApps.length === 0) {
        setError(`Please select ${maxApps === 1 ? 'an app' : 'your apps'}`)
        return
      }
      if (selectedApps.length > maxApps) {
        setError(`You can only select ${maxApps} app${maxApps > 1 ? 's' : ''} with the ${selectedPlan} plan`)
        return
      }
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
        email: newUser.email,
        name: newUser.name,
        company: newUser.company,
        plan: newUser.plan,
        selectedTools: newUser.selected_tools || [],
        isTester: newUser.is_tester || false,
        createdAt: newUser.created_at
      }))

      if (selectedPlan === 'free') {
        window.location.href = '/dashboard'
      } else {
        // Redirect to Stripe payment
        const stripeUrl = stripeLinks[selectedPlan]
        if (stripeUrl) {
          window.location.href = `${stripeUrl}?prefilled_email=${encodeURIComponent(formData.email)}`
        } else {
          window.location.href = '/dashboard'
        }
      }
    } catch (err) {
      console.error('Error creating account:', err)
      setError('Failed to create account. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link href="/" style={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div style={styles.card}>
          {/* Step indicator */}
          <div style={styles.stepIndicator}>
            {[...Array(totalSteps)].map((_, i) => (
              <div 
                key={i} 
                style={{ 
                  ...styles.step, 
                  ...(i < step ? styles.stepActive : {}) 
                }} 
              />
            ))}
          </div>

          <div style={styles.header}>
            <div style={styles.icon}>
              <Sparkles size={32} color="white" />
            </div>
            <h1 style={styles.title}>
              {step === 1 ? 'Create Your Account' : 
               step === 2 ? 'Choose Your Plan' : 
               step === 3 && needsAppSelection ? 'Select Your Apps' : 
               'Almost There!'}
            </h1>
            <p style={styles.subtitle}>
              {step === 1 ? 'Start your free trial today' : 
               step === 2 ? 'Select the plan that works for you' :
               step === 3 && needsAppSelection ? `Choose ${maxAppsPerPlan[selectedPlan]} app${maxAppsPerPlan[selectedPlan] > 1 ? 's' : ''} to include` :
               'Complete your subscription'}
            </p>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          {/* Step 1: User Info */}
          {step === 1 && (
            <>
              {/* Google Sign In Button */}
              <button 
                type="button"
                style={{ ...styles.btnGoogle, ...(googleLoading ? { opacity: 0.7 } : {}) }}
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loading}
              >
                {googleLoading ? (
                  <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <GoogleIcon />
                )}
                Continue with Google
              </button>

              {/* Divider */}
              <div style={styles.divider}>
                <div style={styles.dividerLine}></div>
                <span style={styles.dividerText}>or continue with email</span>
                <div style={styles.dividerLine}></div>
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
                  {selectedPlan === 'free' ? 'Free account includes:' : `${selectedPlanData?.name || 'Selected'} plan includes:`}
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
