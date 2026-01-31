import React, { useState, useEffect, useRef } from 'react';

// ============================================
// CSS ANIMATION COMPONENTS (No external dependencies)
// ============================================

// Confetti animation component
const Confetti = () => {
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  return (
    <div className="confetti-container">
      {[...Array(50)].map((_, i) => (
        <div 
          key={i} 
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)]
          }}
        />
      ))}
    </div>
  );
};

// Success checkmark animation
const SuccessAnimation = () => (
  <div className="success-animation">
    <div className="success-circle">
      <svg className="checkmark" viewBox="0 0 50 50">
        <path d="M14 27 L22 35 L38 16" />
      </svg>
    </div>
  </div>
);

// Sad face animation
const SadAnimation = () => (
  <div className="sad-animation">
    <div className="sad-face">
      <div className="sad-eyes">
        <div className="sad-eye"></div>
        <div className="sad-eye"></div>
      </div>
      <div className="sad-mouth"></div>
    </div>
  </div>
);

// Gantt Chart Mascot - reacts to project health
const GanttMascot = ({ mood = 'normal' }) => (
  <div className={`gantt-mascot ${mood}`}>
    <svg viewBox="0 0 120 100" className="gantt-svg">
      {/* Chart background */}
      <rect x="10" y="10" width="100" height="80" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
      
      {/* Grid lines */}
      <g stroke="#e2e8f0" strokeWidth="1">
        <line x1="35" y1="10" x2="35" y2="90"/>
        <line x1="60" y1="10" x2="60" y2="90"/>
        <line x1="85" y1="10" x2="85" y2="90"/>
        <line x1="10" y1="30" x2="110" y2="30"/>
        <line x1="10" y1="50" x2="110" y2="50"/>
        <line x1="10" y1="70" x2="110" y2="70"/>
      </g>
      
      {/* Gantt bars */}
      <g className="gantt-bars">
        <rect x="20" y="18" width="45" height="8" rx="2" fill="#3b82f6" className="bar b1"/>
        <rect x="40" y="38" width="50" height="8" rx="2" fill="#8b5cf6" className="bar b2"/>
        <rect x="55" y="58" width="40" height="8" rx="2" fill="#10b981" className="bar b3"/>
        <rect x="70" y="78" width="30" height="8" rx="2" fill="#f59e0b" className="bar b4"/>
      </g>
      
      {/* Deadline line */}
      <line x1="90" y1="10" x2="90" y2="90" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" className="deadline"/>
      <text x="92" y="18" fontSize="6" fill="#ef4444" fontWeight="bold" className="deadline-text">DUE</text>
      
      {/* Face */}
      <g className="gantt-face">
        <g className="gantt-eyes">
          <circle cx="45" cy="50" r="4" fill="#1e293b"/>
          <circle cx="65" cy="50" r="4" fill="#1e293b"/>
          <circle cx="46" cy="49" r="1.5" fill="white"/>
          <circle cx="66" cy="49" r="1.5" fill="white"/>
        </g>
        <path className="gantt-mouth" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </g>
      
      {/* Explosion marks for stressed */}
      <g className="explosion">
        <text x="100" y="25" fontSize="12">💥</text>
        <text x="5" y="80" fontSize="10">⚡</text>
      </g>
    </svg>
    <div className="mascot-tooltip">
      {mood === 'normal' && "Looking good!"}
      {mood === 'concerned' && "Hmm, keep an eye on this..."}
      {mood === 'stressed' && "We might need to talk..."}
      {mood === 'success' && "Nailed it! 🎯"}
    </div>
  </div>
);

// ============================================
// API CLIENT
// ============================================

const API_BASE = '/api';
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

const api = {
  token: null,
  
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('bsim_token', token);
    } else {
      localStorage.removeItem('bsim_token');
    }
  },
  
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('bsim_token');
    }
    return this.token;
  },
  
  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    };
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  },
  
  // Auth
  register: (name, email, password) => 
    api.request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  login: (email, password) => 
    api.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getMe: () => 
    api.request('/auth/me'),
  updateProfile: (data) => 
    api.request('/auth/profile', { method: 'PATCH', body: JSON.stringify(data) }),
  
  // Stripe
  createCheckoutSession: (planId, billingCycle) => 
    api.request('/stripe/create-checkout-session', { method: 'POST', body: JSON.stringify({ planId, billingCycle }) }),
  createPortalSession: () => 
    api.request('/stripe/create-portal-session', { method: 'POST' }),
  getSubscription: () => 
    api.request('/stripe/subscription'),
  
  // Simulations
  recordScore: (simId, scoreData) => 
    api.request('/simulations/scores', { method: 'POST', body: JSON.stringify({ simulationId: simId, ...scoreData }) }),
  getScores: () => 
    api.request('/simulations/scores'),
  getLeaderboard: (simId) => 
    api.request(`/simulations/leaderboard?simulationId=${simId}`),
  getStats: () => 
    Promise.resolve({ stats: { total_plays: 0, unique_players: 0, average_score: 0 } }),
  
  // Admin APIs
  getAdminOverview: () => 
    api.request('/admin/overview'),
  getAdminUsers: (params = {}) => 
    api.request(`/admin/users?${new URLSearchParams(params).toString()}`),
  getAdminAnalytics: () => 
    api.request('/admin/analytics'),
  getAdminRevenue: () => 
    api.request('/admin/revenue'),
  toggleAdmin: (userId, isAdmin) => 
    api.request('/admin/toggle-admin', { method: 'POST', body: JSON.stringify({ userId, isAdmin }) }),
  toggleTester: (userId, isTester) => 
    api.request('/admin/toggle-tester', { method: 'POST', body: JSON.stringify({ userId, isTester }) })
};

// ============================================
// SIMULATIONS CATALOG
// ============================================

const SIMULATIONS = [
  {
    id: 'project-apex',
    title: 'Project Apex',
    subtitle: 'Project Management Simulation',
    description: 'Master the art of project management by navigating real-world challenges. Balance scope, schedule, budget, and team dynamics across multiple industry scenarios.',
    icon: '🎯',
    category: 'Project Management',
    difficulty: 'Intermediate',
    duration: '45-60 min',
    scenarios: 5,
    skills: ['Resource Allocation', 'Risk Management', 'Team Leadership', 'Decision Making'],
    featured: true,
    available: true,
    tier: 'free',
    freePreview: true,
    previewWeeks: 3
  },
  {
    id: 'market-dynamics',
    title: 'Market Dynamics',
    subtitle: 'Strategic Marketing Simulation',
    description: 'Lead a marketing team through product launches, competitive battles, and market shifts.',
    icon: '📈',
    category: 'Marketing',
    difficulty: 'Intermediate',
    duration: '30-45 min',
    scenarios: 4,
    skills: ['Market Analysis', 'Brand Strategy', 'Budget Management'],
    available: false,
    tier: 'pro',
    comingSoon: true
  },
  {
    id: 'supply-chain-crisis',
    title: 'Supply Chain Crisis',
    subtitle: 'Operations Management Simulation',
    description: 'Navigate global supply chain disruptions, manage inventory levels, and optimize logistics.',
    icon: '🚚',
    category: 'Operations',
    difficulty: 'Advanced',
    duration: '60-90 min',
    scenarios: 6,
    skills: ['Logistics Planning', 'Vendor Management', 'Crisis Response'],
    available: false,
    tier: 'pro',
    comingSoon: true
  },
  {
    id: 'startup-journey',
    title: 'Startup Journey',
    subtitle: 'Entrepreneurship Simulation',
    description: 'Build a startup from idea to scale-up. Make critical decisions on funding, hiring, and market entry.',
    icon: '🚀',
    category: 'Entrepreneurship',
    difficulty: 'Advanced',
    duration: '60-90 min',
    scenarios: 5,
    skills: ['Fundraising', 'Team Building', 'Product Strategy'],
    available: false,
    tier: 'pro',
    comingSoon: true
  }
];

const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceAnnual: 0,
    period: 'forever',
    description: 'Perfect for trying out',
    features: ['1 simulation (Project Apex)', 'Basic scenarios', 'Score tracking', 'Community support'],
    cta: 'Current Plan',
    popular: false
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 19,
    priceAnnual: 190,
    period: 'month',
    description: 'For serious learners',
    features: ['All simulations', 'All scenarios', 'Detailed analytics', 'Certificates', 'Priority support'],
    cta: 'Upgrade Now',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    priceAnnual: 1990,
    period: 'month',
    description: 'For teams and institutions',
    features: ['Everything in Professional', 'Unlimited team members', 'Admin dashboard', 'Custom branding', 'LMS integration', 'Dedicated account manager', 'Custom simulation development'],
    cta: 'Contact Sales',
    popular: false,
    hidden: true
  }
];

// ============================================
// PROJECT APEX SCENARIOS - ENHANCED WITH HBP MECHANICS
// ============================================

/*
 * HBP-INSPIRED CAUSAL MODEL
 * =========================
 * 
 * Key Relationships (from Harvard Business Publishing simulation):
 * 
 * 1. STRESS DRIVERS:
 *    - Unrealistic schedule (deadline - week remaining < 0) → +stress
 *    - Team changes (hiring/firing) → +stress (transition costs)
 *    - Overtime/crunch mode → +stress
 *    - Low knowledge (early project) → +stress
 * 
 * 2. STRESS → MORALE:
 *    - High stress (>60) → morale decreases
 *    - Morale affects hours worked and engagement
 * 
 * 3. MORALE → PRODUCTIVITY:
 *    - Low morale → fewer productive hours
 *    - Morale < 40 → significant productivity penalty
 * 
 * 4. KNOWLEDGE ACCUMULATION:
 *    - Coaching meetings build knowledge over time
 *    - Knowledge reduces mistake rate
 *    - Team changes cause knowledge loss
 * 
 * 5. COORDINATION NEEDS:
 *    - Larger teams need more coordination (standups)
 *    - Without coordination → higher mistake rate → rework
 * 
 * 6. SCHEDULE CONSISTENCY:
 *    - Changing deadline frequently → morale penalty
 *    - Each change after week 2 → -5 morale, +10 stress
 */

const APEX_SCENARIOS = {
  tech_startup: {
    id: 'tech_startup',
    title: 'Tech Startup',
    subtitle: 'Software Product Launch',
    icon: '💻',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'You are the Project Manager at Nexus Technologies. Deliver a new SaaS platform while managing team dynamics and technical challenges.',
    company: 'Nexus Technologies',
    projectName: 'SaaS Platform',
    deliverable: 'features',
    // Pedagogical focus: Learn basic mechanics, achievable targets
    pedagogicalFocus: 'mechanics',
    hasPrototyping: false,
    hasUncertainty: false,
    initial: { 
      budget: 500000, 
      weeks: 10, 
      scope: 12, 
      teamSize: 5, 
      quality: 85, 
      morale: 75,
      stress: 20,      // NEW: Starting stress level
      knowledge: 30,   // NEW: Starting knowledge (team familiarity)
    },
    weeklyCostPerPerson: 8000,
    // CAUSAL EVENTS: Triggered by conditions, not random
    causalEvents: [
      { 
        id: 'scope_creep', 
        title: 'Scope Creep Alert', 
        description: 'The product owner wants to add 2 new features. Your response affects both scope and team stress.',
        icon: '📈',
        // Trigger condition: After week 3, if quality > 80
        triggerCondition: (state) => state.week >= 3 && state.scope.quality > 80,
        options: [
          { id: 'accept', label: 'Accept all changes (+2 scope, +stress)', effects: { scope: 2, budget: -30000, stress: 15, morale: -5 } },
          { id: 'negotiate', label: 'Negotiate to add 1 feature', effects: { scope: 1, budget: -15000, stress: 5 } },
          { id: 'decline', label: 'Decline and stay focused (+morale)', effects: { morale: 8, quality: 2, stress: -5 } }
        ]
      },
      { 
        id: 'tech_debt', 
        title: 'Technical Debt Crisis', 
        description: 'QA discovered critical technical debt. Addressing it now prevents larger problems later.',
        icon: '🔧',
        // Trigger: Mid-project if quality dropped below 75
        triggerCondition: (state) => state.week >= 4 && state.scope.quality < 75,
        options: [
          { id: 'fix_now', label: 'Full refactor (schedule hit, quality gain)', effects: { schedule: -1, quality: 15, budget: -20000, knowledge: 10 } },
          { id: 'patch', label: 'Quick patch', effects: { quality: 5, budget: -8000 } },
          { id: 'defer', label: 'Document for v2 (risk)', effects: { quality: -15, stress: 10 } }
        ]
      },
      { 
        id: 'dev_resignation', 
        title: 'Lead Developer Resigns', 
        description: 'Your lead developer accepted a FAANG offer. This will cause knowledge loss.',
        icon: '🚪',
        // Trigger: If stress is high (>50) after week 5
        triggerCondition: (state) => state.week >= 5 && state.team.stress > 50,
        options: [
          { id: 'counter', label: 'Counter-offer (expensive, retain knowledge)', effects: { budget: -45000, morale: 5, knowledge: 0 } },
          { id: 'transition', label: 'Knowledge transfer period', effects: { team: -1, schedule: -1, morale: -5, knowledge: -15, stress: 15 } },
          { id: 'contractor', label: 'Hire contractor (no knowledge loss)', effects: { budget: -55000, productivity: -0.1 } }
        ]
      },
      { 
        id: 'team_conflict', 
        title: 'Architecture Disagreement', 
        description: 'Senior devs debate microservices vs monolith. Unresolved conflict will hurt productivity.',
        icon: '🔥',
        // Trigger: If team size > 5 and morale < 70
        triggerCondition: (state) => state.team.size > 5 && state.team.morale < 70,
        options: [
          { id: 'mediate', label: 'Architecture review workshop (+knowledge)', effects: { budget: -8000, morale: 10, productivity: 0.1, knowledge: 8 } },
          { id: 'decide', label: 'Executive decision (fast, some resentment)', effects: { morale: -10, productivity: 0.05 } },
          { id: 'hybrid', label: 'Hybrid approach (compromise)', effects: { budget: -5000, morale: 5 } }
        ]
      }
    ]
  },

  live_show: {
    id: 'live_show',
    title: 'Live Entertainment',
    subtitle: 'Touring Show Production',
    icon: '🎪',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Executive Producer at Stellar Productions. Launch an ambitious touring show while managing creative talent and safety requirements.',
    company: 'Stellar Productions',
    projectName: 'AURORA - A Journey of Light',
    deliverable: 'acts',
    // Pedagogical focus: People/creative management, high coordination needs
    pedagogicalFocus: 'people',
    hasPrototyping: true,  // Tech rehearsals = prototypes
    hasUncertainty: true,
    initial: { 
      budget: 2500000, 
      weeks: 12, 
      scope: 8, 
      teamSize: 12, 
      quality: 80, 
      morale: 80,
      stress: 25,
      knowledge: 20,  // Lower starting knowledge - creative project
    },
    weeklyCostPerPerson: 6000,
    causalEvents: [
      { 
        id: 'star_injury', 
        title: 'Lead Performer Injury', 
        description: 'Your star acrobat suffered a minor injury. How you handle this affects team trust.',
        icon: '🤕',
        triggerCondition: (state) => state.week >= 4 && state.team.stress > 40,
        options: [
          { id: 'rest', label: 'Full recovery time (+morale, +trust)', effects: { schedule: -2, quality: 10, morale: 15, stress: -10 } },
          { id: 'modified', label: 'Modified choreography', effects: { quality: -5, budget: -20000 } },
          { id: 'understudy', label: 'Promote understudy (risky)', effects: { morale: -10, quality: -10, stress: 10 } }
        ]
      },
      { 
        id: 'creative_conflict', 
        title: 'Creative Vision Clash', 
        description: 'Director and choreographer disagree on Act 3. Unresolved, this will fester.',
        icon: '🎭',
        triggerCondition: (state) => state.week >= 5 && state.team.morale < 75,
        options: [
          { id: 'director', label: "Back director's vision", effects: { morale: -15, quality: 5, stress: 5 } },
          { id: 'choreographer', label: 'Support choreographer', effects: { morale: -10, quality: 5, stress: 5 } },
          { id: 'workshop', label: 'Creative workshop (+knowledge)', effects: { budget: -30000, schedule: -1, quality: 15, morale: 10, knowledge: 12 } }
        ]
      },
      { 
        id: 'rigging_issue', 
        title: 'Rigging Safety Concern', 
        description: 'Aerial rigging may not meet safety standards. A prototype/tech rehearsal would have caught this earlier.',
        icon: '⚠️',
        // This event is MITIGATED if prototypes were built
        triggerCondition: (state) => state.week >= 6,
        prototypeModifier: true, // If prototypes built, effects reduced
        options: [
          { id: 'redesign', label: 'Full redesign (safest)', effects: { budget: -150000, schedule: -2, quality: 15, stress: -10 } },
          { id: 'reinforce', label: 'Reinforce current design', effects: { budget: -60000, quality: 5 } },
          { id: 'simplify', label: 'Simplify aerial sequences', effects: { scope: -1, quality: -10, morale: -10 } }
        ]
      }
    ]
  },

  construction: {
    id: 'construction',
    title: 'Construction',
    subtitle: 'Commercial Building Project',
    icon: '🏗️',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'Project Manager at UrbanCore Construction. Build a 12-story mixed-use building while managing permits, weather, and safety.',
    company: 'UrbanCore Construction',
    projectName: 'Metropolitan Tower',
    deliverable: 'floors',
    // Pedagogical focus: Risk management, prototyping value
    pedagogicalFocus: 'risk',
    hasPrototyping: true,  // Mockups, inspections = prototypes
    hasUncertainty: true,
    initial: { 
      budget: 8000000, 
      weeks: 16, 
      scope: 12, 
      teamSize: 25, 
      quality: 85, 
      morale: 70,
      stress: 30,
      knowledge: 40,  // Higher starting knowledge - experienced crew
    },
    weeklyCostPerPerson: 4500,
    causalEvents: [
      { 
        id: 'weather_delay', 
        title: 'Severe Weather Alert', 
        description: 'Major storm forecast for 10 days. Your choice affects both schedule and team safety.',
        icon: '🌧️',
        triggerCondition: (state) => state.week >= 4 && state.week <= 12,
        options: [
          { id: 'pause', label: 'Pause outdoor work (safe)', effects: { schedule: -2, morale: 5, stress: -5 } },
          { id: 'interior', label: 'Interior work only', effects: { schedule: -1, budget: -50000, knowledge: 5 } },
          { id: 'push', label: 'Continue with caution (risky)', effects: { budget: -80000, quality: -5, morale: -10, stress: 15 } }
        ]
      },
      { 
        id: 'permit_issue', 
        title: 'Permit Inspection Failed', 
        description: 'Inspector flagged electrical issues. A prototype/mockup inspection would have caught this earlier.',
        icon: '📋',
        triggerCondition: (state) => state.week >= 6,
        prototypeModifier: true,
        options: [
          { id: 'rework', label: 'Full rework (+quality)', effects: { schedule: -2, budget: -120000, quality: 10, knowledge: 8 } },
          { id: 'appeal', label: 'Appeal decision', effects: { schedule: -1, budget: -30000, stress: 10 } },
          { id: 'expedite', label: 'Hire specialist (expensive)', effects: { budget: -180000 } }
        ]
      },
      { 
        id: 'safety_incident', 
        title: 'Safety Near-Miss', 
        description: 'Scaffold bracket failed. OSHA will investigate. This affects team morale and stress significantly.',
        icon: '🦺',
        triggerCondition: (state) => state.week >= 5 && state.team.stress > 45,
        options: [
          { id: 'full_audit', label: 'Full safety audit (+trust)', effects: { schedule: -1, budget: -60000, quality: 10, morale: 15, stress: -15, knowledge: 10 } },
          { id: 'targeted', label: 'Targeted inspection', effects: { budget: -25000, quality: 5 } },
          { id: 'minimal', label: 'Document and continue (risky)', effects: { quality: -10, morale: -15, stress: 20 } }
        ]
      },
      { 
        id: 'materials_shortage', 
        title: 'Materials Shortage', 
        description: 'Supply chain issue: steel delivery delayed 3 weeks. Prototyping/early ordering would have mitigated this.',
        icon: '📦',
        triggerCondition: (state) => state.week >= 7,
        prototypeModifier: true,
        options: [
          { id: 'wait', label: 'Wait for delivery', effects: { schedule: -3, morale: -10, stress: 15 } },
          { id: 'alternative', label: 'Source alternative supplier', effects: { budget: -200000, schedule: -1 } },
          { id: 'redesign', label: 'Redesign with available materials', effects: { budget: -100000, quality: -5, knowledge: 5 } }
        ]
      }
    ]
  },

  // NEW SCENARIO: High-Uncertainty R&D Project
  rd_innovation: {
    id: 'rd_innovation',
    title: 'R&D Innovation',
    subtitle: 'New Technology Development',
    icon: '🔬',
    difficulty: 'Expert',
    difficultyColor: '#dc2626',
    description: 'Lead a cutting-edge R&D project with high uncertainty. Prototyping is essential to surface problems early.',
    company: 'FutureTech Labs',
    projectName: 'Quantum Sensor Array',
    deliverable: 'milestones',
    // Pedagogical focus: Prototyping value in uncertainty
    pedagogicalFocus: 'prototyping',
    hasPrototyping: true,
    hasUncertainty: true,
    initial: { 
      budget: 3000000, 
      weeks: 14, 
      scope: 10, 
      teamSize: 8, 
      quality: 75,  // Lower starting quality - R&D uncertainty
      morale: 85,
      stress: 35,   // Higher stress - cutting edge work
      knowledge: 25, // Low knowledge - novel technology
    },
    weeklyCostPerPerson: 10000,
    causalEvents: [
      { 
        id: 'tech_failure', 
        title: 'Core Technology Failure', 
        description: 'The main sensor approach isn\'t working as expected. Prototypes would have revealed this earlier.',
        icon: '💥',
        triggerCondition: (state) => state.week >= 5,
        prototypeModifier: true, // Severity significantly reduced if prototypes built
        options: [
          { id: 'pivot', label: 'Pivot to backup approach', effects: { scope: -2, budget: -200000, knowledge: 15, stress: -10 } },
          { id: 'iterate', label: 'Iterate on current design', effects: { schedule: -3, budget: -150000, quality: -10, stress: 15 } },
          { id: 'parallel', label: 'Run parallel approaches', effects: { budget: -400000, team: 2, stress: 20 } }
        ]
      },
      { 
        id: 'breakthrough', 
        title: 'Unexpected Breakthrough', 
        description: 'A team member discovered a shortcut. How you capitalize on it matters.',
        icon: '💡',
        triggerCondition: (state) => state.week >= 6 && state.team.knowledge > 50,
        options: [
          { id: 'focus', label: 'Focus resources on breakthrough', effects: { quality: 15, morale: 15, knowledge: 10, stress: -10 } },
          { id: 'validate', label: 'Build prototype to validate', effects: { budget: -50000, quality: 10, knowledge: 20 } },
          { id: 'patent', label: 'Document for patent first', effects: { schedule: -1, morale: -5 } }
        ]
      },
      { 
        id: 'competitor_announcement', 
        title: 'Competitor Announcement', 
        description: 'A competitor announced a similar product launching in 8 weeks. Time pressure increases.',
        icon: '⚡',
        triggerCondition: (state) => state.week >= 7,
        options: [
          { id: 'accelerate', label: 'Accelerate timeline (-3 weeks)', effects: { schedule: -3, stress: 25, morale: -10 } },
          { id: 'differentiate', label: 'Pivot to differentiation (+scope)', effects: { scope: 2, budget: -100000, knowledge: 5 } },
          { id: 'stay_course', label: 'Stay the course (quality focus)', effects: { quality: 10, morale: 5 } }
        ]
      }
    ]
  }
};

