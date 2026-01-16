'use client'

import { useEffect } from 'react'

export default function RiskRegisterRedirect() {
  useEffect(() => {
    window.location.href = '/risk-register/register.html'
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '1rem'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '3px solid #ef4444',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ color: '#a0aec0' }}>Loading Risk Register...</p>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
