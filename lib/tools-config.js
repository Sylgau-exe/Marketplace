// Tools Catalog - Create & Export Tools Platform
export const tools = [
  {
    id: 'charterpro',
    name: 'CharterPro',
    tagline: 'Project Charter Generator',
    description: 'Create professional project charters in minutes. Define scope, objectives, stakeholders, and deliverables with guided templates.',
    icon: '📋',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    status: 'live', // live, beta, coming-soon
    category: 'Project Initiation',
    outputFormats: ['PDF', 'Word'],
    features: [
      'Guided charter creation wizard',
      'Professional PDF export',
      'Stakeholder management',
      'Risk assessment templates',
      'Project scope definition',
      'Success criteria tracking'
    ],
    route: '/tools/charterpro',
    launchDate: '2025-06-01',
  },
  {
    id: 'dmaic-generator',
    name: 'DMAIC Generator',
    tagline: 'Six Sigma Project Forms',
    description: 'Structure your continuous improvement projects with professional DMAIC documentation. Define, Measure, Analyze, Improve, Control.',
    icon: '🔄',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    status: 'beta',
    category: 'Continuous Improvement',
    outputFormats: ['PDF', 'Excel'],
    features: [
      'Complete DMAIC framework',
      'Data collection templates',
      'Root cause analysis tools',
      'Control plan generator',
      'Process capability reports',
      'Professional PDF export'
    ],
    route: '/tools/dmaic-generator',
    launchDate: '2026-Q1',
  },
  {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    tagline: 'Return on Investment Analysis',
    description: 'Calculate and present compelling ROI for your projects and investments. Generate professional financial justification reports.',
    icon: '💰',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    status: 'beta',
    category: 'Financial Analysis',
    outputFormats: ['PDF', 'Excel'],
    features: [
      'ROI calculation wizard',
      'NPV & IRR analysis',
      'Payback period calculator',
      'Scenario comparison',
      'Executive summary export',
      'Excel financial models'
    ],
    route: '/tools/roi-calculator',
    launchDate: '2026-Q1',
  },
  {
    id: 'tco-calculator',
    name: 'TCO Calculator',
    tagline: 'Total Cost of Ownership',
    description: 'Calculate complete lifecycle costs for IT systems, equipment, and major purchases. Make informed procurement decisions.',
    icon: '🧮',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    status: 'beta',
    category: 'Financial Analysis',
    outputFormats: ['PDF', 'Excel'],
    features: [
      'Lifecycle cost modeling',
      'Vendor comparison',
      'Hidden cost identification',
      'Multi-year projections',
      'Professional reports',
      'Decision matrix export'
    ],
    route: '/tools/tco-calculator',
    launchDate: '2026-Q2',
  },
  {
    id: 'risk-register',
    name: 'Risk Register',
    tagline: 'Risk Assessment & Tracking',
    description: 'Document and assess project risks with professional risk registers. Generate heat maps and mitigation plans.',
    icon: '⚠️',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    status: 'beta',
    category: 'Risk Management',
    outputFormats: ['PDF', 'Excel'],
    features: [
      'Risk register templates',
      'Probability/impact matrix',
      'Risk heat map generator',
      'Mitigation plan builder',
      'FMEA worksheets',
      'Executive risk summary'
    ],
    route: '/tools/risk-register',
    launchDate: '2026-Q2',
  },
  {
    id: 'raci-matrix',
    name: 'RACI Matrix',
    tagline: 'Roles & Responsibilities',
    description: 'Define clear accountability with professional RACI charts. Eliminate confusion about who does what on your projects.',
    icon: '👥',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    status: 'coming-soon',
    category: 'Project Planning',
    outputFormats: ['PDF', 'Excel'],
    features: [
      'RACI chart builder',
      'Role assignment wizard',
      'Stakeholder mapping',
      'Responsibility gaps check',
      'Team communication plan',
      'Multiple export formats'
    ],
    route: '/tools/raci-matrix',
    launchDate: '2026-Q2',
  },
]

// Subscription Plans - Updated for Create & Export model
export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Try our tools for free',
    features: [
      '3 exports per month',
      'Access to 2 tools',
      'Basic templates',
      'PDF export',
      'Email support',
    ],
    limitations: [
      'Limited exports',
      'Limited tool access',
      'No custom branding',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 19,
    period: 'month',
    description: 'For individual project managers',
    features: [
      'Unlimited exports',
      'All tools included',
      'All templates',
      'PDF & Excel export',
      'Priority support',
      'Custom branding',
    ],
    limitations: [],
    cta: 'Start 14-day Trial',
    popular: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: 49,
    period: 'month',
    description: 'For PMO teams and departments',
    features: [
      'Everything in Professional',
      'Up to 10 team members',
      'Shared templates library',
      'Team branding presets',
      'Usage analytics',
      'Admin dashboard',
    ],
    limitations: [],
    cta: 'Start 14-day Trial',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null, // Custom pricing
    period: 'custom',
    description: 'For large organizations',
    features: [
      'Everything in Team',
      'Unlimited team members',
      'Custom templates',
      'API access',
      'Dedicated support',
      'Custom integrations',
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
  },
]

// Helper functions
export const getToolById = (id) => tools.find(t => t.id === id)
export const getLiveTools = () => tools.filter(t => t.status === 'live')
export const getBetaTools = () => tools.filter(t => t.status === 'beta')
export const getComingSoonTools = () => tools.filter(t => t.status === 'coming-soon')
export const getPlanById = (id) => plans.find(p => p.id === id)
export const getToolsByCategory = (category) => tools.filter(t => t.category === category)
