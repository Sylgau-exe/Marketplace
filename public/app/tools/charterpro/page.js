'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CharterProPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the CharterPro HTML app
    window.location.href = '/charterpro/dashboard.html'
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#f8fafc',
      padding: 32
    }}>
      <div style={{
        width: 48,
        height: 48,
        border: '3px solid #e2e8f0',
        borderTopColor: '#6366f1',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: 16
      }} />
      <p style={{ color: '#64748b' }}>Loading CharterPro...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