// ============================================
// ENHANCED GAME MECHANICS - HBP CAUSAL MODEL
// ============================================

/*
 * MEETING TYPES (replacing simple "boost morale")
 * Based on HBP simulation's three meeting types with distinct effects
 */
const MEETING_TYPES = {
  coaching: {
    id: 'coaching',
    name: 'One-on-One Coaching',
    description: 'Build team knowledge and skills. Best early in project.',
    hoursPerWeek: 2,
    costPerSession: 500, // per team member
    effects: {
      knowledge: 8,      // Primary benefit: builds knowledge
      morale: 3,         // Secondary: some morale boost
      stress: -2,        // Slight stress relief
    },
    icon: '🎓'
  },
  standup: {
    id: 'standup',
    name: 'Daily Standups',
    description: 'Prevent coordination mistakes. Essential for larger teams.',
    hoursPerWeek: 1.25, // 15 min/day × 5 days
    costPerSession: 0,  // No direct cost, just time
    effects: {
      coordination: 10,  // Reduces mistake rate
      productivity: 0.02, // Slight productivity boost from alignment
    },
    icon: '📊'
  },
  status: {
    id: 'status',
    name: 'Status Review',
    description: 'Team alignment and stakeholder communication.',
    hoursPerWeek: 2,
    costPerSession: 300, // room, materials
    effects: {
      morale: 5,        // Team feels heard
      stress: -5,       // Clarity reduces anxiety
      stakeholder: 10,  // Better stakeholder relations
    },
    icon: '📋'
  }
};

/*
 * PROTOTYPING MECHANIC
 * Prototypes cost time/money upfront but reduce severity of uncertainty events
 */
const PROTOTYPE_COST = {
  tech_startup: { budget: 15000, time: 0.5 }, // 0.5 = half a week of reduced progress
  live_show: { budget: 50000, time: 1 },      // Tech rehearsal
  construction: { budget: 80000, time: 1 },   // Mockup/inspection
  rd_innovation: { budget: 100000, time: 1 }, // Lab prototype
};

/*
 * CAUSAL CALCULATIONS
 */

// Calculate stress level based on multiple factors
const calculateStress = (state, scenario) => {
  let stress = state.team.stress;
  
  // Factor 1: Schedule pressure (unrealistic deadline)
  const weeksRemaining = state.schedule.deadline - state.week;
  const workRemaining = state.scope.totalFeatures - state.scope.completed;
  const weeklyCapacity = calculateWeeklyCapacity(state.team, state);
  const weeksNeeded = workRemaining / (weeklyCapacity * state.scope.totalFeatures);
  
  if (weeksNeeded > weeksRemaining) {
    // Schedule is unrealistic - add stress proportional to gap
    stress += Math.min(15, (weeksNeeded - weeksRemaining) * 5);
  }
  
  // Factor 2: Recent team changes (hiring/firing causes transition stress)
  // This is handled in action effects
  
  // Factor 3: Low knowledge early in project
  if (state.team.knowledge < 40 && state.week <= 4) {
    stress += 5;
  }
  
  // Factor 4: Crunch/overtime (handled in action effects)
  
  // Natural stress decay if conditions are good
  if (weeksNeeded <= weeksRemaining && state.team.morale > 70) {
    stress -= 3;
  }
  
  return Math.max(0, Math.min(100, stress));
};

// Stress affects morale (HBP: high stress → lower morale)
const calculateMoraleFromStress = (currentMorale, stress) => {
  let moraleDelta = 0;
  
  if (stress > 60) {
    moraleDelta = -((stress - 60) * 0.3); // High stress drains morale
  } else if (stress < 30) {
    moraleDelta = 2; // Low stress allows morale recovery
  }
  
  return Math.max(10, Math.min(100, currentMorale + moraleDelta));
};

// Morale affects productivity (HBP: low morale → fewer hours worked)
const calculateProductivityFromMorale = (baseProductivity, morale) => {
  if (morale >= 80) {
    return baseProductivity * 1.1; // High morale bonus
  } else if (morale >= 60) {
    return baseProductivity;
  } else if (morale >= 40) {
    return baseProductivity * 0.85; // Moderate penalty
  } else {
    return baseProductivity * 0.65; // Severe penalty
  }
};

// Knowledge affects mistake rate (HBP: low knowledge → more rework)
const calculateMistakeRate = (knowledge, hasStandups) => {
  let baseRate = 0.15 - (knowledge * 0.001); // 15% base, reduced by knowledge
  
  // Standups reduce coordination mistakes
  if (hasStandups) {
    baseRate *= 0.7; // 30% reduction
  }
  
  return Math.max(0.02, baseRate); // Minimum 2% mistake rate
};

// Weekly capacity calculation (enhanced)
const calculateWeeklyCapacity = (team, state) => {
  const baseCapacity = team.size * team.productivity;
  const moraleAdjustedProductivity = calculateProductivityFromMorale(team.productivity, team.morale);
  const mistakeRate = calculateMistakeRate(state.team.knowledge, state.meetings?.standup);
  
  // Effective capacity accounts for mistakes (rework)
  const effectiveCapacity = (team.size * moraleAdjustedProductivity * (team.morale / 100)) * (1 - mistakeRate);
  
  // Normalize progress so scenarios complete in roughly their intended duration
  // Dividing by team size prevents large teams from finishing too fast
  // The 0.11 multiplier is tuned for ~10-12 week completion at good morale
  return (effectiveCapacity / team.size) * 0.11;
};

// Calculate weekly progress with enhanced model
const calculateWeeklyProgress = (team, scope, state) => {
  const capacity = calculateWeeklyCapacity(team, state);
  return Math.min(capacity, 1 - (scope.completed / scope.totalFeatures));
};

// Schedule consistency penalty
const calculateScheduleConsistencyPenalty = (scheduleChanges) => {
  if (scheduleChanges <= 1) return { morale: 0, stress: 0 };
  if (scheduleChanges === 2) return { morale: -3, stress: 5 };
  if (scheduleChanges === 3) return { morale: -8, stress: 10 };
  return { morale: -15, stress: 20 }; // 4+ changes
};

// Enhanced scoring (HBP-style with bonus for consistency)
const calculateScore = (state) => {
  const budgetScore = Math.max(0, (1 - state.budget.spent / state.budget.total)) * 200;
  const scheduleScore = state.week <= state.schedule.deadline 
    ? 200 
    : Math.max(0, 200 - (state.week - state.schedule.deadline) * 40);
  const scopeScore = (state.scope.completed / state.scope.totalFeatures) * 200;
  const qualityScore = (state.scope.quality / 100) * 200;
  
  // NEW: Team process score (HBP has this as 100 points)
  const avgMorale = state.moraleHistory 
    ? state.moraleHistory.reduce((a, b) => a + b, 0) / state.moraleHistory.length 
    : state.team.morale;
  const teamProcessScore = (avgMorale / 100) * 100;
  
  // NEW: Bonus for schedule consistency
  const consistencyBonus = state.scheduleChanges <= 1 ? 50 : state.scheduleChanges === 2 ? 25 : 0;
  
  // NEW: Prototype bonus (if applicable and prototypes were built)
  const prototypeBonus = state.prototypesBuilt > 0 ? state.prototypesBuilt * 25 : 0;
  
  return Math.round(budgetScore + scheduleScore + scopeScore + qualityScore + teamProcessScore + consistencyBonus + prototypeBonus);
};

const getGrade = (score) => {
  if (score >= 900) return 'A+';
  if (score >= 800) return 'A';
  if (score >= 700) return 'B+';
  if (score >= 600) return 'B';
  if (score >= 500) return 'C';
  if (score >= 400) return 'D';
  return 'F';
};

// Enhanced initial state with new fields
const createApexInitialState = (scenario) => ({
  scenario: scenario.id,
  week: 1,
  totalWeeks: scenario.initial.weeks,
  budget: { total: scenario.initial.budget, spent: 0 },
  schedule: { 
    deadline: scenario.initial.weeks,
    originalDeadline: scenario.initial.weeks // Track original for consistency
  },
  scope: { 
    totalFeatures: scenario.initial.scope, 
    completed: 0, 
    quality: scenario.initial.quality 
  },
  team: { 
    size: scenario.initial.teamSize, 
    morale: scenario.initial.morale, 
    productivity: 1.0,
    stress: scenario.initial.stress,
    knowledge: scenario.initial.knowledge
  },
  // NEW: Meeting tracking
  meetings: {
    coaching: false,
    standup: false,
    status: false
  },
  // NEW: Schedule change tracking
  scheduleChanges: 0,
  // NEW: Prototype tracking
  prototypesBuilt: 0,
  maxPrototypes: scenario.hasPrototyping ? 3 : 0,
  // NEW: Morale history for team process score
  moraleHistory: [scenario.initial.morale],
  // Decision tracking
  decisions: [],
  triggeredEvents: [], // Track which events have fired
  gamePhase: 'playing',
  currentEvent: null,
  startTime: Date.now()
});

// ============================================
// MAIN APP COMPONENT
// ============================================

