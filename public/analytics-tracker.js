// PMT Analytics Tracker
// Add this script to all pages: <script src="/analytics-tracker.js"></script>

(function() {
    const SUPABASE_URL = 'https://wfoyzgnowlpgpexygajs.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmb3l6Z25vd2xwZ3BleHlnYWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2Nzg5MTMsImV4cCI6MjA4NDI1NDkxM30.O0sy54yuacL_fEKPs1FjtyUjNJq-9XfaizpJxftDRyk';

    // Generate or retrieve visitor ID
    function getVisitorId() {
        let visitorId = localStorage.getItem('pmt_visitor_id');
        if (!visitorId) {
            visitorId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('pmt_visitor_id', visitorId);
        }
        return visitorId;
    }

    // Get UTM parameters and referrer
    function getTrafficSource() {
        const urlParams = new URLSearchParams(window.location.search);
        const referrer = document.referrer;
        
        let source = urlParams.get('utm_source') || 'direct';
        let medium = urlParams.get('utm_medium') || '';
        let campaign = urlParams.get('utm_campaign') || '';
        
        // Detect common referrers
        if (!urlParams.get('utm_source') && referrer) {
            if (referrer.includes('google.com')) source = 'google';
            else if (referrer.includes('facebook.com') || referrer.includes('fb.com')) source = 'facebook';
            else if (referrer.includes('twitter.com') || referrer.includes('t.co')) source = 'twitter';
            else if (referrer.includes('linkedin.com')) source = 'linkedin';
            else if (referrer.includes('youtube.com')) source = 'youtube';
            else if (referrer.includes('instagram.com')) source = 'instagram';
            else if (referrer.includes('tiktok.com')) source = 'tiktok';
            else if (referrer.includes('reddit.com')) source = 'reddit';
            else if (referrer) source = new URL(referrer).hostname;
        }
        
        return { source, medium, campaign, referrer };
    }

    // Get device info
    function getDeviceInfo() {
        const ua = navigator.userAgent;
        let device = 'desktop';
        if (/Mobile|Android|iPhone|iPad/.test(ua)) {
            device = /iPad|Tablet/.test(ua) ? 'tablet' : 'mobile';
        }
        
        let browser = 'other';
        if (ua.includes('Chrome')) browser = 'chrome';
        else if (ua.includes('Firefox')) browser = 'firefox';
        else if (ua.includes('Safari')) browser = 'safari';
        else if (ua.includes('Edge')) browser = 'edge';
        
        return { device, browser, userAgent: ua.substring(0, 500) };
    }

    // Track page view
    async function trackPageView() {
        const visitorId = getVisitorId();
        const traffic = getTrafficSource();
        const deviceInfo = getDeviceInfo();
        const sessionId = sessionStorage.getItem('pmt_session_id') || 
            ('s_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
        
        sessionStorage.setItem('pmt_session_id', sessionId);

        // Get logged in user email if available
        let userEmail = null;
        try {
            const userData = localStorage.getItem('pmt_user');
            if (userData) {
                const user = JSON.parse(userData);
                userEmail = user.email || null;
            }
        } catch (e) {}

        const pageView = {
            visitor_id: visitorId,
            session_id: sessionId,
            user_email: userEmail,
            page_url: window.location.pathname,
            page_title: document.title,
            referrer: traffic.referrer || null,
            source: traffic.source,
            medium: traffic.medium || null,
            campaign: traffic.campaign || null,
            device: deviceInfo.device,
            browser: deviceInfo.browser,
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            timestamp: new Date().toISOString()
        };

        try {
            await fetch(`${SUPABASE_URL}/rest/v1/page_views`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(pageView)
            });
        } catch (err) {
            console.log('Analytics error:', err);
        }

        // Track time on page
        trackTimeOnPage(visitorId, sessionId, window.location.pathname);
    }

    // Track time spent on page
    function trackTimeOnPage(visitorId, sessionId, pageUrl) {
        const startTime = Date.now();
        let timeSpent = 0;
        let isActive = true;

        // Update time every 10 seconds while page is active
        const interval = setInterval(() => {
            if (isActive) {
                timeSpent = Math.floor((Date.now() - startTime) / 1000);
            }
        }, 10000);

        // Detect if user is active
        document.addEventListener('visibilitychange', () => {
            isActive = document.visibilityState === 'visible';
        });

        // Send time spent when leaving
        window.addEventListener('beforeunload', () => {
            timeSpent = Math.floor((Date.now() - startTime) / 1000);
            
            // Use sendBeacon for reliable delivery
            const data = JSON.stringify({
                visitor_id: visitorId,
                session_id: sessionId,
                page_url: pageUrl,
                time_spent_seconds: timeSpent,
                timestamp: new Date().toISOString()
            });

            navigator.sendBeacon(
                `${SUPABASE_URL}/rest/v1/time_tracking?apikey=${SUPABASE_ANON_KEY}`,
                new Blob([data], { type: 'application/json' })
            );
        });
    }

    // Track tool/app activation
    window.pmtTrackToolActivation = function(toolName, userEmail) {
        const visitorId = getVisitorId();
        
        fetch(`${SUPABASE_URL}/rest/v1/tool_activations`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                visitor_id: visitorId,
                user_email: userEmail || null,
                tool_name: toolName,
                timestamp: new Date().toISOString()
            })
        }).catch(err => console.log('Tool tracking error:', err));
    };

    // Track events (button clicks, form submissions, etc.)
    window.pmtTrackEvent = function(eventName, eventData = {}) {
        const visitorId = getVisitorId();
        
        fetch(`${SUPABASE_URL}/rest/v1/events`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                visitor_id: visitorId,
                event_name: eventName,
                event_data: eventData,
                page_url: window.location.pathname,
                timestamp: new Date().toISOString()
            })
        }).catch(err => console.log('Event tracking error:', err));
    };

    // Initialize tracking
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackPageView);
    } else {
        trackPageView();
    }
})();
