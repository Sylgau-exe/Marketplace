/**
 * ProjectManagerTool - Access Control System
 * Include this script in any tool HTML file to enforce access control
 * 
 * Usage: <script src="/js/access-control.js"></script>
 * 
 * This script checks if the user has access to the current tool.
 * - Free users: Can view examples only, redirected to upgrade when trying to use tool
 * - Paid users: Full access based on their plan and selected tools
 */

(function() {
    'use strict';

    // Configuration
    const ACCESS_CONFIG = {
        FREE: 'free',
        STARTER: 'starter',       // 1 tool - $9/mo
        PROFESSIONAL: 'professional', // 5 tools - $19/mo
        UNLIMITED: 'unlimited',   // All tools - $49/mo
        ENTERPRISE: 'enterprise'  // All tools + team
    };

    const PLAN_TOOL_LIMITS = {
        free: 0,
        starter: 1,
        professional: 5,
        unlimited: -1,  // -1 = unlimited
        enterprise: -1
    };

    // Tool ID mapping from URL paths
    const TOOL_PATH_MAP = {
        '/charterpro/': 'charterpro',
        '/dmaic/': 'dmaic-generator',
        '/roi/': 'roi-calculator',
        '/tco/': 'tco-calculator',
        '/risk-register/': 'risk-register',
        '/feasibility-study/': 'feasibility-study'
    };

    // Get current tool ID from URL
    function getCurrentToolId() {
        const path = window.location.pathname;
        for (const [urlPath, toolId] of Object.entries(TOOL_PATH_MAP)) {
            if (path.includes(urlPath)) {
                return toolId;
            }
        }
        return null;
    }

    // Check if current page is an examples/index page (always allowed)
    function isExamplesPage() {
        const path = window.location.pathname;
        return path.endsWith('/index.html') || path.endsWith('/examples.html');
    }

    // Get user data from localStorage
    function getUserData() {
        try {
            const userData = localStorage.getItem('pmt_user');
            return userData ? JSON.parse(userData) : null;
        } catch (e) {
            console.error('Error reading user data:', e);
            return null;
        }
    }

    // Check if user has access to a specific tool
    function hasToolAccess(toolId) {
        const user = getUserData();
        
        // No user = no access (but can view examples)
        if (!user) {
            return false;
        }

        const plan = user.plan || ACCESS_CONFIG.FREE;
        const selectedTools = user.selectedTools || [];
        const toolLimit = PLAN_TOOL_LIMITS[plan];

        // Free plan = no tool access
        if (plan === ACCESS_CONFIG.FREE) {
            return false;
        }

        // Unlimited/Enterprise = access to all
        if (toolLimit === -1) {
            return true;
        }

        // Starter/Professional = check selected tools
        return selectedTools.includes(toolId);
    }

    // Show upgrade modal
    function showUpgradeModal(toolId) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.id = 'pmt-upgrade-modal';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(8px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;

        const toolNames = {
            'charterpro': 'CharterPro',
            'dmaic-generator': 'DMAIC Generator',
            'roi-calculator': 'ROI Calculator',
            'tco-calculator': 'TCO Calculator',
            'risk-register': 'Risk Register',
            'feasibility-study': 'Feasibility Study'
        };

        const toolName = toolNames[toolId] || 'this tool';

        overlay.innerHTML = `
            <div style="
                background: #12121a;
                border-radius: 20px;
                padding: 40px;
                max-width: 480px;
                width: 100%;
                border: 1px solid rgba(255,255,255,0.1);
                text-align: center;
            ">
                <div style="
                    width: 64px;
                    height: 64px;
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px;
                    font-size: 28px;
                ">🔒</div>
                <h2 style="
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 12px;
                ">Upgrade to Access ${toolName}</h2>
                <p style="
                    color: rgba(255,255,255,0.6);
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 32px;
                ">
                    You're currently on a free account. Upgrade to start creating 
                    your own projects with ${toolName}.
                </p>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <a href="/pricing" style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        padding: 14px 24px;
                        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                        border: none;
                        border-radius: 10px;
                        color: white;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        text-decoration: none;
                    ">View Plans - From $9/month</a>
                    <button onclick="document.getElementById('pmt-upgrade-modal').remove()" style="
                        padding: 14px 24px;
                        background: rgba(255,255,255,0.05);
                        border: 1px solid rgba(255,255,255,0.1);
                        border-radius: 10px;
                        color: white;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                    ">Continue Browsing Examples</button>
                </div>
                <p style="
                    color: rgba(255,255,255,0.4);
                    font-size: 0.85rem;
                    margin-top: 24px;
                ">
                    ✓ Browse all tools free &nbsp;&nbsp; ✓ View example projects
                </p>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    // Disable form inputs and show upgrade prompts
    function disableToolUsage() {
        // Find all form inputs, buttons, and interactive elements
        const interactiveElements = document.querySelectorAll('input, textarea, select, button[type="submit"]');
        
        interactiveElements.forEach(el => {
            // Skip navigation and example gallery buttons
            if (el.closest('.nav') || 
                el.classList.contains('btn-examples') || 
                el.onclick?.toString().includes('Example') ||
                el.id === 'loadExampleBtn') {
                return;
            }
            
            el.addEventListener('focus', function(e) {
                e.preventDefault();
                showUpgradeModal(getCurrentToolId());
            });
            
            el.addEventListener('click', function(e) {
                if (el.tagName === 'BUTTON' || el.type === 'submit') {
                    e.preventDefault();
                    showUpgradeModal(getCurrentToolId());
                }
            });
        });

        // Add a banner at the top
        const banner = document.createElement('div');
        banner.id = 'pmt-free-banner';
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 12px 24px;
            text-align: center;
            z-index: 9999;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
        `;
        banner.innerHTML = `
            <span>🔍 <strong>Preview Mode</strong> - You're viewing this tool as a free user</span>
            <a href="/pricing" style="
                background: white;
                color: #6366f1;
                padding: 6px 16px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.85rem;
            ">Upgrade to Create</a>
        `;
        document.body.prepend(banner);

        // Adjust page content to account for banner
        document.body.style.paddingTop = '48px';
    }

    // Initialize access control
    function init() {
        const toolId = getCurrentToolId();
        
        // No tool ID found = not a tool page
        if (!toolId) {
            return;
        }

        // Examples pages are always accessible
        if (isExamplesPage()) {
            console.log('PMT Access: Examples page - access granted');
            return;
        }

        // Check access
        if (hasToolAccess(toolId)) {
            console.log('PMT Access: User has access to', toolId);
            return;
        }

        // No access - show preview mode
        console.log('PMT Access: Preview mode for', toolId);
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', disableToolUsage);
        } else {
            disableToolUsage();
        }
    }

    // For testing: Set user data
    window.PMTAccess = {
        setUser: function(plan, selectedTools = []) {
            localStorage.setItem('pmt_user', JSON.stringify({
                plan: plan,
                selectedTools: selectedTools,
                email: 'test@example.com'
            }));
            location.reload();
        },
        clearUser: function() {
            localStorage.removeItem('pmt_user');
            location.reload();
        },
        getUser: getUserData,
        hasAccess: hasToolAccess
    };

    // Run on load
    init();

})();