export default function BizSimHub() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  const [userScores, setUserScores] = useState({ scores: [], bestScores: [] });
  const [subscription, setSubscription] = useState(null);
  const [toast, setToast] = useState(null);
  
  // Simulation state
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [simPhase, setSimPhase] = useState('select');
  
  // NEW: How to Play modal
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  
  // NEW: Paywall modal for free users
  const [showPaywall, setShowPaywall] = useState(false);
  const FREE_TRIAL_WEEKS = 3; // Allow free users to play until week 3
  
  // NEW: Brief tab for HBP-style intro
  const [briefTab, setBriefTab] = useState('brief');

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Check for existing session on load
  useEffect(() => {
    const checkAuth = async () => {
      const token = api.getToken();
      if (token) {
        try {
          const data = await api.getMe();
          setCurrentUser(data.user);
          setCurrentPage('dashboard');
          loadUserData();
        } catch (e) {
          api.setToken(null);
        }
      }
    };
    checkAuth();
    
    const params = new URLSearchParams(window.location.search);
    
    // Handle Google OAuth token
    const googleToken = params.get('token');
    if (googleToken) {
      api.setToken(googleToken);
      api.getMe().then(data => {
        setCurrentUser(data.user);
        setCurrentPage('dashboard');
        loadUserData();
        showToast('🎉 Successfully signed in with Google!', 'success');
      }).catch(() => {
        api.setToken(null);
        showToast('Authentication failed. Please try again.', 'error');
      });
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Handle Google OAuth errors
    const authError = params.get('error');
    if (authError) {
      showToast('Google sign-in failed. Please try again.', 'error');
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Check for success redirect from Stripe
    if (params.get('session_id')) {
      showToast('🎉 Payment successful! Your subscription is now active.', 'success');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const loadUserData = async () => {
    try {
      const [scoresData, subData] = await Promise.all([
        api.getScores(),
        api.getSubscription()
      ]);
      setUserScores(scoresData);
      setSubscription(subData);
    } catch (e) {
      console.error('Failed to load user data:', e);
    }
  };

  // Auth handlers
  const handleLogin = async (email, password) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const data = await api.login(email, password);
      api.setToken(data.token);
      setCurrentUser(data.user);
      setCurrentPage('dashboard');
      loadUserData();
    } catch (e) {
      setAuthError(e.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignup = async (name, email, password) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const data = await api.register(name, email, password);
      api.setToken(data.token);
      setCurrentUser(data.user);
      setCurrentPage('dashboard');
      showToast('Welcome to BizSimHub! 🎉', 'success');
    } catch (e) {
      setAuthError(e.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    api.setToken(null);
    setCurrentUser(null);
    setSubscription(null);
    setUserScores({ scores: [], bestScores: [] });
    setCurrentPage('landing');
  };

  // Stripe handlers
  const handleCheckout = async (planId) => {
    if (!currentUser) {
      setCurrentPage('auth');
      setAuthMode('signup');
      return;
    }
    
    setCheckoutLoading(planId);
    try {
      const data = await api.createCheckoutSession(planId, billingCycle);
      window.location.href = data.url;
    } catch (e) {
      showToast('Failed to start checkout. Please try again.', 'error');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const data = await api.createPortalSession();
      window.location.href = data.url;
    } catch (e) {
      showToast('Failed to open subscription portal.', 'error');
    }
  };

  // Simulation handlers
  const startSimulation = (simId) => {
    setSelectedSimulation(SIMULATIONS.find(s => s.id === simId));
    setSimPhase('select');
    setCurrentPage('simulation');
  };

  const selectScenario = (scenario) => {
    setSelectedScenario(scenario);
    setSimPhase('brief');
  };

  const beginSimulation = () => {
    setGameState(createApexInitialState(selectedScenario));
    setSimPhase('playing');
  };

  // ENHANCED ACTION HANDLER with causal effects
  const handleAction = (action) => {
    setGameState(prev => {
      const newState = { ...prev };
      const scenario = selectedScenario;
      
      switch (action.type) {
        case 'hire':
          newState.team = { 
            ...prev.team, 
            size: prev.team.size + 1,
            morale: Math.min(100, prev.team.morale + 3),
            stress: prev.team.stress + 8, // Hiring causes transition stress
            knowledge: Math.max(prev.team.knowledge - 3, 10) // Dilutes team knowledge slightly
          };
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          break;
          
        case 'fire':
          newState.team = { 
            ...prev.team, 
            size: Math.max(2, prev.team.size - 1),
            morale: Math.max(0, prev.team.morale - 12), // Firing hurts morale more
            stress: prev.team.stress + 10, // Also stressful
            knowledge: Math.max(prev.team.knowledge - 8, 10) // Knowledge loss
          };
          break;
          
        // NEW: Meeting type actions (replacing simple boost_morale)
        case 'meeting_coaching':
          const coachingCost = MEETING_TYPES.coaching.costPerSession * prev.team.size;
          newState.budget = { ...prev.budget, spent: prev.budget.spent + coachingCost };
          newState.team = { 
            ...prev.team, 
            knowledge: Math.min(100, prev.team.knowledge + MEETING_TYPES.coaching.effects.knowledge),
            morale: Math.min(100, prev.team.morale + MEETING_TYPES.coaching.effects.morale),
            stress: Math.max(0, prev.team.stress + MEETING_TYPES.coaching.effects.stress)
          };
          newState.meetings = { ...prev.meetings, coaching: true };
          break;
          
        case 'meeting_standup':
          newState.team = { 
            ...prev.team, 
            productivity: Math.min(1.5, prev.team.productivity + MEETING_TYPES.standup.effects.productivity)
          };
          newState.meetings = { ...prev.meetings, standup: true };
          break;
          
        case 'meeting_status':
          const statusCost = MEETING_TYPES.status.costPerSession;
          newState.budget = { ...prev.budget, spent: prev.budget.spent + statusCost };
          newState.team = { 
            ...prev.team, 
            morale: Math.min(100, prev.team.morale + MEETING_TYPES.status.effects.morale),
            stress: Math.max(0, prev.team.stress + MEETING_TYPES.status.effects.stress)
          };
          newState.meetings = { ...prev.meetings, status: true };
          break;
          
        case 'quality_review':
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          newState.scope = { ...prev.scope, quality: Math.min(100, prev.scope.quality + 5) };
          newState.team = { ...prev.team, knowledge: Math.min(100, prev.team.knowledge + 2) };
          break;
          
        case 'crunch':
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          newState.scope = { ...prev.scope, completed: prev.scope.completed + 0.5 };
          newState.team = { 
            ...prev.team, 
            morale: Math.max(10, prev.team.morale - 15),
            stress: Math.min(100, prev.team.stress + 20) // Crunch is very stressful
          };
          break;
          
        // NEW: Prototype action
        case 'build_prototype':
          if (scenario.hasPrototyping && prev.prototypesBuilt < prev.maxPrototypes) {
            const protoCost = PROTOTYPE_COST[scenario.id];
            newState.budget = { ...prev.budget, spent: prev.budget.spent + protoCost.budget };
            newState.prototypesBuilt = prev.prototypesBuilt + 1;
            newState.team = { 
              ...prev.team, 
              knowledge: Math.min(100, prev.team.knowledge + 10) // Prototypes build knowledge
            };
            // Slight progress penalty for time spent
            newState.scope = { 
              ...prev.scope, 
              completed: Math.max(0, prev.scope.completed - (protoCost.time * 0.03))
            };
          }
          break;
          
        // NEW: Adjust schedule (with consistency tracking)
        case 'extend_deadline':
          if (prev.week > 2) {
            newState.scheduleChanges = prev.scheduleChanges + 1;
            const penalty = calculateScheduleConsistencyPenalty(newState.scheduleChanges);
            newState.team = {
              ...prev.team,
              morale: Math.max(10, prev.team.morale + penalty.morale),
              stress: Math.min(100, prev.team.stress + penalty.stress)
            };
          }
          newState.schedule = { 
            ...prev.schedule, 
            deadline: prev.schedule.deadline + 1 
          };
          break;
      }
      
      return newState;
    });
  };

  // ENHANCED WEEK ADVANCEMENT with causal model
  const advanceWeek = () => {
    // Check paywall for free users
    const userTier = currentUser?.subscription_tier?.toLowerCase() || 'free';
    const isPaidUser = userTier === 'pro' || userTier === 'professional' || userTier === 'enterprise';
    const isTester = currentUser?.is_tester === true;
    
    if (!isPaidUser && !isTester && gameState.week >= FREE_TRIAL_WEEKS) {
      setShowPaywall(true);
      return;
    }
    
    setGameState(prev => {
      const scenario = selectedScenario;
      const progress = calculateWeeklyProgress(prev.team, prev.scope, prev);
      const weeklyCost = prev.team.size * scenario.weeklyCostPerPerson;
      
      // Calculate new stress based on causal factors
      const newStress = calculateStress(prev, scenario);
      
      // Stress affects morale
      const stressAdjustedMorale = calculateMoraleFromStress(prev.team.morale, newStress);
      
      // Small natural morale drift
      const moraleDrift = (Math.random() - 0.5) * 4;
      
      const newState = {
        ...prev,
        week: prev.week + 1,
        budget: { ...prev.budget, spent: prev.budget.spent + weeklyCost },
        scope: { 
          ...prev.scope, 
          completed: prev.scope.completed + (progress * prev.scope.totalFeatures) 
        },
        team: { 
          ...prev.team, 
          morale: Math.max(10, Math.min(100, stressAdjustedMorale + moraleDrift)),
          stress: newStress
        },
        // Track morale history for team process score
        moraleHistory: [...prev.moraleHistory, stressAdjustedMorale + moraleDrift],
        // Reset weekly meeting flags
        meetings: { coaching: false, standup: false, status: false }
      };
      
      // CHECK FOR CAUSAL EVENTS (condition-based, not random)
      if (prev.week < prev.totalWeeks) {
        const availableEvents = scenario.causalEvents.filter(e => 
          !prev.triggeredEvents.includes(e.id) && 
          e.triggerCondition(newState)
        );
        
        if (availableEvents.length > 0) {
          // Pick the most relevant event (first one that triggers)
          const event = availableEvents[0];
          
          // If event has prototypeModifier and prototypes were built, modify effects
          if (event.prototypeModifier && prev.prototypesBuilt > 0) {
            // Create modified event with reduced severity
            const modifiedEvent = {
              ...event,
              description: event.description + ` (Severity reduced by ${prev.prototypesBuilt} prototype(s))`,
              options: event.options.map(opt => ({
                ...opt,
                effects: Object.fromEntries(
                  Object.entries(opt.effects).map(([key, val]) => {
                    // Reduce negative effects based on prototypes built
                    if (val < 0) {
                      return [key, Math.round(val * (1 - prev.prototypesBuilt * 0.2))];
                    }
                    return [key, val];
                  })
                )
              }))
            };
            newState.currentEvent = modifiedEvent;
          } else {
            newState.currentEvent = event;
          }
          newState.gamePhase = 'event';
          newState.triggeredEvents = [...prev.triggeredEvents, event.id];
        }
      }
      
      // Check for game end
      if (newState.scope.completed >= newState.scope.totalFeatures || newState.week > newState.totalWeeks + 3) {
        const finalScore = calculateScore(newState);
        const grade = getGrade(finalScore);
        
        // Record score to backend
        if (currentUser) {
          api.recordScore(selectedSimulation.id, {
            scenarioId: selectedScenario.id,
            score: finalScore,
            grade,
            decisionsMade: newState.decisions.length,
            budgetScore: Math.round(Math.max(0, (1 - newState.budget.spent / newState.budget.total)) * 200),
            scheduleScore: Math.round(newState.week <= newState.schedule.deadline ? 200 : Math.max(0, 200 - (newState.week - newState.schedule.deadline) * 40)),
            scopeScore: Math.round((newState.scope.completed / newState.scope.totalFeatures) * 200),
            qualityScore: Math.round((newState.scope.quality / 100) * 200),
            teamProcessScore: Math.round((newState.moraleHistory.reduce((a, b) => a + b, 0) / newState.moraleHistory.length / 100) * 100),
            consistencyBonus: newState.scheduleChanges <= 1 ? 50 : newState.scheduleChanges === 2 ? 25 : 0,
            prototypeBonus: newState.prototypesBuilt * 25,
            prototypesBuilt: newState.prototypesBuilt,
            scheduleChanges: newState.scheduleChanges
          }).then(() => loadUserData()).catch(console.error);
        }
        
        setSimPhase('ended');
      }
      
      return newState;
    });
  };

  const handleEventChoice = (option) => {
    setGameState(prev => {
      const effects = option.effects;
      const newState = {
        ...prev,
        gamePhase: 'playing',
        currentEvent: null,
        decisions: [...prev.decisions, { eventId: prev.currentEvent.id, choice: option.id, week: prev.week }]
      };
      
      // Apply all effects
      if (effects.scope) newState.scope = { ...prev.scope, totalFeatures: Math.max(1, prev.scope.totalFeatures + effects.scope) };
      if (effects.budget) newState.budget = { ...prev.budget, spent: prev.budget.spent + Math.abs(effects.budget) };
      if (effects.schedule) newState.schedule = { ...prev.schedule, deadline: Math.max(1, prev.schedule.deadline + effects.schedule) };
      if (effects.morale) newState.team = { ...prev.team, morale: Math.max(5, Math.min(100, prev.team.morale + effects.morale)) };
      if (effects.productivity) newState.team = { ...newState.team, productivity: Math.max(0.4, Math.min(1.6, prev.team.productivity + effects.productivity)) };
      if (effects.quality) newState.scope = { ...newState.scope, quality: Math.max(0, Math.min(100, prev.scope.quality + effects.quality)) };
      if (effects.team) newState.team = { ...newState.team, size: Math.max(2, prev.team.size + effects.team) };
      if (effects.stress) newState.team = { ...newState.team, stress: Math.max(0, Math.min(100, prev.team.stress + effects.stress)) };
      if (effects.knowledge) newState.team = { ...newState.team, knowledge: Math.max(0, Math.min(100, prev.team.knowledge + effects.knowledge)) };
      
      return newState;
    });
  };

  // ============================================
  // RENDER COMPONENTS
  // ============================================

  const renderNavbar = (transparent = false) => (
    <nav className={`navbar ${transparent ? 'navbar-transparent' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => setCurrentPage(currentUser ? 'dashboard' : 'landing')}>
          <span className="logo-icon">🎓</span>
          <span className="logo-text">BizSim<span className="logo-accent">Hub</span></span>
        </div>
        <div className="nav-links">
          {!currentUser ? (
            <>
              <button className="nav-link" onClick={() => { setCurrentPage('auth'); setAuthMode('login'); }}>Log In</button>
              <button className="nav-btn-primary" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>Get Started</button>
            </>
          ) : (
            <>
              <button className="nav-link" onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
              <button className="nav-link" onClick={() => setCurrentPage('catalog')}>Simulations</button>
              <button className="nav-link" onClick={() => setCurrentPage('pricing')}>Pricing</button>
              {currentUser.is_admin && (
                <button className="nav-link admin-link" onClick={() => setCurrentPage('admin')} title="Admin Panel">⚙️</button>
              )}
              <div className="nav-user">
                <span className="user-avatar">{currentUser.name?.charAt(0)}</span>
                <span className="user-name">{currentUser.name}</span>
                <button className="nav-link-small" onClick={handleLogout}>Logout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );

  const renderLanding = () => (
    <div className="landing-page">
      {renderNavbar(true)}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-badge">🎓 Business Education Platform</div>
          <h1 className="hero-title">Learn by <span className="gradient-text">Doing</span></h1>
          <p className="hero-subtitle">Master business skills through immersive simulations. Practice project management, strategy, negotiations, and more in risk-free environments.</p>
          <div className="hero-cta">
            <button className="btn-primary-lg" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>Start Free →</button>
            <button className="btn-secondary-lg" onClick={() => setCurrentPage('catalog')}>Browse Simulations</button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">6+</span><span className="stat-label">Simulations</span></div>
            <div className="stat"><span className="stat-num">25+</span><span className="stat-label">Scenarios</span></div>
            <div className="stat"><span className="stat-num">1000+</span><span className="stat-label">Learners</span></div>
          </div>
        </div>
        {/* CSS Hero animation */}
        <div className="hero-animation">
          <div className="rocket-container">
            <div className="rocket">🚀</div>
            <div className="rocket-trail"></div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Featured</span>
            <h2>Project Apex</h2>
            <p>Our flagship project management simulation</p>
          </div>
          <div className="featured-card">
            <div className="featured-icon">🎯</div>
            <div className="featured-content">
              <h3>Master Project Management</h3>
              <p>Navigate real-world challenges across 4 industry scenarios. Balance scope, schedule, budget, and team dynamics with our HBP-inspired causal model.</p>
              <div className="featured-tags">
                <span>Tech Startup</span><span>Live Entertainment</span><span>Construction</span><span>R&D Innovation</span>
              </div>
              <button className="btn-primary" onClick={() => currentUser ? startSimulation('project-apex') : setCurrentPage('auth')}>
                {currentUser ? 'Play Now' : 'Try Free Now'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="simulations-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Simulation Library</h2>
            <p>Comprehensive business simulations for every skill</p>
          </div>
          <div className="sim-grid">
            {SIMULATIONS.map(sim => (
              <div key={sim.id} className={`sim-card ${sim.comingSoon ? 'coming-soon' : ''}`}>
                <div className="sim-icon">{sim.icon}</div>
                <div className="sim-category">{sim.category}</div>
                <h3>{sim.title}</h3>
                <p>{sim.subtitle}</p>
                <div className="sim-meta"><span>{sim.difficulty}</span><span>{sim.duration}</span></div>
                {sim.comingSoon && <div className="sim-badge-soon">Coming Soon</div>}
                {sim.featured && <div className="sim-badge-featured">Available Now</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">BizSim<span className="logo-accent">Hub</span></span>
            <p>Learn business through immersive simulations</p>
          </div>
          <div className="footer-links">
            <div className="footer-col"><h4>Product</h4><a href="#">Simulations</a><a href="#">Pricing</a><a href="#">For Educators</a></div>
            <div className="footer-col"><h4>Company</h4><a href="#">About</a><a href="#">Contact</a></div>
            <div className="footer-col"><h4>Legal</h4><a href="#">Privacy</a><a href="#">Terms</a></div>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2025 BizSimHub. All rights reserved.</p></div>
      </footer>
    </div>
  );

  const renderAuth = () => (
    <div className="auth-page">
      {renderNavbar()}
      <div className="auth-container">
        <div className="auth-card">
          <h2>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="auth-subtitle">{authMode === 'login' ? 'Sign in to continue learning' : 'Start your learning journey'}</p>
          
          {authError && <div className="auth-error">{authError}</div>}
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            if (authMode === 'login') {
              handleLogin(form.email.value, form.password.value);
            } else {
              handleSignup(form.name.value, form.email.value, form.password.value);
            }
          }}>
            {authMode === 'signup' && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="John Doe" required />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="••••••••" required minLength={6} />
            </div>
            <button type="submit" className="btn-primary btn-full" disabled={authLoading}>
              {authLoading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="auth-divider"><span>or</span></div>
          
          <button className="btn-google" onClick={() => window.location.href = `${API_BASE}/auth/google`}>
            <span className="google-icon">G</span>
            Continue with Google
          </button>
          
          <p className="auth-toggle">
            {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); }}>
              {authMode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // ============================================
  // ADMIN DASHBOARD
  // ============================================
  
  const [adminTab, setAdminTab] = useState('overview');
  const [adminSearch, setAdminSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState(null);
  
  // Admin data state (fetched from API)
  const [adminData, setAdminData] = useState({
    overview: {
      totalUsers: 0,
      activeUsers: 0,
      totalRevenue: 0,
      monthlyRevenue: 0,
      completionRate: 0,
      avgSessionTime: '0 min',
      newUsersToday: 0,
      activeNow: 0,
      subscriptions: { free: 0, pro: 0, enterprise: 0 },
      recentActivity: []
    },
    users: [],
    revenue: {
      mrr: 0,
      arr: 0,
      growth: 0,
      churnRate: 0,
      ltv: 0,
      subscriptions: { free: 0, professional: 0, enterprise: 0 },
      recentTransactions: []
    },
    analytics: {
      popularSimulations: [],
      weeklyActivity: [
        { day: 'Mon', users: 0, sessions: 0 },
        { day: 'Tue', users: 0, sessions: 0 },
        { day: 'Wed', users: 0, sessions: 0 },
        { day: 'Thu', users: 0, sessions: 0 },
        { day: 'Fri', users: 0, sessions: 0 },
        { day: 'Sat', users: 0, sessions: 0 },
        { day: 'Sun', users: 0, sessions: 0 },
      ],
      gradeDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 }
    },
    content: {
      simulations: SIMULATIONS.map(s => ({
        id: s.id,
        name: s.title,
        status: s.available ? 'published' : 'draft',
        plays: 0,
        rating: null,
        lastUpdated: new Date().toISOString().split('T')[0]
      }))
    },
    system: {
      uptime: 99.9,
      avgResponseTime: 150,
      errorRate: 0.01,
      activeConnections: 0,
      cpuUsage: 25,
      memoryUsage: 45,
      recentErrors: []
    }
  });
  
  // Fetch admin data when admin page is accessed
  const fetchAdminData = async () => {
    if (!currentUser) return;
    
    setAdminLoading(true);
    setAdminError(null);
    
    try {
      // Fetch all admin data in parallel
      const [overviewRes, usersRes, analyticsRes, revenueRes] = await Promise.allSettled([
        api.getAdminOverview(),
        api.getAdminUsers(),
        api.getAdminAnalytics(),
        api.getAdminRevenue()
      ]);
      
      setAdminData(prev => ({
        ...prev,
        overview: overviewRes.status === 'fulfilled' ? overviewRes.value.overview : prev.overview,
        users: usersRes.status === 'fulfilled' ? usersRes.value.users : prev.users,
        analytics: analyticsRes.status === 'fulfilled' ? analyticsRes.value.analytics : prev.analytics,
        revenue: revenueRes.status === 'fulfilled' ? revenueRes.value.revenue : prev.revenue,
      }));
      
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setAdminError('Failed to load admin data. Please try again.');
    } finally {
      setAdminLoading(false);
    }
  };
  
  // Fetch admin data when entering admin page or changing tabs
  useEffect(() => {
    if (currentPage === 'admin' && currentUser) {
      fetchAdminData();
    }
  }, [currentPage, currentUser]);

  // Toggle admin status for a user
  const handleToggleAdmin = async (userId, currentIsAdmin) => {
    try {
      const result = await api.toggleAdmin(userId, !currentIsAdmin);
      if (result.success) {
        // Update local state
        setAdminData(prev => ({
          ...prev,
          users: prev.users.map(u => 
            u.id === userId ? { ...u, isAdmin: !currentIsAdmin } : u
          )
        }));
        showToast(result.message, 'success');
      }
    } catch (error) {
      showToast(error.message || 'Failed to update admin status', 'error');
    }
  };

  // Toggle tester status for a user
  const handleToggleTester = async (userId, currentIsTester) => {
    try {
      const result = await api.toggleTester(userId, !currentIsTester);
      if (result.success) {
        // Update local state
        setAdminData(prev => ({
          ...prev,
          users: prev.users.map(u => 
            u.id === userId ? { ...u, isTester: !currentIsTester } : u
          )
        }));
        showToast(result.message, 'success');
      }
    } catch (error) {
      showToast(error.message || 'Failed to update tester status', 'error');
    }
  };

  const renderAdminDashboard = () => {
    const filteredUsers = adminData.users.filter(u => 
      u.name?.toLowerCase().includes(adminSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(adminSearch.toLowerCase())
    );

    return (
      <div className="admin-page">
        {renderNavbar()}
        
        {/* Loading overlay */}
        {adminLoading && (
          <div className="admin-loading-overlay">
            <div className="admin-loading-spinner">
              <div className="spinner"></div>
              <p>Loading admin data...</p>
            </div>
          </div>
        )}
        
        {/* Error banner */}
        {adminError && (
          <div className="admin-error-banner">
            <span>⚠️ {adminError}</span>
            <button onClick={fetchAdminData}>Retry</button>
          </div>
        )}
        
        <div className="admin-layout">
          {/* Sidebar */}
          <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
              <span className="admin-logo">⚙️</span>
              <h2>Admin Panel</h2>
            </div>
            <nav className="admin-nav">
              <button className={`admin-nav-btn ${adminTab === 'overview' ? 'active' : ''}`} onClick={() => setAdminTab('overview')}>
                <span>📊</span> Overview
              </button>
              <button className={`admin-nav-btn ${adminTab === 'users' ? 'active' : ''}`} onClick={() => setAdminTab('users')}>
                <span>👥</span> Users
              </button>
              <button className={`admin-nav-btn ${adminTab === 'analytics' ? 'active' : ''}`} onClick={() => setAdminTab('analytics')}>
                <span>📈</span> Analytics
              </button>
              <button className={`admin-nav-btn ${adminTab === 'revenue' ? 'active' : ''}`} onClick={() => setAdminTab('revenue')}>
                <span>💰</span> Revenue
              </button>
              <button className={`admin-nav-btn ${adminTab === 'content' ? 'active' : ''}`} onClick={() => setAdminTab('content')}>
                <span>📚</span> Content
              </button>
              <button className={`admin-nav-btn ${adminTab === 'system' ? 'active' : ''}`} onClick={() => setAdminTab('system')}>
                <span>🔧</span> System
              </button>
            </nav>
            <div className="admin-sidebar-footer">
              <button className="admin-back-btn" onClick={() => setCurrentPage('dashboard')}>
                ← Back to App
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="admin-main">
            {/* Overview Tab */}
            {adminTab === 'overview' && (
              <div className="admin-content">
                <div className="admin-header">
                  <div>
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back! Here's what's happening with BizSimHub today.</p>
                  </div>
                  <button className="admin-btn refresh-btn" onClick={fetchAdminData} disabled={adminLoading}>
                    {adminLoading ? '↻ Loading...' : '↻ Refresh'}
                  </button>
                </div>

                {/* Key Metrics */}
                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">👥</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.totalUsers.toLocaleString()}</span>
                      <span className="metric-label">Total Users</span>
                    </div>
                    <span className="metric-badge green">+{adminData.overview.newUsersToday} today</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon green">💰</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.overview.monthlyRevenue.toLocaleString()}</span>
                      <span className="metric-label">Monthly Revenue</span>
                    </div>
                    <span className="metric-badge green">+23% MoM</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">🎯</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.completionRate}%</span>
                      <span className="metric-label">Completion Rate</span>
                    </div>
                    <span className="metric-badge neutral">Avg</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">⚡</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.activeNow}</span>
                      <span className="metric-label">Active Now</span>
                    </div>
                    <span className="metric-badge blue">Live</span>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="admin-stats-row">
                  <div className="admin-stat-card">
                    <h3>Active Users (30d)</h3>
                    <div className="stat-big">{adminData.overview.activeUsers.toLocaleString()}</div>
                    <div className="stat-bar">
                      <div className="stat-bar-fill" style={{width: `${(adminData.overview.activeUsers / adminData.overview.totalUsers) * 100}%`}}></div>
                    </div>
                    <span className="stat-sub">{Math.round((adminData.overview.activeUsers / adminData.overview.totalUsers) * 100)}% of total users</span>
                  </div>
                  <div className="admin-stat-card">
                    <h3>Avg Session Time</h3>
                    <div className="stat-big">{adminData.overview.avgSessionTime}</div>
                    <span className="stat-sub">Per user session</span>
                  </div>
                  <div className="admin-stat-card">
                    <h3>Total Revenue (All Time)</h3>
                    <div className="stat-big">${adminData.overview.totalRevenue.toLocaleString()}</div>
                    <span className="stat-sub">Since launch</span>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="admin-section">
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <span className="activity-icon">🎉</span>
                      <div className="activity-content">
                        <strong>Michael Brown</strong> completed Project Apex with Grade A
                        <span className="activity-time">5 minutes ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">💳</span>
                      <div className="activity-content">
                        <strong>Lisa Thompson</strong> upgraded to Professional plan
                        <span className="activity-time">23 minutes ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">👤</span>
                      <div className="activity-content">
                        <strong>New user registered:</strong> alex@company.com
                        <span className="activity-time">1 hour ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">🎯</span>
                      <div className="activity-content">
                        <strong>Enterprise Scale</strong> simulation reached 1,500 plays
                        <span className="activity-time">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {adminTab === 'users' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>User Management</h1>
                  <p>Manage and monitor all platform users</p>
                </div>

                {/* User Stats */}
                <div className="admin-user-stats">
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.status === 'active').length}</span>
                    <span className="user-stat-label">Active</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.plan === 'Professional').length}</span>
                    <span className="user-stat-label">Professional</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.plan === 'Enterprise').length}</span>
                    <span className="user-stat-label">Enterprise</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.status === 'churned').length}</span>
                    <span className="user-stat-label">Churned</span>
                  </div>
                </div>

                {/* Search & Filter */}
                <div className="admin-toolbar">
                  <div className="search-box">
                    <span>🔍</span>
                    <input 
                      type="text" 
                      placeholder="Search users by name or email..." 
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                    />
                  </div>
                  <div className="toolbar-actions">
                    <select className="admin-select">
                      <option>All Plans</option>
                      <option>Free</option>
                      <option>Professional</option>
                      <option>Enterprise</option>
                    </select>
                    <select className="admin-select">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Churned</option>
                    </select>
                    <button className="admin-btn primary">+ Add User</button>
                  </div>
                </div>

                {/* Users Table */}
                <div className="admin-table-container">
                  {filteredUsers.length > 0 ? (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Plan</th>
                          <th>Status</th>
                          <th>Simulations</th>
                          <th>Last Active</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(user => (
                          <tr key={user.id}>
                            <td>
                              <div className="user-cell">
                                <div className="user-avatar">{(user.name || user.email || '?').charAt(0).toUpperCase()}</div>
                                <div className="user-info">
                                  <strong>
                                    {user.name || 'Unknown'}
                                    {user.isAdmin && <span className="admin-badge">Admin</span>}
                                    {user.isTester && <span className="tester-badge">Tester</span>}
                                  </strong>
                                  <span>{user.email}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`plan-badge ${user.isTester ? 'tester' : (user.plan || 'free').toLowerCase()}`}>
                                {user.isTester ? 'Tester' : (user.plan || 'Free')}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${user.status || 'active'}`}>{user.status || 'active'}</span>
                            </td>
                            <td>
                              <span className="sim-count">{user.completions || 0}/{user.simulations || 0}</span>
                              <span className="sim-label">completed</span>
                            </td>
                            <td className="last-active">{user.lastActive || 'Never'}</td>
                            <td>
                              <div className="action-btns">
                                <button className="action-btn" title="View" onClick={() => setSelectedUser(user)}>👁</button>
                                <button 
                                  className={`action-btn ${user.isTester ? 'tester-active' : ''}`} 
                                  title={user.isTester ? 'Remove Tester' : 'Make Tester'}
                                  onClick={() => handleToggleTester(user.id, user.isTester)}
                                >
                                  🧪
                                </button>
                                <button 
                                  className={`action-btn ${user.isAdmin ? 'admin-active' : ''}`} 
                                  title={user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                                  onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                                >
                                  👑
                                </button>
                                <button className="action-btn danger" title="Delete">🗑</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">👥</div>
                      <p>{adminSearch ? 'No users match your search' : 'No users yet'}</p>
                    </div>
                  )}
                </div>

                {/* User Detail Modal */}
                {selectedUser && (
                  <div className="admin-modal-overlay" onClick={() => setSelectedUser(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                      <div className="modal-header">
                        <h2>User Details</h2>
                        <button className="modal-close" onClick={() => setSelectedUser(null)}>×</button>
                      </div>
                      <div className="modal-body">
                        <div className="user-detail-header">
                          <div className="user-avatar large">{(selectedUser.name || selectedUser.email || '?').charAt(0).toUpperCase()}</div>
                          <div>
                            <h3>{selectedUser.name || 'Unknown'}</h3>
                            <p>{selectedUser.email}</p>
                          </div>
                        </div>
                        <div className="user-detail-grid">
                          <div className="detail-item">
                            <label>Plan</label>
                            <span className={`plan-badge ${(selectedUser.plan || 'free').toLowerCase()}`}>{selectedUser.plan || 'Free'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Status</label>
                            <span className={`status-badge ${selectedUser.status || 'active'}`}>{selectedUser.status || 'active'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Admin</label>
                            <span className={`status-badge ${selectedUser.isAdmin ? 'active' : 'inactive'}`}>
                              {selectedUser.isAdmin ? '✓ Yes' : 'No'}
                            </span>
                          </div>
                          <div className="detail-item">
                            <label>Joined</label>
                            <span>{selectedUser.joined || 'N/A'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Last Active</label>
                            <span>{selectedUser.lastActive || 'Never'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Simulations Played</label>
                            <span>{selectedUser.simulations || 0}</span>
                          </div>
                          <div className="detail-item">
                            <label>Completions</label>
                            <span>{selectedUser.completions || 0}</span>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button 
                          className={`admin-btn ${selectedUser.isAdmin ? 'danger' : 'primary'}`}
                          onClick={() => {
                            handleToggleAdmin(selectedUser.id, selectedUser.isAdmin);
                            setSelectedUser(prev => ({ ...prev, isAdmin: !prev.isAdmin }));
                          }}
                        >
                          {selectedUser.isAdmin ? '👑 Remove Admin' : '👑 Make Admin'}
                        </button>
                        <button className="admin-btn">Send Email</button>
                        <button className="admin-btn danger">Suspend User</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {adminTab === 'analytics' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>Analytics</h1>
                  <p>Platform performance and user engagement metrics</p>
                </div>

                {/* Weekly Activity Chart */}
                <div className="admin-chart-section">
                  <h3>Weekly Activity</h3>
                  <div className="bar-chart">
                    {adminData.analytics.weeklyActivity.map((day, i) => (
                      <div key={i} className="bar-group">
                        <div className="bar-container">
                          <div className="bar users" style={{height: `${(day.users / 600) * 100}%`}} title={`${day.users} users`}></div>
                          <div className="bar sessions" style={{height: `${(day.sessions / 1000) * 100}%`}} title={`${day.sessions} sessions`}></div>
                        </div>
                        <span className="bar-label">{day.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chart-legend">
                    <span><i className="legend-dot users"></i> Users</span>
                    <span><i className="legend-dot sessions"></i> Sessions</span>
                  </div>
                </div>

                {/* Popular Simulations */}
                <div className="admin-section">
                  <h3>Popular Simulations</h3>
                  {adminData.analytics.popularSimulations?.length > 0 ? (
                    <div className="sim-rankings">
                      {adminData.analytics.popularSimulations.map((sim, i) => (
                        <div key={sim.id || i} className="sim-rank-item">
                          <span className="rank">#{i + 1}</span>
                          <div className="sim-rank-info">
                            <strong>{sim.name}</strong>
                            <div className="sim-rank-stats">
                              <span>🎮 {(sim.plays || 0).toLocaleString()} plays</span>
                              <span>✅ {(sim.completions || 0).toLocaleString()} completions</span>
                              <span>⭐ {sim.avgScore || 0} avg score</span>
                            </div>
                          </div>
                          <div className="completion-rate">
                            {sim.plays > 0 ? Math.round((sim.completions / sim.plays) * 100) : 0}%
                            <span>completion</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">📊</div>
                      <p>No simulation data yet</p>
                    </div>
                  )}
                </div>

                {/* Grade Distribution */}
                <div className="admin-section">
                  <h3>Grade Distribution</h3>
                  <div className="grade-chart">
                    {Object.entries(adminData.analytics.gradeDistribution).map(([grade, pct]) => (
                      <div key={grade} className="grade-bar-item">
                        <span className="grade-label">{grade}</span>
                        <div className="grade-bar-container">
                          <div className={`grade-bar grade-${grade.toLowerCase()}`} style={{width: `${pct}%`}}></div>
                        </div>
                        <span className="grade-pct">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Revenue Tab */}
            {adminTab === 'revenue' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>Revenue</h1>
                  <p>Financial metrics and subscription analytics</p>
                </div>

                {/* Revenue Metrics */}
                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon green">📈</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.mrr.toLocaleString()}</span>
                      <span className="metric-label">Monthly Recurring Revenue</span>
                    </div>
                    <span className="metric-badge green">+{adminData.revenue.growth}%</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">📊</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.arr.toLocaleString()}</span>
                      <span className="metric-label">Annual Recurring Revenue</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">👤</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.ltv}</span>
                      <span className="metric-label">Customer LTV</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">📉</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.revenue.churnRate}%</span>
                      <span className="metric-label">Churn Rate</span>
                    </div>
                  </div>
                </div>

                {/* Subscription Breakdown */}
                <div className="admin-section">
                  <h3>Subscription Breakdown</h3>
                  <div className="subscription-breakdown">
                    {(() => {
                      const total = adminData.overview.totalUsers || 1;
                      const free = adminData.revenue.subscriptions?.free || 0;
                      const pro = adminData.revenue.subscriptions?.professional || 0;
                      const enterprise = adminData.revenue.subscriptions?.enterprise || 0;
                      return (
                        <>
                          <div className="sub-item free">
                            <div className="sub-info">
                              <span className="sub-plan">Free</span>
                              <span className="sub-count">{free.toLocaleString()} users</span>
                            </div>
                            <div className="sub-bar">
                              <div className="sub-bar-fill" style={{width: `${(free / total) * 100}%`}}></div>
                            </div>
                            <span className="sub-pct">{Math.round((free / total) * 100)}%</span>
                          </div>
                          <div className="sub-item professional">
                            <div className="sub-info">
                              <span className="sub-plan">Professional</span>
                              <span className="sub-count">{pro.toLocaleString()} users</span>
                            </div>
                            <div className="sub-bar">
                              <div className="sub-bar-fill" style={{width: `${(pro / total) * 100}%`}}></div>
                            </div>
                            <span className="sub-pct">{Math.round((pro / total) * 100)}%</span>
                          </div>
                          <div className="sub-item enterprise">
                            <div className="sub-info">
                              <span className="sub-plan">Enterprise</span>
                              <span className="sub-count">{enterprise.toLocaleString()} users</span>
                            </div>
                            <div className="sub-bar">
                              <div className="sub-bar-fill" style={{width: `${(enterprise / total) * 100}%`}}></div>
                            </div>
                            <span className="sub-pct">{Math.round((enterprise / total) * 100)}%</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="admin-section">
                  <h3>Recent Transactions</h3>
                  {adminData.revenue.recentTransactions?.length > 0 ? (
                    <div className="transactions-list">
                      {adminData.revenue.recentTransactions.map(txn => (
                        <div key={txn.id} className={`transaction-item ${txn.status}`}>
                          <div className="txn-info">
                            <strong>{txn.user}</strong>
                            <span>{txn.plan} Plan</span>
                          </div>
                          <div className="txn-amount">${txn.amount}</div>
                          <div className="txn-date">{txn.date}</div>
                          <span className={`txn-status ${txn.status}`}>{txn.status}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">💳</div>
                      <p>No transactions yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content Tab */}
            {adminTab === 'content' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>Content Management</h1>
                  <p>Manage simulations, scenarios, and learning content</p>
                </div>

                <div className="admin-toolbar">
                  <div className="search-box">
                    <span>🔍</span>
                    <input type="text" placeholder="Search content..." />
                  </div>
                  <div className="toolbar-actions">
                    <button className="admin-btn primary">+ New Simulation</button>
                  </div>
                </div>

                <div className="content-grid">
                  {adminData.content.simulations.map(sim => (
                    <div key={sim.id} className="content-card">
                      <div className="content-header">
                        <h4>{sim.name}</h4>
                        <span className={`content-status ${sim.status}`}>{sim.status}</span>
                      </div>
                      <div className="content-stats">
                        <span>🎮 {sim.plays.toLocaleString()} plays</span>
                        {sim.rating && <span>⭐ {sim.rating}</span>}
                      </div>
                      <div className="content-meta">
                        Last updated: {sim.lastUpdated}
                      </div>
                      <div className="content-actions">
                        <button className="admin-btn small">Edit</button>
                        <button className="admin-btn small">Preview</button>
                        {sim.status === 'draft' && <button className="admin-btn small primary">Publish</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Tab */}
            {adminTab === 'system' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>System Health</h1>
                  <p>Monitor platform performance and system status</p>
                </div>

                {/* System Metrics */}
                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon green">✅</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.uptime}%</span>
                      <span className="metric-label">Uptime</span>
                    </div>
                    <span className="metric-badge green">Healthy</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">⚡</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.avgResponseTime}ms</span>
                      <span className="metric-label">Avg Response Time</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">⚠️</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.errorRate}%</span>
                      <span className="metric-label">Error Rate</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">🔌</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.activeConnections}</span>
                      <span className="metric-label">Active Connections</span>
                    </div>
                  </div>
                </div>

                {/* Resource Usage */}
                <div className="admin-section">
                  <h3>Resource Usage</h3>
                  <div className="resource-grid">
                    <div className="resource-item">
                      <div className="resource-header">
                        <span>CPU Usage</span>
                        <span>{adminData.system.cpuUsage}%</span>
                      </div>
                      <div className="resource-bar">
                        <div className="resource-fill cpu" style={{width: `${adminData.system.cpuUsage}%`}}></div>
                      </div>
                    </div>
                    <div className="resource-item">
                      <div className="resource-header">
                        <span>Memory Usage</span>
                        <span>{adminData.system.memoryUsage}%</span>
                      </div>
                      <div className="resource-bar">
                        <div className="resource-fill memory" style={{width: `${adminData.system.memoryUsage}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Errors */}
                <div className="admin-section">
                  <h3>Recent Errors</h3>
                  <div className="errors-list">
                    {adminData.system.recentErrors.map((err, i) => (
                      <div key={i} className="error-item">
                        <span className="error-time">{err.time}</span>
                        <span className="error-type">{err.type}</span>
                        <span className="error-msg">{err.message}</span>
                        <span className="error-count">×{err.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="admin-section">
                  <h3>Quick Actions</h3>
                  <div className="system-actions">
                    <button className="admin-btn">🔄 Clear Cache</button>
                    <button className="admin-btn">📊 Export Logs</button>
                    <button className="admin-btn">🔧 Run Diagnostics</button>
                    <button className="admin-btn danger">🚨 Maintenance Mode</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="dashboard-page">
      {renderNavbar()}
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <button className="sidebar-btn" onClick={() => startSimulation('project-apex')}>▶️ Play Project Apex</button>
            <button className="sidebar-btn" onClick={() => setCurrentPage('catalog')}>📚 Browse Simulations</button>
          </div>
          <div className="sidebar-section">
            <h3>Your Stats</h3>
            <div className="stat-item"><span>Simulations Played</span><strong>{userScores.scores?.length || 0}</strong></div>
            <div className="stat-item"><span>Best Grade</span><strong>{userScores.bestScores?.[0]?.grade || '-'}</strong></div>
            <div className="stat-item"><span>High Score</span><strong>{userScores.bestScores?.[0]?.score || 0}</strong></div>
          </div>
        </aside>
        <main className="dashboard-main">
          <div className="welcome-card">
            <h1>Welcome back, {currentUser?.name?.split(' ')[0]}!</h1>
            <p>Ready to continue your learning journey?</p>
          </div>
          
          <div className="dashboard-section">
            <h2>Recent Scores</h2>
            {userScores.scores?.length > 0 ? (
              <div className="scores-list">
                {userScores.scores.slice(0, 5).map((score, idx) => {
                  const dateStr = score.created_at ? new Date(score.created_at).toLocaleDateString() : '';
                  const isValidDate = dateStr && dateStr !== 'Invalid Date';
                  return (
                    <div key={idx} className="score-item">
                      <div className="score-info">
                        <span className="score-scenario">{score.scenario_id?.replace('_', ' ') || 'Unknown'}</span>
                        <span className="score-date">{isValidDate ? dateStr : 'Recent'}</span>
                      </div>
                      <div className="score-result">
                        <span className="score-grade">{score.grade}</span>
                        <span className="score-points">{score.score} pts</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-scores">No scores yet. Start playing to track your progress!</p>
            )}
          </div>
          
          <div className="dashboard-section">
            <h2>Featured Simulation</h2>
            <div className="featured-sim-card" onClick={() => startSimulation('project-apex')}>
              <div className="featured-sim-icon">🎯</div>
              <div className="featured-sim-content">
                <h3>Project Apex</h3>
                <p>Master project management with our enhanced causal model simulation.</p>
                <span className="featured-sim-cta">Play Now →</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  const renderCatalog = () => (
    <div className="catalog-page">
      {renderNavbar()}
      <div className="catalog-container">
        <div className="catalog-header">
          <h1>Simulation Library</h1>
          <p>Choose your learning adventure</p>
        </div>
        <div className="catalog-grid">
          {SIMULATIONS.map(sim => (
            <div key={sim.id} className={`catalog-card ${sim.comingSoon ? 'locked' : ''}`}>
              <div className="catalog-card-header">
                <span className="catalog-icon">{sim.icon}</span>
                <div className="catalog-badges">
                  {sim.featured && <span className="badge-featured">Available</span>}
                  {sim.comingSoon && <span className="badge-soon">Coming Soon</span>}
                  {sim.tier === 'pro' && <span className="badge-pro">PRO</span>}
                </div>
              </div>
              <div className="catalog-card-body">
                <span className="catalog-category">{sim.category}</span>
                <h3>{sim.title}</h3>
                <p className="catalog-subtitle">{sim.subtitle}</p>
                <p className="catalog-desc">{sim.description}</p>
                <div className="catalog-skills">
                  {sim.skills?.slice(0, 3).map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
                </div>
              </div>
              <div className="catalog-card-footer">
                <div className="catalog-meta">
                  <span>🎯 {sim.difficulty}</span>
                  <span>⏱️ {sim.duration}</span>
                  <span>📊 {sim.scenarios} scenarios</span>
                </div>
                <button 
                  className="btn-primary btn-full"
                  disabled={!sim.available}
                  onClick={() => sim.available && startSimulation(sim.id)}
                >
                  {sim.comingSoon ? 'Coming Soon' : 'Start Simulation'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="pricing-page">
      {renderNavbar()}
      <div className="pricing-container">
        <div className="pricing-header">
          <h1>Simple, Transparent Pricing</h1>
          <p>Choose the plan that fits your learning goals</p>
          <div className="billing-toggle">
            <button className={billingCycle === 'monthly' ? 'active' : ''} onClick={() => setBillingCycle('monthly')}>Monthly</button>
            <button className={billingCycle === 'annual' ? 'active' : ''} onClick={() => setBillingCycle('annual')}>Annual (Save 17%)</button>
          </div>
        </div>
        <div className="pricing-grid">
          {PRICING_PLANS.filter(plan => !plan.hidden).map(plan => (
            <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3>{plan.name}</h3>
              <p className="plan-desc">{plan.description}</p>
              <div className="plan-price">
                <span className="price">${billingCycle === 'annual' ? Math.round(plan.priceAnnual / 12) : plan.price}</span>
                <span className="period">/{plan.price === 0 ? 'forever' : 'month'}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map(f => <li key={f}>✓ {f}</li>)}
              </ul>
              <button 
                className={`btn-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => plan.id !== 'free' && handleCheckout(plan.id)}
                disabled={checkoutLoading === plan.id || plan.id === 'free'}
              >
                {checkoutLoading === plan.id ? 'Loading...' : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ENHANCED SIMULATION RENDERING
  const renderSimulation = () => {
    if (simPhase === 'select') {
      return (
        <div className="sim-page">
          {renderNavbar()}
          <div className="sim-select-container">
            <button className="back-link" onClick={() => setCurrentPage('catalog')}>← Back to Library</button>
            <div className="sim-select-header">
              <span className="sim-select-icon">{selectedSimulation?.icon}</span>
              <h1>{selectedSimulation?.title}</h1>
              <p>{selectedSimulation?.description}</p>
            </div>
            <h3 className="scenarios-title">Choose Your Scenario</h3>
            <div className="scenarios-grid">
              {Object.values(APEX_SCENARIOS).map(scenario => (
                <button key={scenario.id} className="scenario-card" onClick={() => selectScenario(scenario)}>
                  <div className="scenario-icon">{scenario.icon}</div>
                  <div className="scenario-info">
                    <h3>{scenario.title}</h3>
                    <p className="scenario-sub">{scenario.subtitle}</p>
                    <p className="scenario-desc">{scenario.description}</p>
                    {scenario.hasPrototyping && <span className="scenario-badge">🔬 Prototyping Available</span>}
                    {scenario.hasUncertainty && <span className="scenario-badge">⚡ High Uncertainty</span>}
                  </div>
                  <div className="scenario-meta">
                    <span className="difficulty" style={{color: scenario.difficultyColor}}>{scenario.difficulty}</span>
                    <span>{scenario.initial.weeks} weeks</span>
                    <span>Focus: {scenario.pedagogicalFocus}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (simPhase === 'brief') {
      // Generate scenario-specific brief content
      const getProjectBrief = () => {
        const briefs = {
          tech_startup: {
            context: `You are a senior project manager at ${selectedScenario.company}, a fast-growing technology company specializing in cloud-based business solutions. The company has identified a significant market opportunity for a new SaaS platform that will compete with established players.`,
            challenge: `Your CEO has tasked you with assembling and leading a product development team to deliver this platform. Market analysis suggests that competitors are working on similar solutions, putting pressure on you and your team to deliver a high-quality product that can capture market share.`,
            deliverables: [
              { level: 1, name: 'Core Platform', desc: 'Basic user management, authentication, and data storage', tasks: 3 },
              { level: 2, name: 'Standard Features', desc: 'Dashboard, reporting, and API integrations', tasks: 4 },
              { level: 3, name: 'Advanced Features', desc: 'Analytics, automation, and multi-tenant support', tasks: 3 },
              { level: 4, name: 'Premium Features', desc: 'AI-powered insights and enterprise security', tasks: 2 }
            ]
          },
          live_show: {
            context: `You are the Executive Producer at ${selectedScenario.company}, a world-renowned live entertainment company. The company has greenlit an ambitious new touring show that combines acrobatics, music, and cutting-edge technology.`,
            challenge: `Your artistic director has a bold vision for "${selectedScenario.projectName}" but the technical and creative demands are significant. You must manage a diverse team of performers, technicians, and designers while ensuring safety standards are met and the show is ready for its premiere.`,
            deliverables: [
              { level: 1, name: 'Foundation Acts', desc: 'Opening sequence and core ensemble performances', tasks: 2 },
              { level: 2, name: 'Feature Acts', desc: 'Aerial sequences and specialty performances', tasks: 2 },
              { level: 3, name: 'Technical Integration', desc: 'Lighting, sound, and projection mapping', tasks: 2 },
              { level: 4, name: 'Grand Finale', desc: 'Climactic sequence with full cast integration', tasks: 2 }
            ]
          },
          construction: {
            context: `You are the Project Manager at ${selectedScenario.company}, a commercial construction company with a strong reputation for quality. The company has won the contract to build a new mixed-use development in a prime urban location.`,
            challenge: `The "${selectedScenario.projectName}" project involves a 12-story building with retail, office, and residential spaces. You must navigate permitting, weather challenges, subcontractor coordination, and safety requirements while meeting stakeholder expectations.`,
            deliverables: [
              { level: 1, name: 'Foundation & Parking', desc: 'Underground parking and structural foundation', tasks: 3 },
              { level: 2, name: 'Core Structure', desc: 'Floors 1-6 with retail and office space', tasks: 4 },
              { level: 3, name: 'Upper Floors', desc: 'Floors 7-10 residential units', tasks: 3 },
              { level: 4, name: 'Penthouse & Systems', desc: 'Floors 11-12 and building systems integration', tasks: 2 }
            ]
          },
          rd_innovation: {
            context: `You are the Lead Project Manager at ${selectedScenario.company}, a cutting-edge research and development laboratory. The company has secured funding to develop a breakthrough quantum sensing technology with applications in medical imaging and security.`,
            challenge: `The "${selectedScenario.projectName}" project is highly innovative with significant technical uncertainty. Your team of scientists and engineers must push the boundaries of current technology while managing the risks inherent in R&D work. Prototyping will be essential to surface problems early.`,
            deliverables: [
              { level: 1, name: 'Proof of Concept', desc: 'Demonstrate basic quantum sensing capability', tasks: 2 },
              { level: 2, name: 'Prototype Alpha', desc: 'Functional prototype with core features', tasks: 3 },
              { level: 3, name: 'Prototype Beta', desc: 'Refined prototype with improved accuracy', tasks: 3 },
              { level: 4, name: 'Production Ready', desc: 'Manufacturable design with documentation', tasks: 2 }
            ]
          }
        };
        return briefs[selectedScenario.id] || briefs.tech_startup;
      };

      const brief = getProjectBrief();
      const totalTasks = brief.deliverables.reduce((sum, d) => sum + d.tasks, 0);

      return (
        <div className="sim-page">
          {renderNavbar()}
          <div className="brief-container hbp-style">
            <button className="back-link" onClick={() => { setSimPhase('select'); setBriefTab('brief'); }}>← Back to Scenarios</button>
            
            <div className="brief-header">
              <div className="brief-icon">{selectedScenario.icon}</div>
              <div>
                <h1>{selectedScenario.projectName}</h1>
                <p className="brief-company">{selectedScenario.company}</p>
              </div>
            </div>

            {/* HBP-Style Tabs */}
            <div className="brief-tabs">
              <button 
                className={`brief-tab ${briefTab === 'brief' ? 'active' : ''}`}
                onClick={() => setBriefTab('brief')}
              >
                Project Brief
              </button>
              <button 
                className={`brief-tab ${briefTab === 'objectives' ? 'active' : ''}`}
                onClick={() => setBriefTab('objectives')}
              >
                Scenario Objectives
              </button>
              <button 
                className={`brief-tab ${briefTab === 'managing' ? 'active' : ''}`}
                onClick={() => setBriefTab('managing')}
              >
                Managing Your Project
              </button>
            </div>

            <div className="brief-tab-content">
              {/* Project Brief Tab */}
              {briefTab === 'brief' && (
                <div className="tab-panel">
                  <h2>Project Brief: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">{brief.context}</p>
                  <p className="brief-paragraph">{brief.challenge}</p>

                  <h3>Project Deliverables</h3>
                  <p>Your project consists of {selectedScenario.initial.scope} {selectedScenario.deliverable} organized into progressive levels. Each level builds on the previous, allowing you to adjust scope mid-course if desired.</p>
                  
                  <div className="deliverables-list">
                    {brief.deliverables.map((d, i) => (
                      <div key={i} className="deliverable-item">
                        <div className="deliverable-icon">📋</div>
                        <div className="deliverable-content">
                          <strong>LEVEL {d.level}: {d.name.toUpperCase()}</strong>
                          <p>{d.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scenario Objectives Tab */}
              {briefTab === 'objectives' && (
                <div className="tab-panel">
                  <h2>Scenario Objectives: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">
                    Management expects you to deliver this project meeting the targets below. 
                    You will be evaluated on your ability to balance scope, schedule, budget, quality, and team wellbeing. 
                    Meeting all targets demonstrates strong project management capability.
                  </p>

                  <div className="objectives-section">
                    <h3>Specific Objectives</h3>

                    <div className="objective-block">
                      <h4>Target Scope: <span className="highlight">{selectedScenario.initial.scope} {selectedScenario.deliverable}</span></h4>
                      <p>
                        You will receive up to 200 points for delivering the full scope. 
                        Partial completion will result in proportionally fewer points. 
                        Exceeding scope expectations may earn bonus points but watch the budget.
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>Target Schedule: <span className="highlight">Week {selectedScenario.initial.weeks}</span></h4>
                      <p>
                        This schedule allows you to meet stakeholder expectations and market timing. 
                        You will receive 200 points for meeting your schedule goal and lose 40 points for each week you exceed the deadline.
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>Target Budget: <span className="highlight">${(selectedScenario.initial.budget / 1000).toFixed(0)}K</span></h4>
                      <p>
                        This budget supports the project at planned staffing levels. 
                        You will receive up to 200 points for staying within budget. 
                        Coming in under budget will maximize your score.
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>Target Quality: <span className="highlight">{selectedScenario.initial.quality}%+</span></h4>
                      <p>
                        Deliver a high-quality product that meets stakeholder standards. 
                        Quality is worth 200 points and can be improved through quality reviews and avoiding shortcuts.
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>Team Process: <span className="highlight">100 points</span></h4>
                      <p>
                        Maintain healthy team dynamics throughout the project. 
                        This score reflects average morale, with bonuses for schedule consistency and prototype usage.
                      </p>
                    </div>
                  </div>

                  <div className="scoring-summary">
                    <h4>📊 Total Possible Score: 1000 points</h4>
                    <div className="score-breakdown">
                      <span>Scope: 200</span>
                      <span>Schedule: 200</span>
                      <span>Budget: 200</span>
                      <span>Quality: 200</span>
                      <span>Team Process: 100</span>
                      <span>Bonuses: up to 100</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Managing Your Project Tab */}
              {briefTab === 'managing' && (
                <div className="tab-panel">
                  <h2>Managing Your Project: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">
                    Each week you will have opportunities to adjust project parameters and make decisions. 
                    Understanding the causal relationships in your project will help you make better choices.
                  </p>

                  <div className="managing-section">
                    <h3>1. The Causal Model</h3>
                    <p>This simulation uses interconnected systems where your decisions have cascading effects:</p>
                    
                    <div className="causal-relationships">
                      <div className="causal-item">
                        <span className="causal-icon">😰</span>
                        <div>
                          <strong>Stress → Morale → Productivity</strong>
                          <p>Unrealistic deadlines, overtime, and team changes increase stress. High stress lowers morale, which directly reduces your team's output.</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">🧠</span>
                        <div>
                          <strong>Knowledge Building</strong>
                          <p>Your team starts with limited project knowledge. Coaching meetings and experience reduce mistake rates over time. Losing team members causes knowledge loss.</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">📅</span>
                        <div>
                          <strong>Schedule Consistency</strong>
                          <p>Frequent deadline changes erode team trust. Each change after week 2 incurs morale and stress penalties. Consistency is rewarded with bonus points.</p>
                        </div>
                      </div>
                      {selectedScenario.hasPrototyping && (
                        <div className="causal-item">
                          <span className="causal-icon">🔬</span>
                          <div>
                            <strong>Prototyping Value</strong>
                            <p>Building prototypes early surfaces problems before they become expensive. Events that would cause major issues are mitigated by prior prototype work.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="managing-section">
                    <h3>2. Weekly Actions</h3>
                    <p>Each week you can take several actions to manage your project:</p>
                    
                    <div className="actions-grid">
                      <div className="action-item">
                        <strong>👥 Team Management</strong>
                        <p>Hire or release team members. New hires increase capacity but cause temporary stress and knowledge dilution.</p>
                      </div>
                      <div className="action-item">
                        <strong>📅 Schedule Adjustment</strong>
                        <p>Extend your deadline if needed. Early adjustments are less costly than late ones.</p>
                      </div>
                      <div className="action-item">
                        <strong>🎯 Meetings</strong>
                        <p>Choose from coaching (builds knowledge), standups (reduces mistakes), or status reviews (stakeholder alignment).</p>
                      </div>
                      <div className="action-item">
                        <strong>⭐ Quality Review</strong>
                        <p>Invest time in improving deliverable quality. Costs budget but ensures better outcomes.</p>
                      </div>
                      <div className="action-item">
                        <strong>⚡ Crunch Mode</strong>
                        <p>Push the team to work overtime. Increases short-term output at the cost of stress and morale.</p>
                      </div>
                      {selectedScenario.hasPrototyping && (
                        <div className="action-item">
                          <strong>🔬 Build Prototype</strong>
                          <p>Invest in early testing to reduce future risks. Costs time and budget but provides significant protection.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="managing-section">
                    <h3>3. Events & Decisions</h3>
                    <p>
                      Throughout the project, you'll encounter events triggered by project conditions—not random chance. 
                      For example, high stress may cause team members to leave. Low quality triggers technical debt crises. 
                      Your choices in these moments significantly impact project outcomes.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="brief-actions">
              <button className="btn-primary btn-lg" onClick={beginSimulation}>Begin Simulation →</button>
            </div>
          </div>
        </div>
      );
    }

    if (simPhase === 'playing' && gameState) {
      const scenario = selectedScenario;
      const budgetRemaining = gameState.budget.total - gameState.budget.spent;
      const budgetPercent = (budgetRemaining / gameState.budget.total) * 100;
      const scopePercent = (gameState.scope.completed / gameState.scope.totalFeatures) * 100;
      const weeksRemaining = gameState.schedule.deadline - gameState.week + 1;
      
      // Calculate effective productivity for display
      const effectiveProductivity = calculateProductivityFromMorale(gameState.team.productivity, gameState.team.morale);
      
      return (
        <div className="sim-playing">
          {renderNavbar()}
          <div className="game-header">
            <div className="game-title">
              <div className="game-icon">{scenario.icon}</div>
              <div>
                <h2>{scenario.projectName}</h2>
                <span>{scenario.company}</span>
              </div>
            </div>
            <div className="week-badge">Week {gameState.week} / {gameState.totalWeeks}</div>
          </div>

          {/* Floating background shapes */}
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>

          {/* Gantt Chart Mascot - reacts to project health */}
          <GanttMascot mood={
            (budgetPercent < 20 || weeksRemaining <= 1 || gameState.team.stress > 80) ? 'stressed' :
            (budgetPercent < 40 || weeksRemaining <= 3 || gameState.team.stress > 60) ? 'concerned' :
            (scopePercent >= 90 && gameState.scope.quality >= 80) ? 'success' : 'normal'
          } />

          {/* ENHANCED DASHBOARD with circular gauges */}
          <div className="game-dashboard">
            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle 
                    className="gauge-fill" 
                    cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${Math.max(0, budgetPercent) * 2.51} 251`,
                      stroke: budgetPercent > 30 ? '#10b981' : '#ef4444'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">💰</span>
                  <span className="gauge-value">${(budgetRemaining / 1000).toFixed(0)}K</span>
                </div>
              </div>
              <span className="metric-label">Budget</span>
              <div className={`status-glow ${budgetPercent > 50 ? 'good' : budgetPercent > 30 ? 'warn' : 'bad'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle 
                    className="gauge-fill" 
                    cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${(weeksRemaining / gameState.totalWeeks) * 100 * 2.51} 251`,
                      stroke: weeksRemaining > 3 ? '#10b981' : weeksRemaining > 1 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">📅</span>
                  <span className="gauge-value">{Math.max(0, weeksRemaining)}</span>
                </div>
              </div>
              <span className="metric-label">Weeks Left</span>
              <div className={`status-glow ${weeksRemaining > 3 ? 'good' : weeksRemaining > 1 ? 'warn' : 'bad'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle 
                    className="gauge-fill" 
                    cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${scopePercent * 2.51} 251`,
                      stroke: '#6366f1'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">📦</span>
                  <span className="gauge-value">{Math.round(scopePercent)}%</span>
                </div>
              </div>
              <span className="metric-label">Scope</span>
              <div className={`status-glow ${scopePercent > 80 ? 'good' : scopePercent > 50 ? 'warn' : 'neutral'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle 
                    className="gauge-fill" 
                    cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${gameState.scope.quality * 2.51} 251`,
                      stroke: gameState.scope.quality > 70 ? '#10b981' : '#f59e0b'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">⭐</span>
                  <span className="gauge-value">{Math.round(gameState.scope.quality)}%</span>
                </div>
              </div>
              <span className="metric-label">Quality</span>
              <div className={`status-glow ${gameState.scope.quality > 80 ? 'good' : gameState.scope.quality > 60 ? 'warn' : 'bad'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container mini">
                <div className="team-display">
                  <span className="gauge-icon large">👥</span>
                  <span className="gauge-value large">{gameState.team.size}</span>
                </div>
              </div>
              <span className="metric-label">Team Size</span>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle 
                    className="gauge-fill" 
                    cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${gameState.team.morale * 2.51} 251`,
                      stroke: gameState.team.morale > 60 ? '#10b981' : gameState.team.morale > 40 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">😊</span>
                  <span className="gauge-value">{Math.round(gameState.team.morale)}%</span>
                </div>
              </div>
              <span className="metric-label">Morale</span>
              <div className={`status-glow ${gameState.team.morale > 70 ? 'good' : gameState.team.morale > 40 ? 'warn' : 'bad'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle 
                    className="gauge-fill stress" 
                    cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${gameState.team.stress * 2.51} 251`,
                      stroke: gameState.team.stress < 40 ? '#10b981' : gameState.team.stress < 60 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">😰</span>
                  <span className="gauge-value">{Math.round(gameState.team.stress)}%</span>
                </div>
              </div>
              <span className="metric-label">Stress</span>
              <div className={`status-glow ${gameState.team.stress < 30 ? 'good' : gameState.team.stress < 60 ? 'warn' : 'bad'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle 
                    className="gauge-fill" 
                    cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${gameState.team.knowledge * 2.51} 251`,
                      stroke: '#8b5cf6'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">🧠</span>
                  <span className="gauge-value">{Math.round(gameState.team.knowledge)}%</span>
                </div>
              </div>
              <span className="metric-label">Knowledge</span>
              <div className="status-glow neutral"></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle 
                    className="gauge-fill" 
                    cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${effectiveProductivity * 100 * 2.51} 251`,
                      stroke: '#06b6d4'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">⚡</span>
                  <span className="gauge-value">{Math.round(effectiveProductivity * 100)}%</span>
                </div>
              </div>
              <span className="metric-label">Productivity</span>
              <div className={`status-glow ${effectiveProductivity > 0.9 ? 'good' : 'neutral'}`}></div>
            </div>

            {scenario.hasPrototyping && (
              <div className="metric-card proto-card">
                <div className="gauge-container mini">
                  <div className="proto-display">
                    <span className="gauge-icon large">🔬</span>
                    <span className="gauge-value large">{gameState.prototypesBuilt}/{gameState.maxPrototypes}</span>
                  </div>
                </div>
                <span className="metric-label">Prototypes</span>
                {gameState.prototypesBuilt > 0 && <div className="status-glow good"></div>}
              </div>
            )}
          </div>

          <div className="game-actions">
            <h3>📋 Weekly Actions</h3>
            
            {/* Team Management */}
            <div className="action-section">
              <h4>👥 Team Management</h4>
              <div className="action-row">
                <button className="action-btn" onClick={() => handleAction({ type: 'fire' })} disabled={gameState.team.size <= 2}>
                  − Fire
                </button>
                <span className="action-label">{gameState.team.size} members</span>
                <button className="action-btn" onClick={() => handleAction({ type: 'hire', cost: scenario.weeklyCostPerPerson * 2 })}>
                  + Hire (${(scenario.weeklyCostPerPerson * 2 / 1000).toFixed(0)}K)
                </button>
              </div>
            </div>
            
            {/* NEW: Meeting Types (replacing boost morale) */}
            <div className="action-section">
              <h4>📅 Meetings This Week</h4>
              <div className="meeting-options">
                {Object.values(MEETING_TYPES).map(meeting => (
                  <button 
                    key={meeting.id}
                    className={`meeting-btn ${gameState.meetings[meeting.id] ? 'active' : ''}`}
                    onClick={() => handleAction({ type: `meeting_${meeting.id}` })}
                    disabled={gameState.meetings[meeting.id]}
                  >
                    <span className="meeting-icon">{meeting.icon}</span>
                    <span className="meeting-name">{meeting.name}</span>
                    <span className="meeting-desc">{meeting.description}</span>
                    {gameState.meetings[meeting.id] && <span className="meeting-done">✓ Done</span>}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="action-section">
              <h4>⚡ Quick Actions</h4>
              <div className="quick-actions">
                <button className="quick-btn" onClick={() => handleAction({ type: 'quality_review', cost: 10000 })}>
                  🔍 Quality Review ($10K)
                </button>
                <button className="quick-btn crunch" onClick={() => handleAction({ type: 'crunch', cost: 15000 })}>
                  🔥 Crunch Mode ($15K, -morale, +stress)
                </button>
                {scenario.hasPrototyping && gameState.prototypesBuilt < gameState.maxPrototypes && (
                  <button className="quick-btn proto" onClick={() => handleAction({ type: 'build_prototype' })}>
                    🔬 Build Prototype (${(PROTOTYPE_COST[scenario.id].budget / 1000).toFixed(0)}K)
                  </button>
                )}
                <button className="quick-btn schedule" onClick={() => handleAction({ type: 'extend_deadline' })}>
                  📅 Extend Deadline +1 week {gameState.scheduleChanges > 0 && '(penalty)'}
                </button>
              </div>
            </div>
            
            {/* Schedule change warning */}
            {gameState.scheduleChanges > 1 && (
              <div className="warning-banner">
                ⚠️ Schedule changed {gameState.scheduleChanges} times. Team morale affected by uncertainty.
              </div>
            )}
            
            <button className="btn-primary btn-advance" onClick={advanceWeek}>
              Advance to Week {gameState.week + 1} →
            </button>
          </div>

          {/* Event Modal with CSS Animation */}
          {gameState.gamePhase === 'event' && gameState.currentEvent && (
            <div className="event-overlay">
              <div className="event-modal">
                <div className="alert-bell">🔔</div>
                <span className="event-icon">{gameState.currentEvent.icon}</span>
                <h2>{gameState.currentEvent.title}</h2>
                <p>{gameState.currentEvent.description}</p>
                <div className="event-options">
                  {gameState.currentEvent.options.map(option => (
                    <button key={option.id} className="event-option" onClick={() => handleEventChoice(option)}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Paywall Modal for Free Users */}
          {showPaywall && (
            <div className="event-overlay">
              <div className="event-modal paywall-modal">
                <span className="event-icon">🔒</span>
                <h2>You're Doing Great!</h2>
                <p>
                  You've completed Week {FREE_TRIAL_WEEKS} of the simulation. 
                  Your project is {Math.round((gameState.scope.completed / gameState.scope.totalFeatures) * 100)}% complete 
                  and the team is counting on you!
                </p>
                <p className="paywall-hook">
                  <strong>Upgrade to Professional</strong> to continue your journey and see how your decisions 
                  play out. Will you deliver on time? Will the stakeholders be happy?
                </p>
                <div className="paywall-price">
                  <span className="price-tag">$19</span>
                  <span className="price-period">/month</span>
                </div>
                <div className="paywall-features">
                  <div>✓ Unlimited simulation plays</div>
                  <div>✓ All scenarios unlocked</div>
                  <div>✓ Detailed analytics</div>
                  <div>✓ Certificates of completion</div>
                </div>
                <div className="paywall-actions">
                  <button className="btn-primary paywall-upgrade" onClick={() => { setShowPaywall(false); setCurrentPage('pricing'); }}>
                    Upgrade Now →
                  </button>
                  <button className="btn-secondary paywall-later" onClick={() => { setShowPaywall(false); setSimPhase('select'); setGameState(null); }}>
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (simPhase === 'ended' && gameState) {
      const finalScore = calculateScore(gameState);
      const grade = getGrade(finalScore);
      const budgetOnTarget = gameState.budget.spent <= gameState.budget.total;
      const scheduleOnTarget = gameState.week <= gameState.schedule.deadline;
      const scopeComplete = gameState.scope.completed >= gameState.scope.totalFeatures * 0.95;
      const qualityGood = gameState.scope.quality >= 75;
      const isGreatScore = grade.startsWith('A') || grade === 'B+';
      const isPoorScore = grade === 'F' || grade === 'D';
      
      return (
        <div className="sim-ended">
          {/* CSS Confetti animation for great scores */}
          {isGreatScore && <Confetti />}
          
          <div className="end-card">
            {/* CSS Animated icon based on performance */}
            <div className="end-animation">
              {isGreatScore ? (
                <SuccessAnimation />
              ) : isPoorScore ? (
                <SadAnimation />
              ) : (
                <span className="end-icon">{grade === 'B' ? '🎉' : '💪'}</span>
              )}
            </div>
            
            <h1>Simulation Complete!</h1>
            <p>{selectedScenario.projectName}</p>
            
            <div className="score-display">
              <span className="grade" style={{color: grade.startsWith('A') ? '#10b981' : grade.startsWith('B') ? '#6366f1' : grade === 'C' ? '#f59e0b' : '#ef4444'}}>{grade}</span>
              <span className="score">{finalScore} / 1000 points</span>
            </div>

            <div className="results">
              <div className={`result ${budgetOnTarget ? 'pass' : 'fail'}`}>
                <span>{budgetOnTarget ? '✓' : '✗'}</span> Budget: ${(gameState.budget.spent / 1000).toFixed(0)}K / ${(gameState.budget.total / 1000).toFixed(0)}K
              </div>
              <div className={`result ${scheduleOnTarget ? 'pass' : 'fail'}`}>
                <span>{scheduleOnTarget ? '✓' : '✗'}</span> Schedule: Week {gameState.week} / {gameState.schedule.deadline}
              </div>
              <div className={`result ${scopeComplete ? 'pass' : 'fail'}`}>
                <span>{scopeComplete ? '✓' : '✗'}</span> Scope: {Math.round((gameState.scope.completed / gameState.scope.totalFeatures) * 100)}% complete
              </div>
              <div className={`result ${qualityGood ? 'pass' : 'fail'}`}>
                <span>{qualityGood ? '✓' : '✗'}</span> Quality: {Math.round(gameState.scope.quality)}%
              </div>
              <div className="result pass">
                <span>📊</span> Team Process: {Math.round(gameState.moraleHistory.reduce((a, b) => a + b, 0) / gameState.moraleHistory.length)}% avg morale
              </div>
              {gameState.scheduleChanges <= 1 && (
                <div className="result pass">
                  <span>🎯</span> Consistency Bonus: +{gameState.scheduleChanges <= 1 ? 50 : 25} pts
                </div>
              )}
              {gameState.prototypesBuilt > 0 && (
                <div className="result pass">
                  <span>🔬</span> Prototype Bonus: +{gameState.prototypesBuilt * 25} pts
                </div>
              )}
            </div>

            <div className="end-actions">
              <button className="btn-primary" onClick={beginSimulation}>Play Again</button>
              <button className="btn-secondary" onClick={() => { setSimPhase('select'); setGameState(null); }}>Try Different Scenario</button>
              <button className="btn-secondary" onClick={() => setCurrentPage('dashboard')}>Back to Dashboard</button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // ============================================
  // STYLES
  // ============================================

  return (
    <div className="app">
      <style>{`
        :root {
          --bg-primary: #0a0a0f;
          --bg-secondary: #12121a;
          --bg-card: #1a1a24;
          --bg-elevated: #242430;
          --text-primary: #ffffff;
          --text-secondary: #b4b4c0;
          --text-muted: #6b6b7a;
          --accent-primary: #6366f1;
          --accent-secondary: #8b5cf6;
          --border: #2a2a38;
          --border-hover: #3a3a4a;
          --success: #10b981;
          --warning: #f59e0b;
          --error: #ef4444;
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          line-height: 1.6;
        }
        
        .app { min-height: 100vh; }
        
        button { cursor: pointer; font-family: inherit; }
        
        /* Navbar */
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1rem 2rem; background: rgba(10, 10, 15, 0.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
        .navbar-transparent { background: transparent; border-bottom: none; }
        .nav-container { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        .logo-icon { font-size: 1.5rem; }
        .logo-text { font-size: 1.25rem; font-weight: 700; }
        .logo-accent { color: var(--accent-primary); }
        .nav-links { display: flex; align-items: center; gap: 1rem; }
        .nav-link { background: none; border: none; color: var(--text-secondary); font-size: 0.95rem; padding: 0.5rem 1rem; transition: color 0.2s; }
        .nav-link:hover { color: var(--text-primary); }
        .nav-btn-primary { background: var(--accent-primary); border: none; color: white; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 500; transition: opacity 0.2s; }
        .nav-btn-primary:hover { opacity: 0.9; }
        .nav-user { display: flex; align-items: center; gap: 0.75rem; padding-left: 1rem; border-left: 1px solid var(--border); }
        .user-avatar { width: 32px; height: 32px; background: var(--accent-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; }
        .user-name { font-size: 0.9rem; color: var(--text-secondary); }
        .nav-link-small { background: none; border: none; color: var(--text-muted); font-size: 0.85rem; }
        
        /* Buttons */
        .btn-primary { background: var(--accent-primary); border: none; color: white; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .btn-secondary { background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text-primary); padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; }
        .btn-secondary:hover { border-color: var(--border-hover); background: var(--bg-card); }
        .btn-full { width: 100%; }
        .btn-lg { padding: 1rem 2rem; font-size: 1.1rem; }
        .btn-primary-lg { background: var(--accent-primary); border: none; color: white; padding: 1rem 2rem; border-radius: 12px; font-weight: 600; font-size: 1.1rem; }
        .btn-secondary-lg { background: transparent; border: 1px solid var(--border); color: var(--text-primary); padding: 1rem 2rem; border-radius: 12px; font-weight: 500; font-size: 1.1rem; }
        
        /* Toast */
        .toast { position: fixed; bottom: 2rem; right: 2rem; padding: 1rem 1.5rem; border-radius: 12px; background: var(--bg-card); border: 1px solid var(--border); z-index: 1000; animation: slideIn 0.3s ease; }
        .toast.success { border-color: var(--success); }
        .toast.error { border-color: var(--error); }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        
        /* Landing Page */
        .landing-page { min-height: 100vh; }
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 0 2rem; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, transparent 60%); }
        .hero-content { position: relative; text-align: center; padding: 2rem; max-width: 700px; z-index: 2; }
        .hero-animation { 
          position: absolute; 
          right: 5%; 
          top: 50%; 
          transform: translateY(-50%); 
          opacity: 0.9;
          z-index: 1;
          display: none;
        }
        /* CSS Rocket Animation */
        .rocket-container {
          position: relative;
          width: 200px;
          height: 200px;
        }
        .rocket {
          font-size: 6rem;
          animation: rocketFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 20px 40px rgba(99, 102, 241, 0.3));
          display: block;
          text-align: center;
        }
        @keyframes rocketFloat {
          0%, 100% { transform: translateY(0) rotate(-45deg); }
          50% { transform: translateY(-20px) rotate(-45deg); }
        }
        .rocket-trail {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 80px;
          background: linear-gradient(to bottom, #f59e0b, #ef4444, transparent);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.8;
          animation: trailPulse 0.5s ease-in-out infinite alternate;
        }
        @keyframes trailPulse {
          0% { height: 60px; opacity: 0.6; }
          100% { height: 100px; opacity: 1; }
        }
        @media (min-width: 1200px) {
          .hero-animation { display: block; }
          .hero { justify-content: flex-start; padding-left: 10%; }
          .hero-content { text-align: left; }
          .hero-cta { justify-content: flex-start; }
          .hero-stats { justify-content: flex-start; }
        }
        .hero-badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 50px; font-size: 0.9rem; color: var(--accent-primary); margin-bottom: 1.5rem; }
        .hero-title { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
        .gradient-text { background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-subtitle { font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 2rem; line-height: 1.7; }
        @media (min-width: 1200px) { .hero-subtitle { margin: 0 0 2rem; } }
        .hero-cta { display: flex; gap: 1rem; justify-content: center; margin-bottom: 3rem; }
        .hero-stats { display: flex; gap: 3rem; justify-content: center; }
        .stat { text-align: center; }
        .stat-num { display: block; font-size: 2.5rem; font-weight: 700; color: var(--accent-primary); }
        .stat-label { font-size: 0.9rem; color: var(--text-muted); }
        
        /* Featured Section */
        .featured-section, .simulations-section { padding: 5rem 2rem; }
        .section-container { max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-badge { display: inline-block; padding: 0.4rem 0.8rem; background: rgba(99, 102, 241, 0.15); border-radius: 4px; font-size: 0.8rem; color: var(--accent-primary); font-weight: 600; margin-bottom: 1rem; }
        .section-header h2 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .section-header p { color: var(--text-muted); font-size: 1.1rem; }
        .featured-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 3rem; display: flex; gap: 3rem; align-items: center; }
        .featured-icon { font-size: 5rem; background: var(--bg-elevated); padding: 2rem; border-radius: 24px; }
        .featured-content h3 { font-size: 1.75rem; margin-bottom: 1rem; }
        .featured-content p { color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.7; }
        .featured-tags { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
        .featured-tags span { padding: 0.4rem 0.8rem; background: var(--bg-elevated); border-radius: 6px; font-size: 0.85rem; color: var(--text-muted); }
        
        /* Sim Grid */
        .sim-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .sim-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; position: relative; transition: all 0.3s; }
        .sim-card:hover { border-color: var(--border-hover); transform: translateY(-4px); }
        .sim-card.coming-soon { opacity: 0.6; }
        .sim-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .sim-category { font-size: 0.8rem; color: var(--accent-primary); font-weight: 500; margin-bottom: 0.25rem; }
        .sim-card h3 { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .sim-card p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem; }
        .sim-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: var(--text-muted); }
        .sim-badge-soon, .sim-badge-featured { position: absolute; top: 1rem; right: 1rem; padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .sim-badge-soon { background: var(--bg-elevated); color: var(--text-muted); }
        .sim-badge-featured { background: var(--success); color: white; }
        
        /* Footer */
        .footer { background: var(--bg-secondary); padding: 4rem 2rem 1rem; }
        .footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; padding-bottom: 3rem; border-bottom: 1px solid var(--border); }
        .footer-brand p { color: var(--text-muted); margin-top: 0.5rem; font-size: 0.9rem; }
        .footer-links { display: flex; gap: 4rem; }
        .footer-col h4 { font-size: 0.9rem; margin-bottom: 1rem; color: var(--text-muted); }
        .footer-col a { display: block; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem; text-decoration: none; }
        .footer-bottom { text-align: center; padding-top: 1.5rem; }
        .footer-bottom p { color: var(--text-muted); font-size: 0.85rem; }
        
        /* Auth Page */
        .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding-top: 80px; }
        .auth-container { width: 100%; max-width: 420px; padding: 2rem; }
        .auth-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2.5rem; }
        .auth-card h2 { font-size: 1.75rem; margin-bottom: 0.5rem; }
        .auth-subtitle { color: var(--text-muted); margin-bottom: 2rem; }
        .auth-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .form-group input { width: 100%; padding: 0.85rem 1rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-size: 1rem; }
        .form-group input:focus { outline: none; border-color: var(--accent-primary); }
        .auth-divider { text-align: center; margin: 1.5rem 0; color: var(--text-muted); font-size: 0.9rem; }
        .btn-google { width: 100%; padding: 0.85rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
        .google-icon { font-weight: 700; font-size: 1.1rem; }
        .auth-toggle { text-align: center; margin-top: 1.5rem; color: var(--text-muted); font-size: 0.9rem; }
        .auth-toggle button { background: none; border: none; color: var(--accent-primary); font-size: 0.9rem; }
        
        /* Dashboard - LIGHT THEME */
        .dashboard-page { 
          min-height: 100vh; 
          padding-top: 65px; 
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          color: #1e293b;
        }
        .dashboard-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #e2e8f0; }
        .dashboard-page .nav-link { color: #475569; }
        .dashboard-page .nav-link:hover { color: #1e293b; }
        .dashboard-page .user-name { color: #475569; }
        .dashboard-page .nav-link-small { color: #64748b; }
        
        .dashboard-layout { display: flex; max-width: 1400px; margin: 0 auto; }
        .sidebar { 
          width: 280px; 
          padding: 2rem; 
          border-right: 1px solid #e2e8f0; 
          min-height: calc(100vh - 65px); 
          background: #ffffff;
        }
        .sidebar-section { margin-bottom: 2rem; }
        .sidebar-section h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 1rem; font-weight: 600; }
        .sidebar-btn { 
          width: 100%; 
          padding: 0.85rem 1rem; 
          background: #f8fafc; 
          border: 1px solid #e2e8f0; 
          border-radius: 10px; 
          color: #1e293b; 
          font-size: 0.9rem; 
          text-align: left; 
          margin-bottom: 0.5rem; 
          transition: all 0.2s; 
          font-weight: 500;
        }
        .sidebar-btn:hover { border-color: #6366f1; background: #f0f0ff; }
        .stat-item { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; }
        .stat-item span { color: #64748b; }
        .stat-item strong { color: #1e293b; font-weight: 700; }
        .dashboard-main { flex: 1; padding: 2rem; }
        .welcome-card { 
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%); 
          border: none;
          border-radius: 24px; 
          padding: 2.5rem; 
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
          color: white;
        }
        .welcome-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%);
          animation: shimmer 8s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20%, 20%); }
        }
        .welcome-card h1 { font-size: 1.75rem; margin-bottom: 0.5rem; color: white; position: relative; z-index: 1; }
        .welcome-card p { color: rgba(255,255,255,0.9); position: relative; z-index: 1; }
        .dashboard-section { margin-bottom: 2rem; }
        .dashboard-section h2 { font-size: 1.25rem; margin-bottom: 1rem; color: #1e293b; }
        .scores-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .score-item { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 16px; 
          padding: 1rem 1.25rem; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
        }
        .score-item:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border-color: #c7d2fe;
        }
        .score-scenario { font-weight: 600; color: #1e293b; text-transform: capitalize; }
        .score-date { font-size: 0.85rem; color: #64748b; }
        .score-result { text-align: right; }
        .score-grade { font-size: 1.5rem; font-weight: 700; color: #4f46e5; margin-right: 0.75rem; }
        .score-points { color: #64748b; font-weight: 500; }
        .no-scores { color: #64748b; font-style: italic; }
        .featured-sim-card { 
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0; 
          border-radius: 20px; 
          padding: 1.5rem; 
          display: flex; 
          gap: 1.5rem; 
          cursor: pointer; 
          transition: all 0.4s ease; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }
        .featured-sim-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .featured-sim-card:hover { 
          border-color: #6366f1; 
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.15);
        }
        .featured-sim-card:hover::before { opacity: 1; }
        .featured-sim-icon { 
          font-size: 2.5rem; 
          background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
          padding: 1rem; 
          border-radius: 16px;
          position: relative;
          z-index: 1;
        }
        .featured-sim-content { position: relative; z-index: 1; }
        .featured-sim-content h3 { margin-bottom: 0.25rem; color: #1e293b; }
        .featured-sim-content p { color: #64748b; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .featured-sim-cta { color: #4f46e5; font-size: 0.9rem; font-weight: 600; }
        
        /* Catalog - LIGHT THEME */
        .catalog-page { 
          min-height: 100vh; 
          padding-top: 65px; 
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          color: #1e293b;
        }
        .catalog-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #e2e8f0; }
        .catalog-page .nav-link { color: #475569; }
        .catalog-page .nav-link:hover { color: #1e293b; }
        .catalog-page .user-name { color: #475569; }
        
        .catalog-container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
        .catalog-header { text-align: center; margin-bottom: 3rem; }
        .catalog-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #1e293b; }
        .catalog-header p { color: #64748b; }
        .catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.5rem; }
        .catalog-card { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 20px; 
          overflow: hidden; 
          display: flex; 
          flex-direction: column; 
          transition: all 0.3s; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .catalog-card:hover { border-color: #6366f1; transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .catalog-card.locked { opacity: 0.75; }
        .catalog-card-header { padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; }
        .catalog-icon { font-size: 3rem; }
        .catalog-badges { display: flex; gap: 0.5rem; }
        .badge-featured { padding: 0.25rem 0.6rem; background: #10b981; color: white; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .badge-soon { padding: 0.25rem 0.6rem; background: #f1f5f9; color: #64748b; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .badge-pro { padding: 0.25rem 0.6rem; background: #8b5cf6; color: white; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .catalog-card-body { padding: 0 1.5rem 1.5rem; flex: 1; }
        .catalog-category { font-size: 0.8rem; color: #4f46e5; font-weight: 600; }
        .catalog-card-body h3 { font-size: 1.4rem; margin: 0.25rem 0; color: #1e293b; }
        .catalog-subtitle { color: #475569; font-size: 0.95rem; margin-bottom: 0.75rem; }
        .catalog-desc { color: #64748b; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; }
        .catalog-skills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .skill-tag { padding: 0.25rem 0.6rem; background: #f1f5f9; border-radius: 4px; font-size: 0.75rem; color: #475569; font-weight: 500; }
        .catalog-card-footer { padding: 1.25rem 1.5rem; border-top: 1px solid #e2e8f0; background: #f8fafc; }
        .catalog-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: #64748b; margin-bottom: 1rem; }
        .catalog-card-footer button { width: 100%; }
        
        /* Pricing */
        .pricing-page { min-height: 100vh; padding-top: 80px; }
        .pricing-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .pricing-header { text-align: center; margin-bottom: 3rem; }
        .pricing-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .pricing-header p { color: var(--text-muted); margin-bottom: 1.5rem; }
        .billing-toggle { display: inline-flex; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; padding: 0.25rem; }
        .billing-toggle button { padding: 0.6rem 1.25rem; background: transparent; border: none; color: var(--text-muted); border-radius: 8px; font-size: 0.9rem; transition: all 0.2s; }
        .billing-toggle button.active { background: var(--accent-primary); color: white; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .pricing-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; position: relative; }
        .pricing-card.popular { border-color: var(--accent-primary); }
        .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent-primary); color: white; padding: 0.35rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .pricing-card h3 { font-size: 1.5rem; margin-bottom: 0.25rem; }
        .plan-desc { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
        .plan-price { margin-bottom: 1.5rem; }
        .plan-price .price { font-size: 3rem; font-weight: 700; }
        .plan-price .period { color: var(--text-muted); }
        .plan-features { list-style: none; margin-bottom: 2rem; }
        .plan-features li { padding: 0.5rem 0; color: var(--text-secondary); font-size: 0.95rem; }
        
        /* Simulation Pages - LIGHT THEME */
        .sim-page { 
          min-height: 100vh; 
          padding-top: 65px; 
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          color: #1e293b;
        }
        .sim-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #e2e8f0; }
        .sim-page .nav-link { color: #475569; }
        .sim-page .nav-link:hover { color: #1e293b; }
        .sim-page .user-name { color: #475569; }
        
        .sim-select-container, .brief-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .back-link { background: none; border: none; color: #4f46e5; font-family: inherit; font-size: 0.95rem; cursor: pointer; margin-bottom: 2rem; padding: 0; font-weight: 500; }
        .sim-select-header { text-align: center; margin-bottom: 3rem; }
        .sim-select-icon { font-size: 4rem; margin-bottom: 1rem; display: block; }
        .sim-select-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #1e293b; }
        .sim-select-header p { color: #64748b; }
        .scenarios-title { font-size: 1.25rem; margin-bottom: 1.5rem; color: #475569; }
        .scenarios-grid { display: flex; flex-direction: column; gap: 1rem; }
        .scenario-card { 
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
          border: 1px solid #e2e8f0; 
          border-radius: 20px; 
          padding: 1.5rem; 
          display: flex; 
          gap: 1.5rem; 
          align-items: flex-start; 
          text-align: left; 
          cursor: pointer; 
          transition: all 0.4s ease; 
          font-family: inherit; 
          color: #1e293b; 
          width: 100%; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }
        .scenario-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .scenario-card:hover { 
          border-color: #6366f1; 
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.15);
        }
        .scenario-card:hover::before { opacity: 1; }
        .scenario-icon { 
          font-size: 2.5rem; 
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 1rem; 
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          position: relative;
          z-index: 1;
        }
        .scenario-info { flex: 1; }
        .scenario-info h3 { font-size: 1.2rem; margin-bottom: 0.2rem; color: #1e293b; }
        .scenario-sub { color: #4f46e5; font-size: 0.9rem; margin-bottom: 0.5rem; font-weight: 500; }
        .scenario-desc { color: #64748b; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .scenario-badge { display: inline-block; padding: 0.25rem 0.5rem; background: #eef2ff; border-radius: 4px; font-size: 0.75rem; color: #4f46e5; margin-right: 0.5rem; font-weight: 500; }
        .scenario-meta { text-align: right; font-size: 0.85rem; color: #64748b; }
        .scenario-meta .difficulty { font-weight: 600; display: block; margin-bottom: 0.25rem; }
        
        /* Brief - LIGHT THEME */
        .brief-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
        .brief-icon { font-size: 3rem; background: #f8fafc; padding: 1.25rem; border-radius: 18px; border: 1px solid #e2e8f0; }
        .brief-header h1 { font-size: 2rem; margin-bottom: 0.25rem; color: #1e293b; }
        .brief-company { color: #4f46e5; font-weight: 500; }
        .brief-content { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 18px; 
          padding: 2rem; 
          margin-bottom: 2rem; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .brief-section { margin-bottom: 1.5rem; }
        .brief-section h3 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: #4f46e5; margin-bottom: 0.5rem; font-weight: 600; }
        .brief-section p { color: #475569; line-height: 1.7; }
        .mechanics-list { color: #475569; padding-left: 1.5rem; margin-top: 0.5rem; }
        .mechanics-list li { margin-bottom: 0.5rem; }
        .mechanics-list strong { color: #1e293b; }
        .brief-objectives h3 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: #4f46e5; margin-bottom: 1rem; font-weight: 600; }
        .objectives-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .objective { 
          background: #f8fafc; 
          border: 1px solid #e2e8f0;
          border-radius: 12px; 
          padding: 1rem; 
          display: flex; 
          flex-direction: column; 
          gap: 0.25rem; 
          text-align: center; 
        }
        .objective span:first-child { font-size: 1.25rem; }
        .objective strong { font-size: 0.7rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
        .objective span:last-child { font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #1e293b; }
        .brief-actions { display: flex; gap: 1rem; justify-content: center; }
        
        /* HBP-Style Tabbed Brief */
        .brief-container.hbp-style { max-width: 1000px; }
        .brief-tabs {
          display: flex;
          gap: 0;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 2rem;
        }
        .brief-tab {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          color: #64748b;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
          transition: all 0.2s;
        }
        .brief-tab:hover { color: #1e293b; }
        .brief-tab.active {
          color: #2563eb;
          border-bottom-color: #2563eb;
        }
        .brief-tab-content {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .tab-panel h2 {
          font-size: 1.75rem;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }
        .tab-panel h2 .highlight { color: #2563eb; }
        .tab-panel h3 {
          font-size: 1.25rem;
          color: #1e293b;
          margin: 2rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        .tab-panel h4 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 1.5rem 0 0.5rem;
        }
        .tab-panel h4 .highlight { color: #2563eb; font-weight: 600; }
        .brief-paragraph {
          color: #475569;
          line-height: 1.8;
          margin-bottom: 1.25rem;
          font-size: 1rem;
        }
        .deliverables-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .deliverable-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }
        .deliverable-icon { font-size: 1.5rem; opacity: 0.7; }
        .deliverable-content strong {
          display: block;
          color: #1e293b;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }
        .deliverable-content p {
          color: #64748b;
          font-size: 0.95rem;
          margin: 0;
        }
        .objectives-section { margin-top: 1.5rem; }
        .objective-block {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1rem;
        }
        .objective-block h4 { margin-top: 0; }
        .objective-block p {
          color: #64748b;
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .scoring-summary {
          background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
          border: 1px solid #c7d2fe;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
        }
        .scoring-summary h4 { margin: 0 0 1rem; color: #4338ca; }
        .score-breakdown {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .score-breakdown span {
          background: white;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #4338ca;
          font-weight: 500;
        }
        .managing-section { margin-bottom: 2rem; }
        .causal-relationships {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        .causal-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }
        .causal-icon { font-size: 1.5rem; }
        .causal-item strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .causal-item p {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }
        .action-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem 1.25rem;
        }
        .action-item strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .action-item p {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }
        @media (max-width: 768px) {
          .brief-tabs { flex-wrap: wrap; }
          .brief-tab { flex: 1; text-align: center; padding: 0.75rem; font-size: 0.9rem; }
          .actions-grid { grid-template-columns: 1fr; }
        }
        
        /* How to Play Modal - LIGHT THEME */
        .how-to-play-modal { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 24px; 
          padding: 2.5rem; 
          max-width: 600px; 
          width: 100%; 
          max-height: 80vh; 
          overflow-y: auto; 
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        .how-to-play-modal h2 { margin-bottom: 1.5rem; color: #1e293b; }
        .how-to-content h3 { color: #4f46e5; font-size: 1rem; margin: 1.5rem 0 0.5rem; }
        .how-to-content p, .how-to-content ul { color: #475569; font-size: 0.95rem; line-height: 1.7; }
        .how-to-content ul { padding-left: 1.5rem; }
        .how-to-content li { margin-bottom: 0.5rem; }
        .how-to-content strong { color: #1e293b; }
        
        /* ==========================================
           LIGHT THEME FOR SIMULATION GAMEPLAY
           ========================================== */
        
        /* Game Playing - LIGHT THEME */
        .sim-playing { 
          padding: 1.5rem; 
          background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #fdf2f8 100%); 
          min-height: 100vh; 
          color: #1e293b;
          position: relative;
          overflow-x: hidden;
        }
        .sim-playing .navbar { background: rgba(255, 255, 255, 0.9); border-bottom: 1px solid #e2e8f0; backdrop-filter: blur(10px); }
        .sim-playing .nav-link { color: #475569; }
        .sim-playing .nav-link:hover { color: #1e293b; }
        .sim-playing .user-name { color: #475569; }
        
        /* Floating Background Shapes */
        .floating-shapes {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          animation: float 25s ease-in-out infinite;
        }
        .shape-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          top: -150px;
          right: -150px;
          animation-delay: 0s;
        }
        .shape-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
          bottom: 5%;
          left: -100px;
          animation-delay: -8s;
        }
        .shape-3 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
          top: 40%;
          right: 5%;
          animation-delay: -16s;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.05); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }

        .game-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-top: 50px; position: relative; z-index: 1; }
        .game-title { display: flex; align-items: center; gap: 1rem; }
        .game-icon { 
          font-size: 2rem; 
          background: rgba(255,255,255,0.95); 
          padding: 0.75rem; 
          border-radius: 16px; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .game-title h2 { font-size: 1.4rem; margin-bottom: 0.15rem; color: #1e293b; }
        .game-title span { color: #64748b; font-size: 0.9rem; }
        .week-badge { 
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
          color: white; 
          padding: 0.6rem 1.5rem; 
          border-radius: 50px; 
          font-weight: 700;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
          animation: pulse-badge 3s ease-in-out infinite;
        }
        @keyframes pulse-badge {
          0%, 100% { box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); }
          50% { box-shadow: 0 4px 30px rgba(99, 102, 241, 0.6); }
        }
        
        /* Circular Gauge Dashboard */
        .game-dashboard { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); 
          gap: 0.75rem; 
          margin-bottom: 1.5rem; 
          position: relative;
          z-index: 1;
        }
        
        .metric-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 20px;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          border-color: rgba(99, 102, 241, 0.3);
        }
        
        .gauge-container {
          position: relative;
          width: 72px;
          height: 72px;
        }
        .gauge-container.mini {
          width: 65px;
          height: 65px;
        }
        
        .gauge {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        
        .gauge-bg {
          fill: none;
          stroke: #e2e8f0;
          stroke-width: 7;
        }
        
        .gauge-fill {
          fill: none;
          stroke-width: 7;
          stroke-linecap: round;
          transition: stroke-dasharray 0.6s ease, stroke 0.3s ease;
          filter: drop-shadow(0 0 4px currentColor);
        }
        
        .gauge-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
        }
        
        .gauge-icon {
          font-size: 1.1rem;
          line-height: 1;
        }
        .gauge-icon.large {
          font-size: 1.6rem;
        }
        
        .gauge-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: #1e293b;
        }
        .gauge-value.large {
          font-size: 1.1rem;
        }
        
        .metric-label {
          font-size: 0.65rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .team-display, .proto-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 2px;
        }
        
        /* Status Glow Effects */
        .status-glow {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 35px;
          height: 3px;
          border-radius: 2px;
        }
        .status-glow.good {
          background: #10b981;
          box-shadow: 0 0 10px #10b981, 0 0 20px rgba(16, 185, 129, 0.5);
          animation: glow-good 2s ease-in-out infinite;
        }
        .status-glow.warn {
          background: #f59e0b;
          box-shadow: 0 0 10px #f59e0b, 0 0 20px rgba(245, 158, 11, 0.5);
          animation: glow-warn 1.5s ease-in-out infinite;
        }
        .status-glow.bad {
          background: #ef4444;
          box-shadow: 0 0 10px #ef4444, 0 0 20px rgba(239, 68, 68, 0.5);
          animation: glow-bad 1s ease-in-out infinite;
        }
        .status-glow.neutral {
          background: #94a3b8;
          box-shadow: 0 0 6px rgba(148, 163, 184, 0.3);
        }
        
        @keyframes glow-good {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; box-shadow: 0 0 15px #10b981, 0 0 30px rgba(16, 185, 129, 0.6); }
        }
        @keyframes glow-warn {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; box-shadow: 0 0 15px #f59e0b, 0 0 30px rgba(245, 158, 11, 0.6); }
        }
        @keyframes glow-bad {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; box-shadow: 0 0 15px #ef4444, 0 0 30px rgba(239, 68, 68, 0.6); }
        }
        
        /* ========== GANTT MASCOT ========== */
        .gantt-mascot {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 100;
          transition: all 0.3s ease;
        }
        .gantt-svg {
          width: 100px;
          height: 85px;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
          transition: transform 0.3s ease;
        }
        .gantt-mascot:hover .gantt-svg {
          transform: scale(1.1);
        }
        .gantt-mascot:hover .mascot-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
        .mascot-tooltip {
          position: absolute;
          bottom: 100%;
          right: 0;
          background: rgba(0,0,0,0.85);
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          margin-bottom: 8px;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .mascot-tooltip::after {
          content: '';
          position: absolute;
          bottom: -6px;
          right: 20px;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid rgba(0,0,0,0.85);
        }
        
        /* Gantt bars animation */
        .gantt-mascot .bar {
          transition: all 0.5s ease;
        }
        
        /* Normal state */
        .gantt-mascot.normal .gantt-mouth { d: path("M50 60 Q55 65 60 60"); }
        .gantt-mascot.normal .explosion { opacity: 0; }
        
        /* Concerned state */
        .gantt-mascot.concerned .bar.b1 { width: 55px; }
        .gantt-mascot.concerned .bar.b2 { width: 60px; x: 35px; }
        .gantt-mascot.concerned .bar.b3 { width: 50px; }
        .gantt-mascot.concerned .gantt-mouth { d: path("M48 62 Q55 60 62 62"); }
        .gantt-mascot.concerned .explosion { opacity: 0; }
        .gantt-mascot.concerned .gantt-svg { animation: mascotWobble 2s ease-in-out infinite; }
        
        /* Stressed state */
        .gantt-mascot.stressed .bar {
          animation: barChaos 0.3s infinite;
        }
        .gantt-mascot.stressed .bar.b1 { width: 70px; fill: #ef4444; }
        .gantt-mascot.stressed .bar.b2 { width: 75px; x: 30px; fill: #ef4444; animation-delay: -0.1s; }
        .gantt-mascot.stressed .bar.b3 { width: 60px; fill: #f59e0b; animation-delay: -0.2s; }
        .gantt-mascot.stressed .bar.b4 { width: 40px; fill: #ef4444; }
        .gantt-mascot.stressed .gantt-mouth { d: path("M48 64 Q55 58 62 64"); }
        .gantt-mascot.stressed .deadline { animation: deadlinePanic 0.2s infinite; stroke: #ef4444; }
        .gantt-mascot.stressed .deadline-text { animation: deadlinePanic 0.2s infinite; }
        .gantt-mascot.stressed .explosion { opacity: 1; animation: explode 0.3s infinite; }
        .gantt-mascot.stressed .gantt-eyes circle:not([fill="white"]) { animation: eyePanic 0.3s infinite; }
        .gantt-mascot.stressed .gantt-svg { animation: mascotShake 0.2s infinite; }
        
        /* Success state */
        .gantt-mascot.success .bar { fill: #10b981; }
        .gantt-mascot.success .gantt-mouth { d: path("M46 58 Q55 68 64 58"); }
        .gantt-mascot.success .deadline { stroke: #10b981; }
        .gantt-mascot.success .deadline-text { fill: #10b981; }
        .gantt-mascot.success .explosion { opacity: 0; }
        .gantt-mascot.success .gantt-svg { animation: mascotBounce 1s ease-in-out infinite; }
        
        @keyframes barChaos {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes deadlinePanic {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(2px); }
        }
        @keyframes explode {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes eyePanic {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(1px); }
        }
        @keyframes mascotWobble {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes mascotShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        @keyframes mascotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        /* Hide on mobile for space */
        @media (max-width: 600px) {
          .gantt-mascot { display: none; }
        }
        
        .proto-card {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%);
          border-color: rgba(139, 92, 246, 0.3);
        }
        
        /* Game Actions - Enhanced */
        .sim-playing .game-actions { 
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 24px; 
          padding: 1.5rem; 
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          position: relative;
          z-index: 1;
        }
        .sim-playing .game-actions > h3 { font-size: 1.1rem; margin-bottom: 1.25rem; color: #4f46e5; }
        .sim-playing .action-section { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; }
        .sim-playing .action-section h4 { font-size: 0.9rem; color: #475569; margin-bottom: 0.75rem; font-weight: 600; }
        .action-row { display: flex; align-items: center; gap: 1rem; }
        .sim-playing .action-btn { 
          padding: 0.6rem 1.25rem; 
          background: #f1f5f9; 
          border: 1px solid #e2e8f0; 
          border-radius: 10px; 
          color: #1e293b; 
          font-family: inherit; 
          font-weight: 500;
          cursor: pointer; 
          transition: all 0.2s; 
        }
        .sim-playing .action-btn:hover:not(:disabled) { background: #e2e8f0; border-color: var(--accent-primary); }
        .sim-playing .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sim-playing .action-label { font-family: 'JetBrains Mono', monospace; font-weight: 700; min-width: 120px; text-align: center; color: #1e293b; }
        
        /* Meeting Options - Enhanced LIGHT THEME */
        .meeting-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .sim-playing .meeting-btn { 
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 2px solid #e2e8f0; 
          border-radius: 16px; 
          padding: 1rem; 
          text-align: left; 
          cursor: pointer; 
          transition: all 0.3s ease; 
          display: flex; 
          flex-direction: column; 
          gap: 0.25rem;
          position: relative;
          overflow: hidden;
        }
        .sim-playing .meeting-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .sim-playing .meeting-btn:hover:not(:disabled) { 
          border-color: #6366f1; 
          background: linear-gradient(135deg, #fafaff 0%, #f0f0ff 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
        }
        .sim-playing .meeting-btn:hover:not(:disabled)::before { opacity: 1; }
        .sim-playing .meeting-btn.active { 
          border-color: #10b981; 
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
        }
        .sim-playing .meeting-btn.active::before { 
          opacity: 1;
          background: linear-gradient(90deg, #10b981, #059669);
        }
        .sim-playing .meeting-btn:disabled { opacity: 0.7; cursor: default; }
        .meeting-icon { font-size: 1.5rem; }
        .sim-playing .meeting-name { font-weight: 700; font-size: 0.9rem; color: #1e293b; }
        .sim-playing .meeting-desc { font-size: 0.8rem; color: #64748b; line-height: 1.4; }
        .sim-playing .meeting-done { color: #059669; font-size: 0.8rem; font-weight: 700; margin-top: 0.25rem; }
        
        /* Quick Actions - Enhanced LIGHT THEME */
        .quick-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .sim-playing .quick-btn { 
          padding: 0.75rem 1.25rem; 
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border: 2px solid #a7f3d0; 
          border-radius: 12px; 
          color: #047857; 
          font-family: inherit; 
          font-weight: 600;
          cursor: pointer; 
          transition: all 0.3s ease; 
          font-size: 0.9rem;
          position: relative;
          overflow: hidden;
        }
        .sim-playing .quick-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }
        .sim-playing .quick-btn:hover:not(:disabled)::after {
          width: 200px;
          height: 200px;
        }
        .sim-playing .quick-btn:hover:not(:disabled) { 
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border-color: #059669;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.25);
        }
        .sim-playing .quick-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sim-playing .quick-btn.crunch { 
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border-color: #fecaca; 
          color: #dc2626; 
        }
        .sim-playing .quick-btn.crunch:hover:not(:disabled) { 
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          border-color: #f87171;
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.25);
        }
        .sim-playing .quick-btn.proto { 
          background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
          border-color: #c4b5fd; 
          color: #7c3aed; 
        }
        .sim-playing .quick-btn.proto:hover:not(:disabled) { 
          background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
          border-color: #8b5cf6;
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.25);
        }
        .sim-playing .quick-btn.schedule { 
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border-color: #fcd34d; 
          color: #b45309; 
        }
        .sim-playing .quick-btn.schedule:hover:not(:disabled) { 
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-color: #f59e0b;
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.25);
        }
        
        .sim-playing .warning-banner { 
          background: #fffbeb; 
          border: 2px solid #fcd34d; 
          border-radius: 10px; 
          padding: 0.75rem 1rem; 
          color: #92400e; 
          font-size: 0.9rem; 
          font-weight: 500;
          margin-bottom: 1rem; 
        }
        
        .sim-playing .btn-advance { 
          width: 100%; 
          margin-top: 1rem; 
          padding: 1rem; 
          font-size: 1rem; 
          background: #4f46e5;
          border: none;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .sim-playing .btn-advance:hover { background: #4338ca; }
        
        /* Event Modal - LIGHT THEME */
        .sim-playing .event-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; backdrop-filter: blur(4px); }
        .sim-playing .event-modal { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 24px; 
          padding: 2.5rem; 
          max-width: 480px; 
          width: 100%; 
          text-align: center; 
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        .sim-playing .event-icon { font-size: 3.5rem; margin-bottom: 1rem; display: block; }
        .sim-playing .event-modal h2 { font-size: 1.5rem; margin-bottom: 0.75rem; color: #1e293b; }
        .sim-playing .event-modal p { color: #475569; line-height: 1.7; margin-bottom: 2rem; }
        .sim-playing .event-options { display: flex; flex-direction: column; gap: 0.6rem; }
        .sim-playing .event-option { 
          padding: 1rem 1.25rem; 
          background: #f8fafc; 
          border: 2px solid #e2e8f0; 
          border-radius: 12px; 
          color: #1e293b; 
          font-family: inherit; 
          font-size: 0.95rem; 
          font-weight: 500;
          cursor: pointer; 
          text-align: left; 
          transition: all 0.2s; 
        }
        .sim-playing .event-option:hover { background: #f0f0ff; border-color: #6366f1; transform: translateX(6px); }
        
        /* CSS Alert Bell Animation */
        .alert-bell {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
          animation: bellRing 0.5s ease-in-out infinite alternate;
          z-index: 10;
        }
        @keyframes bellRing {
          0% { transform: translateX(-50%) rotate(-10deg); }
          100% { transform: translateX(-50%) rotate(10deg); }
        }
        .sim-playing .event-modal {
          position: relative;
          overflow: visible;
        }
        
        /* Paywall Modal Styles */
        .paywall-modal {
          max-width: 440px !important;
        }
        .paywall-modal .event-icon {
          font-size: 4rem;
          margin-bottom: 0.5rem;
        }
        .paywall-modal h2 {
          color: #6366f1 !important;
        }
        .paywall-hook {
          background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem !important;
        }
        .paywall-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }
        .price-tag {
          font-size: 3rem;
          font-weight: 800;
          color: #6366f1;
        }
        .price-period {
          font-size: 1.25rem;
          color: #64748b;
        }
        .paywall-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          text-align: left;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: #475569;
        }
        .paywall-features div {
          padding: 0.25rem 0;
        }
        .paywall-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .paywall-upgrade {
          padding: 1rem 2rem !important;
          font-size: 1.1rem !important;
          font-weight: 600;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
          border: none !important;
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .paywall-upgrade:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }
        .paywall-later {
          padding: 0.75rem 1.5rem;
          background: transparent !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px;
          color: #64748b;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .paywall-later:hover {
          background: #f8fafc !important;
        }
        
        /* End Screen - LIGHT THEME with CSS Animations */
        .sim-ended { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          min-height: 100vh; 
          padding: 2rem; 
          background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #fdf2f8 100%);
          position: relative;
          overflow: hidden;
        }
        
        /* CSS Confetti */
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
          overflow: hidden;
        }
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -20px;
          animation: confettiFall linear forwards;
        }
        .confetti-piece:nth-child(odd) { border-radius: 50%; }
        .confetti-piece:nth-child(even) { border-radius: 2px; transform: rotate(45deg); }
        @keyframes confettiFall {
          0% { top: -20px; opacity: 1; transform: rotate(0deg) translateX(0); }
          100% { top: 110vh; opacity: 0; transform: rotate(720deg) translateX(100px); }
        }
        
        /* CSS Success Checkmark */
        .success-animation {
          width: 100px;
          height: 100px;
          margin: 0 auto;
        }
        .success-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: scaleIn 0.5s ease-out;
          box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4);
        }
        @keyframes scaleIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .checkmark {
          width: 50px;
          height: 50px;
          stroke: white;
          stroke-width: 4;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          animation: drawCheck 0.6s ease-out 0.3s forwards;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        
        /* CSS Sad Face Animation */
        .sad-animation {
          width: 100px;
          height: 100px;
          margin: 0 auto;
        }
        .sad-face {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #fecaca 0%, #ef4444 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: sadBounce 1s ease-in-out infinite;
          box-shadow: 0 10px 40px rgba(239, 68, 68, 0.3);
        }
        @keyframes sadBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .sad-eyes {
          display: flex;
          gap: 20px;
          margin-bottom: 8px;
        }
        .sad-eye {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          position: relative;
        }
        .sad-eye::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          background: #1e293b;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .sad-mouth {
          width: 30px;
          height: 15px;
          border: 4px solid white;
          border-top: none;
          border-radius: 0 0 30px 30px;
          transform: rotate(180deg);
        }
        
        /* End animation container */
        .end-animation {
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 120px;
        }
        
        .end-card { 
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 28px; 
          padding: 2.5rem; 
          max-width: 550px; 
          width: 100%; 
          text-align: center; 
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          position: relative;
          z-index: 10;
          animation: slideUp 0.5s ease-out;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .end-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .end-card h1 { font-size: 1.75rem; margin-bottom: 0.25rem; color: #1e293b; }
        .end-card > p { color: #64748b; margin-bottom: 2rem; }
        .score-display { margin-bottom: 2rem; }
        .grade { font-size: 6rem; font-weight: 800; line-height: 1; }
        .score { font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; color: #64748b; display: block; }
        .results { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; text-align: left; }
        .result { 
          padding: 0.85rem 1rem; 
          background: #f8fafc; 
          border-radius: 10px; 
          display: flex; 
          align-items: center; 
          gap: 0.75rem; 
          font-size: 0.95rem; 
          color: #1e293b;
        }
        .result.pass { border-left: 4px solid #10b981; }
        .result.fail { border-left: 4px solid #ef4444; }
        .result.pass span { color: #059669; font-weight: 700; }
        .result.fail span { color: #dc2626; font-weight: 700; }
        .end-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        .end-actions .btn-primary { background: #4f46e5; border: none; color: white; }
        .end-actions .btn-primary:hover { background: #4338ca; }
        .end-actions .btn-secondary { background: #f1f5f9; border: 1px solid #e2e8f0; color: #475569; }
        .end-actions .btn-secondary:hover { background: #e2e8f0; }
        .quick-btn.proto { background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.25); color: #c4b5fd; }
        .quick-btn.proto:hover { background: rgba(139, 92, 246, 0.2); }
        .quick-btn.schedule { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.25); color: #fcd34d; }
        .quick-btn.schedule:hover { background: rgba(245, 158, 11, 0.2); }
        
        .warning-banner { background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 10px; padding: 0.75rem 1rem; color: #fcd34d; font-size: 0.9rem; margin-bottom: 1rem; }
        
        .btn-advance { width: 100%; margin-top: 1rem; padding: 1rem; font-size: 1rem; }
        
        /* Event Modal - base styles (overridden by .sim-playing for light theme) */
        .event-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; backdrop-filter: blur(4px); }
        .event-modal { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2.5rem; max-width: 480px; width: 100%; text-align: center; }
        .event-icon { font-size: 3.5rem; margin-bottom: 1rem; display: block; }
        .event-modal h2 { font-size: 1.5rem; margin-bottom: 0.75rem; }
        .event-modal p { color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem; }
        .event-options { display: flex; flex-direction: column; gap: 0.6rem; }
        .event-option { padding: 1rem 1.25rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 12px; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; cursor: pointer; text-align: left; transition: all 0.2s; }
        .event-option:hover { background: rgba(99, 102, 241, 0.15); border-color: var(--accent-primary); transform: translateX(6px); }
        
        /* End Screen styles moved to light theme section above */
        
        @media (max-width: 768px) {
          .hero-title { font-size: 2.75rem; }
          .hero-cta { flex-direction: column; }
          .featured-card { flex-direction: column; text-align: center; }
          .sidebar { display: none; }
          .dashboard-main { margin-left: 0; }
          .catalog-grid { grid-template-columns: 1fr; }
          .objectives-grid { grid-template-columns: repeat(2, 1fr); }
          .game-dashboard { grid-template-columns: repeat(2, 1fr); }
          .action-row { flex-wrap: wrap; justify-content: center; }
          .meeting-options { grid-template-columns: 1fr; }
          .quick-actions { flex-direction: column; }
        }

        /* ========== ADMIN DASHBOARD STYLES ========== */
        .admin-link {
          font-size: 1.2rem !important;
          padding: 0.25rem 0.5rem !important;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .admin-link:hover { opacity: 1; }

        .admin-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        .admin-layout {
          display: flex;
          min-height: calc(100vh - 65px);
        }

        /* Admin Sidebar */
        .admin-sidebar {
          width: 260px;
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          color: white;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 65px;
          height: calc(100vh - 65px);
        }

        .admin-sidebar-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .admin-sidebar-header .admin-logo { font-size: 1.5rem; }
        .admin-sidebar-header h2 { font-size: 1.1rem; font-weight: 700; margin: 0; }

        .admin-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .admin-nav-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.5rem;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          font-size: 0.95rem;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .admin-nav-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        .admin-nav-btn.active {
          background: rgba(99, 102, 241, 0.3);
          color: white;
          border-left: 3px solid #6366f1;
        }
        .admin-nav-btn span { font-size: 1.1rem; }

        .admin-sidebar-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .admin-back-btn {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 8px;
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-back-btn:hover { background: rgba(255,255,255,0.2); color: white; }

        /* Admin Main Content */
        .admin-main {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }

        .admin-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .admin-header {
          margin-bottom: 2rem;
        }
        .admin-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.5rem;
        }
        .admin-header p {
          color: #64748b;
          margin: 0;
        }

        /* Admin Metrics Grid */
        .admin-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .admin-metric-card {
          background: white;
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          position: relative;
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }
        .metric-icon.blue { background: #dbeafe; }
        .metric-icon.green { background: #dcfce7; }
        .metric-icon.purple { background: #f3e8ff; }
        .metric-icon.orange { background: #ffedd5; }

        .metric-info {
          flex: 1;
        }
        .metric-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }
        .metric-label {
          font-size: 0.85rem;
          color: #64748b;
        }

        .metric-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .metric-badge.green { background: #dcfce7; color: #16a34a; }
        .metric-badge.blue { background: #dbeafe; color: #2563eb; }
        .metric-badge.neutral { background: #f1f5f9; color: #64748b; }

        /* Admin Stats Row */
        .admin-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .admin-stat-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .admin-stat-card h3 {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 500;
          margin: 0 0 0.75rem;
        }
        .stat-big {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        .stat-bar {
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .stat-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 3px;
        }
        .stat-sub {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        /* Admin Section */
        .admin-section {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .admin-section h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 1rem;
        }

        /* Activity List */
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 10px;
        }
        .activity-icon { font-size: 1.25rem; }
        .activity-content {
          flex: 1;
          font-size: 0.9rem;
          color: #475569;
        }
        .activity-content strong { color: #1e293b; }
        .activity-time {
          display: block;
          font-size: 0.8rem;
          color: #94a3b8;
          margin-top: 0.25rem;
        }

        /* Admin Toolbar */
        .admin-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 0.6rem 1rem;
          min-width: 300px;
        }
        .search-box input {
          border: none;
          outline: none;
          font-size: 0.9rem;
          flex: 1;
          font-family: inherit;
        }

        .toolbar-actions {
          display: flex;
          gap: 0.75rem;
        }

        .admin-select {
          padding: 0.6rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: inherit;
          background: white;
          cursor: pointer;
        }

        .admin-btn {
          padding: 0.6rem 1.25rem;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: inherit;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
        .admin-btn.primary {
          background: #6366f1;
          color: white;
          border-color: #6366f1;
        }
        .admin-btn.primary:hover { background: #4f46e5; }
        .admin-btn.danger {
          color: #dc2626;
          border-color: #fecaca;
        }
        .admin-btn.danger:hover { background: #fef2f2; }
        .admin-btn.small { padding: 0.4rem 0.75rem; font-size: 0.8rem; }
        
        /* Admin Loading & Error States */
        .admin-loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .admin-loading-spinner {
          text-align: center;
        }
        .admin-loading-spinner .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e2e8f0;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .admin-loading-spinner p {
          color: #64748b;
          font-size: 0.9rem;
        }
        .admin-error-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0;
        }
        .admin-error-banner button {
          background: #dc2626;
          color: white;
          border: none;
          padding: 0.4rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
        }
        .admin-error-banner button:hover {
          background: #b91c1c;
        }
        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .refresh-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        .admin-header h1 {
          font-size: 1.75rem;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .admin-header p {
          color: #64748b;
          font-size: 0.95rem;
        }
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #64748b;
        }
        .empty-state .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .admin-badge {
          display: inline-block;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          margin-left: 0.5rem;
          vertical-align: middle;
          text-transform: uppercase;
        }
        .tester-badge {
          display: inline-block;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          margin-left: 0.5rem;
          vertical-align: middle;
          text-transform: uppercase;
        }
        .action-btn.admin-active {
          background: #fef3c7;
          border-color: #f59e0b;
        }
        .action-btn.admin-active:hover {
          background: #fde68a;
        }
        .action-btn.tester-active {
          background: #d1fae5;
          border-color: #10b981;
        }
        .action-btn.tester-active:hover {
          background: #a7f3d0;
        }

        /* Admin Table */
        .admin-table-container {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th {
          text-align: left;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e2e8f0;
        }
        .admin-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.9rem;
        }
        .admin-table tr:hover { background: #fafbfc; }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .user-avatar.large {
          width: 64px;
          height: 64px;
          font-size: 1.5rem;
        }
        .user-info strong {
          display: block;
          color: #1e293b;
        }
        .user-info span {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .plan-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .plan-badge.free { background: #f1f5f9; color: #64748b; }
        .plan-badge.tester { background: #d1fae5; color: #059669; }
        .plan-badge.professional { background: #dbeafe; color: #2563eb; }
        .plan-badge.enterprise { background: #f3e8ff; color: #7c3aed; }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .status-badge.active { background: #dcfce7; color: #16a34a; }
        .status-badge.inactive { background: #fef3c7; color: #d97706; }
        .status-badge.churned { background: #fee2e2; color: #dc2626; }

        .sim-count {
          font-weight: 600;
          color: #1e293b;
        }
        .sim-label {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-left: 0.25rem;
        }
        .last-active { color: #64748b; }

        .action-btns {
          display: flex;
          gap: 0.5rem;
        }
        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          background: #f1f5f9;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }
        .action-btn:hover { background: #e2e8f0; }
        .action-btn.danger:hover { background: #fee2e2; }

        /* User Stats */
        .admin-user-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .user-stat {
          text-align: center;
        }
        .user-stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }
        .user-stat-label {
          font-size: 0.8rem;
          color: #64748b;
        }

        /* Admin Modal */
        .admin-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }
        .admin-modal {
          background: white;
          border-radius: 20px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 1.25rem;
        }
        .modal-close {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          background: #f1f5f9;
          font-size: 1.25rem;
          cursor: pointer;
        }
        .modal-body { padding: 1.5rem; }
        .modal-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }

        .user-detail-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .user-detail-header h3 { margin: 0; }
        .user-detail-header p { margin: 0; color: #64748b; }

        .user-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .detail-item label {
          display: block;
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 0.25rem;
        }
        .detail-item span {
          font-weight: 500;
          color: #1e293b;
        }

        /* Bar Chart */
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          height: 200px;
          padding: 1rem 0;
        }
        .bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .bar-container {
          flex: 1;
          width: 100%;
          display: flex;
          gap: 4px;
          align-items: flex-end;
          justify-content: center;
        }
        .bar {
          width: 20px;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }
        .bar.users { background: #6366f1; }
        .bar.sessions { background: #10b981; }
        .bar-label {
          font-size: 0.8rem;
          color: #64748b;
        }
        .chart-legend {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .legend-dot {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 3px;
          margin-right: 0.5rem;
        }
        .legend-dot.users { background: #6366f1; }
        .legend-dot.sessions { background: #10b981; }

        /* Sim Rankings */
        .sim-rankings {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .sim-rank-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 12px;
        }
        .rank {
          font-size: 1.1rem;
          font-weight: 700;
          color: #6366f1;
          min-width: 40px;
        }
        .sim-rank-info { flex: 1; }
        .sim-rank-info strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .sim-rank-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #64748b;
        }
        .completion-rate {
          text-align: right;
          font-size: 1.25rem;
          font-weight: 700;
          color: #10b981;
        }
        .completion-rate span {
          display: block;
          font-size: 0.7rem;
          font-weight: 400;
          color: #94a3b8;
        }

        /* Grade Chart */
        .grade-chart {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .grade-bar-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .grade-label {
          width: 30px;
          font-weight: 700;
          color: #1e293b;
        }
        .grade-bar-container {
          flex: 1;
          height: 24px;
          background: #f1f5f9;
          border-radius: 6px;
          overflow: hidden;
        }
        .grade-bar {
          height: 100%;
          border-radius: 6px;
          transition: width 0.3s ease;
        }
        .grade-bar.grade-a { background: #10b981; }
        .grade-bar.grade-b { background: #6366f1; }
        .grade-bar.grade-c { background: #f59e0b; }
        .grade-bar.grade-d { background: #f97316; }
        .grade-bar.grade-f { background: #ef4444; }
        .grade-pct {
          width: 40px;
          text-align: right;
          font-weight: 500;
          color: #64748b;
        }

        /* Subscription Breakdown */
        .subscription-breakdown {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .sub-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .sub-info {
          min-width: 150px;
        }
        .sub-plan {
          display: block;
          font-weight: 600;
          color: #1e293b;
        }
        .sub-count {
          font-size: 0.8rem;
          color: #64748b;
        }
        .sub-bar {
          flex: 1;
          height: 20px;
          background: #f1f5f9;
          border-radius: 10px;
          overflow: hidden;
        }
        .sub-bar-fill {
          height: 100%;
          border-radius: 10px;
        }
        .sub-item.free .sub-bar-fill { background: #94a3b8; }
        .sub-item.professional .sub-bar-fill { background: #6366f1; }
        .sub-item.enterprise .sub-bar-fill { background: #8b5cf6; }
        .sub-pct {
          min-width: 50px;
          text-align: right;
          font-weight: 600;
          color: #1e293b;
        }

        /* Transactions */
        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .transaction-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-radius: 10px;
        }
        .transaction-item.failed { background: #fef2f2; }
        .txn-info { flex: 1; }
        .txn-info strong { display: block; color: #1e293b; }
        .txn-info span { font-size: 0.8rem; color: #64748b; }
        .txn-amount {
          font-weight: 700;
          color: #10b981;
        }
        .txn-date {
          font-size: 0.85rem;
          color: #64748b;
          min-width: 100px;
        }
        .txn-status {
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .txn-status.succeeded { background: #dcfce7; color: #16a34a; }
        .txn-status.failed { background: #fee2e2; color: #dc2626; }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .content-card {
          background: white;
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }
        .content-header h4 { margin: 0; color: #1e293b; }
        .content-status {
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .content-status.published { background: #dcfce7; color: #16a34a; }
        .content-status.draft { background: #fef3c7; color: #d97706; }
        .content-status.review { background: #dbeafe; color: #2563eb; }
        .content-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }
        .content-meta {
          font-size: 0.8rem;
          color: #94a3b8;
          margin-bottom: 1rem;
        }
        .content-actions {
          display: flex;
          gap: 0.5rem;
        }

        /* Resource Usage */
        .resource-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .resource-item { }
        .resource-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        .resource-header span:first-child { color: #64748b; }
        .resource-header span:last-child { font-weight: 600; color: #1e293b; }
        .resource-bar {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }
        .resource-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .resource-fill.cpu { background: linear-gradient(90deg, #10b981, #34d399); }
        .resource-fill.memory { background: linear-gradient(90deg, #6366f1, #8b5cf6); }

        /* Errors List */
        .errors-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .error-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: #fef2f2;
          border-radius: 8px;
          font-size: 0.85rem;
        }
        .error-time {
          font-family: monospace;
          color: #64748b;
        }
        .error-type {
          font-weight: 600;
          color: #dc2626;
          min-width: 80px;
        }
        .error-msg {
          flex: 1;
          color: #475569;
        }
        .error-count {
          font-weight: 600;
          color: #dc2626;
        }

        .system-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* Admin Responsive */
        @media (max-width: 1200px) {
          .admin-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .admin-stats-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .admin-layout { flex-direction: column; }
          .admin-sidebar {
            width: 100%;
            height: auto;
            position: relative;
            top: 0;
          }
          .admin-nav {
            display: flex;
            overflow-x: auto;
            padding: 0.5rem;
          }
          .admin-nav-btn {
            padding: 0.5rem 1rem;
            white-space: nowrap;
          }
          .admin-sidebar-footer { display: none; }
        }
        @media (max-width: 600px) {
          .admin-metrics-grid { grid-template-columns: 1fr; }
          .admin-toolbar { flex-direction: column; }
          .search-box { min-width: 100%; }
          .toolbar-actions { width: 100%; justify-content: space-between; }
        }
      `}</style>
      
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
      
      {currentPage === 'landing' && renderLanding()}
      {currentPage === 'auth' && renderAuth()}
      {currentPage === 'dashboard' && renderDashboard()}
      {currentPage === 'catalog' && renderCatalog()}
      {currentPage === 'pricing' && renderPricing()}
      {currentPage === 'simulation' && renderSimulation()}
      {currentPage === 'admin' && renderAdminDashboard()}
    </div>
  );
}
