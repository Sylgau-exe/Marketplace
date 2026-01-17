// ============================================
// CHARTERPRO - EXAMPLE GALLERY DATA
// ============================================
// Add this to your charter app's JavaScript section
// Replace or augment the existing examples object

const exampleGalleryData = {
    
    // EXAMPLE 1: Software/Technology
    customerPortal: {
        id: 'customerPortal',
        title: 'Customer Portal 2.0',
        subtitle: 'Enterprise Web Application Modernization',
        icon: '💻',
        category: 'Software Development',
        stats: { roi: '127%', budget: '$2.4M', timeline: '18 months' },
        tags: ['React', 'Microservices', 'Cloud'],
        description: 'Complete overhaul of legacy customer portal with React frontend, microservices backend, and enhanced security features.',
        data: {
            projectName: 'Customer Portal 2.0 - Enterprise Modernization',
            projectType: 'software',
            projectSubtype: 'Web Application',
            projectSponsor: 'Jennifer Martinez, Chief Technology Officer',
            projectManager: 'David Chen, Senior Project Manager',
            
            currentSituation: 'Our current customer portal was built over 10 years ago using legacy technologies (Classic ASP, SQL Server 2008). The system experiences frequent outages averaging 4 hours per month, page load times exceed 8 seconds, and the interface is not mobile-responsive. Customer satisfaction scores for digital experience have dropped to 3.2/5, and our support team spends 2,100 hours monthly handling issues that could be self-service. The technical debt is estimated at $1.2M annually in maintenance costs.',
            
            impactNotActing: 'Without modernization: (1) Customer churn will increase by estimated 15% annually as competitors offer superior digital experiences, (2) Support costs will continue rising, projected to reach $5.8M by 2028, (3) Security vulnerabilities in legacy code create compliance risk with SOC 2 and GDPR requirements, (4) Inability to integrate with modern APIs limits partnership opportunities worth $3M+ annually, (5) Developer recruitment and retention will suffer as talent avoids legacy technology stacks.',
            
            stakeholders: '• 52,000 active customers who use the portal for account management, billing, and support\n• Customer Support team (45 FTEs) who handle portal-related inquiries\n• IT Operations team responsible for system maintenance and uptime\n• Product Management defining roadmap and feature priorities\n• Security & Compliance team ensuring regulatory requirements\n• Sales team who demo the portal to prospects\n• Finance team who rely on portal for payment processing\n• Executive leadership tracking customer satisfaction metrics',
            
            solutionOverview: 'Implement a modern, cloud-native customer portal built on React/TypeScript frontend with a Node.js microservices backend deployed on AWS. The solution includes: (1) Responsive single-page application with sub-2-second load times, (2) Self-service capabilities for 80% of current support requests, (3) Real-time notifications and chat support integration, (4) SSO/MFA authentication with OAuth 2.0, (5) API-first architecture enabling third-party integrations, (6) Progressive Web App capabilities for mobile users. Migration will be phased to minimize disruption.',
            
            deliverables: '• Production-ready customer portal with all existing functionality plus new self-service features\n• Mobile-responsive design tested across iOS, Android, and all major browsers\n• RESTful API layer with comprehensive documentation for integration partners\n• Integrated knowledge base with AI-powered search\n• Real-time analytics dashboard for customer behavior insights\n• Admin console for content management and user administration\n• Data migration scripts and validation reports\n• Comprehensive test suite with 90%+ code coverage\n• Operations runbook and incident response procedures\n• User training materials and video tutorials',
            
            successCriteria: '• Achieve 99.9% system uptime (vs. current 99.2%)\n• Reduce average page load time to under 2 seconds\n• Decrease support ticket volume by 40% through self-service\n• Improve customer satisfaction score from 3.2 to 4.5/5\n• Enable mobile usage to reach 35% of total sessions\n• Complete data migration with zero data loss\n• Pass SOC 2 Type II audit within 6 months of launch\n• Achieve Net Promoter Score improvement of +30 points',
            
            benefits: [
                { benefit: 'Reduced customer support costs', category: 'Cost Reduction', value: '$840,000', confidence: 'High', measurement: 'Annual support budget comparison' },
                { benefit: 'Decreased customer churn', category: 'Revenue', value: '$1,200,000', confidence: 'Medium', measurement: 'Retention rate improvement' },
                { benefit: 'Increased online transactions', category: 'Revenue', value: '$600,000', confidence: 'Medium', measurement: 'Digital payment adoption' },
                { benefit: 'IT maintenance cost reduction', category: 'Cost Reduction', value: '$400,000', confidence: 'High', measurement: 'Infrastructure and support costs' },
                { benefit: 'Partner integration revenue', category: 'Revenue', value: '$350,000', confidence: 'Low', measurement: 'New API partnership deals' }
            ],
            
            constraints: [
                { constraint: 'Must maintain 99% uptime during migration', type: 'Technical', severity: 'High', mitigation: 'Blue-green deployment with instant rollback capability' },
                { constraint: 'Budget ceiling of $2.5M', type: 'Budget', severity: 'High', mitigation: 'Fixed-price contracts, bi-weekly budget reviews' },
                { constraint: 'Must meet SOC 2 compliance requirements', type: 'Regulatory', severity: 'High', mitigation: 'Security review at each phase, penetration testing' },
                { constraint: 'No disruption during Q4 peak season', type: 'Timeline', severity: 'Medium', mitigation: 'Launch scheduled for Q1, feature freeze in Q4' },
                { constraint: 'Existing team capacity limited', type: 'Resource', severity: 'Medium', mitigation: 'Augment with contractor developers' }
            ],
            
            marketSize: '$4.2 billion global market for customer experience platforms, growing at 12% CAGR',
            targetDemographics: 'B2B customers: IT managers and procurement professionals at mid-market companies (100-5000 employees), ages 30-55, who value self-service capabilities and mobile access. Secondary: End users within customer organizations who interact with billing and support functions.',
            marketTrends: '• 73% of customers expect companies to understand their needs (Salesforce research)\n• Mobile-first interactions have increased 85% since 2020\n• Self-service portal usage correlates with 25% higher customer lifetime value\n• API-enabled integrations are now standard expectation for enterprise software',
            competitiveLandscape: 'Key competitors (Competitor A, B, C) have invested $10M+ in portal modernization over past 3 years. Our current portal ranks last in G2 user reviews for ease of use. Differentiation opportunity: AI-powered personalization and superior integration capabilities.',
            
            comparables: [
                { name: 'Salesforce Customer Portal Redesign', industry: 'Enterprise Software', budget: '$3.2M', outcome: '45% support reduction, 4.6 app rating', relevance: 'Similar scale, cloud architecture' },
                { name: 'Zendesk Self-Service Transformation', industry: 'SaaS', budget: '$1.8M', outcome: '60% self-service adoption', relevance: 'Self-service focus' },
                { name: 'ServiceNow Portal Modernization', industry: 'Enterprise Software', budget: '$4.5M', outcome: '99.95% uptime, 50% faster resolution', relevance: 'Enterprise scale, high availability' }
            ],
            
            risks: [
                { risk: 'Data migration complexity causes data loss or corruption', probability: 'Medium', impact: 'High', mitigation: 'Phased migration, comprehensive validation, rollback plan', owner: 'Data Architect' },
                { risk: 'User adoption resistance to new interface', probability: 'Medium', impact: 'Medium', mitigation: 'Beta program, change management, training', owner: 'Product Manager' },
                { risk: 'Integration failures with third-party systems', probability: 'Medium', impact: 'High', mitigation: 'Early API testing, sandbox environments', owner: 'Tech Lead' },
                { risk: 'Performance issues under peak load', probability: 'Low', impact: 'High', mitigation: 'Load testing, auto-scaling architecture', owner: 'DevOps Lead' },
                { risk: 'Security vulnerabilities in new codebase', probability: 'Low', impact: 'High', mitigation: 'Security code review, penetration testing, bug bounty', owner: 'Security Lead' },
                { risk: 'Scope creep extends timeline', probability: 'High', impact: 'Medium', mitigation: 'Strict change control, MVP focus, phase 2 backlog', owner: 'Project Manager' }
            ],
            
            startDate: '2026-03-01',
            timeline: [
                { phase: 'Discovery & Architecture', duration: 8, activities: 'Requirements gathering, technical design, vendor selection', dependencies: 'Stakeholder availability' },
                { phase: 'Backend Development', duration: 16, activities: 'API development, database design, authentication', dependencies: 'Architecture approval' },
                { phase: 'Frontend Development', duration: 14, activities: 'React components, responsive design, accessibility', dependencies: 'API availability' },
                { phase: 'Integration & Testing', duration: 10, activities: 'System integration, UAT, performance testing', dependencies: 'Development complete' },
                { phase: 'Data Migration', duration: 6, activities: 'Data extraction, transformation, validation', dependencies: 'Test environment ready' },
                { phase: 'Launch & Stabilization', duration: 8, activities: 'Phased rollout, monitoring, optimization', dependencies: 'UAT sign-off' }
            ],
            
            totalBudget: 2400000,
            budgetBreakdown: [
                { category: 'Development (internal & contract)', amount: 1200000, notes: '8 developers for 18 months' },
                { category: 'Cloud Infrastructure (AWS)', amount: 350000, notes: 'First year including migration' },
                { category: 'Software Licenses', amount: 180000, notes: 'Development tools, monitoring, security' },
                { category: 'Professional Services', amount: 300000, notes: 'Architecture consulting, security audit' },
                { category: 'Testing & QA', amount: 200000, notes: 'Automated testing, UAT, penetration testing' },
                { category: 'Training & Change Management', amount: 120000, notes: 'User training, documentation' },
                { category: 'Contingency (15%)', amount: 350000, notes: 'Risk buffer' }
            ],
            year1Return: 800000,
            year2Return: 1600000,
            year3Return: 2100000
        }
    },
    
    // EXAMPLE 2: Construction
    officeComplex: {
        id: 'officeComplex',
        title: 'Corporate Campus Expansion',
        subtitle: 'LEED Platinum Office Complex',
        icon: '🏗️',
        category: 'Commercial Construction',
        stats: { roi: '89%', budget: '$24M', timeline: '28 months' },
        tags: ['LEED Platinum', 'Mixed-Use', 'Sustainable'],
        description: 'New 180,000 sq ft LEED Platinum office building with underground parking, retail space, and modern amenities to support company growth.',
        data: {
            projectName: 'Corporate Campus Phase II - Innovation Center',
            projectType: 'construction',
            projectSubtype: 'Commercial Building',
            projectSponsor: 'Robert Williams, Chief Executive Officer',
            projectManager: 'Sarah Thompson, VP of Facilities',
            
            currentSituation: 'Our corporate headquarters, built in 1998, is at 98% capacity with 1,200 employees. We are leasing 45,000 sq ft of overflow space across 3 buildings at $2.1M annually. The satellite offices create collaboration challenges, with employees reporting 6+ hours weekly lost to travel between buildings. Employee satisfaction with workspace has dropped to 62%, and we have lost 8 candidates in the past year who cited outdated facilities. The existing building requires $4.5M in deferred maintenance.',
            
            impactNotActing: 'Without expansion: (1) We cannot accommodate planned headcount growth of 400 employees over 3 years, forcing us to lease additional expensive space, (2) Continued fragmentation will reduce collaboration and innovation velocity, (3) Facility constraints will limit our ability to attract top talent in competitive market, (4) Energy costs will continue rising 8% annually in inefficient legacy building, (5) We will miss sustainability commitments made to investors and employees.',
            
            stakeholders: '• 1,600 current and future employees who will work in the facility\n• Executive Leadership Team requiring modern meeting and collaboration spaces\n• IT Department needing state-of-the-art infrastructure\n• HR/Recruiting using facility as talent attraction tool\n• Finance tracking real estate portfolio optimization\n• Sustainability Committee driving LEED and carbon goals\n• Neighboring businesses and community\n• City planning and economic development offices\n• Investors monitoring capital allocation',
            
            solutionOverview: 'Construct a new 180,000 square foot, 6-story office building on the adjacent parcel already owned by the company. The LEED Platinum certified building will feature: (1) Open collaborative workspaces with activity-based design, (2) 12,000 sq ft ground-floor retail and café space, (3) 450-space underground parking structure, (4) Rooftop amenity deck with outdoor meeting areas, (5) Advanced building systems including geothermal HVAC, (6) Electric vehicle charging for 50 spaces. Construction will use mass timber for sustainability.',
            
            deliverables: '• 180,000 sq ft Class A office building with LEED Platinum certification\n• 450-space underground parking garage\n• 12,000 sq ft retail/café space on ground floor\n• Rooftop amenity deck with landscaping\n• Pedestrian bridge connecting to existing building\n• Upgraded campus infrastructure (power, data, water)\n• Landscaping and site improvements\n• Public art installation per city requirements\n• Furniture, fixtures, and equipment for all spaces\n• Building management system and security infrastructure',
            
            successCriteria: '• Achieve LEED Platinum certification\n• Complete construction within 28 months\n• Deliver within 5% of approved budget\n• Achieve 50% energy reduction vs. code baseline\n• Employee workspace satisfaction score of 85%+\n• Zero lost-time safety incidents during construction\n• Consolidate all employees to campus within 3 months of completion\n• Secure retail tenants for 90% of ground floor space',
            
            benefits: [
                { benefit: 'Eliminated external lease costs', category: 'Cost Reduction', value: '$2,100,000', confidence: 'High', measurement: 'Annual lease expense elimination' },
                { benefit: 'Energy cost reduction', category: 'Cost Reduction', value: '$450,000', confidence: 'High', measurement: 'Utility bills comparison' },
                { benefit: 'Improved employee productivity', category: 'Efficiency', value: '$1,800,000', confidence: 'Medium', measurement: 'Reduced travel time between buildings' },
                { benefit: 'Retail lease income', category: 'Revenue', value: '$360,000', confidence: 'High', measurement: 'Ground floor lease revenue' },
                { benefit: 'Talent attraction/retention improvement', category: 'Strategic', value: '$800,000', confidence: 'Low', measurement: 'Reduced recruiting costs and turnover' },
                { benefit: 'Real estate value appreciation', category: 'Asset', value: '$3,500,000', confidence: 'Medium', measurement: 'Property appraisal increase' }
            ],
            
            constraints: [
                { constraint: 'City height restriction of 85 feet', type: 'Regulatory', severity: 'High', mitigation: 'Design optimized within height limit' },
                { constraint: 'Parking requirement of 2.5 spaces per 1000 sf', type: 'Regulatory', severity: 'High', mitigation: 'Underground parking design' },
                { constraint: 'Construction cannot disrupt existing building operations', type: 'Operational', severity: 'High', mitigation: 'Staged construction, noise mitigation plan' },
                { constraint: 'Must maintain LEED Platinum eligibility', type: 'Strategic', severity: 'Medium', mitigation: 'LEED consultant embedded in project team' },
                { constraint: 'Supply chain constraints for specialty materials', type: 'Market', severity: 'Medium', mitigation: 'Early procurement, alternative suppliers identified' }
            ],
            
            marketSize: 'Regional commercial real estate market valued at $8.2B with 3.2% vacancy rate for Class A space',
            targetDemographics: 'Internal employees: 60% knowledge workers requiring collaborative spaces, 25% requiring private offices, 15% hot-desking. External retail tenants: Food service and convenience retail targeting campus population of 2,000+.',
            marketTrends: '• Flight to quality driving demand for Class A sustainable buildings\n• Hybrid work models requiring more collaboration space per employee\n• ESG requirements making LEED certification mandatory for many tenants\n• Mass timber construction gaining acceptance, 15% premium for sustainable buildings',
            competitiveLandscape: 'Three competing corporate campuses under development within 10 miles. Our location offers superior transit access. LEED Platinum certification will be unique differentiator in market.',
            
            comparables: [
                { name: 'Google Bay View Campus', industry: 'Tech', budget: '$1B', outcome: 'LEED Platinum, carbon-neutral operations', relevance: 'Sustainability leadership benchmark' },
                { name: 'Microsoft Building 92', industry: 'Tech', budget: '$85M', outcome: 'LEED Gold, 35% energy reduction', relevance: 'Similar scale corporate expansion' },
                { name: 'Salesforce Tower Expansion', industry: 'Tech', budget: '$45M', outcome: 'Net-zero ready, 95% satisfaction', relevance: 'High-rise office best practices' }
            ],
            
            risks: [
                { risk: 'Construction cost escalation', probability: 'High', impact: 'High', mitigation: 'Fixed-price GMP contract, value engineering options', owner: 'VP Facilities' },
                { risk: 'Permit delays', probability: 'Medium', impact: 'High', mitigation: 'Early engagement with city, experienced permit expediter', owner: 'Project Manager' },
                { risk: 'Subcontractor availability', probability: 'Medium', impact: 'Medium', mitigation: 'Early bid packages, relationship with key trades', owner: 'General Contractor' },
                { risk: 'Weather delays during foundation work', probability: 'Medium', impact: 'Medium', mitigation: 'Schedule buffer, winter work plan', owner: 'Construction Manager' },
                { risk: 'Supply chain disruption for materials', probability: 'Medium', impact: 'High', mitigation: 'Early procurement, multiple suppliers', owner: 'Procurement Lead' },
                { risk: 'LEED certification challenges', probability: 'Low', impact: 'Medium', mitigation: 'LEED AP on project team, conservative point target', owner: 'Sustainability Lead' }
            ],
            
            startDate: '2026-04-01',
            timeline: [
                { phase: 'Design Development', duration: 16, activities: 'Architectural design, engineering, permits', dependencies: 'Board approval' },
                { phase: 'Procurement & Bidding', duration: 8, activities: 'Contractor selection, material procurement', dependencies: 'Design complete' },
                { phase: 'Site Preparation', duration: 6, activities: 'Demolition, excavation, utilities', dependencies: 'Permits issued' },
                { phase: 'Foundation & Structure', duration: 24, activities: 'Foundation, structural steel/mass timber', dependencies: 'Site prep complete' },
                { phase: 'Building Envelope', duration: 16, activities: 'Exterior walls, roofing, glazing', dependencies: 'Structure topped out' },
                { phase: 'MEP & Interior', duration: 20, activities: 'Mechanical, electrical, plumbing, finishes', dependencies: 'Building enclosed' },
                { phase: 'Commissioning & Occupancy', duration: 12, activities: 'Systems testing, LEED documentation, move-in', dependencies: 'Interior complete' }
            ],
            
            totalBudget: 24000000,
            budgetBreakdown: [
                { category: 'Hard Construction Costs', amount: 18500000, notes: 'Building, parking, site work' },
                { category: 'Soft Costs (A&E, permits)', amount: 2200000, notes: 'Architecture, engineering, consultants' },
                { category: 'Furniture, Fixtures, Equipment', amount: 1500000, notes: 'Workstations, AV, signage' },
                { category: 'Technology Infrastructure', amount: 800000, notes: 'Network, security, building systems' },
                { category: 'LEED Certification Costs', amount: 350000, notes: 'Consulting, documentation, fees' },
                { category: 'Contingency (10%)', amount: 2400000, notes: 'Construction risk buffer' }
            ],
            year1Return: 2500000,
            year2Return: 4200000,
            year3Return: 5800000
        }
    },
    
    // EXAMPLE 3: Business Transformation
    digitalTransformation: {
        id: 'digitalTransformation',
        title: 'Digital Transformation Program',
        subtitle: 'Enterprise-Wide Process Automation',
        icon: '🚀',
        category: 'Business Transformation',
        stats: { roi: '215%', budget: '$5.2M', timeline: '36 months' },
        tags: ['ERP', 'AI/ML', 'Automation'],
        description: 'Comprehensive digital transformation including ERP implementation, workflow automation, AI-powered analytics, and employee digital upskilling.',
        data: {
            projectName: 'Enterprise Digital Transformation - Project Phoenix',
            projectType: 'other',
            projectSubtype: 'Business Transformation',
            projectSponsor: 'Michael Foster, Chief Operating Officer',
            projectManager: 'Amanda Liu, Transformation Program Director',
            
            currentSituation: 'Our operations rely on disconnected legacy systems: a 15-year-old ERP, 47 different Excel-based processes, and 12 siloed departmental applications. Finance takes 15 business days to close the books monthly. Procurement cycles average 23 days for standard purchases. We have no single source of truth for customer data, leading to 8,000+ hours annually spent on manual data reconciliation. Employee survey shows 67% frustration with current tools. We are unable to provide real-time business insights to leadership.',
            
            impactNotActing: 'Without transformation: (1) Operational inefficiencies will cost an additional $6.2M annually by 2028, (2) We will continue losing competitive bids due to slow response times, (3) Compliance risks increase as manual processes create audit vulnerabilities, (4) Best employees will leave for digitally-mature competitors (already seeing 18% turnover in operations), (5) We cannot scale to support planned 40% revenue growth without proportional headcount increase.',
            
            stakeholders: '• All 2,400 employees who will use new systems daily\n• Finance Department (85 people) requiring modern ERP\n• Operations team (450 people) managing supply chain\n• Sales team (200 people) needing integrated CRM\n• IT Department (60 people) supporting infrastructure\n• HR managing change and reskilling programs\n• Executive team requiring real-time analytics\n• Board of Directors tracking transformation ROI\n• External auditors validating controls\n• Key customers expecting faster service',
            
            solutionOverview: 'A three-phase digital transformation program: Phase 1 - Implement cloud-based ERP (SAP S/4HANA) for Finance, Procurement, and Inventory. Phase 2 - Deploy intelligent automation across 50 high-volume processes using RPA and AI. Phase 3 - Build enterprise analytics platform with AI/ML capabilities for predictive insights. Throughout all phases, execute comprehensive change management and digital skills training for all employees.',
            
            deliverables: '• Fully implemented SAP S/4HANA ERP (Finance, Procurement, Inventory, HR modules)\n• 50 automated workflows using RPA (UiPath platform)\n• Integrated data warehouse on Snowflake\n• Power BI analytics dashboards for all departments\n• AI/ML models for demand forecasting and anomaly detection\n• Single customer data platform (Salesforce CDP)\n• Digital skills training completed for 100% of employees\n• Process documentation and SOPs for all redesigned workflows\n• Change management program with 95% adoption metrics',
            
            successCriteria: '• Reduce month-end close from 15 to 3 business days\n• Decrease procurement cycle time from 23 to 5 days\n• Achieve 80% straight-through processing for standard transactions\n• Eliminate 8,000 hours of manual data reconciliation annually\n• Improve employee satisfaction with tools from 33% to 80%\n• Enable real-time dashboards for all KPIs\n• Reduce operational cost per transaction by 45%\n• Achieve 95% user adoption within 6 months of each go-live',
            
            benefits: [
                { benefit: 'Process efficiency gains', category: 'Cost Reduction', value: '$3,200,000', confidence: 'High', measurement: 'FTE time savings and reallocation' },
                { benefit: 'Reduced system maintenance costs', category: 'Cost Reduction', value: '$800,000', confidence: 'High', measurement: 'Legacy system retirement savings' },
                { benefit: 'Improved inventory management', category: 'Working Capital', value: '$1,500,000', confidence: 'Medium', measurement: 'Inventory carrying cost reduction' },
                { benefit: 'Faster customer response driving revenue', category: 'Revenue', value: '$2,000,000', confidence: 'Medium', measurement: 'Win rate improvement on time-sensitive deals' },
                { benefit: 'Reduced audit and compliance costs', category: 'Risk Mitigation', value: '$400,000', confidence: 'High', measurement: 'Audit hours and findings reduction' },
                { benefit: 'Improved employee retention', category: 'Strategic', value: '$600,000', confidence: 'Low', measurement: 'Reduced turnover costs' }
            ],
            
            constraints: [
                { constraint: 'Cannot disrupt operations during Q4 (peak season)', type: 'Timeline', severity: 'High', mitigation: 'Major go-lives scheduled for Q1/Q2 only' },
                { constraint: 'IT team bandwidth limited', type: 'Resource', severity: 'High', mitigation: 'Systems integrator will lead implementation' },
                { constraint: 'Data quality issues in legacy systems', type: 'Technical', severity: 'High', mitigation: 'Data cleansing workstream, business validation' },
                { constraint: 'Union agreement requires retraining before role changes', type: 'Regulatory', severity: 'Medium', mitigation: 'Training program runs parallel to implementation' },
                { constraint: 'Board-mandated budget ceiling', type: 'Budget', severity: 'High', mitigation: 'Phased approach, clear go/no-go gates' }
            ],
            
            marketSize: 'Global digital transformation market $880B, enterprise software segment $280B with 10% CAGR',
            targetDemographics: 'Internal stakeholders: Finance professionals (average 12 years tenure, moderate tech comfort), Operations staff (mixed digital literacy), Sales team (high mobile usage, CRM-familiar), Executives (dashboard/reporting focus).',
            marketTrends: '• 70% of digital transformations fail to meet objectives (McKinsey) - success requires strong change management\n• Cloud ERP adoption accelerating, 65% of enterprises migrating by 2027\n• AI/ML in operations delivering 25-40% efficiency gains in early adopters\n• Employee experience platforms becoming standard expectation',
            competitiveLandscape: 'Top 3 competitors completed similar transformations in past 3 years. Industry leaders report 40% productivity advantage from digital maturity. We are currently ranked 4th of 5 peers in digital capability assessment.',
            
            comparables: [
                { name: 'Coca-Cola ERP Transformation', industry: 'CPG', budget: '$350M', outcome: '30% process efficiency, 5-day close', relevance: 'Scale, similar legacy challenges' },
                { name: 'Unilever Digital Transformation', industry: 'CPG', budget: '$1B', outcome: '40% automation, AI-powered supply chain', relevance: 'Comprehensive scope' },
                { name: 'Nike Digital Operations', industry: 'Retail', budget: '$200M', outcome: 'Real-time inventory, 50% faster fulfillment', relevance: 'Operational focus' }
            ],
            
            risks: [
                { risk: 'Change resistance slows adoption', probability: 'High', impact: 'High', mitigation: 'Executive sponsorship, change champions network, incentive alignment', owner: 'Change Management Lead' },
                { risk: 'Data migration errors', probability: 'High', impact: 'High', mitigation: 'Dedicated data team, multiple validation cycles, parallel running', owner: 'Data Migration Lead' },
                { risk: 'Integration complexity exceeds estimates', probability: 'Medium', impact: 'High', mitigation: 'Integration architecture review, middleware platform', owner: 'Technical Architect' },
                { risk: 'Vendor delivery delays', probability: 'Medium', impact: 'Medium', mitigation: 'Contractual SLAs, regular governance, backup resources', owner: 'Program Director' },
                { risk: 'Scope creep', probability: 'High', impact: 'Medium', mitigation: 'Strict change control board, MVP focus, Phase 2 backlog', owner: 'Program Director' },
                { risk: 'Key person dependencies', probability: 'Medium', impact: 'High', mitigation: 'Knowledge transfer protocols, cross-training, documentation', owner: 'HR Partner' }
            ],
            
            startDate: '2026-02-01',
            timeline: [
                { phase: 'Assessment & Planning', duration: 12, activities: 'Process mapping, requirements, vendor selection', dependencies: 'Executive approval' },
                { phase: 'Phase 1: Core ERP', duration: 40, activities: 'SAP implementation - Finance, Procurement, Inventory', dependencies: 'Vendor contract' },
                { phase: 'Phase 2: Automation', duration: 32, activities: 'RPA deployment, process redesign', dependencies: 'ERP foundation' },
                { phase: 'Phase 3: Analytics & AI', duration: 24, activities: 'Data warehouse, dashboards, ML models', dependencies: 'Data standardization' },
                { phase: 'Training & Adoption', duration: 52, activities: 'Ongoing training, change management, support', dependencies: 'Runs parallel to all phases' },
                { phase: 'Optimization', duration: 16, activities: 'Performance tuning, continuous improvement', dependencies: 'All systems live' }
            ],
            
            totalBudget: 5200000,
            budgetBreakdown: [
                { category: 'SAP Software & Licenses', amount: 1200000, notes: '3-year cloud subscription' },
                { category: 'Implementation Partner', amount: 1800000, notes: 'Systems integrator professional services' },
                { category: 'RPA Platform (UiPath)', amount: 400000, notes: 'Licenses and implementation' },
                { category: 'Analytics Platform', amount: 350000, notes: 'Snowflake, Power BI, ML tools' },
                { category: 'Change Management & Training', amount: 600000, notes: 'Communications, training, adoption' },
                { category: 'Internal Project Team', amount: 500000, notes: 'Backfill and dedicated resources' },
                { category: 'Data Migration & Cleansing', amount: 300000, notes: 'Specialized data services' },
                { category: 'Contingency (15%)', amount: 780000, notes: 'Program risk buffer' }
            ],
            year1Return: 1500000,
            year2Return: 4200000,
            year3Return: 6800000
        }
    }
};

