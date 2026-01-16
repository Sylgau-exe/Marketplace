'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { 
  LayoutDashboard, FolderKanban, FileUp, BarChart3, AlertTriangle, 
  Plus, X, Pencil, Trash2, Check, User, Calendar, ChevronLeft,
  Menu
} from 'lucide-react'

// ============ CONSTANTS ============
const CATEGORIES = ['Marketing', 'IT Infrastructure', 'HR', 'Product', 'Operations', 'Finance']
const STATUSES = ['Not Started', 'In Progress', 'Complete', 'On Hold', 'Canceled']
const STORAGE_KEY = 'pmo_hub_data'

// ============ SAMPLE DATA ============
const getSampleData = () => ({
  projects: [
    { id: 'SM-001', name: 'Website Redesign', category: 'Marketing', manager: 'Sarah Chen', sponsor: 'Michael Torres', targetStartDate: '2026-01-06', targetEndDate: '2026-03-15', status: 'In Progress', scheduleHealth: 'Green', approval: 'Approved' },
    { id: 'SM-002', name: 'ERP Migration', category: 'IT Infrastructure', manager: 'James Wilson', sponsor: 'Lisa Park', targetStartDate: '2025-11-01', targetEndDate: '2026-02-28', status: 'In Progress', scheduleHealth: 'Red', approval: 'Approved' },
    { id: 'SM-003', name: 'Employee Training Portal', category: 'HR', manager: 'Emily Davis', sponsor: 'Robert Kim', targetStartDate: '2026-02-01', targetEndDate: '2026-04-30', status: 'Not Started', scheduleHealth: 'Green', approval: 'Pending' },
    { id: 'SM-004', name: 'Mobile App Launch', category: 'Product', manager: 'Alex Martinez', sponsor: 'Jennifer Lee', targetStartDate: '2025-09-01', targetEndDate: '2025-12-31', status: 'Complete', scheduleHealth: 'Green', approval: 'Approved' },
    { id: 'SM-005', name: 'Data Analytics Platform', category: 'IT Infrastructure', manager: 'David Brown', sponsor: 'Amanda White', targetStartDate: '2026-01-15', targetEndDate: '2026-05-30', status: 'In Progress', scheduleHealth: 'Yellow', approval: 'Approved' }
  ],
  tasks: {
    'SM-001': [
      { id: 't1', name: 'Discovery & Research', status: 'Complete', assignee: 'Sarah Chen', startDate: '2026-01-06', endDate: '2026-01-17', percentComplete: 100, scheduleHealth: 'Green' },
      { id: 't2', name: 'Wireframe Design', status: 'Complete', assignee: 'Mark Johnson', startDate: '2026-01-20', endDate: '2026-01-31', percentComplete: 100, scheduleHealth: 'Green' },
      { id: 't3', name: 'Visual Design', status: 'In Progress', assignee: 'Lisa Wong', startDate: '2026-02-03', endDate: '2026-02-21', percentComplete: 60, scheduleHealth: 'Green' },
      { id: 't4', name: 'Development', status: 'Not Started', assignee: 'Dev Team', startDate: '2026-02-24', endDate: '2026-03-14', percentComplete: 0, scheduleHealth: 'Green' },
    ],
    'SM-002': [
      { id: 't1', name: 'Requirements Gathering', status: 'Complete', assignee: 'James Wilson', startDate: '2025-11-01', endDate: '2025-11-15', percentComplete: 100, scheduleHealth: 'Green' },
      { id: 't2', name: 'Vendor Selection', status: 'Complete', assignee: 'Lisa Park', startDate: '2025-11-18', endDate: '2025-12-06', percentComplete: 100, scheduleHealth: 'Green' },
      { id: 't3', name: 'System Configuration', status: 'In Progress', assignee: 'Tech Team', startDate: '2026-01-06', endDate: '2026-02-14', percentComplete: 45, scheduleHealth: 'Red' },
      { id: 't4', name: 'User Training', status: 'Not Started', assignee: 'HR Team', startDate: '2026-02-17', endDate: '2026-03-07', percentComplete: 0, scheduleHealth: 'Red' },
    ],
    'SM-005': [
      { id: 't1', name: 'Architecture Design', status: 'In Progress', assignee: 'David Brown', startDate: '2026-01-15', endDate: '2026-02-05', percentComplete: 75, scheduleHealth: 'Yellow' },
      { id: 't2', name: 'Data Pipeline Setup', status: 'Not Started', assignee: 'Analytics Team', startDate: '2026-02-06', endDate: '2026-03-14', percentComplete: 0, scheduleHealth: 'Yellow' },
    ]
  },
  nextId: 6
})

