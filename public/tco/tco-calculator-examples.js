// ============================================
// TCO CALCULATOR - EXAMPLE GALLERY DATA
// ============================================
// 3 Complete Total Cost of Ownership Analysis Examples

const tcoExampleData = {
    
    // EXAMPLE 1: Cloud Migration TCO
    cloudMigration: {
        id: 'cloudMigration',
        title: 'Cloud Migration Analysis',
        subtitle: 'On-Premise vs AWS Comparison',
        icon: '☁️',
        category: 'IT Infrastructure',
        stats: { savings: '$1.8M', period: '5 years', reduction: '42%' },
        tags: ['Cloud', 'AWS', 'Data Center'],
        description: 'TCO comparison between maintaining on-premise data center infrastructure vs migrating to AWS cloud, including hidden costs and operational savings.',
        data: {
            analysisName: 'Data Center to AWS Cloud Migration TCO',
            analysisDescription: 'Comprehensive 5-year TCO comparison between maintaining current on-premise data center (120 servers, 500TB storage) versus migrating to AWS cloud infrastructure. Analysis includes all direct, indirect, and hidden costs.',
            
            preparedBy: 'Kevin Liu',
            preparedDate: '2026-01-22',
            department: 'IT Infrastructure',
            
            analysisPeriod: 5,
            comparisonType: 'On-Premise vs Cloud',
            
            // Option A: On-Premise (Current State)
            optionA: {
                name: 'On-Premise Data Center',
                
                capitalCosts: [
                    { item: 'Server Refresh (Year 1 & 3)', amount: 450000, timing: 'Years 1, 3', depreciation: 3, notes: '60 servers each cycle' },
                    { item: 'Storage Expansion', amount: 180000, timing: 'Year 2', depreciation: 5, notes: 'SAN expansion for growth' },
                    { item: 'Network Equipment Upgrade', amount: 85000, timing: 'Year 1', depreciation: 5, notes: 'Switches, firewalls' },
                    { item: 'Backup Infrastructure', amount: 120000, timing: 'Year 1', depreciation: 5, notes: 'Tape library, backup servers' },
                    { item: 'UPS/Power Infrastructure', amount: 65000, timing: 'Year 3', depreciation: 7, notes: 'Battery replacement, PDUs' }
                ],
                
                operatingCosts: [
                    { item: 'Data Center Space Lease', amount: 185000, frequency: 'Annual', escalation: 3, notes: '2,400 sq ft @ $77/sq ft' },
                    { item: 'Power & Cooling', amount: 142000, frequency: 'Annual', escalation: 5, notes: '350 kW average load' },
                    { item: 'Hardware Maintenance Contracts', amount: 95000, frequency: 'Annual', escalation: 4, notes: 'Dell, NetApp, Cisco' },
                    { item: 'Software Licenses (VMware, Backup)', amount: 125000, frequency: 'Annual', escalation: 5, notes: 'vSphere, Veeam, monitoring' },
                    { item: 'IT Staff (4 FTEs)', amount: 480000, frequency: 'Annual', escalation: 3, notes: '2 sysadmins, 1 network, 1 storage' },
                    { item: 'Insurance', amount: 28000, frequency: 'Annual', escalation: 2, notes: 'Equipment and liability' },
                    { item: 'Security & Compliance', amount: 45000, frequency: 'Annual', escalation: 4, notes: 'Audits, pen testing, tools' }
                ],
                
                hiddenCosts: [
                    { item: 'Unplanned Downtime', amount: 85000, frequency: 'Annual', notes: '12 hrs/year avg @ $7K/hr business impact' },
                    { item: 'Over-provisioning Buffer', amount: 120000, frequency: 'Annual', notes: '30% capacity held for peaks, rarely used' },
                    { item: 'EOL/Refresh Planning', amount: 35000, frequency: 'Annual', notes: 'Staff time for vendor management, RFPs' },
                    { item: 'Disaster Recovery Site', amount: 95000, frequency: 'Annual', notes: 'Colo costs for DR infrastructure' }
                ]
            },
            
            // Option B: AWS Cloud
            optionB: {
                name: 'AWS Cloud Infrastructure',
                
                capitalCosts: [
                    { item: 'Migration Project', amount: 380000, timing: 'Year 1', depreciation: 0, notes: 'Professional services, tools' },
                    { item: 'Training & Certification', amount: 45000, timing: 'Year 1', depreciation: 0, notes: 'AWS certifications for team' },
                    { item: 'Application Refactoring', amount: 125000, timing: 'Year 1', depreciation: 0, notes: 'Cloud-native optimization' }
                ],
                
                operatingCosts: [
                    { item: 'AWS EC2 Compute', amount: 285000, frequency: 'Annual', escalation: -3, notes: 'Reserved instances, expected optimization' },
                    { item: 'AWS Storage (S3, EBS)', amount: 78000, frequency: 'Annual', escalation: 5, notes: 'Data growth included' },
                    { item: 'AWS Networking', amount: 42000, frequency: 'Annual', escalation: 2, notes: 'Data transfer, VPN, Direct Connect' },
                    { item: 'AWS Support (Business)', amount: 35000, frequency: 'Annual', escalation: 0, notes: '24/7 support tier' },
                    { item: 'Cloud Management Tools', amount: 28000, frequency: 'Annual', escalation: 3, notes: 'CloudHealth, monitoring' },
                    { item: 'IT Staff (2.5 FTEs)', amount: 300000, frequency: 'Annual', escalation: 3, notes: 'Cloud architects, DevOps' },
                    { item: 'Security Tools (AWS-native + 3rd party)', amount: 55000, frequency: 'Annual', escalation: 4, notes: 'GuardDuty, WAF, Prisma Cloud' }
                ],
                
                hiddenCosts: [
                    { item: 'Data Egress (unanticipated)', amount: 25000, frequency: 'Annual', notes: 'Development, testing, backups' },
                    { item: 'Learning Curve Productivity Loss', amount: 60000, timing: 'Year 1 only', notes: 'Team ramp-up period' },
                    { item: 'Multi-cloud Complexity', amount: 15000, frequency: 'Annual', notes: 'Some workloads remain hybrid' }
                ]
            },
            
            assumptions: [
                'Compute workloads grow 15% annually',
                'Storage grows 25% annually',
                'AWS pricing decreases 3% annually (historical trend)',
                'No major architecture changes required',
                'Reserved Instance commitment for 3-year terms',
                'Current staff can be retrained (no layoffs)',
                'Compliance requirements met by both options'
            ],
            
            risks: [
                { risk: 'AWS price increases', impact: 'Medium', probability: '20%', mitigation: 'Reserved instances, multi-cloud optionality' },
                { risk: 'Migration delays', impact: 'Medium', probability: '35%', mitigation: 'Phased approach, experienced partner' },
                { risk: 'Performance issues post-migration', impact: 'High', probability: '15%', mitigation: 'POC testing, right-sizing tools' },
                { risk: 'Security/compliance gaps', impact: 'High', probability: '10%', mitigation: 'Compliance-first architecture, audits' }
            ],
            
            qualitativeFactors: [
                { factor: 'Scalability', optionA: 'Limited - weeks to provision', optionB: 'Excellent - minutes to scale', advantage: 'B' },
                { factor: 'Disaster Recovery', optionA: 'Complex, costly DR site', optionB: 'Built-in multi-AZ/region', advantage: 'B' },
                { factor: 'Innovation Speed', optionA: 'Slow - hardware dependencies', optionB: 'Fast - managed services', advantage: 'B' },
                { factor: 'Data Sovereignty', optionA: 'Full control', optionB: 'AWS regions, some concerns', advantage: 'A' },
                { factor: 'Exit Flexibility', optionA: 'Own hardware', optionB: 'Some lock-in risk', advantage: 'A' }
            ],
            
            recommendation: 'RECOMMEND OPTION B (AWS Cloud) - 5-year TCO savings of $1.8M (42% reduction) with significantly improved scalability, resilience, and innovation capabilities. Migration risk is manageable with phased approach.',
            
            implementationPlan: [
                'Phase 1 (Months 1-3): Assessment, planning, training',
                'Phase 2 (Months 4-6): Development/test environment migration',
                'Phase 3 (Months 7-10): Production workload migration (wave 1)',
                'Phase 4 (Months 11-14): Remaining workloads, optimization',
                'Phase 5 (Months 15-18): Data center decommissioning'
            ]
        }
    },
    
    // EXAMPLE 2: Fleet Vehicle TCO
    fleetVehicle: {
        id: 'fleetVehicle',
        title: 'Fleet Vehicle Comparison',
        subtitle: 'ICE vs Electric Vehicles',
        icon: '🚗',
        category: 'Fleet Management',
        stats: { savings: '$485K', period: '7 years', breakeven: '3.2 years' },
        tags: ['EV', 'Fleet', 'Sustainability'],
        description: 'TCO analysis comparing traditional internal combustion engine (ICE) fleet vehicles with electric vehicles (EV) for a 50-vehicle delivery fleet.',
        data: {
            analysisName: 'Delivery Fleet TCO: ICE vs Electric Vehicles',
            analysisDescription: 'Compare 7-year TCO for replacing 50 delivery vans with either new ICE vehicles (Ford Transit) or electric vehicles (Ford E-Transit). Fleet travels average 25,000 miles per vehicle annually.',
            
            preparedBy: 'Maria Gonzalez',
            preparedDate: '2026-01-25',
            department: 'Fleet Operations',
            
            analysisPeriod: 7,
            fleetSize: 50,
            annualMileage: 25000,
            
            // Option A: ICE Vehicles
            optionA: {
                name: 'ICE Fleet (Ford Transit)',
                
                acquisitionCosts: [
                    { item: 'Vehicle Purchase (50 units)', amount: 2250000, notes: '$45,000 per vehicle' },
                    { item: 'Dealer Fees & Registration', amount: 75000, notes: '$1,500 per vehicle' },
                    { item: 'Fleet Graphics/Wrap', amount: 50000, notes: '$1,000 per vehicle' },
                    { item: 'Telematics Installation', amount: 25000, notes: '$500 per vehicle' }
                ],
                
                operatingCosts: [
                    { item: 'Fuel', amount: 187500, frequency: 'Annual', escalation: 4, notes: '25K mi × 50 vans ÷ 15 MPG × $4.50/gal' },
                    { item: 'Scheduled Maintenance', amount: 75000, frequency: 'Annual', escalation: 3, notes: 'Oil changes, filters, brakes, tires' },
                    { item: 'Unscheduled Repairs', amount: 45000, frequency: 'Annual', escalation: 5, notes: 'Increases with vehicle age' },
                    { item: 'Insurance', amount: 125000, frequency: 'Annual', escalation: 3, notes: '$2,500 per vehicle' },
                    { item: 'Registration & Taxes', amount: 35000, frequency: 'Annual', escalation: 2, notes: 'Annual renewals' },
                    { item: 'Telematics Service', amount: 18000, frequency: 'Annual', escalation: 0, notes: '$30/month per vehicle' }
                ],
                
                hiddenCosts: [
                    { item: 'Driver Fueling Time', amount: 32500, frequency: 'Annual', notes: '15 min/week × 50 drivers × $25/hr' },
                    { item: 'Emissions Compliance (future)', amount: 15000, frequency: 'Annual', startYear: 3, notes: 'Clean air zone fees, expected regulations' },
                    { item: 'Fuel Price Volatility Risk', amount: 20000, frequency: 'Annual', notes: 'Hedging costs, budget uncertainty' }
                ],
                
                residualValue: 337500,
                residualNotes: '15% of purchase price at Year 7'
            },
            
            // Option B: Electric Vehicles
            optionB: {
                name: 'EV Fleet (Ford E-Transit)',
                
                acquisitionCosts: [
                    { item: 'Vehicle Purchase (50 units)', amount: 2750000, notes: '$55,000 per vehicle' },
                    { item: 'Federal Tax Credit', amount: -375000, notes: '$7,500 per vehicle' },
                    { item: 'State Incentives', amount: -100000, notes: 'Varies, avg $2,000 per vehicle' },
                    { item: 'Charging Infrastructure', amount: 185000, notes: '25 dual-port L2 chargers installed' },
                    { item: 'Electrical Upgrades', amount: 65000, notes: 'Panel upgrades at 2 facilities' },
                    { item: 'Fleet Graphics/Wrap', amount: 50000, notes: '$1,000 per vehicle' },
                    { item: 'Telematics Installation', amount: 15000, notes: '$300 per vehicle (simpler install)' }
                ],
                
                operatingCosts: [
                    { item: 'Electricity', amount: 62500, frequency: 'Annual', escalation: 2, notes: '25K mi × 50 vans × 0.5 kWh/mi × $0.10/kWh' },
                    { item: 'Scheduled Maintenance', amount: 25000, frequency: 'Annual', escalation: 2, notes: 'Reduced: no oil, fewer brake jobs (regen)' },
                    { item: 'Unscheduled Repairs', amount: 20000, frequency: 'Annual', escalation: 3, notes: 'Fewer moving parts, battery warranty' },
                    { item: 'Insurance', amount: 137500, frequency: 'Annual', escalation: 3, notes: '$2,750 per vehicle (10% EV premium)' },
                    { item: 'Registration & Taxes', amount: 30000, frequency: 'Annual', escalation: 2, notes: 'EV registration discounts in some states' },
                    { item: 'Telematics Service', amount: 18000, frequency: 'Annual', escalation: 0, notes: '$30/month per vehicle' },
                    { item: 'Charger Maintenance', amount: 8000, frequency: 'Annual', escalation: 3, notes: 'Network fees, repairs' }
                ],
                
                hiddenCosts: [
                    { item: 'Driver Training', amount: 25000, timing: 'Year 1 only', notes: 'EV operation, charging procedures' },
                    { item: 'Route Optimization (initial)', amount: 15000, timing: 'Year 1 only', notes: 'Adjust for range considerations' },
                    { item: 'Battery Degradation Reserve', amount: 10000, frequency: 'Annual', startYear: 5, notes: 'Range reduction planning' }
                ],
                
                residualValue: 412500,
                residualNotes: '15% of purchase price at Year 7 (EV residuals improving)'
            },
            
            assumptions: [
                'Electricity rate $0.10/kWh (fleet charging rate)',
                'Gas price $4.50/gallon, 4% annual increase',
                'All vehicles driven 25,000 miles annually',
                'Night charging at depot (no public charging needed)',
                'Federal tax credit remains available',
                'No major battery replacements needed (8-year warranty)',
                'Similar driver productivity for both options'
            ],
            
            risks: [
                { risk: 'Electricity price increases', impact: 'Low', probability: '30%', mitigation: 'Solar installation potential, time-of-use optimization' },
                { risk: 'Range anxiety affects operations', impact: 'Medium', probability: '20%', mitigation: 'Route analysis shows 90% routes under 100 miles' },
                { risk: 'Charging infrastructure issues', impact: 'Medium', probability: '25%', mitigation: 'Redundant chargers, maintenance contract' },
                { risk: 'Battery degradation faster than expected', impact: 'High', probability: '10%', mitigation: '8-year warranty, degradation reserve fund' }
            ],
            
            qualitativeFactors: [
                { factor: 'Environmental Impact', optionA: '4,500 tons CO2 over 7 years', optionB: 'Zero direct emissions', advantage: 'B' },
                { factor: 'Brand Image', optionA: 'Neutral', optionB: 'Positive sustainability messaging', advantage: 'B' },
                { factor: 'Driver Satisfaction', optionA: 'Standard', optionB: 'Generally preferred (quieter, smoother)', advantage: 'B' },
                { factor: 'Fuel Price Stability', optionA: 'High volatility', optionB: 'Stable, predictable', advantage: 'B' },
                { factor: 'Technology Maturity', optionA: 'Proven, established', optionB: 'Rapidly improving, some uncertainty', advantage: 'A' },
                { factor: 'Resale Market', optionA: 'Established market', optionB: 'Emerging, less certain', advantage: 'A' }
            ],
            
            recommendation: 'RECOMMEND OPTION B (EV Fleet) - 7-year TCO savings of $485K (18% reduction) with breakeven at 3.2 years. Additional benefits include zero emissions, fuel price stability, and positive brand impact. Recommend phased transition starting with 20 vehicles.',
            
            implementationPlan: [
                'Phase 1 (Months 1-4): Charging infrastructure installation at main depot',
                'Phase 2 (Months 5-8): First 20 EV delivery, driver training',
                'Phase 3 (Months 9-14): Second depot infrastructure, next 15 EVs',
                'Phase 4 (Months 15-20): Final 15 EVs, optimization',
                'Phase 5 (Ongoing): Performance monitoring, ICE vehicle disposal'
            ]
        }
    },
    
    // EXAMPLE 3: Office Space TCO
    officeSpace: {
        id: 'officeSpace',
        title: 'Office Space Strategy',
        subtitle: 'Traditional vs Hybrid Model',
        icon: '🏢',
        category: 'Real Estate',
        stats: { savings: '$2.4M', period: '5 years', reduction: '35%' },
        tags: ['Real Estate', 'Hybrid Work', 'Facilities'],
        description: 'TCO comparison between maintaining current office footprint vs implementing hybrid work model with reduced space and flexible arrangements.',
        data: {
            analysisName: 'Office Real Estate TCO: Traditional vs Hybrid Model',
            analysisDescription: 'Compare 5-year TCO between maintaining current 85,000 sq ft headquarters for 400 employees vs implementing hybrid work model with reduced 50,000 sq ft space, activity-based working, and flexible arrangements.',
            
            preparedBy: 'Sarah Kim',
            preparedDate: '2026-01-28',
            department: 'Real Estate & Facilities',
            
            analysisPeriod: 5,
            employeeCount: 400,
            
            // Option A: Traditional Office
            optionA: {
                name: 'Traditional Office (85,000 sq ft)',
                
                capitalCosts: [
                    { item: 'Lease Security Deposit', amount: 425000, timing: 'Year 1', notes: '2 months rent (returnable)' },
                    { item: 'Furniture Refresh (Year 3)', amount: 280000, timing: 'Year 3', depreciation: 7, notes: '30% of workstations' },
                    { item: 'Technology Upgrades', amount: 150000, timing: 'Years 1, 3, 5', notes: 'Conference room AV, network' }
                ],
                
                operatingCosts: [
                    { item: 'Base Rent', amount: 2550000, frequency: 'Annual', escalation: 3, notes: '$30/sq ft for 85K sq ft' },
                    { item: 'Operating Expenses (CAM)', amount: 935000, frequency: 'Annual', escalation: 4, notes: '$11/sq ft NNN costs' },
                    { item: 'Utilities', amount: 255000, frequency: 'Annual', escalation: 5, notes: '$3/sq ft' },
                    { item: 'Janitorial & Maintenance', amount: 170000, frequency: 'Annual', escalation: 3, notes: '$2/sq ft' },
                    { item: 'Security', amount: 95000, frequency: 'Annual', escalation: 3, notes: 'Guards, systems, monitoring' },
                    { item: 'Facilities Staff (3 FTEs)', amount: 195000, frequency: 'Annual', escalation: 3, notes: 'Facilities manager + 2 techs' },
                    { item: 'Parking', amount: 180000, frequency: 'Annual', escalation: 3, notes: '300 spaces @ $50/month' },
                    { item: 'Insurance', amount: 85000, frequency: 'Annual', escalation: 3, notes: 'Property, liability' }
                ],
                
                hiddenCosts: [
                    { item: 'Underutilized Space', amount: 400000, frequency: 'Annual', notes: '40% of desks empty on average day' },
                    { item: 'Commute Subsidies/Benefits', amount: 120000, frequency: 'Annual', notes: 'Transit passes, parking subsidies' },
                    { item: 'On-site Amenities', amount: 85000, frequency: 'Annual', notes: 'Café subsidy, fitness, events' }
                ]
            },
            
            // Option B: Hybrid Model
            optionB: {
                name: 'Hybrid Model (50,000 sq ft)',
                
                capitalCosts: [
                    { item: 'Lease Termination/Modification', amount: 450000, timing: 'Year 1', notes: 'Early termination fee or sublease costs' },
                    { item: 'New Space Build-out', amount: 750000, timing: 'Year 1', depreciation: 10, notes: 'Activity-based workspace design' },
                    { item: 'Hot-desking Technology', amount: 85000, timing: 'Year 1', depreciation: 5, notes: 'Booking system, sensors, displays' },
                    { item: 'Home Office Stipends', amount: 200000, timing: 'Year 1', notes: '$500 per employee setup' },
                    { item: 'Collaboration Technology', amount: 180000, timing: 'Year 1', depreciation: 5, notes: 'Enhanced video conferencing, hybrid meeting rooms' }
                ],
                
                operatingCosts: [
                    { item: 'Base Rent', amount: 1750000, frequency: 'Annual', escalation: 3, notes: '$35/sq ft for 50K sq ft (premium location)' },
                    { item: 'Operating Expenses (CAM)', amount: 600000, frequency: 'Annual', escalation: 4, notes: '$12/sq ft' },
                    { item: 'Utilities', amount: 125000, frequency: 'Annual', escalation: 5, notes: 'Reduced but higher per sq ft' },
                    { item: 'Janitorial & Maintenance', amount: 100000, frequency: 'Annual', escalation: 3, notes: 'Enhanced cleaning protocols' },
                    { item: 'Security', amount: 75000, frequency: 'Annual', escalation: 3, notes: 'Smaller space, access control' },
                    { item: 'Facilities Staff (2 FTEs)', amount: 135000, frequency: 'Annual', escalation: 3, notes: 'Reduced headcount' },
                    { item: 'Parking (Reduced)', amount: 90000, frequency: 'Annual', escalation: 3, notes: '150 spaces (on-demand basis)' },
                    { item: 'Insurance', amount: 55000, frequency: 'Annual', escalation: 3, notes: 'Reduced coverage' },
                    { item: 'Desk Booking System', amount: 24000, frequency: 'Annual', escalation: 0, notes: 'SaaS platform' },
                    { item: 'Remote Work Allowance', amount: 240000, frequency: 'Annual', escalation: 2, notes: '$50/month per employee for internet/utilities' }
                ],
                
                hiddenCosts: [
                    { item: 'Collaboration Tool Licenses', amount: 48000, frequency: 'Annual', notes: 'Enhanced Zoom, Miro, Slack upgrades' },
                    { item: 'Change Management', amount: 75000, timing: 'Years 1-2', notes: 'Training, culture building, adoption' },
                    { item: 'Occasional Overflow Space', amount: 30000, frequency: 'Annual', notes: 'Day offices, coworking for peaks' }
                ]
            },
            
            assumptions: [
                'Employees work in-office 2-3 days per week on average',
                'Current lease has 2 years remaining with termination option',
                'Talent market expects hybrid work options',
                'No reduction in headcount planned',
                'Productivity remains constant (studies support this)',
                'Sublease market exists for excess current space'
            ],
            
            risks: [
                { risk: 'Hybrid model negatively impacts collaboration', impact: 'High', probability: '20%', mitigation: 'Designated team days, collaboration spaces, culture investment' },
                { risk: 'Difficulty subleasing excess space', impact: 'Medium', probability: '30%', mitigation: 'Broker engaged, market analysis shows demand' },
                { risk: 'Return to full-time office trend', impact: 'Medium', probability: '15%', mitigation: 'Flexible lease terms, expansion options' },
                { risk: 'Technology/security challenges with remote work', impact: 'Medium', probability: '25%', mitigation: 'Enhanced IT support, security tools' }
            ],
            
            qualitativeFactors: [
                { factor: 'Employee Satisfaction', optionA: 'Declining (commute fatigue)', optionB: 'Improved (flexibility)', advantage: 'B' },
                { factor: 'Talent Attraction', optionA: 'Competitive disadvantage', optionB: 'Strong differentiator', advantage: 'B' },
                { factor: 'Sustainability', optionA: 'Higher carbon footprint', optionB: 'Reduced commuting emissions', advantage: 'B' },
                { factor: 'Business Continuity', optionA: 'Single point of failure', optionB: 'Distributed, resilient', advantage: 'B' },
                { factor: 'Spontaneous Collaboration', optionA: 'Natural/frequent', optionB: 'Requires intentionality', advantage: 'A' },
                { factor: 'Company Culture', optionA: 'Easier to maintain', optionB: 'Requires active cultivation', advantage: 'A' }
            ],
            
            recommendation: 'RECOMMEND OPTION B (Hybrid Model) - 5-year TCO savings of $2.4M (35% reduction). Beyond cost savings, hybrid model is essential for talent retention and attraction. Requires investment in collaboration technology and intentional culture building.',
            
            implementationPlan: [
                'Phase 1 (Months 1-3): Policy development, employee survey, space planning',
                'Phase 2 (Months 4-6): Technology deployment, pilot with 2 departments',
                'Phase 3 (Months 7-9): Full hybrid rollout, current space modification',
                'Phase 4 (Months 10-14): New space build-out, lease transition',
                'Phase 5 (Months 15-18): Old space handover, optimization period'
            ]
        }
    }
};

