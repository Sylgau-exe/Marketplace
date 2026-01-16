'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tools } from '@/lib/tools-config'
import { 
  LayoutDashboard, ChevronDown, LogOut, Settings, User,
  Menu, X
} from 'lucide-react'
import { useState } from 'react'

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f8fafc',
  },
  sidebar: {
    width: 260,
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
    color: 'white',
    position: 'fixed',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    transition: 'transform 0.3s ease',
  },
  sidebarHidden: {
    transform: 'translateX(-100%)',
  },
  logo: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    textDecoration: 'none',
    color: 'white',
  },
  logoIcon: {
    width: 36,
    height: 36,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  },
  logoText: {
    fontSize: '1rem',
    fontWeight: 600,
  },
  nav: {
    flex: 1,
    padding: 16,
    overflowY: 'auto',
  },
  navSection: {
    marginBottom: 24,
  },
  navSectionTitle: {
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'rgba(255,255,255,0.4)',
    padding: '0 12px',
    marginBottom: 8,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 8,
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.2s',
    marginBottom: 4,
  },
  navItemActive: {
    background: 'rgba(99, 102, 241, 0.2)',
    color: 'white',
  },
  navItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  },
  navItemBadge: {
    marginLeft: 'auto',
    padding: '2px 8px',
    borderRadius: 50,
    fontSize: '0.65rem',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  userSection: {
    padding: 16,
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  userButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.05)',
    border: 'none',
    borderRadius: 8,
    color: 'white',
    cursor: 'pointer',
    textAlign: 'left',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '0.85rem',
  },
  userName: {
    flex: 1,
  },
  userNameText: {
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  userPlan: {
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.5)',
  },
  main: {
    flex: 1,
    marginLeft: 260,
    transition: 'margin-left 0.3s ease',
  },
  mainFull: {
    marginLeft: 0,
  },
  mobileHeader: {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    background: '#0f172a',
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
  },
  menuButton: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    borderRadius: 8,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
}

// Mock user - replace with actual auth
const currentUser = {
  name: 'Demo User',
  email: 'demo@example.com',
  plan: 'Professional',
  initials: 'DU',
}

export default function ToolsLayout({ children }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile on mount
  if (typeof window !== 'undefined') {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      if (mobile !== isMobile) {
        setIsMobile(mobile)
        setSidebarOpen(!mobile)
      }
    }
    if (!isMobile && window.innerWidth < 768) {
      checkMobile()
    }
  }

  const statusBadges = {
    'live': { bg: 'rgba(16, 185, 129, 0.2)', color: '#10b981' },
    'beta': { bg: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' },
    'coming-soon': { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' },
  }

  return (
    <div style={styles.layout}>
      {/* Mobile Header */}
      <div style={{ ...styles.mobileHeader, display: isMobile ? 'flex' : 'none' }}>
        <button style={styles.menuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link href="/" style={{ ...styles.logo, border: 'none', padding: 0 }}>
          <span style={styles.logoIcon}>⚡</span>
        </Link>
        <div style={{ width: 40 }} /> {/* Spacer */}
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside style={{
        ...styles.sidebar,
        ...(isMobile && !sidebarOpen ? styles.sidebarHidden : {}),
      }}>
        <Link href="/" style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          <span style={styles.logoText}>ProjectManagerTool</span>
        </Link>

        <nav style={styles.nav}>
          {/* Dashboard */}
          <div style={styles.navSection}>
            <Link 
              href="/dashboard" 
              style={{
                ...styles.navItem,
                ...(pathname === '/dashboard' ? styles.navItemActive : {}),
              }}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <div style={{ ...styles.navItemIcon, background: 'rgba(99, 102, 241, 0.2)' }}>
                <LayoutDashboard size={18} color="#818cf8" />
              </div>
              Dashboard
            </Link>
          </div>

          {/* Tools */}
          <div style={styles.navSection}>
            <div style={styles.navSectionTitle}>Tools</div>
            {tools.map(tool => {
              const isActive = pathname === tool.route
              const badge = statusBadges[tool.status]
              const isDisabled = tool.status === 'coming-soon'
              
              return (
                <Link
                  key={tool.id}
                  href={isDisabled ? '#' : tool.route}
                  style={{
                    ...styles.navItem,
                    ...(isActive ? styles.navItemActive : {}),
                    ...(isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
                  }}
                  onClick={(e) => {
                    if (isDisabled) e.preventDefault()
                    else if (isMobile) setSidebarOpen(false)
                  }}
                >
                  <div style={{ ...styles.navItemIcon, background: `${tool.color}20` }}>
                    {tool.icon}
                  </div>
                  {tool.name}
                  {tool.status !== 'live' && (
                    <span style={{
                      ...styles.navItemBadge,
                      background: badge.bg,
                      color: badge.color,
                    }}>
                      {tool.status === 'beta' ? 'Beta' : 'Soon'}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User Section */}
        <div style={styles.userSection}>
          <button style={styles.userButton}>
            <div style={styles.userAvatar}>{currentUser.initials}</div>
            <div style={styles.userName}>
              <div style={styles.userNameText}>{currentUser.name}</div>
              <div style={styles.userPlan}>{currentUser.plan} Plan</div>
            </div>
            <ChevronDown size={16} color="rgba(255,255,255,0.5)" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        ...styles.main,
        ...(isMobile ? styles.mainFull : {}),
        paddingTop: isMobile ? 60 : 0,
      }}>
        {children}
      </main>
    </div>
  )
}
