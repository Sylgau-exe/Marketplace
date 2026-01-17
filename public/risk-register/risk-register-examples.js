// ============================================
// RISK REGISTER - EXAMPLE GALLERY DATA
// ============================================
// 3 Complete Risk Register Examples

const riskRegisterExampleData = {
    
    // EXAMPLE 1: Software Development Project
    softwareProject: {
        id: 'softwareProject',
        title: 'Software Development Project',
        subtitle: 'E-Commerce Platform Rebuild',
        icon: '💻',
        category: 'IT/Software',
        stats: { risks: '18 risks', highRisks: '4 critical', mitigated: '12 active' },
        tags: ['Software', 'Agile', 'E-Commerce'],
        description: 'Comprehensive risk register for a 12-month e-commerce platform rebuild project including technical, resource, and business risks.',
        data: {
            projectName: 'E-Commerce Platform Rebuild - Project Phoenix',
            projectManager: 'Alex Chen',
            projectSponsor: 'Jennifer Walsh, VP Digital',
            lastUpdated: '2026-01-15',
            reviewFrequency: 'Weekly',
            
            riskCategories: ['Technical', 'Resource', 'Schedule', 'Budget', 'External', 'Business'],
            
            risks: [
                {
                    id: 'R001',
                    title: 'Third-party payment gateway integration complexity',
                    category: 'Technical',
                    description: 'Integration with Stripe, PayPal, and Apple Pay may be more complex than estimated due to PCI compliance requirements and varying API documentation quality.',
                    probability: 'High',
                    impact: 'High',
                    riskScore: 16,
                    status: 'Active',
                    owner: 'David Kim, Tech Lead',
                    identifiedDate: '2026-01-05',
                    triggers: ['API changes by payment providers', 'PCI audit findings', 'Integration testing failures'],
                    consequences: 'Project delay of 4-6 weeks, additional development cost of $50K-80K, potential launch date miss',
                    mitigation: 'Engage payment integration specialist early, create sandbox environment in Sprint 1, build abstraction layer for payment providers, schedule PCI pre-assessment',
                    contingency: 'Use proven payment middleware solution (Adyen) if direct integration fails, budget reserve allocated',
                    mitigationCost: 25000,
                    residualRisk: 'Medium',
                    notes: 'Stripe integration POC completed successfully. PayPal and Apple Pay still pending.'
                },
                {
                    id: 'R002',
                    title: 'Key developer resignation during critical phase',
                    category: 'Resource',
                    description: 'Loss of senior full-stack developer or architect during development could significantly impact timeline and knowledge continuity.',
                    probability: 'Medium',
                    impact: 'High',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'Sarah Martinez, Project Manager',
                    identifiedDate: '2026-01-05',
                    triggers: ['Resignation notice', 'Extended leave request', 'Performance issues'],
                    consequences: '6-8 week productivity loss for replacement ramp-up, knowledge gaps, team morale impact',
                    mitigation: 'Cross-training and pair programming mandatory, comprehensive documentation requirements, retention bonuses for key staff, maintain relationship with 2 contract agencies',
                    contingency: 'Pre-vetted contractors on standby, knowledge transfer protocol documented',
                    mitigationCost: 35000,
                    residualRisk: 'Medium',
                    notes: 'Retention bonuses approved for 3 key developers through project completion.'
                },
                {
                    id: 'R003',
                    title: 'Data migration from legacy system causes data loss or corruption',
                    category: 'Technical',
                    description: 'Migration of 2.5M customer records, 8M orders, and product catalog from legacy Oracle system may result in data quality issues.',
                    probability: 'Medium',
                    impact: 'Critical',
                    riskScore: 15,
                    status: 'Active',
                    owner: 'Michael Brown, Data Architect',
                    identifiedDate: '2026-01-08',
                    triggers: ['Data validation failures', 'Missing records post-migration', 'Customer complaints about account history'],
                    consequences: 'Customer trust damage, compliance violations (GDPR), potential revenue loss from order history issues',
                    mitigation: 'Phased migration approach, comprehensive data validation scripts, parallel running period of 2 weeks, automated reconciliation reports, rollback capability',
                    contingency: 'Full backup with tested restore procedure, manual data entry team on standby for critical fixes',
                    mitigationCost: 40000,
                    residualRisk: 'Low',
                    notes: 'Test migration completed with 99.7% accuracy. Addressing remaining edge cases.'
                },
                {
                    id: 'R004',
                    title: 'Performance issues under peak load',
                    category: 'Technical',
                    description: 'New platform may not handle Black Friday/Cyber Monday traffic (10x normal load) without performance degradation.',
                    probability: 'Medium',
                    impact: 'Critical',
                    riskScore: 15,
                    status: 'Active',
                    owner: 'David Kim, Tech Lead',
                    identifiedDate: '2026-01-10',
                    triggers: ['Load test failures', 'Response time degradation', 'Error rate increase under load'],
                    consequences: 'Lost sales during peak season ($500K+ per hour of downtime), customer experience damage, brand reputation',
                    mitigation: 'Performance testing every sprint, auto-scaling architecture on AWS, CDN implementation, database optimization, caching strategy',
                    contingency: 'Emergency scaling procedures documented, war room protocol for peak events, rollback to legacy system possible for 60 days post-launch',
                    mitigationCost: 30000,
                    residualRisk: 'Medium',
                    notes: 'Initial load tests show 5x capacity. Targeting 15x before launch.'
                },
                {
                    id: 'R005',
                    title: 'Scope creep from stakeholder requests',
                    category: 'Schedule',
                    description: 'Continuous feature requests from marketing and merchandising teams may expand scope beyond original plan.',
                    probability: 'High',
                    impact: 'Medium',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'Sarah Martinez, Project Manager',
                    identifiedDate: '2026-01-05',
                    triggers: ['Feature requests exceeding 10% of backlog', 'Stakeholder escalations', 'Sprint scope changes'],
                    consequences: 'Timeline extension, budget overrun, team burnout, quality compromise',
                    mitigation: 'Strict change control board, clear MVP definition signed off by sponsors, post-launch roadmap for Phase 2 features, weekly stakeholder alignment',
                    contingency: 'Documented list of "Phase 2" features to redirect requests, executive sponsor intervention protocol',
                    mitigationCost: 5000,
                    residualRisk: 'Medium',
                    notes: '23 feature requests redirected to Phase 2 backlog so far.'
                },
                {
                    id: 'R006',
                    title: 'Third-party vendor delays (hosting, CDN)',
                    category: 'External',
                    description: 'AWS or Cloudflare service provisioning, configuration, or support issues may impact timeline.',
                    probability: 'Low',
                    impact: 'Medium',
                    riskScore: 6,
                    status: 'Monitoring',
                    owner: 'James Wilson, DevOps Lead',
                    identifiedDate: '2026-01-12',
                    triggers: ['Service provisioning delays', 'Support ticket SLA breaches', 'Service outages'],
                    consequences: 'Environment setup delays, potential launch delay of 1-2 weeks',
                    mitigation: 'Enterprise support agreements with both vendors, early environment provisioning, documented escalation paths, redundant CDN option identified',
                    contingency: 'Secondary CDN (Fastly) can be activated within 48 hours, alternative AWS regions available',
                    mitigationCost: 8000,
                    residualRisk: 'Low',
                    notes: 'AWS enterprise support activated. All environments provisioned.'
                },
                {
                    id: 'R007',
                    title: 'Security vulnerability discovered pre-launch',
                    category: 'Technical',
                    description: 'Penetration testing or code review may reveal critical security vulnerabilities requiring significant remediation.',
                    probability: 'Medium',
                    impact: 'Critical',
                    riskScore: 15,
                    status: 'Active',
                    owner: 'Lisa Park, Security Lead',
                    identifiedDate: '2026-01-08',
                    triggers: ['Pen test findings', 'SAST/DAST scan results', 'Security audit failures'],
                    consequences: 'Launch delay for remediation, potential compliance issues, customer data risk if discovered post-launch',
                    mitigation: 'Security-first development practices, OWASP guidelines, continuous SAST scanning, penetration test scheduled 6 weeks before launch, bug bounty program',
                    contingency: 'Security remediation sprint built into schedule, external security consultants on retainer',
                    mitigationCost: 45000,
                    residualRisk: 'Medium',
                    notes: 'First pen test scheduled for Week 20. SAST scanning active in CI/CD pipeline.'
                },
                {
                    id: 'R008',
                    title: 'User adoption issues with new interface',
                    category: 'Business',
                    description: 'Customers may struggle with redesigned checkout flow or navigation, causing abandonment rate increase.',
                    probability: 'Medium',
                    impact: 'High',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'Emily Davis, UX Lead',
                    identifiedDate: '2026-01-10',
                    triggers: ['Beta user feedback', 'A/B test results', 'Cart abandonment metrics'],
                    consequences: 'Conversion rate drop of 10-20%, revenue impact, negative customer feedback',
                    mitigation: 'Extensive user research, prototype testing with 50+ users, A/B testing capability, gradual rollout with monitoring, familiar UI patterns where possible',
                    contingency: 'Quick-revert capability for checkout flow, customer support training, feedback collection mechanism',
                    mitigationCost: 20000,
                    residualRisk: 'Medium',
                    notes: 'User testing shows 15% improvement in checkout completion. Monitoring closely.'
                },
                {
                    id: 'R009',
                    title: 'Budget overrun exceeds contingency',
                    category: 'Budget',
                    description: 'Project costs may exceed the $1.2M budget plus 15% contingency due to unforeseen complexity or scope changes.',
                    probability: 'Medium',
                    impact: 'Medium',
                    riskScore: 9,
                    status: 'Monitoring',
                    owner: 'Sarah Martinez, Project Manager',
                    identifiedDate: '2026-01-05',
                    triggers: ['Monthly spend exceeds forecast by >10%', 'Contingency utilization exceeds 50%', 'Unplanned resource additions'],
                    consequences: 'Need for additional funding approval, potential scope reduction, project cancellation risk',
                    mitigation: 'Weekly budget tracking, earned value management, strict approval for unbudgeted expenses, monthly executive budget review',
                    contingency: 'Scope reduction options identified, additional funding request template prepared',
                    mitigationCost: 0,
                    residualRisk: 'Low',
                    notes: 'Currently tracking at 98% of budget forecast. Contingency intact.'
                },
                {
                    id: 'R010',
                    title: 'Regulatory compliance requirements change',
                    category: 'External',
                    description: 'New privacy regulations (state-level CCPA variants, cookie consent changes) may require additional development.',
                    probability: 'Low',
                    impact: 'Medium',
                    riskScore: 6,
                    status: 'Monitoring',
                    owner: 'Lisa Park, Security Lead',
                    identifiedDate: '2026-01-15',
                    triggers: ['New regulation announcements', 'Legal team alerts', 'Industry guidance updates'],
                    consequences: 'Additional development work, potential launch delay, compliance risk if not addressed',
                    mitigation: 'Privacy-by-design approach, flexible consent management system, legal team monitoring regulatory landscape, modular compliance components',
                    contingency: 'External compliance consultants available, fast-track development process for regulatory changes',
                    mitigationCost: 10000,
                    residualRisk: 'Low',
                    notes: 'No new regulations expected before launch. Monitoring 3 pending state bills.'
                },
                {
                    id: 'R011',
                    title: 'SEO ranking drop during migration',
                    category: 'Business',
                    description: 'URL structure changes and temporary technical issues during migration may cause significant SEO ranking drops.',
                    probability: 'High',
                    impact: 'Medium',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'Rachel Green, Digital Marketing',
                    identifiedDate: '2026-01-12',
                    triggers: ['Crawl errors in Search Console', 'Ranking drops for key terms', 'Organic traffic decline'],
                    consequences: 'Organic traffic drop of 20-40% for 2-3 months, revenue impact during recovery period',
                    mitigation: '301 redirect mapping for all URLs, XML sitemap submission, canonical tags, technical SEO audit pre-launch, staged URL migration',
                    contingency: 'Increased PPC spend to compensate, SEO recovery plan with agency support',
                    mitigationCost: 15000,
                    residualRisk: 'Medium',
                    notes: 'Redirect map 95% complete. SEO agency engaged for audit.'
                },
                {
                    id: 'R012',
                    title: 'Integration failure with ERP/inventory system',
                    category: 'Technical',
                    description: 'Real-time inventory sync with SAP may have latency or accuracy issues affecting stock availability display.',
                    probability: 'Medium',
                    impact: 'High',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'David Kim, Tech Lead',
                    identifiedDate: '2026-01-10',
                    triggers: ['Inventory discrepancy reports', 'Overselling incidents', 'Sync failure alerts'],
                    consequences: 'Overselling, customer disappointment, operational burden for order management',
                    mitigation: 'Real-time sync with fallback to 15-minute batch, inventory buffer logic, comprehensive integration testing, monitoring dashboard',
                    contingency: 'Manual inventory management process, customer communication templates for stock issues',
                    mitigationCost: 20000,
                    residualRisk: 'Medium',
                    notes: 'Integration testing in progress. 99.5% sync accuracy achieved in testing.'
                }
            ],
            
            riskSummary: {
                totalRisks: 12,
                criticalHigh: 4,
                medium: 6,
                low: 2,
                mitigated: 0,
                closed: 0
            },
            
            reviewNotes: 'Risk register reviewed in weekly project status meeting. Four high-priority risks (R001, R003, R004, R007) have dedicated mitigation workstreams. Next major review scheduled after penetration testing results.',
            
            escalationCriteria: 'Risks scoring 15+ automatically escalate to steering committee. Any risk threatening launch date escalates to executive sponsor immediately.',
            
            lessonsLearned: 'Payment integration complexity confirmed from similar project last year. Data migration approach improved based on CRM migration learnings.'
        }
    },
    
    // EXAMPLE 2: Product Launch
    productLaunch: {
        id: 'productLaunch',
        title: 'New Product Launch',
        subtitle: 'Consumer Electronics Go-to-Market',
        icon: '🚀',
        category: 'Marketing/Product',
        stats: { risks: '15 risks', highRisks: '3 critical', mitigated: '10 active' },
        tags: ['Product Launch', 'Marketing', 'Supply Chain'],
        description: 'Risk register for launching a new smart home device including manufacturing, marketing, regulatory, and competitive risks.',
        data: {
            projectName: 'SmartHome Hub 3.0 - Global Launch',
            projectManager: 'Michelle Torres',
            projectSponsor: 'Robert Anderson, VP Product',
            lastUpdated: '2026-01-20',
            reviewFrequency: 'Weekly',
            
            riskCategories: ['Supply Chain', 'Manufacturing', 'Marketing', 'Regulatory', 'Competitive', 'Technical'],
            
            risks: [
                {
                    id: 'R001',
                    title: 'Chip shortage delays manufacturing',
                    category: 'Supply Chain',
                    description: 'Global semiconductor supply constraints may delay production of custom WiFi/Bluetooth chip from primary supplier.',
                    probability: 'High',
                    impact: 'Critical',
                    riskScore: 20,
                    status: 'Active',
                    owner: 'Jason Lee, Supply Chain Director',
                    identifiedDate: '2025-11-15',
                    triggers: ['Supplier lead time extension', 'Allocation notice from foundry', 'Industry shortage reports'],
                    consequences: 'Launch delay of 2-4 months, lost market window, inventory shortages, revenue miss of $15-25M',
                    mitigation: 'Dual-source qualification with secondary supplier, 6-month safety stock order placed, design modification to use alternate chip if needed, weekly supplier calls',
                    contingency: 'Alternative chip design validated, ready to pivot within 8 weeks',
                    mitigationCost: 850000,
                    residualRisk: 'Medium',
                    notes: 'Secondary supplier qualification 80% complete. Primary supplier confirmed allocation through Q2.'
                },
                {
                    id: 'R002',
                    title: 'FCC/CE certification delays',
                    category: 'Regulatory',
                    description: 'Wireless certification testing may reveal compliance issues requiring hardware or firmware modifications.',
                    probability: 'Medium',
                    impact: 'High',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'Patricia Chen, Regulatory Affairs',
                    identifiedDate: '2025-12-01',
                    triggers: ['Pre-certification test failures', 'Testing lab delays', 'New regulatory requirements'],
                    consequences: 'Launch delay of 4-8 weeks, additional engineering costs, missed retail windows',
                    mitigation: 'Pre-certification testing at internal lab, engaged preferred testing lab early, firmware update capability for minor adjustments, regulatory consultant review',
                    contingency: 'Expedited testing option available at premium cost, modular design allows component-level fixes',
                    mitigationCost: 75000,
                    residualRisk: 'Medium',
                    notes: 'Pre-certification testing passed FCC Part 15. CE testing scheduled for Week 6.'
                },
                {
                    id: 'R003',
                    title: 'Competitor launches similar product first',
                    category: 'Competitive',
                    description: 'Major competitor (Company X) may launch competing smart hub before our launch date, capturing early market share.',
                    probability: 'Medium',
                    impact: 'High',
                    riskScore: 12,
                    status: 'Monitoring',
                    owner: 'Karen White, Product Marketing',
                    identifiedDate: '2025-12-10',
                    triggers: ['Competitor announcement', 'Trade show reveal', 'FCC filing detection'],
                    consequences: 'Reduced market impact, pricing pressure, need to differentiate messaging, potential market share loss of 15-20%',
                    mitigation: 'Competitive intelligence monitoring, differentiated feature set (Matter support, local processing), accelerated launch timeline option, flexible marketing messaging',
                    contingency: 'Rapid response marketing campaign ready, pricing flexibility approved, exclusive retail partnerships secured',
                    mitigationCost: 50000,
                    residualRisk: 'Medium',
                    notes: 'No competitor FCC filings detected. Intelligence suggests Company X is 4-6 months behind.'
                },
                {
                    id: 'R004',
                    title: 'Manufacturing quality issues at scale',
                    category: 'Manufacturing',
                    description: 'First production run may have higher defect rates than pilot production, causing returns and customer dissatisfaction.',
                    probability: 'Medium',
                    impact: 'High',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'Tom Baker, Quality Director',
                    identifiedDate: '2025-12-15',
                    triggers: ['Production yield below 95%', 'Quality audit failures', 'Early return reports'],
                    consequences: 'High return rate (target <3%), warranty costs, brand damage, potential recall',
                    mitigation: 'Enhanced incoming QC protocols, 100% functional testing, burn-in testing for first 10K units, quality gates at CM, on-site quality engineer during ramp',
                    contingency: 'Rework station at CM, replacement inventory buffer, customer service escalation team',
                    mitigationCost: 120000,
                    residualRisk: 'Medium',
                    notes: 'Pilot production achieved 97.2% yield. Production ramp starting Week 8.'
                },
                {
                    id: 'R005',
                    title: 'Software stability issues at launch',
                    category: 'Technical',
                    description: 'Firmware or mobile app may have bugs causing poor user experience during critical launch window.',
                    probability: 'Medium',
                    impact: 'High',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'David Park, Software Lead',
                    identifiedDate: '2025-12-20',
                    triggers: ['Beta tester bug reports', 'App store review complaints', 'High crash rates'],
                    consequences: 'Negative reviews, returns, support costs spike, brand damage',
                    mitigation: 'Extended beta program (5,000 users), staged rollout, OTA update capability, crash analytics, 24/7 engineering support for 2 weeks post-launch',
                    contingency: 'Emergency firmware rollback, hotfix deployment process, increased support staffing',
                    mitigationCost: 80000,
                    residualRisk: 'Medium',
                    notes: 'Beta program at 4,200 users. Crash-free rate improved to 99.4%.'
                },
                {
                    id: 'R006',
                    title: 'Retail partner allocation disputes',
                    category: 'Supply Chain',
                    description: 'Key retail partners may demand larger allocations than available inventory supports, causing relationship strain.',
                    probability: 'High',
                    impact: 'Medium',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'Steve Miller, Sales Director',
                    identifiedDate: '2026-01-05',
                    triggers: ['Retailer escalations', 'Threatened order cancellations', 'Competing retailer complaints'],
                    consequences: 'Damaged retail relationships, unfavorable placement, reduced marketing support from partners',
                    mitigation: 'Clear allocation policy communicated early, performance-based allocation tiers, executive relationship management, exclusive color/bundle options by retailer',
                    contingency: 'Executive-level negotiations, alternative channel expansion (DTC), phased launch by retailer',
                    mitigationCost: 25000,
                    residualRisk: 'Medium',
                    notes: 'Allocation agreements signed with 3 of 5 major retailers.'
                },
                {
                    id: 'R007',
                    title: 'Marketing campaign underperformance',
                    category: 'Marketing',
                    description: 'Launch marketing campaign may not achieve target awareness and consideration metrics.',
                    probability: 'Medium',
                    impact: 'Medium',
                    riskScore: 9,
                    status: 'Active',
                    owner: 'Karen White, Product Marketing',
                    identifiedDate: '2026-01-08',
                    triggers: ['Pre-launch survey awareness below 20%', 'Ad performance below benchmarks', 'Low pre-order numbers'],
                    consequences: 'Slower than expected sales ramp, inventory buildup, need for promotional pricing',
                    mitigation: 'Multi-channel campaign (TV, digital, influencer, retail), creative testing in advance, real-time optimization, PR embargo strategy',
                    contingency: 'Additional media budget reserve ($500K), promotional pricing authority, extended influencer program',
                    mitigationCost: 150000,
                    residualRisk: 'Medium',
                    notes: 'Creative testing shows 40% above benchmark engagement. Influencer contracts signed.'
                },
                {
                    id: 'R008',
                    title: 'Tariff or trade policy changes',
                    category: 'Supply Chain',
                    description: 'Changes in import tariffs or trade restrictions could increase COGS or disrupt supply chain.',
                    probability: 'Low',
                    impact: 'High',
                    riskScore: 8,
                    status: 'Monitoring',
                    owner: 'Jason Lee, Supply Chain Director',
                    identifiedDate: '2026-01-10',
                    triggers: ['Trade policy announcements', 'Tariff rate changes', 'Country-specific restrictions'],
                    consequences: 'Margin erosion of 5-10%, potential supply disruption, need for pricing adjustments',
                    mitigation: 'Diversified manufacturing (Vietnam facility as backup), tariff engineering review, government affairs monitoring, 90-day inventory buffer',
                    contingency: 'Price increase authority, alternative sourcing from non-affected regions, duty drawback programs',
                    mitigationCost: 30000,
                    residualRisk: 'Low',
                    notes: 'Vietnam facility qualified as backup. Monitoring trade policy developments.'
                },
                {
                    id: 'R009',
                    title: 'Security vulnerability discovered post-launch',
                    category: 'Technical',
                    description: 'Security researchers or hackers may discover vulnerabilities in device firmware or cloud services.',
                    probability: 'Medium',
                    impact: 'Critical',
                    riskScore: 15,
                    status: 'Active',
                    owner: 'Lisa Martinez, Security Lead',
                    identifiedDate: '2026-01-12',
                    triggers: ['Security researcher disclosure', 'Customer reports of compromise', 'Media coverage of vulnerability'],
                    consequences: 'Brand damage, potential recall, regulatory scrutiny, customer data breach risk',
                    mitigation: 'Third-party penetration testing, secure development lifecycle, bug bounty program, OTA update infrastructure, incident response plan',
                    contingency: 'Crisis communications plan, rapid patch deployment capability, customer notification templates',
                    mitigationCost: 100000,
                    residualRisk: 'Medium',
                    notes: 'Pen testing complete, 3 medium issues resolved. Bug bounty launching at public beta.'
                },
                {
                    id: 'R010',
                    title: 'Demand forecast significantly wrong',
                    category: 'Supply Chain',
                    description: 'Actual demand may be significantly higher or lower than forecast, causing stockouts or excess inventory.',
                    probability: 'Medium',
                    impact: 'Medium',
                    riskScore: 9,
                    status: 'Active',
                    owner: 'Amy Johnson, Demand Planning',
                    identifiedDate: '2026-01-15',
                    triggers: ['Pre-order rate deviation >30% from plan', 'Week 1 sales significantly off forecast', 'Retail POS data anomalies'],
                    consequences: 'Stockouts causing lost sales and customer frustration, OR excess inventory requiring markdowns',
                    mitigation: 'Scenario planning (bull/bear/base), flexible CM capacity agreements, real-time demand sensing, pre-order program',
                    contingency: 'Expedited shipping from CM, promotional pricing for excess, allocation management',
                    mitigationCost: 40000,
                    residualRisk: 'Medium',
                    notes: 'Pre-order program launching Week 4 will provide demand signal.'
                }
            ],
            
            riskSummary: {
                totalRisks: 10,
                criticalHigh: 3,
                medium: 6,
                low: 1,
                mitigated: 0,
                closed: 0
            },
            
            reviewNotes: 'Weekly risk review with cross-functional launch team. Chip supply (R001) remains top concern with dedicated task force. Regulatory (R002) on track.',
            
            escalationCriteria: 'Any risk threatening launch date or projected revenue >$5M impact escalates to EVP level. Supply chain critical risks reviewed by CEO weekly.',
            
            lessonsLearned: 'Previous product launch had 6-week delay due to certification issues. Earlier engagement with testing labs implemented for this launch.'
        }
    },
    
    // EXAMPLE 3: M&A Integration
    maIntegration: {
        id: 'maIntegration',
        title: 'M&A Integration Project',
        subtitle: 'Acquisition Integration PMI',
        icon: '🤝',
        category: 'Corporate Development',
        stats: { risks: '20 risks', highRisks: '5 critical', mitigated: '15 active' },
        tags: ['M&A', 'Integration', 'Change Management'],
        description: 'Comprehensive risk register for post-merger integration of acquired company including people, systems, customer, and synergy realization risks.',
        data: {
            projectName: 'Project Atlas - TechCo Acquisition Integration',
            projectManager: 'Richard Thompson',
            projectSponsor: 'Margaret Chen, Chief Strategy Officer',
            lastUpdated: '2026-01-22',
            reviewFrequency: 'Twice Weekly',
            
            riskCategories: ['People & Culture', 'Technology', 'Customer', 'Financial', 'Operational', 'Legal/Compliance'],
            
            risks: [
                {
                    id: 'R001',
                    title: 'Key talent attrition exceeds plan',
                    category: 'People & Culture',
                    description: 'Critical employees from acquired company may leave during integration, taking institutional knowledge and customer relationships.',
                    probability: 'High',
                    impact: 'Critical',
                    riskScore: 20,
                    status: 'Active',
                    owner: 'Sandra Williams, CHRO',
                    identifiedDate: '2025-12-01',
                    triggers: ['Resignation of identified key talent', 'Attrition rate exceeds 15%', 'Competitor recruiting activity'],
                    consequences: 'Loss of critical capabilities, customer relationship risk, deal value erosion, integration delays',
                    mitigation: 'Retention bonuses for 50 key employees (12-24 month vesting), clear career path communication, cultural integration program, competitive counter-offer authority',
                    contingency: 'Accelerated knowledge transfer protocols, external recruiting activated, customer transition plans',
                    mitigationCost: 2500000,
                    residualRisk: 'Medium',
                    notes: 'Retention agreements signed with 45 of 50 key employees. 3 departures in first 60 days (within plan).'
                },
                {
                    id: 'R002',
                    title: 'System integration complexity exceeds estimates',
                    category: 'Technology',
                    description: 'Integration of ERP, CRM, and product systems may be more complex and costly than due diligence estimates.',
                    probability: 'High',
                    impact: 'High',
                    riskScore: 16,
                    status: 'Active',
                    owner: 'Kevin Park, CIO',
                    identifiedDate: '2025-12-15',
                    triggers: ['Integration project overruns >20%', 'Delayed system cutovers', 'Data quality issues discovered'],
                    consequences: 'Integration cost overrun of $2-5M, delayed synergy realization, operational disruptions',
                    mitigation: 'Detailed technical assessment completed, phased integration approach, experienced systems integrator engaged, parallel running period, increased contingency budget',
                    contingency: 'Extended parallel operations, manual workarounds documented, additional budget reserve',
                    mitigationCost: 1200000,
                    residualRisk: 'Medium',
                    notes: 'Technical assessment revealed 3 previously unknown legacy systems. Scope adjusted.'
                },
                {
                    id: 'R003',
                    title: 'Customer defection during transition',
                    category: 'Customer',
                    description: 'Key customers may leave due to uncertainty, relationship changes, or competitive targeting during integration period.',
                    probability: 'Medium',
                    impact: 'Critical',
                    riskScore: 15,
                    status: 'Active',
                    owner: 'James Mitchell, Chief Revenue Officer',
                    identifiedDate: '2025-12-10',
                    triggers: ['Customer contract non-renewals', 'RFP losses to competitors', 'Customer escalations about service'],
                    consequences: 'Revenue loss, deal value erosion, market share loss, negative market perception',
                    mitigation: 'Executive outreach to top 50 customers, dedicated integration account teams, service level guarantees, competitive protection offers where needed',
                    contingency: 'Aggressive win-back program, pricing flexibility, executive relationship intervention',
                    mitigationCost: 500000,
                    residualRisk: 'Medium',
                    notes: 'CEO calls completed with top 20 customers. All committed to continued partnership.'
                },
                {
                    id: 'R004',
                    title: 'Cultural integration challenges',
                    category: 'People & Culture',
                    description: 'Significant cultural differences between acquiring and acquired company may cause friction, disengagement, and productivity loss.',
                    probability: 'High',
                    impact: 'High',
                    riskScore: 16,
                    status: 'Active',
                    owner: 'Sandra Williams, CHRO',
                    identifiedDate: '2025-12-20',
                    triggers: ['Employee survey scores decline', 'Cross-team collaboration issues', 'HR complaints increase'],
                    consequences: 'Productivity loss, increased attrition, failed integration of teams, us-vs-them mentality',
                    mitigation: 'Cultural assessment and integration plan, joint leadership workshops, cross-functional integration teams, town halls, clear communication cadence, values alignment workshops',
                    contingency: 'External change management consultants, targeted team interventions, organizational design adjustments',
                    mitigationCost: 350000,
                    residualRisk: 'Medium',
                    notes: 'Cultural assessment complete. Three key areas of alignment identified, two friction points being addressed.'
                },
                {
                    id: 'R005',
                    title: 'Synergy targets not achieved',
                    category: 'Financial',
                    description: 'Cost and revenue synergies underpinning deal valuation may not materialize as projected.',
                    probability: 'Medium',
                    impact: 'Critical',
                    riskScore: 15,
                    status: 'Active',
                    owner: 'Michael Torres, CFO',
                    identifiedDate: '2025-12-01',
                    triggers: ['Quarterly synergy tracking below 80% of plan', 'Cost reduction targets missed', 'Cross-sell pipeline below plan'],
                    consequences: 'Deal value erosion, investor confidence impact, executive accountability, potential goodwill impairment',
                    mitigation: 'Detailed synergy tracking with accountable owners, monthly synergy review board, conservative assumptions in baseline, quick win identification, dedicated synergy PMO',
                    contingency: 'Alternative synergy sources identified, accelerated timeline for achievable synergies, communication strategy for investor expectations',
                    mitigationCost: 200000,
                    residualRisk: 'Medium',
                    notes: 'Day 60 tracking shows 92% of Year 1 synergies on track. Two cost synergies delayed by 1 quarter.'
                },
                {
                    id: 'R006',
                    title: 'Regulatory approval conditions',
                    category: 'Legal/Compliance',
                    description: 'Regulatory approval may include conditions (divestitures, behavioral commitments) that reduce deal value or complicate integration.',
                    probability: 'Medium',
                    impact: 'High',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'Patricia Lee, General Counsel',
                    identifiedDate: '2025-11-15',
                    triggers: ['Regulatory inquiry or second request', 'Divestiture requirements', 'Behavioral remedy demands'],
                    consequences: 'Reduced deal scope, forced divestitures, ongoing compliance burden, delayed close',
                    mitigation: 'Proactive regulatory engagement, competition law counsel engaged, remedy scenario planning, divestiture buyer identification',
                    contingency: 'Divestiture execution plan ready, compliance program designed, value adjustment mechanisms',
                    mitigationCost: 400000,
                    residualRisk: 'Medium',
                    notes: 'FTC review in progress. No second request received. Counsel optimistic on unconditional approval.'
                },
                {
                    id: 'R007',
                    title: 'Product roadmap conflicts',
                    category: 'Operational',
                    description: 'Overlapping products and conflicting roadmaps may confuse customers and require difficult sunset decisions.',
                    probability: 'High',
                    impact: 'Medium',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'Jennifer Adams, Chief Product Officer',
                    identifiedDate: '2026-01-05',
                    triggers: ['Customer confusion about product direction', 'Engineering resource conflicts', 'Sales team confusion'],
                    consequences: 'Lost sales, customer frustration, engineering inefficiency, delayed innovation',
                    mitigation: 'Product portfolio rationalization analysis complete, clear go-forward strategy communicated, migration paths for overlapping products, unified roadmap by Day 90',
                    contingency: 'Extended dual-product support, customer-by-customer migration planning, additional product management resources',
                    mitigationCost: 150000,
                    residualRisk: 'Medium',
                    notes: 'Portfolio analysis complete. 2 products identified for sunset with 18-month migration path.'
                },
                {
                    id: 'R008',
                    title: 'Data privacy and security compliance gaps',
                    category: 'Legal/Compliance',
                    description: 'Acquired company may have data handling practices that do not meet acquirer standards or regulatory requirements.',
                    probability: 'Medium',
                    impact: 'High',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'David Chen, CISO',
                    identifiedDate: '2025-12-20',
                    triggers: ['Security audit findings', 'Data mapping reveals compliance gaps', 'Customer or regulator inquiries'],
                    consequences: 'Regulatory fines (GDPR up to 4% revenue), customer trust damage, remediation costs, potential breach liability',
                    mitigation: 'Comprehensive security and privacy assessment, remediation plan for gaps, interim controls implemented, combined DPO function established',
                    contingency: 'Incident response plan updated, cyber insurance coverage reviewed, regulatory notification procedures ready',
                    mitigationCost: 300000,
                    residualRisk: 'Medium',
                    notes: 'Assessment 75% complete. No critical gaps found. Medium-priority items in remediation.'
                },
                {
                    id: 'R009',
                    title: 'Supplier and vendor contract issues',
                    category: 'Operational',
                    description: 'Change of control provisions in acquired company contracts may trigger renegotiation, termination rights, or price increases.',
                    probability: 'Medium',
                    impact: 'Medium',
                    riskScore: 9,
                    status: 'Active',
                    owner: 'Robert Clark, Chief Procurement Officer',
                    identifiedDate: '2026-01-08',
                    triggers: ['Vendor termination notice', 'Price increase demands', 'Service level changes'],
                    consequences: 'Increased costs, service disruption, need for alternative vendors',
                    mitigation: 'Contract review completed, proactive vendor outreach, renegotiation strategy for key contracts, alternative vendor identification',
                    contingency: 'Emergency procurement procedures, temporary service agreements, accelerated vendor qualification',
                    mitigationCost: 75000,
                    residualRisk: 'Low',
                    notes: '12 contracts with change of control clauses identified. 8 already renegotiated successfully.'
                },
                {
                    id: 'R010',
                    title: 'Integration team capacity constraints',
                    category: 'Operational',
                    description: 'Integration demands may overwhelm team capacity, leading to burnout, mistakes, and business-as-usual neglect.',
                    probability: 'High',
                    impact: 'Medium',
                    riskScore: 12,
                    status: 'Active',
                    owner: 'Richard Thompson, Integration PMO',
                    identifiedDate: '2026-01-10',
                    triggers: ['Missed integration milestones', 'Key person burnout or leave', 'BAU metrics decline'],
                    consequences: 'Integration delays, quality issues, employee burnout, BAU performance decline',
                    mitigation: 'Dedicated integration team separated from BAU, external consultants for surge capacity, clear prioritization framework, regular workload monitoring',
                    contingency: 'Scope prioritization and timeline extension, additional external resources, temporary BAU support hiring',
                    mitigationCost: 400000,
                    residualRisk: 'Medium',
                    notes: 'Integration PMO fully staffed. Consulting support engaged for Workstream 3 and 4.'
                },
                {
                    id: 'R011',
                    title: 'Brand and market positioning confusion',
                    category: 'Customer',
                    description: 'Market may be confused about combined company positioning, brand architecture, and value proposition.',
                    probability: 'Medium',
                    impact: 'Medium',
                    riskScore: 9,
                    status: 'Active',
                    owner: 'Karen White, CMO',
                    identifiedDate: '2026-01-12',
                    triggers: ['Customer survey confusion metrics', 'Media coverage misrepresenting strategy', 'Sales message inconsistency'],
                    consequences: 'Lost sales opportunities, brand dilution, competitive vulnerability',
                    mitigation: 'Brand architecture decision and rollout plan, unified messaging platform, PR and analyst communications, sales enablement materials',
                    contingency: 'Accelerated brand clarification campaign, analyst briefings, customer communications',
                    mitigationCost: 200000,
                    residualRisk: 'Low',
                    notes: 'Brand architecture decided: master brand with product brands. Rollout beginning Week 12.'
                },
                {
                    id: 'R012',
                    title: 'Hidden liabilities discovered post-close',
                    category: 'Financial',
                    description: 'Undisclosed or underestimated liabilities may emerge after deal close despite due diligence.',
                    probability: 'Low',
                    impact: 'Critical',
                    riskScore: 10,
                    status: 'Monitoring',
                    owner: 'Michael Torres, CFO',
                    identifiedDate: '2025-12-01',
                    triggers: ['Legal claims filed', 'Tax audit findings', 'Undisclosed contracts discovered'],
                    consequences: 'Unexpected costs, deal value erosion, potential indemnification claims',
                    mitigation: 'Comprehensive due diligence, representation and warranty insurance, escrow holdback, indemnification provisions, post-close audit procedures',
                    contingency: 'R&W insurance claim process, indemnification claims against sellers, litigation if necessary',
                    mitigationCost: 100000,
                    residualRisk: 'Low',
                    notes: '$25M R&W insurance policy in place. No material findings in first 90 days.'
                }
            ],
            
            riskSummary: {
                totalRisks: 12,
                criticalHigh: 5,
                medium: 6,
                low: 1,
                mitigated: 0,
                closed: 0
            },
            
            reviewNotes: 'Integration risks reviewed twice weekly in IMO meeting. Talent retention (R001) and synergy tracking (R005) are top executive priorities. Day 60 checkpoint passed successfully.',
            
            escalationCriteria: 'Any risk threatening deal value by >$10M or integration timeline by >30 days escalates to Integration Steering Committee (CEO, CFO, CSO). Talent departure of identified key person escalates to CHRO within 24 hours.',
            
            lessonsLearned: 'Previous acquisition had significant cultural integration issues that extended integration by 6 months. Investing heavily in culture workstream this time. System integration took 40% longer than planned in last deal - added buffer and external support.'
        }
    }
};

