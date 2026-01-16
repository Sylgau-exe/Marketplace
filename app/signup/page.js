'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Check, Sparkles } from 'lucide-react'

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
    maxWidth: 480,
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
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    margin: '24px 0',
    color: 'rgba(255,255,255,0.3)',
    fontSize: '0.85rem',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: 'rgba(255,255,255,0.1)',
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
}

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send to your backend
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.success}>
              <div style={styles.successIcon}>
                <Check size={40} color="white" />
              </div>
              <h1 style={styles.successTitle}>You're on the list!</h1>
              <p style={styles.successText}>
                Thanks for signing up for early access. We'll send you an email 
                when your account is ready. In the meantime, you can explore 
                our tools in demo mode.
              </p>
              <Link href="/" style={styles.btn}>
                Explore Tools →
              </Link>
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
          <div style={styles.header}>
            <div style={styles.icon}>
              <Sparkles size={32} color="white" />
            </div>
            <h1 style={styles.title}>Start Your Free Trial</h1>
            <p style={styles.subtitle}>14 days free. No credit card required.</p>
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
              />
            </div>

            <button type="submit" style={styles.btn}>
              Start Free Trial →
            </button>
          </form>

          <div style={styles.benefits}>
            <div style={styles.benefitsTitle}>Your trial includes:</div>
            <div style={styles.benefit}>
              <Check size={16} color="#10b981" /> Access to all 6 PM tools
            </div>
            <div style={styles.benefit}>
              <Check size={16} color="#10b981" /> Unlimited exports
            </div>
            <div style={styles.benefit}>
              <Check size={16} color="#10b981" /> PDF & Excel downloads
            </div>
            <div style={styles.benefit}>
              <Check size={16} color="#10b981" /> No credit card needed
            </div>
          </div>

          <div style={styles.footer}>
            Already have an account? <Link href="/login" style={styles.link}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
