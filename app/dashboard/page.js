'use client'

import { useEffect, useState } from 'react'

export default function DashboardRedirect() {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('pmt_user')
    
    if (!userData) {
      // Not logged in - redirect to login
      setStatus('redirecting')
      window.location.href = '/login'
      return
    }

    try {
      const user = JSON.parse(userData)
      if (!user.email) {
        setStatus('redirecting')
        window.location.href = '/login'
        return
      }
      
      // User is logged in - redirect to static dashboard
      setStatus('loading')
      window.location.replace('/dashboard/index.html')
    } catch (e) {
      setStatus('redirecting')
      window.location.href = '/login'
    }
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#0a0a0f',
      gap: '1rem'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '3px solid #6366f1',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ color: '#94a3b8' }}>
        {status === 'checking' && 'Checking authentication...'}
        {status === 'redirecting' && 'Redirecting to login...'}
        {status === 'loading' && 'Loading Dashboard...'}
      </p>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