// ============ UTILITIES ============
const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

const getStatusColor = (status) => ({
  'Not Started': '#64748b',
  'In Progress': '#3b82f6',
  'Complete': '#10b981',
  'On Hold': '#f59e0b',
  'Canceled': '#ef4444'
}[status] || '#64748b')

const getHealthColor = (health) => ({
  Green: '#10b981',
  Yellow: '#f59e0b',
  Red: '#ef4444'
}[health] || '#64748b')

// ============ STYLES ============
const styles = {
  app: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f8fafc',
  },
  sidebar: {
    width: 260,
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    zIndex: 100,
    transition: 'transform 0.3s ease',
  },
  sidebarHidden: {
    transform: 'translateX(-100%)',
  },
  logo: {
    padding: 24,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: '1.5rem',
    fontWeight: 700,
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  logoIcon: {
    width: 40,
    height: 40,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
  },
  nav: {
    flex: 1,
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    border: 'none',
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.95rem',
    fontWeight: 500,
    borderRadius: 8,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'all 0.2s',
  },
  navItemActive: {
    background: 'rgba(99, 102, 241, 0.2)',
    color: 'white',
  },
  main: {
    flex: 1,
    marginLeft: 260,
    padding: 32,
    minHeight: '100vh',
    transition: 'margin-left 0.3s ease',
  },
  mainFull: {
    marginLeft: 0,
  },
  mobileMenuBtn: {
    display: 'none',
    position: 'fixed',
    top: 16,
    left: 16,
    zIndex: 101,
    width: 40,
    height: 40,
    borderRadius: 8,
    background: '#0f172a',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: '1.75rem',
    fontWeight: 700,
    marginBottom: 24,
    color: '#0f172a',
  },
  h2: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: 16,
    color: '#1e293b',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 20,
    marginBottom: 32,
  },
  statCard: {
    background: 'white',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  chartCard: {
    background: 'white',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 20px',
    border: 'none',
    borderRadius: 8,
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
  },
  btnSecondary: {
    background: 'white',
    color: '#475569',
    border: '1px solid #e2e8f0',
  },
  btnGhost: {
    background: 'transparent',
    color: '#64748b',
    padding: '8px 12px',
  },
  modal: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(15,23,42,0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 20,
  },
  modalContent: {
    background: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 560,
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    fontSize: '0.9rem',
    outline: 'none',
  },
  select: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    fontSize: '0.9rem',
    background: 'white',
    outline: 'none',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  th: {
    textAlign: 'left',
    padding: '14px 16px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#64748b',
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '0.9rem',
  },
}

// ============ COMPONENTS ============
const StatCard = ({ label, value, color = '#3b82f6', icon }) => (
  <div style={styles.statCard}>
    <div style={{ 
      width: 48, height: 48, borderRadius: 12, 
      background: `${color}15`, color, 
      display: 'flex', alignItems: 'center', justifyContent: 'center' 
    }}>
      {icon}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>{value}</span>
      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{label}</span>
    </div>
  </div>
)

