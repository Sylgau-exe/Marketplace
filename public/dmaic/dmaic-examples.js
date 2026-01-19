// ============================================
// DMAIC GENERATOR - EXAMPLE GALLERY DATA
// ============================================
// 3 Complete Six Sigma DMAIC Project Examples

const dmaicExampleData = {
    
    // EXAMPLE 1: Manufacturing Defect Reduction
    manufacturing: {
        id: 'manufacturing',
        title: 'Manufacturing Defect Reduction',
        subtitle: 'PCB Assembly Line Quality',
        icon: '🏭',
        category: 'Manufacturing',
        stats: { sigma: '4.2σ → 5.1σ', savings: '$1.2M', duration: '6 months' },
        tags: ['Electronics', 'Quality', 'Assembly'],
        description: 'Six Sigma project to reduce PCB assembly defects from 6,200 DPMO to 200 DPMO through process optimization and SPC implementation.',
        data: {
            // DEFINE Phase
            projectTitle: 'PCB Assembly Defect Reduction Initiative',
            projectChampion: 'Maria Santos, VP of Manufacturing',
            projectLead: 'James Park, Six Sigma Black Belt',
            startDate: '2026-01-15',
            targetCompletion: '2026-07-15',
            
            problemStatement: 'The PCB assembly line at Plant 3 is experiencing a defect rate of 6,200 DPMO (Defects Per Million Opportunities), significantly above our target of 500 DPMO. This results in $1.4M annually in scrap, rework, and customer returns. The defect rate has increased 40% over the past 18 months despite incremental improvement efforts. Primary defect categories are solder bridges (45%), missing components (30%), and misaligned parts (25%).',
            
            businessCase: 'Reducing defects to target levels will: (1) Save $1.2M annually in scrap and rework costs, (2) Reduce customer returns by 75%, saving $180K in warranty costs, (3) Improve on-time delivery from 87% to 97% by eliminating rework delays, (4) Free up 4 FTEs currently dedicated to inspection and rework, (5) Protect $8M in at-risk customer contracts requiring <500 DPMO quality levels.',
            
            projectScope: 'In Scope: All PCB assembly operations on Lines 1-4 at Plant 3, including SMT placement, reflow soldering, and inspection processes. Out of Scope: Component supplier quality (separate project), PCB bare board fabrication, final product assembly, other plant locations.',
            
            primaryMetric: 'Defects Per Million Opportunities (DPMO)',
            baselineValue: '6,200 DPMO',
            targetValue: '500 DPMO (5.1 sigma)',
            
            secondaryMetrics: [
                { metric: 'First Pass Yield (FPY)', baseline: '82%', target: '98%' },
                { metric: 'Scrap Cost per Unit', baseline: '$4.20', target: '$0.50' },
                { metric: 'Rework Hours per 1000 Units', baseline: '45 hrs', target: '5 hrs' },
                { metric: 'Customer Returns (ppm)', baseline: '850', target: '100' }
            ],
            
            stakeholders: [
                { name: 'Maria Santos', role: 'Champion', involvement: 'Executive sponsor, resource allocation, barrier removal' },
                { name: 'James Park', role: 'Project Lead', involvement: 'Day-to-day leadership, analysis, implementation' },
                { name: 'Linda Chen', role: 'Process Owner', involvement: 'SMT line supervisor, process expert, change adoption' },
                { name: 'Robert Kim', role: 'Quality Engineer', involvement: 'Data collection, measurement system analysis' },
                { name: 'Technical Team', role: 'Team Members', involvement: '3 operators, 1 maintenance tech, 1 equipment engineer' }
            ],
            
            // MEASURE Phase
            processMap: 'Current State Process Flow:\n1. Bare PCB Loading → 2. Solder Paste Application → 3. Solder Paste Inspection (SPI) → 4. SMT Component Placement → 5. Reflow Oven → 6. Automated Optical Inspection (AOI) → 7. Manual Inspection → 8. Rework Station → 9. Final Test → 10. Pack & Ship\n\nCritical process steps identified: Steps 2, 4, and 5 account for 85% of defects.',
            
            dataCollectionPlan: 'Data Sources:\n• AOI system logs (automated, 100% inspection)\n• SPI measurement data (automated)\n• Manual inspection records (sampling plan: 50 units per shift)\n• Rework tracking system\n• Environmental monitoring (temperature, humidity)\n\nCollection Period: 4 weeks baseline, ongoing during project\nSample Size: 50,000 units (statistically significant at 95% confidence)\nData Validation: MSA completed, Gage R&R = 8.2% (acceptable)',
            
            measurementSystemAnalysis: 'MSA Results:\n• AOI System Gage R&R: 8.2% (Acceptable - <10%)\n• SPI System Gage R&R: 6.5% (Acceptable)\n• Manual Inspection Kappa: 0.85 (Good agreement)\n• Attribute Agreement: 92% across 3 inspectors\n\nConclusion: Measurement systems are adequate for detecting process changes.',
            
            baselineCapability: 'Process Capability Analysis:\n• DPMO: 6,200 (Baseline)\n• Sigma Level: 4.2σ\n• Cp: 0.89 (Not capable)\n• Cpk: 0.72 (Process not centered)\n• First Pass Yield: 82%\n\nDefect Pareto:\n1. Solder Bridges: 45% (2,790 DPMO)\n2. Missing Components: 30% (1,860 DPMO)\n3. Misaligned Parts: 25% (1,550 DPMO)',
            
            // ANALYZE Phase
            rootCauseAnalysis: 'Fishbone Analysis - Top Categories:\n\nMACHINE:\n• Placement machine vision calibration drift (verified - 35% contribution)\n• Reflow oven temperature profile variation (verified - 25% contribution)\n• Solder paste stencil wear (verified - 15% contribution)\n\nMETHOD:\n• No standardized machine setup procedure (verified)\n• Inconsistent stencil cleaning frequency\n\nMATERIAL:\n• Solder paste exposure time not controlled (verified - 10% contribution)\n• Component moisture sensitivity not managed\n\nMAN:\n• Operator training gaps on new products\n• Shift-to-shift variation in procedures',
            
            dataAnalysis: 'Statistical Analysis Results:\n\n1. Regression Analysis: R² = 0.78\n   - Placement accuracy accounts for 45% of variation\n   - Reflow temperature accounts for 28% of variation\n   - Paste age accounts for 15% of variation\n\n2. ANOVA (Shift Comparison): p = 0.003\n   - Significant difference between shifts (Night shift 40% higher defects)\n\n3. Chi-Square Test (Defect Type vs. Product): p = 0.001\n   - Defect types are product-dependent\n\n4. Correlation Analysis:\n   - Humidity vs. Solder Bridges: r = 0.72\n   - Machine runtime vs. Misalignment: r = 0.68',
            
            verifiedRootCauses: [
                { cause: 'Placement machine vision system loses calibration after 8 hours', contribution: '35%', evidence: 'Time-series analysis shows defect spike after 8-hr runtime' },
                { cause: 'Reflow oven Zone 3 temperature varies ±8°C (spec: ±3°C)', contribution: '25%', evidence: 'Thermal profiling data, correlation with solder defects' },
                { cause: 'Solder paste exceeds 4-hour exposure limit', contribution: '15%', evidence: 'Paste age tracking vs. defect rate correlation r=0.81' },
                { cause: 'Stencil aperture wear exceeds tolerance after 5,000 prints', contribution: '15%', evidence: 'Stencil inspection data, SPI volume measurements' },
                { cause: 'Night shift lacks updated work instructions', contribution: '10%', evidence: 'Procedure audit, operator interviews, shift comparison' }
            ],
            
            // IMPROVE Phase
            solutions: [
                { 
                    solution: 'Implement automated vision calibration every 4 hours',
                    rootCause: 'Vision calibration drift',
                    expectedImpact: '35% defect reduction',
                    cost: '$25,000',
                    timeline: '4 weeks',
                    owner: 'Equipment Engineer'
                },
                { 
                    solution: 'Install Zone 3 temperature controller upgrade with ±1°C tolerance',
                    rootCause: 'Reflow temperature variation',
                    expectedImpact: '25% defect reduction',
                    cost: '$45,000',
                    timeline: '6 weeks',
                    owner: 'Maintenance Lead'
                },
                { 
                    solution: 'Implement solder paste management system with FIFO and time tracking',
                    rootCause: 'Paste exposure time',
                    expectedImpact: '15% defect reduction',
                    cost: '$8,000',
                    timeline: '2 weeks',
                    owner: 'Process Engineer'
                },
                { 
                    solution: 'Establish stencil replacement schedule at 4,000 prints with inspection',
                    rootCause: 'Stencil wear',
                    expectedImpact: '15% defect reduction',
                    cost: '$12,000/year',
                    timeline: '1 week',
                    owner: 'Quality Engineer'
                },
                { 
                    solution: 'Standardize work instructions and conduct night shift retraining',
                    rootCause: 'Procedure gaps',
                    expectedImpact: '10% defect reduction',
                    cost: '$5,000',
                    timeline: '3 weeks',
                    owner: 'Training Coordinator'
                }
            ],
            
            pilotResults: 'Pilot conducted on Line 2 for 2 weeks (8,000 units):\n\n• DPMO reduced from 6,200 to 680 (89% improvement)\n• First Pass Yield improved from 82% to 97.2%\n• Zero customer escapes during pilot period\n• No negative impact on throughput\n• Operator feedback positive (easier to maintain quality)\n\nStatistical validation: Two-sample t-test p < 0.001, improvement is statistically significant.',
            
            implementationPlan: 'Full Implementation Timeline:\n\nWeek 1-2: Solder paste management system (all lines)\nWeek 2-3: Work instruction update and training\nWeek 3-4: Stencil management process rollout\nWeek 4-8: Vision calibration automation (Line 1, 2, 3, 4 sequential)\nWeek 6-10: Reflow oven upgrades (scheduled during maintenance windows)\nWeek 10-12: Validation and adjustment period',
            
            // CONTROL Phase
            controlPlan: [
                { processStep: 'Solder Paste Application', characteristic: 'Paste Volume', specification: '0.8-1.2 mg ±10%', measurementMethod: 'SPI 100%', frequency: 'Every board', reactionPlan: 'Stop line, clean stencil, verify' },
                { processStep: 'SMT Placement', characteristic: 'Vision Calibration', specification: '±0.02mm', measurementMethod: 'Auto-cal verification', frequency: 'Every 4 hours', reactionPlan: 'Run calibration routine' },
                { processStep: 'Reflow Soldering', characteristic: 'Zone 3 Temperature', specification: '245°C ±1°C', measurementMethod: 'Thermocouple profile', frequency: 'Every shift', reactionPlan: 'Adjust controller, escalate if repeats' },
                { processStep: 'Final Inspection', characteristic: 'DPMO', specification: '<500', measurementMethod: 'AOI + sampling', frequency: 'Daily calculation', reactionPlan: 'Root cause analysis if >500' }
            ],
            
            spcCharts: 'Control Charts Implemented:\n\n1. X-bar/R Chart: Solder paste volume (SPI data)\n   - UCL: 1.15 mg, LCL: 0.85 mg, CL: 1.0 mg\n\n2. p-Chart: Daily defect rate\n   - UCL: 0.0008 (800 DPMO), LCL: 0, CL: 0.0005\n\n3. Individual/Moving Range: Zone 3 temperature\n   - UCL: 247°C, LCL: 243°C, CL: 245°C\n\nAll charts displayed on production floor dashboards with real-time updates.',
            
            documentation: 'Updated Documentation:\n• SOP-PCB-001: Solder Paste Handling (Rev 3.0)\n• SOP-PCB-002: SMT Machine Setup and Calibration (Rev 2.0)\n• SOP-PCB-003: Reflow Oven Operation (Rev 2.0)\n• WI-PCB-015: Stencil Inspection and Replacement\n• Training materials and competency assessments\n• Control plan document (living document)\n• Escalation procedures for out-of-control conditions',
            
            results: {
                dpmoFinal: '420 DPMO',
                sigmaFinal: '5.1σ',
                annualSavings: '$1,180,000',
                fpyFinal: '97.8%',
                customerReturns: '95 ppm'
            },
            
            lessonsLearned: '1. Early involvement of operators in solution design increased buy-in\n2. Pilot phase was critical for identifying implementation issues\n3. Real-time SPC dashboards drove faster response to issues\n4. Cross-shift communication improvements needed for sustainability\n5. Investment in measurement system validation paid off in credible data'
        }
    },
    
    // EXAMPLE 2: Customer Support Response Time
    customerSupport: {
        id: 'customerSupport',
        title: 'Support Response Time',
        subtitle: 'Customer Service Excellence',
        icon: '🎧',
        category: 'Service Operations',
        stats: { sigma: '2.8σ → 4.5σ', savings: '$680K', duration: '4 months' },
        tags: ['Service', 'Response Time', 'Customer Experience'],
        description: 'DMAIC project to reduce average customer support response time from 24 hours to 4 hours while improving first-contact resolution.',
        data: {
            projectTitle: 'Customer Support Response Time Optimization',
            projectChampion: 'Sarah Johnson, VP of Customer Success',
            projectLead: 'Michael Torres, Six Sigma Green Belt',
            startDate: '2026-02-01',
            targetCompletion: '2026-06-01',
            
            problemStatement: 'Average first response time for customer support tickets is 24 hours, with 35% of tickets exceeding our 8-hour SLA commitment. Customer satisfaction (CSAT) for support interactions has dropped to 72%, and we are losing an estimated 8% of customers annually citing poor support experience. The support team handles 15,000 tickets monthly with significant variation in response time by channel, time of day, and issue type.',
            
            businessCase: 'Improving response time will: (1) Reduce customer churn by 4%, saving $520K annually in retained revenue, (2) Decrease escalations by 50%, saving $95K in senior staff time, (3) Improve CSAT from 72% to 90%+, supporting NPS improvement goals, (4) Reduce repeat contacts by 30%, improving efficiency by $65K, (5) Meet contractual SLAs for enterprise customers worth $2M ARR at risk.',
            
            projectScope: 'In Scope: All Tier 1 support tickets across email, chat, and phone channels for North America region. Out of Scope: Tier 2/3 engineering escalations, EMEA and APAC regions (phase 2), sales inquiries, billing disputes handled by finance.',
            
            primaryMetric: 'Average First Response Time (hours)',
            baselineValue: '24 hours',
            targetValue: '4 hours',
            
            secondaryMetrics: [
                { metric: 'SLA Compliance (8-hr target)', baseline: '65%', target: '95%' },
                { metric: 'First Contact Resolution Rate', baseline: '45%', target: '70%' },
                { metric: 'Customer Satisfaction (CSAT)', baseline: '72%', target: '90%' },
                { metric: 'Tickets per Agent per Day', baseline: '35', target: '45' }
            ],
            
            stakeholders: [
                { name: 'Sarah Johnson', role: 'Champion', involvement: 'Executive sponsor, budget approval' },
                { name: 'Michael Torres', role: 'Project Lead', involvement: 'Analysis, implementation, reporting' },
                { name: 'Jennifer Wu', role: 'Support Manager', involvement: 'Process owner, team adoption' },
                { name: 'IT Support', role: 'Technical', involvement: 'System configuration, integrations' },
                { name: 'Agent Representatives', role: 'Team Members', involvement: '4 agents from different shifts' }
            ],
            
            processMap: 'Current Ticket Flow:\n1. Customer submits ticket (email/chat/phone) → 2. Ticket lands in general queue → 3. Agent picks ticket manually → 4. Agent researches issue → 5. Agent responds to customer → 6. If unresolved: back to queue → 7. Resolution and close\n\nWaste Identified:\n• Waiting: Tickets sit in queue average 18 hours\n• Motion: Agents search for information (15 min avg)\n• Defects: 40% of responses require follow-up (incomplete)',
            
            dataCollectionPlan: 'Data Sources:\n• Zendesk ticket system (timestamps, categories, resolution)\n• Phone system ACD data (call volumes, wait times)\n• CSAT survey responses (post-interaction)\n• Agent time tracking (activity sampling)\n\nCollection: 4-week baseline using existing system data\nSample: 12,000 tickets analyzed\nSegmentation: By channel, time of day, issue category, agent',
            
            measurementSystemAnalysis: 'MSA Results:\n• Ticket timestamp accuracy: Verified ±1 minute (acceptable)\n• Issue categorization agreement: 78% (needs improvement - added to project)\n• CSAT survey response rate: 22% (acceptable for analysis)\n\nDiscovery: Inconsistent ticket categorization causing routing issues',
            
            baselineCapability: 'Process Capability:\n• Mean Response Time: 24 hours\n• Standard Deviation: 18 hours (high variation)\n• Sigma Level: 2.8σ\n• SLA Compliance: 65%\n\nResponse Time Distribution:\n• <4 hours: 15%\n• 4-8 hours: 20%\n• 8-24 hours: 35%\n• >24 hours: 30%',
            
            rootCauseAnalysis: 'Fishbone Analysis Results:\n\nPROCESS:\n• No ticket prioritization or routing rules (verified - 40% contribution)\n• Manual queue selection by agents creates cherry-picking\n• No skills-based routing\n\nPEOPLE:\n• Uneven workload distribution (verified - 25% contribution)\n• Knowledge gaps require research time (verified - 20% contribution)\n\nTECHNOLOGY:\n• No auto-response or acknowledgment\n• Knowledge base search is slow and incomplete\n• No real-time queue visibility\n\nPOLICY:\n• No response time targets by category\n• Staffing not aligned to volume patterns',
            
            dataAnalysis: 'Statistical Findings:\n\n1. Regression (Response Time Drivers): R² = 0.72\n   - Queue position explains 40% of variation\n   - Issue complexity explains 25%\n   - Time of day explains 20%\n\n2. ANOVA by Channel:\n   - Email: 32 hrs, Chat: 8 hrs, Phone: 2 hrs (p < 0.001)\n   - Email significantly slower\n\n3. Day/Time Analysis:\n   - Monday 9-11 AM: 180% of average volume\n   - Weekend: 45% of tickets, 20% of staffing\n\n4. Agent Variation:\n   - Top quartile: 12 hr avg response\n   - Bottom quartile: 38 hr avg response',
            
            verifiedRootCauses: [
                { cause: 'No intelligent ticket routing - all tickets go to general queue', contribution: '40%', evidence: 'Queue analysis shows 18hr average wait before pickup' },
                { cause: 'Staffing misaligned with demand patterns (Monday, weekends)', contribution: '25%', evidence: 'Volume vs. staffing correlation analysis' },
                { cause: 'Agents spend 15 min average searching for answers', contribution: '20%', evidence: 'Time study, screen recording analysis' },
                { cause: 'No auto-acknowledgment sets wrong customer expectation', contribution: '10%', evidence: 'CSAT comments analysis, customer interviews' },
                { cause: 'Inconsistent categorization causes misrouting', contribution: '5%', evidence: 'Category audit, rework analysis' }
            ],
            
            solutions: [
                {
                    solution: 'Implement AI-powered ticket routing based on issue type, priority, and agent skills',
                    rootCause: 'No intelligent routing',
                    expectedImpact: '40% response time reduction',
                    cost: '$35,000 (Zendesk add-on)',
                    timeline: '3 weeks',
                    owner: 'IT Support'
                },
                {
                    solution: 'Adjust staffing model: +2 agents Monday AM, +1 weekend coverage',
                    rootCause: 'Staffing misalignment',
                    expectedImpact: '25% response time reduction',
                    cost: '$85,000/year',
                    timeline: '4 weeks (hiring)',
                    owner: 'Support Manager'
                },
                {
                    solution: 'Deploy AI-assisted knowledge base with suggested responses',
                    rootCause: 'Research time waste',
                    expectedImpact: '20% response time reduction',
                    cost: '$24,000/year',
                    timeline: '2 weeks',
                    owner: 'Knowledge Manager'
                },
                {
                    solution: 'Implement instant auto-acknowledgment with estimated response time',
                    rootCause: 'No acknowledgment',
                    expectedImpact: 'Improved CSAT, reduced follow-ups',
                    cost: '$0 (configuration)',
                    timeline: '1 week',
                    owner: 'IT Support'
                },
                {
                    solution: 'Standardize categorization with dropdown menus and AI suggestion',
                    rootCause: 'Inconsistent categorization',
                    expectedImpact: '5% routing improvement',
                    cost: '$5,000',
                    timeline: '2 weeks',
                    owner: 'Project Lead'
                }
            ],
            
            pilotResults: 'Pilot: 2-week test with email channel only (3,000 tickets)\n\n• Average response time: 24 hrs → 5.2 hrs (78% improvement)\n• SLA compliance: 65% → 91%\n• First contact resolution: 45% → 62%\n• Agent productivity: +18% tickets per day\n• CSAT: 72% → 85%\n\nAgent feedback: "Much easier to find answers quickly"',
            
            implementationPlan: 'Rollout Plan:\n\nWeek 1: Auto-acknowledgment (all channels)\nWeek 1-2: Category standardization and training\nWeek 2-3: AI routing configuration and testing\nWeek 3: AI routing go-live (email first)\nWeek 4: AI routing (chat channel)\nWeek 4-6: Staffing adjustments (hiring, schedule changes)\nWeek 5-6: Knowledge base AI assistant rollout\nWeek 7-8: Monitoring and optimization',
            
            controlPlan: [
                { processStep: 'Ticket Receipt', characteristic: 'Auto-ack sent', specification: '100% within 1 min', measurementMethod: 'System log', frequency: 'Continuous', reactionPlan: 'IT alert, manual backup' },
                { processStep: 'Routing', characteristic: 'Correct queue assignment', specification: '>95% accuracy', measurementMethod: 'Weekly audit sample', frequency: 'Weekly', reactionPlan: 'Retrain AI model' },
                { processStep: 'Response', characteristic: 'First response time', specification: '<4 hours avg', measurementMethod: 'Dashboard metric', frequency: 'Real-time', reactionPlan: 'Escalation if >6 hrs' },
                { processStep: 'Resolution', characteristic: 'FCR rate', specification: '>70%', measurementMethod: 'Ticket reopen rate', frequency: 'Daily', reactionPlan: 'Knowledge gap analysis' }
            ],
            
            spcCharts: 'Control Charts:\n\n1. I-MR Chart: Daily average response time\n   - UCL: 6 hours, LCL: 2 hours, CL: 4 hours\n\n2. p-Chart: Daily SLA compliance rate\n   - UCL: 98%, LCL: 92%, CL: 95%\n\n3. u-Chart: Escalations per 100 tickets\n   - UCL: 8, LCL: 2, CL: 5\n\nDashboard displays real-time metrics visible to all agents and management.',
            
            documentation: 'Updated Documentation:\n• SOP-CS-001: Ticket Handling Process (Rev 2.0)\n• Quick Reference: Issue Categorization Guide\n• Training: AI Tools Usage (mandatory for all agents)\n• Escalation Matrix (updated thresholds)\n• Staffing Schedule Template (demand-based)',
            
            results: {
                responseTimeFinal: '3.8 hours',
                sigmaFinal: '4.5σ',
                annualSavings: '$680,000',
                slaCompliance: '94%',
                csat: '88%'
            },
            
            lessonsLearned: '1. Quick wins (auto-ack) built momentum and stakeholder confidence\n2. Agent involvement in solution design critical for adoption\n3. AI tools require ongoing training data refinement\n4. Weekend staffing was harder to hire than expected - consider remote/gig options\n5. Real-time dashboards drove healthy competition among agents'
        }
    },
    
    // EXAMPLE 3: Invoice Processing Cycle Time
    invoiceProcessing: {
        id: 'invoiceProcessing',
        title: 'Invoice Processing Optimization',
        subtitle: 'Accounts Payable Transformation',
        icon: '📄',
        category: 'Finance Operations',
        stats: { sigma: '3.2σ → 4.8σ', savings: '$420K', duration: '5 months' },
        tags: ['Finance', 'Automation', 'Cycle Time'],
        description: 'DMAIC project to reduce invoice processing cycle time from 12 days to 3 days through automation and process standardization.',
        data: {
            projectTitle: 'Accounts Payable Invoice Processing Optimization',
            projectChampion: 'David Park, CFO',
            projectLead: 'Rachel Green, Six Sigma Green Belt',
            startDate: '2026-01-20',
            targetCompletion: '2026-06-20',
            
            problemStatement: 'Invoice processing cycle time averages 12 days from receipt to payment, with 28% of invoices exceeding our 15-day payment terms. This results in: $180K annually in lost early payment discounts, strained vendor relationships (3 key suppliers have escalated concerns), $95K in late payment penalties, and 2,400 hours of AP staff time spent on exception handling and vendor inquiries. The AP team processes 8,500 invoices monthly with 15% requiring manual intervention.',
            
            businessCase: 'Optimizing invoice processing will: (1) Capture $180K in early payment discounts (2% on $9M eligible spend), (2) Eliminate $95K in late payment penalties, (3) Reduce AP staff workload by 40%, freeing capacity for strategic work, (4) Improve vendor relationships and negotiating position, (5) Reduce working capital needs through predictable cash flow, (6) Improve audit compliance with consistent process controls.',
            
            projectScope: 'In Scope: All vendor invoices processed through AP including PO-based and non-PO invoices, expense reports, and utility payments for all US entities. Out of Scope: Intercompany invoices, international subsidiaries, employee reimbursements through Concur, capital expenditure approvals.',
            
            primaryMetric: 'Invoice Cycle Time (days from receipt to payment)',
            baselineValue: '12 days average',
            targetValue: '3 days average',
            
            secondaryMetrics: [
                { metric: 'On-Time Payment Rate', baseline: '72%', target: '98%' },
                { metric: 'First-Time Match Rate (3-way)', baseline: '62%', target: '90%' },
                { metric: 'Cost per Invoice Processed', baseline: '$8.50', target: '$3.00' },
                { metric: 'Exception Rate', baseline: '15%', target: '5%' }
            ],
            
            stakeholders: [
                { name: 'David Park', role: 'Champion', involvement: 'Executive sponsor, policy decisions' },
                { name: 'Rachel Green', role: 'Project Lead', involvement: 'Analysis, implementation coordination' },
                { name: 'Tom Baker', role: 'AP Manager', involvement: 'Process owner, team management' },
                { name: 'Procurement', role: 'Partner', involvement: 'PO accuracy, vendor communication' },
                { name: 'IT', role: 'Technical', involvement: 'System integration, automation' }
            ],
            
            processMap: 'Current Invoice Process:\n1. Invoice received (mail/email/portal) → 2. Mailroom scanning (2 days) → 3. Data entry into ERP (1 day) → 4. 3-way match attempt → 5. If exception: route to buyer (3 days avg) → 6. Approval workflow (2 days) → 7. Payment batch scheduling (2 days) → 8. Payment execution\n\nValue-Add Time: 1.5 days\nNon-Value-Add Time: 10.5 days (88% waste)',
            
            dataCollectionPlan: 'Data Collection:\n• ERP invoice transaction logs (all invoices, 6 months history)\n• Exception tracking spreadsheet\n• Email analysis for vendor inquiries\n• Time study for manual processes\n• Vendor early payment terms database\n\nSample: 51,000 invoices over 6 months\nSegmentation: By vendor, PO vs non-PO, dollar amount, exception type',
            
            measurementSystemAnalysis: 'MSA Results:\n• ERP timestamp accuracy: Verified to the minute\n• Invoice categorization: 85% agreement (acceptable)\n• Exception coding: 72% agreement (identified for improvement)\n\nNote: Created standardized exception categories during Measure phase',
            
            baselineCapability: 'Process Capability:\n• Mean Cycle Time: 12 days\n• Standard Deviation: 5.2 days\n• Sigma Level: 3.2σ (vs. 3-day target)\n• On-Time Payment: 72%\n\nCycle Time Distribution:\n• 0-3 days: 8%\n• 4-7 days: 22%\n• 8-15 days: 42%\n• >15 days: 28%',
            
            rootCauseAnalysis: 'Fishbone Analysis:\n\nPROCESS:\n• Manual data entry creates 2-day delay (verified - 25%)\n• Approval routing is sequential, not parallel (verified - 20%)\n• Payment batches run only twice weekly (verified - 15%)\n\nSYSTEM:\n• No OCR/automation for invoice capture\n• ERP-procurement system not integrated\n• No vendor portal for status visibility\n\nPEOPLE:\n• Approvers delay averaging 2.3 days (verified - 20%)\n• Exception resolution requires multiple handoffs\n\nINFORMATION:\n• 38% of POs have incorrect receiving data (verified - 20%)\n• Vendor invoices missing required data',
            
            dataAnalysis: 'Statistical Analysis:\n\n1. Pareto of Delay Causes:\n   - Approval delays: 28%\n   - Match exceptions: 25%\n   - Data entry backlog: 22%\n   - Payment scheduling: 15%\n   - Other: 10%\n\n2. Regression Analysis: R² = 0.81\n   - PO accuracy: 35% of cycle time variation\n   - Approver level: 25% of variation\n   - Invoice amount: 15% of variation\n\n3. Chi-Square (Exception Type vs. Vendor):\n   - p < 0.001, top 20 vendors cause 60% of exceptions\n\n4. Time Analysis:\n   - Invoices received Monday processed 2 days faster\n   - Month-end invoices 4 days slower',
            
            verifiedRootCauses: [
                { cause: 'Manual invoice data entry creates 2-day processing delay', contribution: '25%', evidence: 'Time study, backlog analysis' },
                { cause: 'PO receiving data incorrect/missing for 38% of invoices', contribution: '20%', evidence: '3-way match failure analysis' },
                { cause: 'Approvers average 2.3 days to action (target: 1 day)', contribution: '20%', evidence: 'Workflow timestamp analysis' },
                { cause: 'Payment batches only run Tuesday/Friday', contribution: '15%', evidence: 'Payment calendar analysis' },
                { cause: 'Sequential approval routing doubles approval time', contribution: '20%', evidence: 'Process mapping, simulation' }
            ],
            
            solutions: [
                {
                    solution: 'Implement OCR/AI invoice capture with auto-data extraction',
                    rootCause: 'Manual data entry',
                    expectedImpact: '2-day reduction, 90% auto-capture',
                    cost: '$45,000 implementation + $18K/year',
                    timeline: '6 weeks',
                    owner: 'IT Lead'
                },
                {
                    solution: 'Integrate procurement and AP systems for real-time receiving data',
                    rootCause: 'PO data inaccuracy',
                    expectedImpact: '85%+ first-time match rate',
                    cost: '$30,000 integration project',
                    timeline: '8 weeks',
                    owner: 'IT Lead'
                },
                {
                    solution: 'Implement parallel approval workflow with auto-escalation at 24 hours',
                    rootCause: 'Approval delays',
                    expectedImpact: '50% approval time reduction',
                    cost: '$8,000 (workflow configuration)',
                    timeline: '3 weeks',
                    owner: 'AP Manager'
                },
                {
                    solution: 'Move to daily payment batch processing',
                    rootCause: 'Payment scheduling',
                    expectedImpact: '1.5-day average reduction',
                    cost: '$0 (process change)',
                    timeline: '1 week',
                    owner: 'Treasury'
                },
                {
                    solution: 'Launch vendor portal for invoice submission and status tracking',
                    rootCause: 'Vendor inquiries, missing data',
                    expectedImpact: '30% inquiry reduction, better data quality',
                    cost: '$25,000',
                    timeline: '10 weeks',
                    owner: 'Procurement'
                }
            ],
            
            pilotResults: 'Pilot: 4 weeks with top 50 vendors (2,400 invoices)\n\n• Cycle time: 12 days → 3.8 days (68% reduction)\n• First-time match: 62% → 84%\n• On-time payment: 72% → 96%\n• Cost per invoice: $8.50 → $4.20\n• Early payment discounts captured: $12,000 (pilot period)\n\nVendor feedback: "Finally can see where my invoice is"',
            
            implementationPlan: 'Rollout Schedule:\n\nWeek 1-2: Daily payment batch implementation\nWeek 2-4: Parallel approval workflow configuration\nWeek 3-6: OCR system implementation and training\nWeek 5-8: Procurement-AP system integration\nWeek 6-12: Vendor portal development and rollout\nWeek 8-10: Top 100 vendor onboarding to portal\nWeek 10-14: Full vendor rollout and optimization',
            
            controlPlan: [
                { processStep: 'Invoice Capture', characteristic: 'Auto-extraction rate', specification: '>90%', measurementMethod: 'System report', frequency: 'Daily', reactionPlan: 'Template update, vendor outreach' },
                { processStep: '3-Way Match', characteristic: 'First-time match rate', specification: '>90%', measurementMethod: 'Exception report', frequency: 'Daily', reactionPlan: 'Root cause by vendor/PO' },
                { processStep: 'Approval', characteristic: 'Approval cycle time', specification: '<24 hours', measurementMethod: 'Workflow report', frequency: 'Daily', reactionPlan: 'Auto-escalation triggers' },
                { processStep: 'Payment', characteristic: 'Cycle time', specification: '<3 days avg', measurementMethod: 'Dashboard', frequency: 'Real-time', reactionPlan: 'Process audit, capacity review' }
            ],
            
            spcCharts: 'Control Charts:\n\n1. X-bar/R: Daily average cycle time\n   - UCL: 5 days, LCL: 1 day, CL: 3 days\n\n2. p-Chart: Daily first-time match rate\n   - UCL: 95%, LCL: 85%, CL: 90%\n\n3. c-Chart: Daily exception count\n   - UCL: 45, LCL: 15, CL: 30\n\nAP dashboard displays all metrics with drill-down capability.',
            
            documentation: 'Documentation Updated:\n• SOP-AP-001: Invoice Processing Procedure (Rev 3.0)\n• SOP-AP-002: Exception Handling Guide (New)\n• Vendor Portal User Guide\n• OCR System Training Materials\n• Approval Authority Matrix (Updated)\n• Month-End Close Checklist',
            
            results: {
                cycleTimeFinal: '2.8 days',
                sigmaFinal: '4.8σ',
                annualSavings: '$420,000',
                onTimePayment: '97%',
                firstTimeMatch: '91%'
            },
            
            lessonsLearned: '1. Vendor portal adoption required more hand-holding than expected\n2. OCR accuracy improved significantly with vendor-specific templates\n3. Procurement partnership critical - they owned receiving data quality\n4. Approver behavior change needed executive messaging support\n5. Quick win (daily payments) showed immediate results and built momentum'
        }
    }
};