// ============================================
// Example Gallery HTML (add to your page)
// ============================================
/*
Add this button to your header:
<button class="btn btn-examples" onclick="openExamplesGallery()">📚 Browse Examples</button>

Add these modals before closing </body>:

<!-- Examples Gallery Modal -->
<div class="modal-overlay" id="examplesGalleryModal">
    <div class="modal" style="max-width: 1100px;">
        <div class="modal-header">
            <h3 class="modal-title">📚 Example Project Charters</h3>
            <button class="modal-close" onclick="closeExamplesGallery()">×</button>
        </div>
        <div class="modal-body">
            <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
                Browse real-world project charter examples. Preview any example or use it as your starting point.
            </p>
            <div class="example-gallery" id="charterExampleGallery"></div>
        </div>
    </div>
</div>

<!-- Example Preview Modal -->
<div class="modal-overlay" id="examplePreviewModal">
    <div class="modal" style="max-width: 900px;">
        <div class="modal-header">
            <h3 class="modal-title" id="examplePreviewTitle">Example Preview</h3>
            <button class="modal-close" onclick="closeExamplePreview()">×</button>
        </div>
        <div class="modal-body" id="examplePreviewContent"></div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeExamplePreview()">Close</button>
            <button class="btn btn-primary" id="useExampleBtn">Use This Example</button>
        </div>
    </div>
</div>
*/

