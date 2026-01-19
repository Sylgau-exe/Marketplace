'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, Lock, Sparkles } from 'lucide-react'

const SUPABASE_URL = 'https://wfoyzgnowlpgpexygajs.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmb3l6Z25vd2xwZ3BleHlnYWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2Nzg5MTMsImV4cCI6MjA4NDI1NDkxM30.O0sy54yuacL_fEKPs1FjtyUjNJq-9XfaizpJxftDRyk'

const availableApps = [
  { id: 'charterpro', name: 'CharterPro', icon: '📋', description: 'Create professional project charters', color: '#6366f1' },
  { id: 'dmaic', name: 'DMAIC Generator', icon: '🔄', description: 'Six Sigma process improvement', color: '#10b981' },
  { id: 'roi', name: 'ROI Calculator', icon: '💰', description: 'Calculate return on investment', color: '#f59e0b' },
  { id: 'tco', name: 'TCO Calculator', icon: '🧮', description: 'Total cost of ownership analysis', color: '#8b5cf6' },
  { id: 'risk-register', name: 'Risk Register', icon: '⚠️', description: 'Track and manage project risks', color: '#ef4444' },
  { id: 'feasibility', name: 'Feasibility Study', icon: '📊', description: 'Evaluate project viability', color: '#06b6d4' },
]

const planLimits = {
  starter: { max: 1, name: 'Starter' },
  professional: { max: 3, name: 'Professional' },
  unlimited: { max: 999, name: 'Unlimited' },
}

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
    maxWidth: 700,
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
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    borderRadius: '50%',
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
  planBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    background: 'rgba(99, 102, 241, 0.15)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: 20,
    color: '#a5b4fc',
    fontSize: '0.85rem',
    fontWeight: 500,
    marginTop: 16,
  },
  counter: {
    textAlign: 'center',
    padding: '16px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    marginBottom: 24,
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.7)',
  },
  appsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 16,
    marginBottom: 32,
  },
  appCard: {
    padding: 20,
    background: 'rgba(255,255,255,0.03)',
    border: '2px solid rgba(255,255,255,0.1)',
    borderRadius: 16,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  appCardSelected: {
    borderColor: '#6366f1',
    background: 'rgba(99, 102, 241, 0.1)',
  },
  appCardDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  appHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  appIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  appName: {
    fontWeight: 600,
    color: 'white',
    fontSize: '1rem',
  },
  appDesc: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
    marginLeft: 56,
  },
  checkbox: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 6,
    border: '2px solid rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
  },
  checkboxSelected: {
    background: '#6366f1',
    borderColor: '#6366f1',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: 10,
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#fca5a5',
    padding: '12px 16px',
    borderRadius: 8,
    fontSize: '0.9rem',
    marginBottom: 20,
    textAlign: 'center',
  },
  success: {
    background: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    color: '#86efac',
    padding: '12px 16px',
    borderRadius: 8,
    fontSize: '0.9rem',
    marginBottom: 20,
    textAlign: 'center',
  },
}