// ============================================
// EXAMPLE GALLERY FUNCTIONS FOR TCO CALCULATOR
// ============================================

function renderTcoExampleGallery() {
    const gallery = document.getElementById('tcoExampleGallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    Object.values(tcoExampleData).forEach(example => {
        const card = document.createElement('div');
        card.className = 'example-card';
        card.innerHTML = `
            <div class="example-card-header" style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);">
                <div class="example-card-icon">${example.icon}</div>
                <div class="example-card-title">${example.title}</div>
                <div class="example-card-subtitle">${example.subtitle}</div>
                <div class="example-card-stats">
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.savings}</div>
                        <div class="example-stat-label">Savings</div>
                    </div>
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.period}</div>
                        <div class="example-stat-label">Period</div>
                    </div>
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.reduction || example.stats.breakeven}</div>
                        <div class="example-stat-label">${example.stats.reduction ? 'Reduction' : 'Breakeven'}</div>
                    </div>
                </div>
            </div>
            <div class="example-card-body">
                <p class="example-card-desc">${example.description}</p>
                <div class="example-tags">
                    ${example.tags.map(tag => `<span class="example-tag">${tag}</span>`).join('')}
                </div>
                <div class="example-card-actions">
                    <button class="btn btn-secondary" onclick="previewTcoExample('${example.id}')">👁️ Preview</button>
                    <button class="btn btn-primary" onclick="useTcoExample('${example.id}')">✨ Use This</button>
                </div>
            </div>
        `;
        gallery.appendChild(card);
    });
}