// ============================================
// Example Gallery JavaScript Functions
// ============================================

function renderCharterExampleGallery() {
    const gallery = document.getElementById('charterExampleGallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    Object.values(exampleGalleryData).forEach(example => {
        const card = document.createElement('div');
        card.className = 'example-card';
        card.innerHTML = `
            <div class="example-card-header" style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);">
                <div class="example-card-icon">${example.icon}</div>
                <div class="example-card-title">${example.title}</div>
                <div class="example-card-subtitle">${example.subtitle}</div>
                <div class="example-card-stats">
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.roi}</div>
                        <div class="example-stat-label">ROI</div>
                    </div>
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.budget}</div>
                        <div class="example-stat-label">Budget</div>
                    </div>
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.timeline}</div>
                        <div class="example-stat-label">Timeline</div>
                    </div>
                </div>
            </div>
            <div class="example-card-body">
                <p class="example-card-desc">${example.description}</p>
                <div class="example-tags">
                    ${example.tags.map(tag => `<span class="example-tag">${tag}</span>`).join('')}
                </div>
                <div class="example-card-actions">
                    <button class="btn btn-secondary" onclick="previewCharterExample('${example.id}')">👁️ Preview</button>
                    <button class="btn btn-primary" onclick="useCharterExample('${example.id}')">✨ Use This</button>
                </div>
            </div>
        `;
        gallery.appendChild(card);
    });
}