// ============================================
// EXAMPLE GALLERY FUNCTIONS FOR RISK REGISTER
// ============================================

function renderRiskRegisterExampleGallery() {
    const gallery = document.getElementById('riskExampleGallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    Object.values(riskRegisterExampleData).forEach(example => {
        const card = document.createElement('div');
        card.className = 'example-card';
        card.innerHTML = `
            <div class="example-card-header" style="background: linear-gradient(135deg, #dc2626 0%, #f87171 100%);">
                <div class="example-card-icon">${example.icon}</div>
                <div class="example-card-title">${example.title}</div>
                <div class="example-card-subtitle">${example.subtitle}</div>
                <div class="example-card-stats">
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.risks}</div>
                        <div class="example-stat-label">Total</div>
                    </div>
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.highRisks}</div>
                        <div class="example-stat-label">Critical</div>
                    </div>
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.mitigated}</div>
                        <div class="example-stat-label">Active</div>
                    </div>
                </div>
            </div>
            <div class="example-card-body">
                <p class="example-card-desc">${example.description}</p>
                <div class="example-tags">
                    ${example.tags.map(tag => `<span class="example-tag">${tag}</span>`).join('')}
                </div>
                <div class="example-card-actions">
                    <button class="btn btn-secondary" onclick="previewRiskExample('${example.id}')">👁️ Preview</button>
                    <button class="btn btn-primary" onclick="useRiskExample('${example.id}')">✨ Use This</button>
                </div>
            </div>
        `;
        gallery.appendChild(card);
    });
}