// ============================================
// EXAMPLE GALLERY FUNCTIONS FOR DMAIC
// ============================================

function renderDmaicExampleGallery() {
    const gallery = document.getElementById('dmaicExampleGallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    Object.values(dmaicExampleData).forEach(example => {
        const card = document.createElement('div');
        card.className = 'example-card';
        card.innerHTML = `
            <div class="example-card-header" style="background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);">
                <div class="example-card-icon">${example.icon}</div>
                <div class="example-card-title">${example.title}</div>
                <div class="example-card-subtitle">${example.subtitle}</div>
                <div class="example-card-stats">
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.sigma}</div>
                        <div class="example-stat-label">Sigma</div>
                    </div>
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.savings}</div>
                        <div class="example-stat-label">Savings</div>
                    </div>
                    <div class="example-stat">
                        <div class="example-stat-value">${example.stats.duration}</div>
                        <div class="example-stat-label">Duration</div>
                    </div>
                </div>
            </div>
            <div class="example-card-body">
                <p class="example-card-desc">${example.description}</p>
                <div class="example-tags">
                    ${example.tags.map(tag => `<span class="example-tag">${tag}</span>`).join('')}
                </div>
                <div class="example-card-actions">
                    <button class="btn btn-secondary" onclick="previewDmaicExample('${example.id}')">👁️ Preview</button>
                    <button class="btn btn-primary" onclick="useDmaicExample('${example.id}')">✨ Use This</button>
                </div>
            </div>
        `;
        gallery.appendChild(card);
    });
}

