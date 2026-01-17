// ============================================
// ROI CALCULATOR - EXAMPLE GALLERY DATA
// ============================================
// 3 Complete ROI Analysis Examples

const roiExampleData = {
    
    // EXAMPLE 1: Marketing Automation Platform
    marketingAutomation: {
        id: 'marketingAutomation',
        title: 'Marketing Automation Platform',
        subtitle: 'HubSpot Enterprise Implementation',
        icon: '📧',
        category: 'Marketing Technology',
        stats: { roi: '285%', payback: '8 months', npv: '$1.2M' },
        tags: ['MarTech', 'Automation', 'Lead Generation'],
        description: 'ROI analysis for implementing HubSpot Marketing Enterprise to automate campaigns, improve lead scoring, and increase marketing-qualified leads.',
        data: {
            projectName: 'Marketing Automation Platform - HubSpot Enterprise',
            projectDescription: 'Implementation of HubSpot Marketing Enterprise to replace manual email campaigns, implement lead scoring, automate nurture sequences, and provide unified marketing analytics. The platform will integrate with Salesforce CRM and support a team of 12 marketers.',
            
            preparedBy: 'Amanda Collins',
            preparedDate: '2026-01-15',
            department: 'Marketing',
            
            analysisYears: 3,
            discountRate: 10,
            
            // Investment Costs
            initialInvestment: [
                { item: 'HubSpot Enterprise License (Year 1)', amount: 48000, category: 'Software', notes: '10,000 contacts tier' },
                { item: 'Implementation Partner', amount: 35000, category: 'Professional Services', notes: 'Setup, migration, training' },
                { item: 'Salesforce Integration', amount: 12000, category: 'Integration', notes: 'Bi-directional sync setup' },
                { item: 'Content Migration', amount: 8000, category: 'Professional Services', notes: 'Email templates, landing pages' },
                { item: 'Team Training', amount: 6000, category: 'Training', notes: '12 users, 2-day workshop' }
            ],
            
            ongoingCosts: [
                { item: 'HubSpot License (Annual)', amount: 48000, frequency: 'Annual', escalation: 5, notes: 'Expected tier upgrade Year 2' },
                { item: 'Additional Contacts Package', amount: 12000, frequency: 'Annual', escalation: 10, notes: 'Database growth' },
                { item: 'Ongoing Support & Optimization', amount: 18000, frequency: 'Annual', escalation: 3, notes: 'Agency retainer' },
                { item: 'Additional Integrations', amount: 5000, frequency: 'Annual', escalation: 0, notes: 'New tool connections' }
            ],
            
            // Benefits
            benefits: [
                { 
                    benefit: 'Increased Marketing Qualified Leads',
                    type: 'Revenue Impact',
                    year1: 180000,
                    year2: 270000,
                    year3: 340000,
                    assumptions: 'Lead volume +40% from automated nurture, 25% MQL improvement. Average deal value $50K, 10% close rate.',
                    confidence: 'Medium'
                },
                { 
                    benefit: 'Marketing Team Efficiency',
                    type: 'Cost Savings',
                    year1: 65000,
                    year2: 85000,
                    year3: 95000,
                    assumptions: 'Campaign setup time reduced 60%, reporting automation saves 15 hrs/week. Equivalent to 1.2 FTE.',
                    confidence: 'High'
                },
                { 
                    benefit: 'Reduced Email Vendor Costs',
                    type: 'Cost Savings',
                    year1: 28000,
                    year2: 28000,
                    year3: 28000,
                    assumptions: 'Consolidation of Mailchimp, Unbounce, and separate analytics tools.',
                    confidence: 'High'
                },
                { 
                    benefit: 'Improved Lead Quality for Sales',
                    type: 'Revenue Impact',
                    year1: 45000,
                    year2: 75000,
                    year3: 95000,
                    assumptions: 'Lead scoring improves sales efficiency, higher conversion on scored leads. Sales team estimates 15% productivity gain.',
                    confidence: 'Medium'
                },
                { 
                    benefit: 'Reduced Agency Spend on Campaigns',
                    type: 'Cost Savings',
                    year1: 35000,
                    year2: 40000,
                    year3: 45000,
                    assumptions: 'In-house capability reduces external agency dependency by 50%.',
                    confidence: 'High'
                }
            ],
            
            risks: [
                { risk: 'User adoption slower than planned', impact: 'Medium', probability: '30%', mitigation: 'Phased rollout, champion program, ongoing training' },
                { risk: 'Integration complexity with legacy systems', impact: 'Medium', probability: '25%', mitigation: 'Technical assessment complete, middleware option available' },
                { risk: 'Lead volume projections not achieved', impact: 'High', probability: '20%', mitigation: 'Conservative estimates used, A/B testing plan' }
            ],
            
            assumptions: [
                'Current marketing team remains stable',
                'Salesforce CRM continues as primary CRM',
                'Marketing budget grows 10% annually',
                'Database grows 20% annually',
                'No major market disruption affecting lead generation'
            ],
            
            sensitivityScenarios: {
                optimistic: { benefitAdjust: 1.25, costAdjust: 0.9 },
                base: { benefitAdjust: 1.0, costAdjust: 1.0 },
                pessimistic: { benefitAdjust: 0.7, costAdjust: 1.15 }
            },
            
            qualitativeBenefits: [
                'Unified view of customer journey across all touchpoints',
                'Better attribution modeling for marketing spend',
                'Scalable infrastructure for future growth',
                'Improved brand consistency through templates',
                'Enhanced compliance with email regulations'
            ],
            
            recommendation: 'APPROVE - Strong ROI with reasonable payback period. Marketing automation is foundational capability for growth.',
            
            nextSteps: [
                'Finalize HubSpot contract negotiation',
                'Select implementation partner (shortlist of 3)',
                'Define Phase 1 scope and success metrics',
                'Plan data migration from existing tools',
                'Schedule team training for Q2'
            ]
        }
    },
    
    // EXAMPLE 2: Warehouse Automation
    warehouseAutomation: {
        id: 'warehouseAutomation',
        title: 'Warehouse Automation',
        subtitle: 'Automated Storage & Retrieval',
        icon: '🏭',
        category: 'Operations',
        stats: { roi: '156%', payback: '2.1 years', npv: '$4.8M' },
        tags: ['Automation', 'Logistics', 'ASRS'],
        description: 'ROI analysis for implementing Automated Storage and Retrieval System (ASRS) to improve warehouse efficiency, reduce labor costs, and increase throughput capacity.',
        data: {
            projectName: 'Distribution Center Automation - ASRS Implementation',
            projectDescription: 'Implementation of Automated Storage and Retrieval System (ASRS) with conveyor integration, warehouse management system (WMS) upgrade, and pick-to-light systems. Project covers the main distribution center (250,000 sq ft) handling 15,000 orders daily.',
            
            preparedBy: 'Robert Chen',
            preparedDate: '2026-01-20',
            department: 'Operations',
            
            analysisYears: 5,
            discountRate: 12,
            
            initialInvestment: [
                { item: 'ASRS System (6 cranes, 25,000 locations)', amount: 3200000, category: 'Equipment', notes: 'Dematic system with 5-year warranty' },
                { item: 'Conveyor System Integration', amount: 850000, category: 'Equipment', notes: 'Inbound/outbound conveyors' },
                { item: 'WMS Software Upgrade', amount: 280000, category: 'Software', notes: 'Manhattan WMS automation module' },
                { item: 'Pick-to-Light System', amount: 320000, category: 'Equipment', notes: '200 pick stations' },
                { item: 'Facility Modifications', amount: 450000, category: 'Construction', notes: 'Floor reinforcement, electrical' },
                { item: 'Implementation & Integration', amount: 380000, category: 'Professional Services', notes: 'Vendor + systems integrator' },
                { item: 'Training Program', amount: 75000, category: 'Training', notes: 'All warehouse staff, 3 months' },
                { item: 'Contingency (10%)', amount: 555500, category: 'Contingency', notes: 'Risk buffer' }
            ],
            
            ongoingCosts: [
                { item: 'ASRS Maintenance Contract', amount: 185000, frequency: 'Annual', escalation: 3, notes: 'Preventive + reactive maintenance' },
                { item: 'WMS License & Support', amount: 65000, frequency: 'Annual', escalation: 4, notes: 'Software maintenance' },
                { item: 'Energy Costs (Incremental)', amount: 48000, frequency: 'Annual', escalation: 5, notes: 'Increased power consumption' },
                { item: 'Spare Parts & Consumables', amount: 35000, frequency: 'Annual', escalation: 3, notes: 'Replacement components' }
            ],
            
            benefits: [
                { 
                    benefit: 'Labor Cost Reduction',
                    type: 'Cost Savings',
                    year1: 1200000,
                    year2: 1450000,
                    year3: 1550000,
                    year4: 1650000,
                    year5: 1750000,
                    assumptions: 'Reduce warehouse staff from 145 to 85 FTEs. Average fully-loaded cost $52K. Phased reduction over 18 months.',
                    confidence: 'High'
                },
                { 
                    benefit: 'Increased Throughput Capacity',
                    type: 'Revenue Enablement',
                    year1: 400000,
                    year2: 800000,
                    year3: 1000000,
                    year4: 1000000,
                    year5: 1000000,
                    assumptions: 'Capacity increase from 15K to 22K orders/day. Enables $20M incremental revenue at 5% margin.',
                    confidence: 'Medium'
                },
                { 
                    benefit: 'Reduced Picking Errors',
                    type: 'Cost Savings',
                    year1: 180000,
                    year2: 220000,
                    year3: 240000,
                    year4: 250000,
                    year5: 260000,
                    assumptions: 'Error rate reduction from 0.8% to 0.1%. Average error cost $45 (return, reship, customer service).',
                    confidence: 'High'
                },
                { 
                    benefit: 'Inventory Carrying Cost Reduction',
                    type: 'Working Capital',
                    year1: 150000,
                    year2: 200000,
                    year3: 220000,
                    year4: 230000,
                    year5: 240000,
                    assumptions: 'Better inventory visibility reduces safety stock 20%. $25M inventory at 15% carrying cost.',
                    confidence: 'Medium'
                },
                { 
                    benefit: 'Space Utilization Improvement',
                    type: 'Cost Avoidance',
                    year1: 0,
                    year2: 350000,
                    year3: 350000,
                    year4: 350000,
                    year5: 350000,
                    assumptions: 'ASRS footprint 40% smaller. Avoid planned warehouse expansion ($7M CapEx, $350K/yr OpEx).',
                    confidence: 'High'
                }
            ],
            
            risks: [
                { risk: 'Implementation delays', impact: 'High', probability: '25%', mitigation: 'Experienced vendor selected, detailed project plan, contingency time' },
                { risk: 'Lower than projected throughput gains', impact: 'Medium', probability: '20%', mitigation: 'Simulation modeling completed, conservative assumptions' },
                { risk: 'System reliability issues', impact: 'High', probability: '15%', mitigation: 'Redundancy built in, comprehensive maintenance contract, spare parts inventory' },
                { risk: 'Workforce transition challenges', impact: 'Medium', probability: '30%', mitigation: 'Early communication, retraining program, retention bonuses for key staff' }
            ],
            
            assumptions: [
                'Order volume grows 8% annually',
                'Labor market conditions allow planned staffing reduction',
                'Electricity costs increase 5% annually',
                'No major changes to product mix or order profiles',
                'Building lease extends minimum 10 years'
            ],
            
            sensitivityScenarios: {
                optimistic: { benefitAdjust: 1.2, costAdjust: 0.95 },
                base: { benefitAdjust: 1.0, costAdjust: 1.0 },
                pessimistic: { benefitAdjust: 0.75, costAdjust: 1.2 }
            },
            
            qualitativeBenefits: [
                'Improved workplace safety (reduced manual handling)',
                'Better working conditions attracting quality workforce',
                '24/7 operation capability without shift premiums',
                'Enhanced traceability and audit trail',
                'Foundation for future automation expansion',
                'Competitive differentiation with faster fulfillment'
            ],
            
            recommendation: 'APPROVE - Strong strategic and financial case. Essential investment for competitive position and growth enablement.',
            
            nextSteps: [
                'Board approval for capital expenditure',
                'Finalize vendor contract with Dematic',
                'Engage systems integrator',
                'Develop workforce transition plan with HR',
                'Begin facility modification design',
                'Create project governance structure'
            ]
        }
    },
    
    // EXAMPLE 3: CRM System Upgrade
    crmUpgrade: {
        id: 'crmUpgrade',
        title: 'CRM System Upgrade',
        subtitle: 'Salesforce Lightning Migration',
        icon: '💼',
        category: 'Sales Technology',
        stats: { roi: '198%', payback: '14 months', npv: '$890K' },
        tags: ['CRM', 'Salesforce', 'Sales Enablement'],
        description: 'ROI analysis for migrating from Salesforce Classic to Lightning Experience with Sales Cloud Einstein AI capabilities and CPQ implementation.',
        data: {
            projectName: 'Salesforce Lightning Migration & Enhancement',
            projectDescription: 'Migrate from Salesforce Classic to Lightning Experience, implement Sales Cloud Einstein AI for lead scoring and opportunity insights, deploy CPQ (Configure-Price-Quote) for complex quoting, and integrate with marketing automation. 85 sales users across 3 regions.',
            
            preparedBy: 'Jessica Martinez',
            preparedDate: '2026-01-18',
            department: 'Sales Operations',
            
            analysisYears: 3,
            discountRate: 10,
            
            initialInvestment: [
                { item: 'Salesforce Lightning Migration', amount: 85000, category: 'Professional Services', notes: 'Consulting partner for migration' },
                { item: 'Einstein AI License (Year 1)', amount: 36000, category: 'Software', notes: '85 users × $35/user/month' },
                { item: 'CPQ Implementation', amount: 65000, category: 'Professional Services', notes: 'Configuration and customization' },
                { item: 'Data Cleanup & Migration', amount: 25000, category: 'Professional Services', notes: 'Deduplication, enrichment' },
                { item: 'Custom Development', amount: 40000, category: 'Development', notes: 'Integrations, workflows, reports' },
                { item: 'Training Program', amount: 18000, category: 'Training', notes: '85 users, role-based training' },
                { item: 'Change Management', amount: 15000, category: 'Change Management', notes: 'Communications, adoption support' }
            ],
            
            ongoingCosts: [
                { item: 'Einstein AI Licenses', amount: 36000, frequency: 'Annual', escalation: 5, notes: 'Per-user subscription' },
                { item: 'CPQ License Uplift', amount: 28000, frequency: 'Annual', escalation: 5, notes: 'Additional license tier' },
                { item: 'Admin & Support (0.5 FTE)', amount: 45000, frequency: 'Annual', escalation: 3, notes: 'Dedicated Salesforce admin time' },
                { item: 'Ongoing Optimization', amount: 20000, frequency: 'Annual', escalation: 0, notes: 'Quarterly enhancements' }
            ],
            
            benefits: [
                { 
                    benefit: 'Sales Productivity Improvement',
                    type: 'Revenue Impact',
                    year1: 320000,
                    year2: 480000,
                    year3: 560000,
                    assumptions: 'Lightning UI saves 45 min/day per rep. Einstein prioritization improves focus. Net 8% productivity gain on $40M quota.',
                    confidence: 'Medium'
                },
                { 
                    benefit: 'Improved Win Rates',
                    type: 'Revenue Impact',
                    year1: 180000,
                    year2: 280000,
                    year3: 350000,
                    assumptions: 'Einstein insights improve opportunity management. Win rate improvement from 22% to 26% on $15M pipeline.',
                    confidence: 'Medium'
                },
                { 
                    benefit: 'Reduced Quote Turnaround',
                    type: 'Revenue Impact',
                    year1: 95000,
                    year2: 140000,
                    year3: 160000,
                    assumptions: 'CPQ reduces quote time from 3 days to 2 hours. Faster quotes win 15% more competitive deals.',
                    confidence: 'High'
                },
                { 
                    benefit: 'Quote Accuracy Improvement',
                    type: 'Cost Savings',
                    year1: 45000,
                    year2: 55000,
                    year3: 60000,
                    assumptions: 'CPQ eliminates pricing errors. Current error rate 8% causing margin leakage and rework.',
                    confidence: 'High'
                },
                { 
                    benefit: 'Reduced Reporting Time',
                    type: 'Cost Savings',
                    year1: 35000,
                    year2: 40000,
                    year3: 45000,
                    assumptions: 'Lightning dashboards eliminate manual report creation. Saves 15 hrs/week for sales ops team.',
                    confidence: 'High'
                }
            ],
            
            risks: [
                { risk: 'User adoption resistance', impact: 'High', probability: '35%', mitigation: 'Phased rollout, super-user program, executive sponsorship, gamification' },
                { risk: 'Data quality issues surface during migration', impact: 'Medium', probability: '40%', mitigation: 'Data cleansing phase included, validation protocols' },
                { risk: 'Integration complexity with legacy systems', impact: 'Medium', probability: '25%', mitigation: 'Technical assessment complete, middleware approach approved' }
            ],
            
            assumptions: [
                'Sales team size remains at 85 users',
                'Current Salesforce licensing tier maintained',
                'Marketing automation integration proceeds as planned',
                'No major changes to sales process or territories',
                'Einstein AI accuracy improves with training data over time'
            ],
            
            sensitivityScenarios: {
                optimistic: { benefitAdjust: 1.3, costAdjust: 0.9 },
                base: { benefitAdjust: 1.0, costAdjust: 1.0 },
                pessimistic: { benefitAdjust: 0.6, costAdjust: 1.2 }
            },
            
            qualitativeBenefits: [
                'Modern user interface improves user satisfaction',
                'Mobile capabilities enable field sales effectiveness',
                'AI insights provide competitive intelligence',
                'Better forecast accuracy for planning',
                'Foundation for future sales tech investments',
                'Improved onboarding for new sales hires'
            ],
            
            recommendation: 'APPROVE - Clear productivity benefits with manageable risk. Migration from Classic is also a technical necessity as Salesforce phases out support.',
            
            nextSteps: [
                'Confirm budget allocation for Q2',
                'Select implementation partner (RFP in progress)',
                'Identify pilot group for Phase 1 (15 users)',
                'Begin data quality assessment',
                'Develop change management and communication plan'
            ]
        }
    }
};