function previewRiskExample(exampleId) {
    const example = riskRegisterExampleData[exampleId];
    if (!example) return;
    
    document.getElementById('examplePreviewTitle').textContent = example.title + ' - Risk Register Preview';
    
    const content = document.getElementById('examplePreviewContent');
    const data = example.data;
    
    const criticalRisks = data.risks.filter(r => r.riskScore >= 15);
    
    content.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #dc2626; margin-bottom: 0.75rem;">📋 Project Overview</h4>
            <p style="font-weight: 600; margin-bottom: 0.5rem;">${data.projectName}</p>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Project Manager: ${data.projectManager} | Sponsor: ${data.projectSponsor}</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #dc2626; margin-bottom: 0.75rem;">📊 Risk Summary</h4>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem;">
                <div style="background: #fef2f2; padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #dc2626;">${data.riskSummary.totalRisks}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">Total Risks</div>
                </div>
                <div style="background: #fef2f2; padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #dc2626;">${data.riskSummary.criticalHigh}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">Critical/High</div>
                </div>
                <div style="background: #fef2f2; padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #f59e0b;">${data.riskSummary.medium}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">Medium</div>
                </div>
                <div style="background: #f0fdf4; padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #16a34a;">${data.riskSummary.low}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">Low</div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #dc2626; margin-bottom: 0.75rem;">⚠️ Top Risks</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                <thead>
                    <tr style="background: #fef2f2;">
                        <th style="padding: 0.5rem; text-align: left;">Risk</th>
                        <th style="padding: 0.5rem; text-align: center;">Score</th>
                        <th style="padding: 0.5rem; text-align: left;">Owner</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.risks.slice(0, 4).map(r => `
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.5rem;">${r.title.substring(0, 45)}...</td>
                            <td style="padding: 0.5rem; text-align: center;">
                                <span style="background: ${r.riskScore >= 15 ? '#fef2f2' : r.riskScore >= 9 ? '#fffbeb' : '#f0fdf4'}; 
                                             color: ${r.riskScore >= 15 ? '#dc2626' : r.riskScore >= 9 ? '#d97706' : '#16a34a'};
                                             padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: 600;">
                                    ${r.riskScore}
                                </span>
                            </td>
                            <td style="padding: 0.5rem; font-size: 0.8rem;">${r.owner.split(',')[0]}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div>
            <h4 style="color: #dc2626; margin-bottom: 0.75rem;">📝 Review Notes</h4>
            <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; font-size: 0.9rem; color: var(--text-muted);">
                ${data.reviewNotes}
            </div>
        </div>
    `;
    
    document.getElementById('useExampleBtn').onclick = () => useRiskExample(exampleId);
    document.getElementById('examplesGalleryModal').classList.remove('active');
    document.getElementById('examplePreviewModal').classList.add('active');
}

function useRiskExample(exampleId) {
    const example = riskRegisterExampleData[exampleId];
    if (!example) return;
    
    console.log('Loading Risk Register example:', exampleId, example.data);
    
    document.getElementById('examplesGalleryModal')?.classList.remove('active');
    document.getElementById('examplePreviewModal')?.classList.remove('active');
    
    alert('Example data loaded! Customize it for your risk register.');
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { riskRegisterExampleData };
}