function openExamplesGallery() {
    renderCharterExampleGallery();
    document.getElementById('examplesGalleryModal').classList.add('active');
}

function closeExamplesGallery() {
    document.getElementById('examplesGalleryModal').classList.remove('active');
}

function previewCharterExample(exampleId) {
    const example = exampleGalleryData[exampleId];
    if (!example) return;
    
    document.getElementById('examplePreviewTitle').textContent = example.title + ' - Preview';
    
    const content = document.getElementById('examplePreviewContent');
    const data = example.data;
    
    content.innerHTML = `
        <div class="preview-section">
            <h4 style="color: var(--primary); margin-bottom: 0.75rem; border-bottom: 2px solid var(--accent); padding-bottom: 0.5rem;">📋 Project Overview</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1rem;">
                <div style="background: var(--bg); padding: 0.75rem; border-radius: 8px;">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Project Name</div>
                    <div style="font-weight: 500;">${data.projectName}</div>
                </div>
                <div style="background: var(--bg); padding: 0.75rem; border-radius: 8px;">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Type</div>
                    <div style="font-weight: 500;">${data.projectSubtype}</div>
                </div>
                <div style="background: var(--bg); padding: 0.75rem; border-radius: 8px;">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Sponsor</div>
                    <div style="font-weight: 500;">${data.projectSponsor}</div>
                </div>
                <div style="background: var(--bg); padding: 0.75rem; border-radius: 8px;">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Budget</div>
                    <div style="font-weight: 500;">$${(data.totalBudget / 1000000).toFixed(1)}M</div>
                </div>
            </div>
        </div>
        
        <div class="preview-section">
            <h4 style="color: var(--primary); margin-bottom: 0.75rem;">🎯 Problem Statement</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">${data.currentSituation.substring(0, 300)}...</p>
        </div>
        
        <div class="preview-section">
            <h4 style="color: var(--primary); margin-bottom: 0.75rem;">💡 Solution Overview</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">${data.solutionOverview.substring(0, 300)}...</p>
        </div>
        
        <div class="preview-section">
            <h4 style="color: var(--primary); margin-bottom: 0.75rem;">📈 Expected Benefits</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
                ${data.benefits.slice(0, 3).map(b => `
                    <div style="background: var(--success-bg); padding: 0.75rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.25rem; font-weight: 700; color: var(--success);">${b.value}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${b.benefit.substring(0, 30)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="preview-section">
            <h4 style="color: var(--primary); margin-bottom: 0.75rem;">⚠️ Key Risks</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                <thead>
                    <tr style="background: var(--bg);">
                        <th style="padding: 0.5rem; text-align: left;">Risk</th>
                        <th style="padding: 0.5rem; text-align: center;">Probability</th>
                        <th style="padding: 0.5rem; text-align: center;">Impact</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.risks.slice(0, 3).map(r => `
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.5rem;">${r.risk.substring(0, 40)}...</td>
                            <td style="padding: 0.5rem; text-align: center;">${r.probability}</td>
                            <td style="padding: 0.5rem; text-align: center;">${r.impact}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('useExampleBtn').onclick = () => useCharterExample(exampleId);
    closeExamplesGallery();
    document.getElementById('examplePreviewModal').classList.add('active');
}

function closeExamplePreview() {
    document.getElementById('examplePreviewModal').classList.remove('active');
}

function useCharterExample(exampleId) {
    const example = exampleGalleryData[exampleId];
    if (!example) return;
    
    const data = example.data;
    
    // Fill basic fields
    document.getElementById('projectName').value = data.projectName || '';
    document.getElementById('projectSponsor').value = data.projectSponsor || '';
    document.getElementById('projectManager').value = data.projectManager || '';
    
    // Select project type
    if (data.projectType) {
        selectedProjectType = data.projectType;
        document.querySelectorAll('.type-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.type === data.projectType);
        });
    }
    
    // Fill text areas
    document.getElementById('currentSituation').value = data.currentSituation || '';
    document.getElementById('impactNotActing').value = data.impactNotActing || '';
    document.getElementById('stakeholders').value = data.stakeholders || '';
    document.getElementById('solutionOverview').value = data.solutionOverview || '';
    document.getElementById('deliverables').value = data.deliverables || '';
    document.getElementById('successCriteria').value = data.successCriteria || '';
    
    // Market analysis
    if (document.getElementById('marketSize')) {
        document.getElementById('marketSize').value = data.marketSize || '';
    }
    if (document.getElementById('targetDemographics')) {
        document.getElementById('targetDemographics').value = data.targetDemographics || '';
    }
    if (document.getElementById('marketTrends')) {
        document.getElementById('marketTrends').value = data.marketTrends || '';
    }
    if (document.getElementById('competitiveLandscape')) {
        document.getElementById('competitiveLandscape').value = data.competitiveLandscape || '';
    }
    
    // Financial fields
    document.getElementById('totalBudget').value = data.totalBudget || '';
    document.getElementById('year1Return').value = data.year1Return || '';
    document.getElementById('year2Return').value = data.year2Return || '';
    document.getElementById('year3Return').value = data.year3Return || '';
    
    // Start date
    if (data.startDate) {
        document.getElementById('startDate').value = data.startDate;
    }
    
    // Clear and populate tables
    // Benefits
    const benefitsBody = document.getElementById('benefitsBody');
    if (benefitsBody) {
        benefitsBody.innerHTML = '';
        (data.benefits || []).forEach(b => {
            addBenefitRow(b.benefit, b.category, b.value, b.confidence, b.measurement);
        });
    }
    
    // Constraints
    const constraintsBody = document.getElementById('constraintsBody');
    if (constraintsBody) {
        constraintsBody.innerHTML = '';
        (data.constraints || []).forEach(c => {
            addConstraintRow(c.constraint, c.type, c.severity, c.mitigation);
        });
    }
    
    // Risks
    const risksBody = document.getElementById('risksBody');
    if (risksBody) {
        risksBody.innerHTML = '';
        (data.risks || []).forEach(r => {
            addRiskRow(r.risk, r.probability, r.impact, r.mitigation, r.owner);
        });
    }
    
    // Timeline
    const timelineBody = document.getElementById('timelineBody');
    if (timelineBody) {
        timelineBody.innerHTML = '';
        (data.timeline || []).forEach(t => {
            addTimelineRow(t.phase, t.duration, t.activities, t.dependencies);
        });
    }
    
    // Budget breakdown
    const budgetBody = document.getElementById('budgetBody');
    if (budgetBody) {
        budgetBody.innerHTML = '';
        (data.budgetBreakdown || []).forEach(b => {
            addBudgetRow(b.category, b.amount, b.notes);
        });
    }
    
    // Comparables
    const comparablesBody = document.getElementById('comparablesBody');
    if (comparablesBody) {
        comparablesBody.innerHTML = '';
        (data.comparables || []).forEach(c => {
            addComparableRow(c.name, c.industry, c.budget, c.outcome, c.relevance);
        });
    }
    
    // Close modals
    closeExamplesGallery();
    closeExamplePreview();
    
    // Update UI
    calculateROI();
    updateProgress();
    generateGanttChart();
    saveToLocalStorage();
    
    // Show confirmation
    alert('Example loaded! Review and customize the data for your project.');
    
    // Go to first section
    goToStep(1);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add to existing DOMContentLoaded or call separately
    // renderCharterExampleGallery(); // Only if modal is already open
});
