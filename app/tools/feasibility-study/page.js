'use client'

import { useEffect } from 'react'

export default function FeasibilityStudyRedirect() {
  useEffect(() => {
    window.location.href = '/feasibility-study/study.html'
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
        border: '3px solid #0891b2',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ color: '#64748b' }}>Loading Feasibility Study Builder...</p>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
