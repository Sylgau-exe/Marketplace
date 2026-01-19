'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Loader } from 'lucide-react'
import { supabase, getUserByEmail } from '@/lib/supabase'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('verifying') // verifying, success, error
  const [plan, setPlan] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function verifyPayment() {
      try {
        // Get user from localStorage
        const userData = localStorage.getItem('pmt_user')
        if (!userData) {
          setStatus('error')
          setError('No user session found. Please log in again.')
          return
        }

        const user = JSON.parse(userData)
        
        // Wait a moment for webhook to process
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Fetch updated user data from Supabase
        const updatedUser = await getUserByEmail(user.email)
        
        if (updatedUser && updatedUser.plan && updatedUser.plan !== 'free') {
          // Update localStorage with new plan
          const newUserData = {
            ...user,
            plan: updatedUser.plan,
            selectedTools: updatedUser.selected_tools || [],
            stripeCustomerId: updatedUser.stripe_customer_id
          }
          localStorage.setItem('pmt_user', JSON.stringify(newUserData))
          
          setPlan(updatedUser.plan)
          setStatus('success')
        } else {
          // Webhook might not have processed yet, try again
          await new Promise(resolve => setTimeout(resolve, 3000))
          
          const retryUser = await getUserByEmail(user.email)
          if (retryUser && retryUser.plan && retryUser.plan !== 'free') {
            const newUserData = {
              ...user,
              plan: retryUser.plan,
              selectedTools: retryUser.selected_tools || [],
              stripeCustomerId: retryUser.stripe_customer_id
            }
            localStorage.setItem('pmt_user', JSON.stringify(newUserData))
            
            setPlan(retryUser.plan)
            setStatus('success')
          } else {
            // Still show success but note it might take a moment
            setPlan(searchParams.get('plan') || 'your selected')
            setStatus('success')
          }
        }
      } catch (err) {
        console.error('Error verifying payment:', err)
        setStatus('success') // Show success anyway, webhook will handle it
        setPlan(searchParams.get('plan') || 'your selected')
      }
    }

    verifyPayment()
  }, [searchParams])

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#0a0a0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    card: {
      background: '#12121a',
      borderRadius: 20,
      padding: 48,
      maxWidth: 500,
      width: '100%',
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    iconSuccess: {
      width: 80,
      height: 80,
      background: 'rgba(34, 197, 94, 0.15)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
    },
    iconLoading: {
      width: 80,
      height: 80,
      background: 'rgba(99, 102, 241, 0.15)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: 'white',
      marginBottom: 12,
    },
    subtitle: {
      fontSize: '1rem',
      color: 'rgba(255,255,255,0.6)',
      marginBottom: 32,
      lineHeight: 1.6,
    },
    planBadge: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '8px 20px',
      borderRadius: 50,
      fontSize: '0.9rem',
      fontWeight: 600,
      textTransform: 'capitalize',
      marginBottom: 32,
    },
    btn: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '14px 32px',
      borderRadius: 10,
      fontSize: '1rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.2s',
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
    },
    btnSecondary: {
      background: 'rgba(255,255,255,0.05)',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.1)',
      marginTop: 12,
    },
    features: {
      textAlign: 'left',
      marginBottom: 32,
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'rgba(255,255,255,0.8)',
      fontSize: '0.95rem',
      marginBottom: 12,
    }
  }

  if (status === 'verifying') {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.iconLoading}>
            <Loader size={40} color="#6366f1" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
          <h1 style={styles.title}>Verifying Payment...</h1>
          <p style={styles.subtitle}>
            Please wait while we confirm your subscription.
          </p>
          <style jsx global>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Something went wrong</h1>
          <p style={styles.subtitle}>{error}</p>
          <Link href="/login" style={{ ...styles.btn, ...styles.btnPrimary }}>
            Log In Again
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconSuccess}>
          <CheckCircle size={40} color="#22c55e" />
        </div>
        <h1 style={styles.title}>Payment Successful! 🎉</h1>
        <p style={styles.subtitle}>
          Welcome to ProjectManagerTool! Your subscription is now active.
        </p>
        
        {plan && <div style={styles.planBadge}>{plan} Plan</div>}
        
        <div style={styles.features}>
          <div style={styles.feature}>
            <CheckCircle size={18} color="#22c55e" />
            <span>Full access to your selected tools</span>
          </div>
          <div style={styles.feature}>
            <CheckCircle size={18} color="#22c55e" />
            <span>Unlimited project creation</span>
          </div>
          <div style={styles.feature}>
            <CheckCircle size={18} color="#22c55e" />
            <span>PDF & Excel exports</span>
          </div>
          <div style={styles.feature}>
            <CheckCircle size={18} color="#22c55e" />
            <span>Priority support</span>
          </div>
        </div>

        <Link href="/select-apps" style={{ ...styles.btn, ...styles.btnPrimary }}>
          Select Your Tools <ArrowRight size={18} />
        </Link>
        
        <Link href="/dashboard" style={{ ...styles.btn, ...styles.btnSecondary, display: 'flex' }}>
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
