'use client'

import { useEffect } from 'react'

export default function TCORedirect() {
  useEffect(() => {
    window.location.href = '/tco/calculator.html'
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
        border: '3px solid #8b5cf6',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ color: '#a0aec0' }}>Loading TCO Calculator...</p>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
