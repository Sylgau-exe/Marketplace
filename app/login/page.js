'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, LogIn, Loader2 } from 'lucide-react'
import { getUserByEmail } from '@/lib/supabase'

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
    maxWidth: 440,
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
  },
  forgotLink: {
    fontSize: '0.85rem',
    color: '#a5b4fc',
    textDecoration: 'none',
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
    marginTop: 8,
  },
  btnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Check if user exists in Supabase
      const user = await getUserByEmail(formData.email)
      
      if (!user) {
        setError('No account found with this email. Please sign up first.')
        setLoading(false)
        return
      }

      // In production, you'd verify password here
      // For now, we just check if user exists

      // Save to localStorage for client-side access control
      localStorage.setItem('pmt_user', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        selectedTools: user.selected_tools || [],
        createdAt: user.created_at
      }))

      // Redirect to dashboard
      window.location.href = '/dashboard/'
    } catch (err) {
      console.error('Login error:', err)
      setError('Failed to sign in. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link href="/" style={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.icon}>
              <LogIn size={32} color="white" />
            </div>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>Sign in to your account</p>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
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
              <label style={styles.label}>Password</label>
              <input 
                type="password" 
                style={styles.input}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                disabled={loading}
              />
              <Link href="#" style={styles.forgotLink}>Forgot password?</Link>
            </div>

            <button 
              type="submit" 
              style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}
              disabled={loading}
            >
              {loading ? (
                <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Signing In...</>
              ) : (
                'Sign In →'
              )}
            </button>
          </form>

          <div style={styles.footer}>
            Don't have an account? <Link href="/signup" style={styles.link}>Create free account</Link>
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