const HealthBadge = ({ health }) => (
  <span style={{ 
    display: 'inline-flex', alignItems: 'center', gap: 6, 
    padding: '4px 10px', borderRadius: 20, 
    fontSize: '0.75rem', fontWeight: 600, 
    background: `${getHealthColor(health)}20`, 
    color: getHealthColor(health) 
  }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: getHealthColor(health) }}></span>
    {health}
  </span>
)

const StatusBadge = ({ status }) => (
  <span style={{ 
    display: 'inline-flex', padding: '4px 10px', borderRadius: 20, 
    fontSize: '0.75rem', fontWeight: 600, 
    background: `${getStatusColor(status)}15`, 
    color: getStatusColor(status) 
  }}>
    {status}
  </span>
)

// ============ INTAKE FORM ============
const IntakeForm = ({ onSubmit, onCancel, editProject }) => {
  const [form, setForm] = useState(editProject || {
    name: '', category: '', manager: '', sponsor: '',
    targetStartDate: '', targetEndDate: '',
    status: 'Not Started', scheduleHealth: 'Green', approval: 'Pending'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
          padding: '20px 24px', borderBottom: '1px solid #e2e8f0' 
        }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
            {editProject ? 'Edit Project' : 'New Project Intake'}
          </h2>
          <button onClick={onCancel} style={{ ...styles.btn, padding: 8, background: 'none' }}>
            <X size={20} color="#64748b" />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                Project Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Enter project name"
                style={styles.input}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                Category *
              </label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                required
                style={styles.select}
              >
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                Status
              </label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                style={styles.select}
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                Project Manager *
              </label>
              <input
                type="text"
                value={form.manager}
                onChange={e => setForm({ ...form, manager: e.target.value })}
                required
                placeholder="Manager name"
                style={styles.input}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                Project Sponsor
              </label>
              <input
                type="text"
                value={form.sponsor}
                onChange={e => setForm({ ...form, sponsor: e.target.value })}
                placeholder="Sponsor name"
                style={styles.input}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                Target Start Date *
              </label>
              <input
                type="date"
                value={form.targetStartDate}
                onChange={e => setForm({ ...form, targetStartDate: e.target.value })}
                required
                style={styles.input}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                Target End Date *
              </label>
              <input
                type="date"
                value={form.targetEndDate}
                onChange={e => setForm({ ...form, targetEndDate: e.target.value })}
                required
                style={styles.input}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                Schedule Health
              </label>
              <select
                value={form.scheduleHealth}
                onChange={e => setForm({ ...form, scheduleHealth: e.target.value })}
                style={styles.select}
              >
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Red">Red</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                Approval Status
              </label>
              <select
                value={form.approval}
                onChange={e => setForm({ ...form, approval: e.target.value })}
                style={styles.select}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
            <button type="button" onClick={onCancel} style={{ ...styles.btn, ...styles.btnSecondary }}>
              Cancel
            </button>
            <button type="submit" style={{ ...styles.btn, ...styles.btnPrimary }}>
              {editProject ? 'Update Project' : 'Submit Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ============ TASK FORM ============
const TaskForm = ({ onSubmit, onCancel, editTask }) => {
  const [form, setForm] = useState(() => {
    if (editTask) {
      return {
        id: editTask.id,
        name: editTask.name || '',
        status: editTask.status || 'Not Started',
        assignee: editTask.assignee || '',
        startDate: editTask.startDate || '',
        endDate: editTask.endDate || '',
        percentComplete: editTask.percentComplete || 0,
        scheduleHealth: editTask.scheduleHealth || 'Green'
      }
    }
    return {
      name: '', status: 'Not Started', assignee: '',
      startDate: '', endDate: '', percentComplete: 0
    }
  })

  return (
    <div style={styles.modal}>
      <div style={{ ...styles.modalContent, maxWidth: 480 }}>
        <div style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
          padding: '20px 24px', borderBottom: '1px solid #e2e8f0' 
        }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
            {editTask ? 'Edit Task' : 'Add Task'}
          </h2>
          <button onClick={onCancel} style={{ ...styles.btn, padding: 8, background: 'none' }}>
            <X size={20} color="#64748b" />
          </button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSubmit(form) }} style={{ padding: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                Task Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Enter task name"
                style={styles.input}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  style={styles.select}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                  Assignee
                </label>
                <input
                  type="text"
                  value={form.assignee}
                  onChange={e => setForm({ ...form, assignee: e.target.value })}
                  placeholder="Assignee name"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={e => setForm({ ...form, startDate: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                  End Date
                </label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={e => setForm({ ...form, endDate: e.target.value })}
                  style={styles.input}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
                Progress: {form.percentComplete}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={form.percentComplete}
                onChange={e => setForm({ ...form, percentComplete: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
            <button type="button" onClick={onCancel} style={{ ...styles.btn, ...styles.btnSecondary }}>
              Cancel
            </button>
            <button type="submit" style={{ ...styles.btn, ...styles.btnPrimary }}>
              {editTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ============ DASHBOARD VIEW ============
const DashboardView = ({ projects, tasks }) => {
  const metrics = useMemo(() => ({
    total: projects.length,
    active: projects.filter(p => p.status === 'In Progress').length,
    atRisk: projects.filter(p => p.scheduleHealth === 'Red' || p.scheduleHealth === 'Yellow').length,
    complete: projects.filter(p => p.status === 'Complete').length,
  }), [projects])

  const statusData = useMemo(() => [
    { name: 'Not Started', value: projects.filter(p => p.status === 'Not Started').length, color: '#64748b' },
    { name: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length, color: '#3b82f6' },
    { name: 'Complete', value: projects.filter(p => p.status === 'Complete').length, color: '#10b981' },
  ].filter(d => d.value > 0), [projects])

  const categoryData = useMemo(() => 
    CATEGORIES.map(cat => ({ 
      name: cat, 
      count: projects.filter(p => p.category === cat).length 
    })).filter(d => d.count > 0), 
  [projects])

  return (
    <div>
      <h1 style={styles.h1}>Portfolio Dashboard</h1>
      <div style={styles.statsGrid}>
        <StatCard label="Total Projects" value={metrics.total} color="#6366f1" icon={<FolderKanban size={24} />} />
        <StatCard label="Active" value={metrics.active} color="#3b82f6" icon={<LayoutDashboard size={24} />} />
        <StatCard label="At Risk" value={metrics.atRisk} color="#ef4444" icon={<AlertTriangle size={24} />} />
        <StatCard label="Completed" value={metrics.complete} color="#10b981" icon={<Check size={24} />} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20, marginBottom: 32 }}>
        <div style={styles.chartCard}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: '#334155' }}>Projects by Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({name, value}) => `${name}: ${value}`}>
                {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={styles.chartCard}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: '#334155' }}>Projects by Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} layout="vertical" margin={{ left: 80 }}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// ============ PROJECTS VIEW ============
const ProjectsView = ({ projects, tasks, onSelectProject, onCreateProject, onEditProject, onDeleteProject }) => {
  const [filter, setFilter] = useState({ status: '', category: '', search: '' })
  const [showIntake, setShowIntake] = useState(false)
  const [editProject, setEditProject] = useState(null)

  const filteredProjects = useMemo(() => projects.filter(p => {
    if (filter.status && p.status !== filter.status) return false
    if (filter.category && p.category !== filter.category) return false
    if (filter.search && !p.name.toLowerCase().includes(filter.search.toLowerCase())) return false
    return true
  }), [projects, filter])

  const handleSubmit = (form) => {
    if (editProject) {
      onEditProject({ ...editProject, ...form })
      setEditProject(null)
    } else {
      onCreateProject(form)
      setShowIntake(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <h1 style={{ ...styles.h1, margin: 0 }}>Projects</h1>
        <button onClick={() => setShowIntake(true)} style={{ ...styles.btn, ...styles.btnPrimary }}>
          <Plus size={18} /> New Project
        </button>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          type="search"
          placeholder="Search projects..."
          value={filter.search}
          onChange={e => setFilter({ ...filter, search: e.target.value })}
          style={{ ...styles.input, flex: 1, minWidth: 200, maxWidth: 300 }}
        />
        <select
          value={filter.status}
          onChange={e => setFilter({ ...filter, status: e.target.value })}
          style={{ ...styles.select, width: 'auto', minWidth: 150 }}
        >
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={filter.category}
          onChange={e => setFilter({ ...filter, category: e.target.value })}
          style={{ ...styles.select, width: 'auto', minWidth: 150 }}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {filteredProjects.map(project => {
          const projectTasks = tasks[project.id] || []
          const progress = projectTasks.length > 0 
            ? Math.round((projectTasks.filter(t => t.status === 'Complete').length / projectTasks.length) * 100) 
            : 0

          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              style={{
                background: 'white',
                borderRadius: 12,
                padding: 20,
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '1px solid transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#6366f1'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6366f1', background: '#eef2ff', padding: '4px 8px', borderRadius: 4 }}>
                  {project.id}
                </span>
                <HealthBadge health={project.scheduleHealth} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 4, color: '#334155' }}>{project.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 12 }}>{project.category}</p>
              <div style={{ display: 'flex', gap: 12, fontSize: '0.8rem', color: '#64748b', marginBottom: 16 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={14} /> {project.manager}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={14} /> {formatDate(project.targetEndDate)}</span>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
                  <div style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: 3, width: `${progress}%`, transition: 'width 0.3s' }}></div>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{progress}% complete</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <StatusBadge status={project.status} />
                <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => setEditProject(project)}
                    style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#94a3b8' }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#94a3b8' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {filteredProjects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: 12, border: '2px dashed #e2e8f0' }}>
          <FolderKanban size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
          <p style={{ color: '#64748b', marginBottom: 20 }}>No projects found</p>
          <button onClick={() => setShowIntake(true)} style={{ ...styles.btn, ...styles.btnPrimary }}>
            Create First Project
          </button>
        </div>
      )}
      {showIntake && <IntakeForm onSubmit={handleSubmit} onCancel={() => setShowIntake(false)} />}
      {editProject && <IntakeForm editProject={editProject} onSubmit={handleSubmit} onCancel={() => setEditProject(null)} />}
    </div>
  )
}

// ============ PROJECT DETAIL VIEW ============
const ProjectDetail = ({ project, tasks, onBack, onUpdateTasks }) => {
  const projectTasks = tasks[project.id] || []
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editTask, setEditTask] = useState(null)

  const handleAddTask = (form) => {
    const newTask = { 
      ...form, 
      id: `t${Date.now()}`, 
      scheduleHealth: 'Green',
      percentComplete: form.percentComplete || 0
    }
    onUpdateTasks({ ...tasks, [project.id]: [...projectTasks, newTask] })
    setShowTaskForm(false)
  }

  const handleEditTask = (form) => {
    if (!form.id) {
      console.error('Task form missing id')
      return
    }
    onUpdateTasks({
      ...tasks,
      [project.id]: projectTasks.map(t => t.id === form.id ? { ...t, ...form } : t)
    })
    setEditTask(null)
  }

  const handleDeleteTask = (taskId) => {
    if (confirm('Delete this task?')) {
      onUpdateTasks({
        ...tasks,
        [project.id]: projectTasks.filter(t => t.id !== taskId)
      })
    }
  }

  return (
    <div>
      <button onClick={onBack} style={{ ...styles.btn, ...styles.btnGhost, marginBottom: 16 }}>
        <ChevronLeft size={18} /> Back to Projects
      </button>
      <div style={{ marginBottom: 32 }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6366f1', background: '#eef2ff', padding: '4px 8px', borderRadius: 4, display: 'inline-block', marginBottom: 8 }}>
          {project.id}
        </span>
        <h1 style={{ ...styles.h1, marginBottom: 12 }}>{project.name}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <StatusBadge status={project.status} />
          <HealthBadge health={project.scheduleHealth} />
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: '#64748b' }}>
            <User size={16} /> {project.manager}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: '#64748b' }}>
            <Calendar size={16} /> {formatDate(project.targetStartDate)} → {formatDate(project.targetEndDate)}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ ...styles.h2, margin: 0 }}>Project Plan</h2>
        <button onClick={() => setShowTaskForm(true)} style={{ ...styles.btn, ...styles.btnPrimary }}>
          <Plus size={18} /> Add Task
        </button>
      </div>

      {projectTasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: 12, border: '2px dashed #e2e8f0' }}>
          <p style={{ color: '#64748b', marginBottom: 20 }}>No tasks yet. Add tasks to build your project plan.</p>
          <button onClick={() => setShowTaskForm(true)} style={{ ...styles.btn, ...styles.btnPrimary }}>
            <Plus size={18} /> Add First Task
          </button>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Task Name</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Assignee</th>
                <th style={styles.th}>End Date</th>
                <th style={styles.th}>Progress</th>
                <th style={styles.th}>Health</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectTasks.map((task, idx) => (
                <tr key={task.id}>
                  <td style={{ ...styles.td, color: '#94a3b8', fontSize: '0.8rem' }}>{idx + 1}</td>
                  <td style={{ ...styles.td, fontWeight: 500 }}>{task.name}</td>
                  <td style={styles.td}><StatusBadge status={task.status} /></td>
                  <td style={styles.td}>{task.assignee || '—'}</td>
                  <td style={styles.td}>{formatDate(task.endDate)}</td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 60, height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: getStatusColor(task.status), borderRadius: 3, width: `${task.percentComplete}%` }}></div>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{task.percentComplete}%</span>
                    </div>
                  </td>
                  <td style={styles.td}><HealthBadge health={task.scheduleHealth || 'Green'} /></td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        onClick={() => setEditTask(task)}
                        style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#94a3b8' }}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#94a3b8' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showTaskForm && <TaskForm onSubmit={handleAddTask} onCancel={() => setShowTaskForm(false)} />}
      {editTask && <TaskForm editTask={editTask} onSubmit={handleEditTask} onCancel={() => setEditTask(null)} />}
    </div>
  )
}