export default function SelectAppsPage() {
  const searchParams = useSearchParams()
  const [selectedApps, setSelectedApps] = useState([])
  const [plan, setPlan] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('pmt_user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      
      // Get plan from URL or user data
      const urlPlan = searchParams.get('plan')
      const userPlan = urlPlan || userData.plan || 'starter'
      setPlan(userPlan)
      
      // Pre-select any already selected apps
      if (userData.selectedTools && userData.selectedTools.length > 0) {
        setSelectedApps(userData.selectedTools)
      }
    }
    setLoading(false)
  }, [searchParams])

  const maxApps = plan ? (planLimits[plan]?.max || 1) : 1
  const planName = plan ? (planLimits[plan]?.name || 'Starter') : 'Starter'
  const isUnlimited = plan === 'unlimited'

  const toggleApp = (appId) => {
    if (isUnlimited) {
      // Unlimited plan - auto-select all
      return
    }

    setSelectedApps(prev => {
      if (prev.includes(appId)) {
        return prev.filter(id => id !== appId)
      } else if (prev.length < maxApps) {
        return [...prev, appId]
      }
      return prev
    })
  }

  const handleSubmit = async () => {
    if (!user) {
      setError('Please log in first')
      return
    }

    const appsToSave = isUnlimited ? availableApps.map(a => a.id) : selectedApps

    if (!isUnlimited && appsToSave.length === 0) {
      setError(`Please select at least 1 app`)
      return
    }

    setSaving(true)
    setError('')

    try {
      // Update user in Supabase
      const res = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(user.email)}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ 
          selected_tools: appsToSave,
          plan: plan,
          updated_at: new Date().toISOString()
        })
      })

      if (!res.ok) throw new Error('Failed to save')

      // Update localStorage
      const updatedUser = { ...user, plan: plan, selectedTools: appsToSave }
      localStorage.setItem('pmt_user', JSON.stringify(updatedUser))

      setSuccess(true)
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        window.location.href = '/dashboard/'
      }, 1500)

    } catch (err) {
      console.error('Error saving:', err)
      setError('Failed to save your selection. Please try again.')
    }

    setSaving(false)
  }

  // Auto-select all for unlimited
  useEffect(() => {
    if (isUnlimited) {
      setSelectedApps(availableApps.map(a => a.id))
    }
  }, [isUnlimited])

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={{ color: 'white' }}>Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.header}>
              <h1 style={styles.title}>Please Log In</h1>
              <p style={styles.subtitle}>You need to be logged in to select your apps.</p>
            </div>
            <Link href="/login" style={styles.btn}>
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.header}>
              <div style={styles.icon}>
                <Check size={32} color="white" />
              </div>
              <h1 style={styles.title}>You're All Set!</h1>
              <p style={styles.subtitle}>Your apps have been activated. Redirecting to dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={{ ...styles.icon, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
              <Sparkles size={32} color="white" />
            </div>
            <h1 style={styles.title}>
              {isUnlimited ? 'All Apps Unlocked!' : 'Select Your Apps'}
            </h1>
            <p style={styles.subtitle}>
              {isUnlimited 
                ? 'Your Unlimited plan includes access to all tools'
                : `Choose ${maxApps === 1 ? 'the app' : `up to ${maxApps} apps`} you want to use`
              }
            </p>
            <div style={styles.planBadge}>
              {planName} Plan
            </div>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          {!isUnlimited && (
            <div style={styles.counter}>
              Selected: <strong>{selectedApps.length}</strong> / {maxApps} apps
            </div>
          )}

          <div style={styles.appsGrid}>
            {availableApps.map(app => {
              const isSelected = selectedApps.includes(app.id)
              const isDisabled = !isUnlimited && !isSelected && selectedApps.length >= maxApps

              return (
                <div
                  key={app.id}
                  style={{
                    ...styles.appCard,
                    ...(isSelected ? styles.appCardSelected : {}),
                    ...(isDisabled ? styles.appCardDisabled : {}),
                    position: 'relative',
                  }}
                  onClick={() => !isDisabled && !isUnlimited && toggleApp(app.id)}
                >
                  <div style={{
                    ...styles.checkbox,
                    ...(isSelected ? styles.checkboxSelected : {}),
                  }}>
                    {isSelected && <Check size={14} color="white" />}
                  </div>
                  <div style={styles.appHeader}>
                    <div style={{ ...styles.appIcon, background: `${app.color}20` }}>
                      {app.icon}
                    </div>
                    <div style={styles.appName}>{app.name}</div>
                  </div>
                  <div style={styles.appDesc}>{app.description}</div>
                </div>
              )
            })}
          </div>

          <button
            style={{
              ...styles.btn,
              ...(saving || (!isUnlimited && selectedApps.length === 0) ? styles.btnDisabled : {})
            }}
            onClick={handleSubmit}
            disabled={saving || (!isUnlimited && selectedApps.length === 0)}
          >
            {saving ? 'Saving...' : 'Confirm Selection & Go to Dashboard'}
          </button>

          {!isUnlimited && (
            <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
              You can change your selection later by contacting support or upgrading your plan.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
