/**
 * ProjectManagerTool - Access Control System
 * Include this script in any tool HTML file to enforce access control
 * 
 * Usage: <script src="/js/access-control.js"></script>
 * 
 * Access Levels:
 * - Not registered: Must register to access anything (tools or examples)
 * - Free account: Can browse tools and view examples only
 * - Paid accounts: Full access based on plan and selected tools
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
        free: 0,        // Can view examples only
        starter: 1,
        professional: 3,
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

    // Check if current page is an examples/index page
    function isExamplesPage() {
        const path = window.location.pathname;
        return path.endsWith('/index.html') || path.endsWith('/examples.html');
    }

    // Check if current page is a tool page (not examples)
    function isToolPage() {
        const path = window.location.pathname;
        return path.includes('/charter.html') || 
               path.includes('/dmaic.html') || 
               path.includes('/calculator.html') || 
               path.includes('/register.html') ||
               path.includes('/study.html');
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

    // Check if user is logged in
    function isLoggedIn() {
        const user = getUserData();
        return user !== null && user.email;
    }

    // Check if user has access to a specific tool (for creating projects)
    function hasToolAccess(toolId) {
        const user = getUserData();
        
        if (!user) return false;

        const plan = user.plan || ACCESS_CONFIG.FREE;
        const selectedTools = user.selectedTools || [];
        const isTester = user.isTester === true;
        const toolLimit = PLAN_TOOL_LIMITS[plan];

        // Testers have full access to all tools
        if (isTester) {
            return true;
        }

        // Free plan = no tool access (examples only)
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

    // Show registration required modal
    function showRegistrationModal() {
        // Check if already showing
        if (document.getElementById('pmt-register-modal')) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'pmt-register-modal';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(8px);
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;

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
                ">👤</div>
                <h2 style="
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 12px;
                ">Create a Free Account</h2>
                <p style="
                    color: rgba(255,255,255,0.6);
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 32px;
                ">
                    Sign up for free to browse our professional PM tools and view example projects. 
                    It only takes a moment.
                </p>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <a href="/signup" style="
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
                    ">Create Free Account</a>
                    <a href="/login" style="
                        padding: 14px 24px;
                        background: rgba(255,255,255,0.05);
                        border: 1px solid rgba(255,255,255,0.1);
                        border-radius: 10px;
                        color: white;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        text-decoration: none;
                    ">I Already Have an Account</a>
                </div>
                <p style="
                    color: rgba(255,255,255,0.4);
                    font-size: 0.85rem;
                    margin-top: 24px;
                ">
                    ✓ Free forever &nbsp;&nbsp; ✓ No credit card required
                </p>
            </div>
        `;

        document.body.appendChild(overlay);
        
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        
        // Block all keyboard events
        document.addEventListener('keydown', function blockKeys(e) {
            if (document.getElementById('pmt-register-modal')) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    }

    // Show upgrade modal for free users trying to use tools
    function showUpgradeModal(toolId) {
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
                ">Upgrade to Use ${toolName}</h2>
                <p style="
                    color: rgba(255,255,255,0.6);
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 32px;
                ">
                    You're on a free account. Upgrade to start creating 
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
                    ">Continue Viewing Examples</button>
                </div>
                <p style="
                    color: rgba(255,255,255,0.4);
                    font-size: 0.85rem;
                    margin-top: 24px;
                ">
                    ✓ Browse examples free &nbsp;&nbsp; ✓ Cancel anytime
                </p>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    // Disable form inputs and show upgrade prompts for free users on tool pages
    function disableToolUsage() {
        const toolId = getCurrentToolId();
        
        // Add a banner at the top FIRST
        addPreviewBanner();
        
        // Use event delegation on document for blocking form inputs
        document.addEventListener('focusin', function(e) {
            const el = e.target;
            
            // Skip if upgrade modal is already showing
            if (document.getElementById('pmt-upgrade-modal')) {
                return;
            }
            
            // Skip if inside any modal
            if (el.closest('[class*="modal"]') || 
                el.closest('[class*="Modal"]') || 
                el.closest('[id*="modal"]') || 
                el.closest('[id*="Modal"]') ||
                el.closest('[class*="overlay"]') ||
                el.closest('[class*="Overlay"]')) {
                return;
            }
            
            // Only block actual form inputs (not buttons)
            if (el.matches('input:not([type="button"]):not([type="submit"]), textarea, select')) {
                e.preventDefault();
                el.blur();
                showUpgradeModal(toolId);
            }
        }, true);
        
        // Block form submissions only
        document.addEventListener('submit', function(e) {
            if (document.getElementById('pmt-upgrade-modal')) {
                return;
            }
            e.preventDefault();
            showUpgradeModal(toolId);
        }, true);
    }

    // Add preview mode banner
    function addPreviewBanner() {
        if (document.getElementById('pmt-free-banner')) return;
        
        const banner = document.createElement('div');
        banner.id = 'pmt-free-banner';
        banner.style.cssText = `
            position: relative;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 10px 24px;
            text-align: center;
            z-index: 9999;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
        `;
        banner.innerHTML = `
            <span>🔍 <strong>Preview Mode</strong> - Viewing as free user</span>
            <a href="/pricing" style="
                background: white;
                color: #6366f1;
                padding: 6px 16px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.85rem;
            ">Upgrade to Create Projects</a>
        `;
        document.body.prepend(banner);
    }

    // Initialize access control
    function init() {
        const toolId = getCurrentToolId();
        
        // No tool ID found = not a tool page, skip
        if (!toolId) {
            return;
        }

        // STEP 1: Check if user is logged in at all
        if (!isLoggedIn()) {
            console.log('PMT Access: User not logged in - registration required');
            showRegistrationModal();
            return;
        }

        // STEP 2: User is logged in - check their access level
        const user = getUserData();
        const plan = user.plan || ACCESS_CONFIG.FREE;

        // Examples pages - allow for all logged-in users
        if (isExamplesPage()) {
            console.log('PMT Access: Examples page - access granted for', plan);
            if (plan === ACCESS_CONFIG.FREE) {
                addPreviewBanner();
            }
            return;
        }

        // Tool pages - check if user has paid access
        if (isToolPage()) {
            if (hasToolAccess(toolId)) {
                console.log('PMT Access: Full access granted for', toolId);
                return;
            } else {
                console.log('PMT Access: Preview mode for', toolId, '- plan:', plan);
                // Wait for DOM to be ready, then disable tool usage
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', disableToolUsage);
                } else {
                    disableToolUsage();
                }
                return;
            }
        }

        // Default: allow access but show banner for free users
        if (plan === ACCESS_CONFIG.FREE) {
            addPreviewBanner();
        }
    }

    // For testing: Set user data
    window.PMTAccess = {
        // Login as a user with specific plan
        login: function(email, plan, selectedTools = [], isTester = false) {
            localStorage.setItem('pmt_user', JSON.stringify({
                email: email || 'test@example.com',
                plan: plan || 'free',
                selectedTools: selectedTools,
                isTester: isTester,
                createdAt: new Date().toISOString()
            }));
            location.reload();
        },
        // Quick login shortcuts
        loginFree: function() {
            this.login('free@test.com', 'free', [], false);
        },
        loginStarter: function(toolId) {
            this.login('starter@test.com', 'starter', [toolId || 'charterpro'], false);
        },
        loginPro: function() {
            this.login('pro@test.com', 'professional', ['charterpro', 'dmaic-generator', 'roi-calculator', 'tco-calculator', 'risk-register'], false);
        },
        loginUnlimited: function() {
            this.login('unlimited@test.com', 'unlimited', [], false);
        },
        loginTester: function() {
            this.login('tester@test.com', 'free', [], true);
        },
        // Logout
        logout: function() {
            localStorage.removeItem('pmt_user');
            localStorage.removeItem('charterpro_user');
            location.reload();
        },
        // Get current user
        getUser: getUserData,
        // Check access
        hasAccess: hasToolAccess,
        isLoggedIn: isLoggedIn,
        // Check access and redirect if no access (for "Use Example" buttons)
        checkAccessOrRedirect: function(toolId) {
            if (!isLoggedIn()) {
                window.location.href = '/signup';
                return false;
            }
            if (!hasToolAccess(toolId)) {
                window.location.href = '/pricing';
                return false;
            }
            return true;
        }
    };

    // Global function for tools to use
    window.checkToolAccessOrRedirect = function(toolId) {
        const user = getUserData();
        
        if (!user || !user.email) {
            window.location.href = '/signup';
            return false;
        }
        
        const plan = user.plan || 'free';
        const isTester = user.isTester === true;
        const selectedTools = user.selectedTools || [];
        
        // Check if user has access
        const hasAccess = isTester || 
                          plan === 'unlimited' || 
                          plan === 'enterprise' ||
                          selectedTools.includes(toolId);
        
        if (!hasAccess) {
            window.location.href = '/pricing';
            return false;
        }
        
        return true;
    };

    // Run on load
    init();

})();
;