// ============================================
// EXAMPLE GALLERY FUNCTIONS FOR ROI CALCULATOR
// ============================================

function renderRoiExampleGallery() {
    const gallery = document.getElementById('roiExampleGallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    Object.values(roiExampleData).forEach(example => {
        const card = document.createElement('div');
        card.className = 'example-card';
        card.innerHTML = `
            <div class="example-card-header" style="background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);">
                <div class="example-card-icon">${example.icon}</div>
                <div class="example-card-title">${example.title}</div>
                <div class="example-card-subtitle">${example.subtitle}</div>
                <div class="example-card-stats">
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.roi}</div>
                        <div class="example-stat-label">ROI</div>
                    </div>
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.payback}</div>
                        <div class="example-stat-label">Payback</div>
                    </div>
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.npv}</div>
                        <div class="example-stat-label">NPV</div>
                    </div>
                </div>
            </div>
            <div class="example-card-body">
                <p class="example-card-desc">${example.description}</p>
                <div class="example-tags">
                    ${example.tags.map(tag => `<span class="example-tag">${tag}</span>`).join('')}
                </div>
                <div class="example-card-actions">
                    <button class="btn btn-secondary" onclick="previewRoiExample('${example.id}')">👁️ Preview</button>
                    <button class="btn btn-primary" onclick="useRoiExample('${example.id}')">✨ Use This</button>
                </div>
            </div>
        `;
        gallery.appendChild(card);
    });
}