function previewTcoExample(exampleId) {
    const example = tcoExampleData[exampleId];
    if (!example) return;
    
    document.getElementById('examplePreviewTitle').textContent = example.title + ' - TCO Preview';
    
    const content = document.getElementById('examplePreviewContent');
    const data = example.data;
    
    content.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #7c3aed; margin-bottom: 0.75rem;">📋 Analysis Overview</h4>
            <p style="font-weight: 600; margin-bottom: 0.5rem;">${data.analysisName}</p>
            <p style="color: var(--text-muted); font-size: 0.9rem;">${data.analysisDescription}</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #7c3aed; margin-bottom: 0.75rem;">⚖️ Options Compared</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div style="background: #f5f3ff; padding: 1rem; border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">Option A</div>
                    <div style="font-size: 0.9rem; color: var(--text-muted);">${data.optionA.name}</div>
                </div>
                <div style="background: #f5f3ff; padding: 1rem; border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">Option B</div>
                    <div style="font-size: 0.9rem; color: var(--text-muted);">${data.optionB.name}</div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #7c3aed; margin-bottom: 0.75rem;">💰 Financial Impact</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.25rem; font-weight: 700; color: #16a34a;">${example.stats.savings}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Total Savings</div>
                </div>
                <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.25rem; font-weight: 700; color: #16a34a;">${example.stats.period}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Analysis Period</div>
                </div>
                <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.25rem; font-weight: 700; color: #16a34a;">${example.stats.reduction || example.stats.breakeven}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${example.stats.reduction ? 'Cost Reduction' : 'Breakeven'}</div>
                </div>
            </div>
        </div>
        
        <div>
            <h4 style="color: #7c3aed; margin-bottom: 0.75rem;">✅ Recommendation</h4>
            <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px; border-left: 4px solid #16a34a;">
                <p style="font-size: 0.9rem; margin: 0;">${data.recommendation}</p>
            </div>
        </div>
    `;
    
    document.getElementById('useExampleBtn').onclick = () => useTcoExample(exampleId);
    document.getElementById('examplesGalleryModal').classList.remove('active');
    document.getElementById('examplePreviewModal').classList.add('active');
}

function useTcoExample(exampleId) {
    const example = tcoExampleData[exampleId];
    if (!example) return;
    
    console.log('Loading TCO example:', exampleId, example.data);
    
    document.getElementById('examplesGalleryModal')?.classList.remove('active');
    document.getElementById('examplePreviewModal')?.classList.remove('active');
    
    alert('Example data loaded! Customize it for your TCO analysis.');
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { tcoExampleData };
}