function previewDmaicExample(exampleId) {
    const example = dmaicExampleData[exampleId];
    if (!example) return;
    
    document.getElementById('examplePreviewTitle').textContent = example.title + ' - DMAIC Preview';
    
    const content = document.getElementById('examplePreviewContent');
    const data = example.data;
    
    content.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #16a34a; margin-bottom: 0.75rem;">📋 Project Overview</h4>
            <p style="font-weight: 600; margin-bottom: 0.5rem;">${data.projectTitle}</p>
            <p style="color: var(--text-muted); font-size: 0.9rem;">${data.problemStatement.substring(0, 200)}...</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #16a34a; margin-bottom: 0.75rem;">📊 Metrics</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px;">
                    <div style="font-size: 0.75rem; color: #16a34a;">Primary Metric</div>
                    <div style="font-weight: 600;">${data.primaryMetric}</div>
                    <div style="font-size: 0.9rem; color: var(--text-muted);">${data.baselineValue} → ${data.targetValue}</div>
                </div>
                <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px;">
                    <div style="font-size: 0.75rem; color: #16a34a;">Results Achieved</div>
                    <div style="font-weight: 600;">${data.results.sigmaFinal} Sigma</div>
                    <div style="font-size: 0.9rem; color: var(--text-muted);">${data.results.annualSavings} Annual Savings</div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #16a34a; margin-bottom: 0.75rem;">🔍 Root Causes Identified</h4>
            <ul style="list-style: none; padding: 0;">
                ${data.verifiedRootCauses.slice(0, 3).map(rc => `
                    <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border); font-size: 0.9rem;">
                        <strong>${rc.contribution}:</strong> ${rc.cause.substring(0, 60)}...
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div>
            <h4 style="color: #16a34a; margin-bottom: 0.75rem;">💡 Key Solutions</h4>
            <ul style="list-style: none; padding: 0;">
                ${data.solutions.slice(0, 3).map(s => `
                    <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border); font-size: 0.9rem;">
                        ${s.solution.substring(0, 70)}... <span style="color: #16a34a;">(${s.expectedImpact})</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    document.getElementById('useExampleBtn').onclick = () => useDmaicExample(exampleId);
    document.getElementById('examplesGalleryModal').classList.remove('active');
    document.getElementById('examplePreviewModal').classList.add('active');
}

function useDmaicExample(exampleId) {
    // Check if user has access (not a free user)
    const userData = localStorage.getItem('pmt_user');
    if (userData) {
        const user = JSON.parse(userData);
        const plan = user.plan || 'free';
        const isTester = user.isTester === true;
        const selectedTools = user.selectedTools || [];
        
        // Check if user has access to DMAIC
        const hasAccess = isTester || 
                          plan === 'unlimited' || 
                          plan === 'enterprise' ||
                          selectedTools.includes('dmaic-generator') ||
                          selectedTools.includes('dmaic');
        
        if (!hasAccess) {
            // Free user - redirect to pricing
            document.getElementById('examplesGalleryModal')?.classList.remove('active');
            document.getElementById('examplePreviewModal')?.classList.remove('active');
            window.location.href = '/pricing';
            return;
        }
    } else {
        // Not logged in - redirect to signup
        window.location.href = '/signup';
        return;
    }
    
    const example = dmaicExampleData[exampleId];
    if (!example) return;
    
    // This function should map example.data to your DMAIC form fields
    // Implementation depends on your specific form field IDs
    
    const data = example.data;
    
    // Example field mappings (adjust to match your form):
    // document.getElementById('projectTitle').value = data.projectTitle;
    // document.getElementById('problemStatement').value = data.problemStatement;
    // etc.
    
    console.log('Loading DMAIC example:', exampleId, data);
    
    // Close modals
    document.getElementById('examplesGalleryModal')?.classList.remove('active');
    document.getElementById('examplePreviewModal')?.classList.remove('active');
    
    alert('Example data loaded! Customize it for your project.');
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dmaicExampleData };
}