function previewRoiExample(exampleId) {
    const example = roiExampleData[exampleId];
    if (!example) return;
    
    document.getElementById('examplePreviewTitle').textContent = example.title + ' - ROI Preview';
    
    const content = document.getElementById('examplePreviewContent');
    const data = example.data;
    
    // Calculate totals for preview
    const totalInitial = data.initialInvestment.reduce((sum, i) => sum + i.amount, 0);
    const totalBenefitsY1 = data.benefits.reduce((sum, b) => sum + b.year1, 0);
    
    content.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #d97706; margin-bottom: 0.75rem;">📋 Investment Overview</h4>
            <p style="font-weight: 600; margin-bottom: 0.5rem;">${data.projectName}</p>
            <p style="color: var(--text-muted); font-size: 0.9rem;">${data.projectDescription.substring(0, 200)}...</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #d97706; margin-bottom: 0.75rem;">💰 Financial Summary</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                <div style="background: #fffbeb; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.25rem; font-weight: 700; color: #d97706;">$${(totalInitial/1000).toFixed(0)}K</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Initial Investment</div>
                </div>
                <div style="background: #fffbeb; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.25rem; font-weight: 700; color: #d97706;">$${(totalBenefitsY1/1000).toFixed(0)}K</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Year 1 Benefits</div>
                </div>
                <div style="background: #fffbeb; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.25rem; font-weight: 700; color: #d97706;">${example.stats.roi}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">3-Year ROI</div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #d97706; margin-bottom: 0.75rem;">📈 Key Benefits</h4>
            <ul style="list-style: none; padding: 0;">
                ${data.benefits.slice(0, 4).map(b => `
                    <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; display: flex; justify-content: space-between;">
                        <span>${b.benefit}</span>
                        <span style="color: #16a34a; font-weight: 600;">$${(b.year1/1000).toFixed(0)}K/yr</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div>
            <h4 style="color: #d97706; margin-bottom: 0.75rem;">✅ Recommendation</h4>
            <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px; border-left: 4px solid #16a34a;">
                <p style="font-size: 0.9rem; margin: 0;">${data.recommendation}</p>
            </div>
        </div>
    `;
    
    document.getElementById('useExampleBtn').onclick = () => useRoiExample(exampleId);
    document.getElementById('examplesGalleryModal').classList.remove('active');
    document.getElementById('examplePreviewModal').classList.add('active');
}

function useRoiExample(exampleId) {
    const example = roiExampleData[exampleId];
    if (!example) return;
    
    console.log('Loading ROI example:', exampleId, example.data);
    
    // Close modals
    document.getElementById('examplesGalleryModal')?.classList.remove('active');
    document.getElementById('examplePreviewModal')?.classList.remove('active');
    
    alert('Example data loaded! Customize it for your ROI analysis.');
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { roiExampleData };
}