// ============ PORTFOLIO VIEW ============
const PortfolioView = ({ projects }) => {
  const metrics = useMemo(() => 
    CATEGORIES.map(cat => ({
      category: cat,
      total: projects.filter(p => p.category === cat).length,
      notStarted: projects.filter(p => p.category === cat && p.status === 'Not Started').length,
      inProgress: projects.filter(p => p.category === cat && p.status === 'In Progress').length,
      complete: projects.filter(p => p.category === cat && p.status === 'Complete').length,
      atRisk: projects.filter(p => p.category === cat && (p.scheduleHealth === 'Red' || p.scheduleHealth === 'Yellow')).length
    })).filter(c => c.total > 0),
  [projects])

  return (
    <div>
      <h1 style={styles.h1}>Portfolio Metrics</h1>
      <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <h3 style={{ marginBottom: 8, fontSize: '1rem', fontWeight: 600, color: '#334155' }}>Total Portfolio</h3>
        <div style={{ fontSize: '3rem', fontWeight: 700, color: '#6366f1', marginBottom: 12 }}>{projects.length}</div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: '#64748b' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span>
            {projects.filter(p => p.scheduleHealth === 'Green').length} On Track
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: '#64748b' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }}></span>
            {projects.filter(p => p.scheduleHealth === 'Yellow').length} At Risk
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: '#64748b' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}></span>
            {projects.filter(p => p.scheduleHealth === 'Red').length} Critical
          </span>
        </div>
      </div>
      <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflowX: 'auto' }}>
        <h2 style={{ ...styles.h2 }}>Projects by Category</h2>
        <table style={{ ...styles.table, boxShadow: 'none' }}>
          <thead>
            <tr>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Not Started</th>
              <th style={styles.th}>In Progress</th>
              <th style={styles.th}>Complete</th>
              <th style={styles.th}>At Risk</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(row => (
              <tr key={row.category}>
                <td style={{ ...styles.td, fontWeight: 600 }}>{row.category}</td>
                <td style={styles.td}>{row.total}</td>
                <td style={styles.td}>{row.notStarted}</td>
                <td style={styles.td}>{row.inProgress}</td>
                <td style={styles.td}>{row.complete}</td>
                <td style={{ ...styles.td, color: row.atRisk > 0 ? '#ef4444' : 'inherit', fontWeight: row.atRisk > 0 ? 600 : 400 }}>{row.atRisk}</td>
              </tr>
            ))}
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ ...styles.td, fontWeight: 700 }}>Total</td>
              <td style={{ ...styles.td, fontWeight: 700 }}>{projects.length}</td>
              <td style={{ ...styles.td, fontWeight: 700 }}>{projects.filter(p => p.status === 'Not Started').length}</td>
              <td style={{ ...styles.td, fontWeight: 700 }}>{projects.filter(p => p.status === 'In Progress').length}</td>
              <td style={{ ...styles.td, fontWeight: 700 }}>{projects.filter(p => p.status === 'Complete').length}</td>
              <td style={{ ...styles.td, fontWeight: 700 }}>{projects.filter(p => p.scheduleHealth !== 'Green').length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============ AT RISK VIEW ============
const AtRiskView = ({ projects, tasks, onSelectProject }) => {
  const atRiskProjects = projects
    .filter(p => p.scheduleHealth === 'Red' || p.scheduleHealth === 'Yellow')
    .sort((a, b) => (a.scheduleHealth === 'Red' ? -1 : 1))

  const overdueTasks = useMemo(() => {
    const all = []
    Object.entries(tasks).forEach(([projectId, pts]) => {
      const project = projects.find(p => p.id === projectId)
      pts.forEach(task => {
        if (new Date(task.endDate) < new Date() && task.status !== 'Complete') {
          all.push({ ...task, projectId, projectName: project?.name || 'Unknown' })
        }
      })
    })
    return all
  }, [tasks, projects])

  return (
    <div>
      <h1 style={styles.h1}>At Risk & Overdue</h1>

      <div style={{ marginBottom: 32 }}>
        <h2 style={{ ...styles.h2, display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertTriangle size={20} /> Projects At Risk ({atRiskProjects.length})
        </h2>
        {atRiskProjects.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 40, background: '#f0fdf4', borderRadius: 12, color: '#166534' }}>
            <Check size={32} />
            <p>All projects are on track!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {atRiskProjects.map(project => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                style={{
                  background: 'white',
                  borderRadius: 12,
                  padding: 20,
                  borderLeft: `4px solid ${getHealthColor(project.scheduleHealth)}`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <HealthBadge health={project.scheduleHealth} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6366f1' }}>{project.id}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8, color: '#334155' }}>{project.name}</h3>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{project.category} • {project.manager}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 style={styles.h2}>Overdue Tasks ({overdueTasks.length})</h2>
        {overdueTasks.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 40, background: '#f0fdf4', borderRadius: 12, color: '#166534' }}>
            <Check size={32} />
            <p>No overdue tasks!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Project</th>
                  <th style={styles.th}>Task</th>
                  <th style={styles.th}>Assignee</th>
                  <th style={styles.th}>Due Date</th>
                  <th style={styles.th}>Days Overdue</th>
                </tr>
              </thead>
              <tbody>
                {overdueTasks.map((task, i) => (
                  <tr key={`${task.projectId}-${task.id}-${i}`}>
                    <td style={styles.td}>{task.projectName}</td>
                    <td style={styles.td}>{task.name}</td>
                    <td style={styles.td}>{task.assignee || '—'}</td>
                    <td style={styles.td}>{formatDate(task.endDate)}</td>
                    <td style={{ ...styles.td, color: '#ef4444', fontWeight: 600 }}>
                      {Math.ceil((new Date() - new Date(task.endDate)) / (1000 * 60 * 60 * 24))} days
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ============ MAIN APP ============
export default function PMOApp() {
  const [data, setData] = useState(null)
  const [view, setView] = useState('dashboard')
  const [selectedProject, setSelectedProject] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setData(JSON.parse(saved))
      } catch {
        setData(getSampleData())
      }
    } else {
      setData(getSampleData())
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    if (data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }, [data])

  // Handle responsive
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setSidebarOpen(!mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p style={{ color: '#64748b' }}>Loading PMO Hub...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const { projects, tasks, nextId } = data

  const handleCreateProject = (form) => {
    const newProject = { ...form, id: `SM-${String(nextId).padStart(3, '0')}` }
    setData({
      ...data,
      projects: [...projects, newProject],
      tasks: { ...tasks, [newProject.id]: [] },
      nextId: nextId + 1
    })
  }

  const handleEditProject = (project) => {
    setData({
      ...data,
      projects: projects.map(p => p.id === project.id ? project : p)
    })
  }

  const handleDeleteProject = (id) => {
    if (confirm('Delete this project and all its tasks?')) {
      const newTasks = { ...tasks }
      delete newTasks[id]
      setData({
        ...data,
        projects: projects.filter(p => p.id !== id),
        tasks: newTasks
      })
    }
  }

  const handleUpdateTasks = (newTasks) => {
    setData({ ...data, tasks: newTasks })
  }

  const handleSelectProject = (project) => {
    setSelectedProject(project)
    setView('detail')
    if (isMobile) setSidebarOpen(false)
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={20} /> },
    { id: 'portfolio', label: 'Portfolio Metrics', icon: <BarChart3 size={20} /> },
    { id: 'atRisk', label: 'At Risk', icon: <AlertTriangle size={20} /> },
  ]

  const renderView = () => {
    if (view === 'detail' && selectedProject) {
      return (
        <ProjectDetail
          project={selectedProject}
          tasks={tasks}
          onBack={() => { setView('projects'); setSelectedProject(null) }}
          onUpdateTasks={handleUpdateTasks}
        />
      )
    }

    switch (view) {
      case 'dashboard':
        return <DashboardView projects={projects} tasks={tasks} />
      case 'projects':
        return (
          <ProjectsView
            projects={projects}
            tasks={tasks}
            onSelectProject={handleSelectProject}
            onCreateProject={handleCreateProject}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
          />
        )
      case 'portfolio':
        return <PortfolioView projects={projects} />
      case 'atRisk':
        return <AtRiskView projects={projects} tasks={tasks} onSelectProject={handleSelectProject} />
      default:
        return <DashboardView projects={projects} tasks={tasks} />
    }
  }

  return (
    <div style={styles.app}>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          ...styles.mobileMenuBtn,
          display: isMobile ? 'flex' : 'none',
        }}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside style={{
        ...styles.sidebar,
        ...(isMobile && !sidebarOpen ? styles.sidebarHidden : {}),
      }}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>◈</span>
          <span>PMO Hub</span>
        </div>
        <nav style={styles.nav}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id)
                setSelectedProject(null)
                if (isMobile) setSidebarOpen(false)
              }}
              style={{
                ...styles.navItem,
                ...(view === item.id || (view === 'detail' && item.id === 'projects') ? styles.navItemActive : {}),
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8 }}>
            <div style={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}>
              PM
            </div>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Project Manager</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{
        ...styles.main,
        ...(isMobile ? styles.mainFull : {}),
        paddingTop: isMobile ? 72 : 32,
      }}>
        {renderView()}
      </main>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99,
          }}
        />
      )}
    </div>
  )
}
