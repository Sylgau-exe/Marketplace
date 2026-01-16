'use client'

import Link from 'next/link'
import { tools } from '@/lib/tools-config'
import { ArrowRight, Star, Clock, TrendingUp } from 'lucide-react'

const styles = {
  page: {
    padding: 32,
    minHeight: '100vh',
    background: '#f8fafc',
  },
  header: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: '0.9rem',
    color: '#64748b',
    marginBottom: 4,
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#0f172a',
    margin: 0,
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 20,
    marginBottom: 40,
  },
  statCard: {
    background: 'white',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#0f172a',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#0f172a',
    marginBottom: 20,
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20,
  },
  toolCard: {
    background: 'white',
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid transparent',
    transition: 'all 0.2s',
    textDecoration: 'none',
    display: 'block',
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    marginBottom: 16,
  },
  toolName: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#0f172a',
    marginBottom: 4,
  },
  toolTagline: {
    fontSize: '0.85rem',
    color: '#64748b',
    marginBottom: 16,
  },
  toolStatus: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    borderRadius: 50,
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  launchBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  recentSection: {
    background: 'white',
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  recentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '16px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    fontSize: '0.95rem',
    fontWeight: 500,
    color: '#0f172a',
    marginBottom: 2,
  },
  recentMeta: {
    fontSize: '0.8rem',
    color: '#64748b',
  },
}

const statusStyles = {
  'live': { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', text: 'Live' },
  'beta': { bg: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', text: 'Beta' },
  'coming-soon': { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', text: 'Coming Soon' },
}

// Mock data - replace with real data
const recentItems = [
  { id: 1, title: 'Website Redesign Charter', tool: 'charterpro', toolName: 'CharterPro', time: '2 hours ago', icon: '📋' },
  { id: 2, title: 'Q1 Marketing Plan', tool: 'pmo-hub', toolName: 'PMO Hub', time: '5 hours ago', icon: '📊' },
  { id: 3, title: 'Product Launch Charter', tool: 'charterpro', toolName: 'CharterPro', time: '1 day ago', icon: '📋' },
]

export default function DashboardPage() {
  const availableTools = tools.filter(t => t.status !== 'coming-soon')
  
  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <p style={styles.greeting}>Good morning 👋</p>
        <h1 style={styles.title}>Welcome back, Demo User</h1>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(99, 102, 241, 0.1)' }}>
            <Star size={20} color="#6366f1" />
          </div>
          <div style={styles.statValue}>12</div>
          <div style={styles.statLabel}>Total Charters</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(16, 185, 129, 0.1)' }}>
            <TrendingUp size={20} color="#10b981" />
          </div>
          <div style={styles.statValue}>5</div>
          <div style={styles.statLabel}>Active Projects</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(245, 158, 11, 0.1)' }}>
            <Clock size={20} color="#f59e0b" />
          </div>
          <div style={styles.statValue}>3</div>
          <div style={styles.statLabel}>Tasks Due This Week</div>
        </div>
      </div>

      {/* Your Tools */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Your Tools</h2>
        <div style={styles.toolsGrid}>
          {availableTools.map(tool => {
            const status = statusStyles[tool.status]
            return (
              <Link 
                key={tool.id} 
                href={tool.route}
                style={styles.toolCard}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = tool.color
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ ...styles.toolIcon, background: `${tool.color}15` }}>
                  {tool.icon}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <h3 style={styles.toolName}>{tool.name}</h3>
                  <span style={{ ...styles.toolStatus, background: status.bg, color: status.color }}>
                    {status.text}
                  </span>
                </div>
                <p style={styles.toolTagline}>{tool.tagline}</p>
                <div style={{ ...styles.launchBtn, color: tool.color }}>
                  Launch <ArrowRight size={16} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Recent Activity</h2>
        <div style={styles.recentSection}>
          {recentItems.map((item, i) => (
            <div key={item.id} style={{ ...styles.recentItem, borderBottom: i === recentItems.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
              <div style={{ ...styles.recentIcon, background: 'rgba(99, 102, 241, 0.1)' }}>
                {item.icon}
              </div>
              <div style={styles.recentInfo}>
                <div style={styles.recentTitle}>{item.title}</div>
                <div style={styles.recentMeta}>{item.toolName} • {item.time}</div>
              </div>
              <Link href={`/tools/${item.tool}`} style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
                Open →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
