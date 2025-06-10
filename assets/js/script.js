// ================================================================
// TOWN OF WILEY - CONSOLIDATED JAVASCRIPT
// ================================================================
// Version: 2.0.0 - Consolidated DOMContentLoaded handlers
// Dependencies: modernizr-custom.js (MUST load first)
// Purpose: Main functionality with single initialization point
// ================================================================

// 1. DEPENDENCY VERIFICATION
// ================================================================
console.log('🏛️ Initializing Town of Wiley (consolidated version)...');

// Check critical dependencies
const dependencies = {
    modernizr: typeof Modernizr !== 'undefined',
    dom: typeof document !== 'undefined',
    console: typeof console !== 'undefined',
    localStorage: typeof localStorage !== 'undefined'
};

console.log('🔍 Dependency Check:', dependencies);

// Verify Modernizr is loaded first (critical dependency)
if (!dependencies.modernizr) {
    console.warn('⚠️ Modernizr not detected at startup, attempting delayed detection...');
    // Attempt graceful degradation
    window.Modernizr = {
        flexbox: true, // Assume modern browser
        cssgrid: true,
        csstransforms: true,
        localstorage: true
    };
} else {
    console.log('✅ Modernizr loaded successfully at startup');
}

// 2. MODERNIZR FEATURE DETECTION
// ================================================================
// Delayed check for Modernizr (it might load after this script initially runs)
setTimeout(function() {
    if (typeof Modernizr !== 'undefined') {
        console.log('🔧 Modernizr loaded successfully. Detected features:', {
            flexbox: Modernizr.flexbox,
            cssgrid: Modernizr.cssgrid,
            csstransforms: Modernizr.csstransforms,
            csstransitions: Modernizr.csstransitions,
            touchevents: Modernizr.touchevents,
            localstorage: Modernizr.localstorage,
            canvas: Modernizr.canvas,
            svg: Modernizr.svg,
            video: Modernizr.video,
            audio: Modernizr.audio,
            webgl: Modernizr.webgl,
            websockets: Modernizr.websockets,
            serviceworker: Modernizr.serviceworker,
            cssanimations: Modernizr.cssanimations
        });
          // Store feature detection results for later use
        window.BROWSER_FEATURES = {
            modern: Modernizr.flexbox && Modernizr.cssgrid,
            mobile: Modernizr.touchevents || ('ontouchstart' in window),
            storage: Modernizr.localstorage || true,
            graphics: (Modernizr.canvas && Modernizr.svg) || true,
            multimedia: (Modernizr.video && Modernizr.audio) || true
        };
        
        console.log('📱 Browser Capability Assessment:', window.BROWSER_FEATURES);
    } else {
        console.log('ℹ️ Modernizr not available - using fallback detection');
        window.BROWSER_FEATURES = {
            modern: true, // Assume modern browser
            mobile: 'ontouchstart' in window,
            storage: true,
            graphics: true,
            multimedia: true
        };
    }
}, 100); // Small delay to allow Modernizr to load

// 3. DEBUG UTILITIES
// ================================================================
window.DEBUG = window.DEBUG || {
    enabled: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    log: function(message, data = null) {
        if (this.enabled) {
            console.log(`🏛️ [Town of Wiley Debug] ${message}`, data || '');
        }
    },
    error: function(message, error = null) {
        if (this.enabled) {
            console.error(`🚨 [Town of Wiley Error] ${message}`, error || '');
        }
    },
    checkAccessibility: function() {
        if (this.enabled) {
            const issues = [];
            
            // Check for images without alt text
            const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
            if (imagesWithoutAlt.length > 0) {
                issues.push(`${imagesWithoutAlt.length} images missing alt text`);
            }
            
            // Check for proper heading hierarchy
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            if (headings.length === 0) {
                issues.push('No headings found on page');
            }
            
            // Check for form labels
            const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
            const inputsWithoutLabelsCount = Array.from(inputsWithoutLabels).filter(input => {
                const label = document.querySelector(`label[for="${input.id}"]`);
                return !label;
            }).length;
            
            if (inputsWithoutLabelsCount > 0) {
                issues.push(`${inputsWithoutLabelsCount} form inputs missing proper labels`);
            }
            
            if (issues.length === 0) {
                this.log('✅ Basic accessibility checks passed');
            } else {
                this.error('Accessibility issues found:', issues);
            }
            
            return issues;
        }
    }
};
const DEBUG = window.DEBUG;

// Initialize debug logging
DEBUG.log('🚀 Town of Wiley website JavaScript loaded');
DEBUG.log('📱 Tailwind CSS detected:', !!window.tailwind || document.querySelector('script[src*="tailwind"]') !== null);

// ================================================================
// CONSOLIDATED DOM INITIALIZATION
// ================================================================
// Single DOMContentLoaded handler to prevent conflicts and ensure proper initialization order

document.addEventListener('DOMContentLoaded', function() {
    DEBUG.log('🔄 DOM Content Loaded - Starting consolidated initialization');
    
    try {
        // Initialize navigation first (critical UI component)
        initNavigation();
        
        // Initialize form handling
        initContactForm();
        
        // Initialize animation observers
        initScrollAnimations();
        
        // Initialize quick links
        initQuickLinks();
        
        // Initialize accessibility features
        initAccessibilityModal();
        initSkipLinks();
        initKeyboardSupport();
        
        // Initialize business directory and other features
        initBusinessDirectory();
        initCookieConsent();
        initSiteSearch();
        initNewsletterSignup();
        
        // Load saved user preferences
        loadUserPreferences();
        
        // Initialize emergency alerts
        checkForEmergencyAlerts();
        
        // Add event listeners for inline handlers to fix CSP issues
        initInlineEventHandlers();
        
        DEBUG.log('✅ All initialization functions completed successfully');
        
    } catch (error) {
        DEBUG.error('🚨 Error during initialization:', error);
    }
});

// ================================================================
// NAVIGATION INITIALIZATION
// ================================================================
function initNavigation() {
    DEBUG.log('🔄 Initializing navigation');
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!navToggle) {
        DEBUG.log('ℹ️ Navigation toggle button not found on this page');
        return;
    }
    
    if (!navMenu) {
        DEBUG.log('ℹ️ Navigation menu not found on this page');
        return;
    }
    
    DEBUG.log('✅ Navigation elements found');

    // Initialize ARIA attributes
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'nav-menu');
    navMenu.setAttribute('id', 'nav-menu');

    navToggle.addEventListener('click', function() {
        const isExpanded = navMenu.classList.contains('active');
        DEBUG.log(`📱 Navigation toggle clicked - Currently expanded: ${isExpanded}`);
        
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Update ARIA state
        this.setAttribute('aria-expanded', !isExpanded);
        DEBUG.log(`🔄 Navigation state changed - Now expanded: ${!isExpanded}`);
        
        // Manage focus for accessibility
        if (!isExpanded) {
            // Menu is opening - focus first link
            const firstLink = navMenu.querySelector('a');
            if (firstLink) {
                setTimeout(() => {
                    firstLink.focus();
                    DEBUG.log('🎯 Focus moved to first navigation link');
                }, 100);
            }
        }
    });

    // Keyboard navigation support
    navToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navMenu.contains(e.target) || navToggle.contains(e.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus(); // Return focus to toggle button
        }
    });

    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
}

// ================================================================
// SMOOTH SCROLLING
// ================================================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================================================
// CONTACT FORM INITIALIZATION
// ================================================================
function initContactForm() {
    DEBUG.log('🔄 Initializing contact form');
    
    const contactFormElement = document.getElementById('quickContactForm');
    if (!contactFormElement) {
        DEBUG.log('ℹ️ Contact form not found on this page');
        return;
    }
    
    DEBUG.log('✅ Contact form found');
    
    contactFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error states
        clearFormErrors();
    
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        let hasErrors = false;
        
        // Basic validation with specific error messages
        if (!name) {
            showFieldError('name', 'Name is required');
            hasErrors = true;
        }
        
        if (!email) {
            showFieldError('email', 'Email is required');
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            hasErrors = true;
        }
        
        if (!subject) {
            showFieldError('subject', 'Subject is required');
            hasErrors = true;
        }
        
        if (!message) {
            showFieldError('message', 'Message is required');
            hasErrors = true;
        }
        
        if (hasErrors) {
            // Focus on first error field for accessibility
            const firstError = document.querySelector('.field-error');
            if (firstError) {
                const errorField = firstError.previousElementSibling;
                if (errorField) {
                    errorField.focus();
                }
            }
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message. We will respond within 2 business days.', 'success');
        this.reset();
    });
}

// ================================================================
// SCROLL ANIMATIONS
// ================================================================
function initScrollAnimations() {
    DEBUG.log('🔄 Initializing scroll animations');
    
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (!header) return;
        
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '';
            header.style.backdropFilter = '';
        }
    });
}

// ================================================================
// QUICK LINKS INITIALIZATION
// ================================================================
function initQuickLinks() {
    DEBUG.log('🔄 Initializing quick links');
    
    const quickLinkButtons = document.querySelectorAll('.quick-link-card .btn');
    
    quickLinkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // For demo purposes, show notification for external services
            const cardTitle = this.closest('.quick-link-card').querySelector('h3').textContent;
            
            if (cardTitle.includes('Pay Utilities') || cardTitle.includes('Permits')) {
                e.preventDefault();
                showNotification(`${cardTitle} portal would open in a real implementation. Contact town hall for assistance.`, 'info');
            }
        });
    });
}

// ================================================================
// ACCESSIBILITY FEATURES
// ================================================================
function initAccessibilityModal() {
    DEBUG.log('🔄 Initializing accessibility modal');
    
    const accessibilityLink = document.querySelector('a[href="#accessibility-statement"]');
    if (accessibilityLink) {
        accessibilityLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAccessibilityStatement();
        });
    }
}

function initSkipLinks() {
    DEBUG.log('🔄 Initializing skip links');
    
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
                // Remove tabindex after focus to avoid affecting normal tab order
                mainContent.addEventListener('blur', function() {
                    mainContent.removeAttribute('tabindex');
                }, { once: true });
            }
        });
    }
}

function initKeyboardSupport() {
    DEBUG.log('🔄 Initializing keyboard support');
    
    // Enhance all buttons with keyboard support
    const buttons = document.querySelectorAll('button:not([type="submit"]):not(.notification-close)');
    buttons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ================================================================
// BUSINESS DIRECTORY (stub function)
// ================================================================
function initBusinessDirectory() {
    DEBUG.log('🔄 Initializing business directory');
    // Placeholder for business directory functionality
}

// ================================================================
// COOKIE CONSENT (stub function)
// ================================================================
function initCookieConsent() {
    DEBUG.log('🔄 Initializing cookie consent');
    // Placeholder for cookie consent functionality
}

// ================================================================
// SITE SEARCH (stub function)
// ================================================================
function initSiteSearch() {
    DEBUG.log('🔄 Initializing site search');
    // Placeholder for site search functionality
}

// ================================================================
// NEWSLETTER SIGNUP (stub function)
// ================================================================
function initNewsletterSignup() {
    DEBUG.log('🔄 Initializing newsletter signup');
    // Placeholder for newsletter signup functionality
}

// ================================================================
// USER PREFERENCES
// ================================================================
function loadUserPreferences() {
    DEBUG.log('🔄 Loading user preferences');
    
    // Load saved text size
    const savedTextSize = localStorage.getItem('text-size');
    if (savedTextSize) {
        adjustTextSize(savedTextSize);
        const textSizeButton = document.querySelector(`[data-size="${savedTextSize}"]`);
        if (textSizeButton) {
            textSizeButton.classList.add('active');
        }
    }
    
    // Load saved contrast preference
    const savedContrast = localStorage.getItem('contrast-preference');
    if (savedContrast) {
        adjustContrast(savedContrast);
        const contrastButton = document.querySelector(`[data-contrast="${savedContrast}"]`);
        if (contrastButton) {
            contrastButton.classList.add('active');
        }
    }
}

// ================================================================
// EMERGENCY ALERTS
// ================================================================
function checkForEmergencyAlerts() {
    DEBUG.log('🔄 Checking for emergency alerts');
    
    // Simulate checking for emergency alerts
    // In a real implementation, this would make an API call
    const hasActiveAlert = false; // Would come from server
    
    if (hasActiveAlert) {
        showEmergencyAlert('Example: Road closure on Main Street due to construction. Use alternate routes.');
    }
}

// ================================================================
// INLINE EVENT HANDLERS
// ================================================================
function initInlineEventHandlers() {
    DEBUG.log('🔄 Initializing inline event handlers');
    
    // Add event listeners for buttons that were using inline handlers
    const alertCloseBtn = document.getElementById('alert-close-btn');
    if (alertCloseBtn) {
        alertCloseBtn.addEventListener('click', closeEmergencyAlert);
    }
    
    const saveCookiePrefsBtn = document.getElementById('save-cookie-prefs');
    if (saveCookiePrefsBtn) {
        saveCookiePrefsBtn.addEventListener('click', saveCookiePreferences);
    }
    
    const acceptAllCookiesBtn = document.getElementById('accept-all-cookies');
    if (acceptAllCookiesBtn) {
        acceptAllCookiesBtn.addEventListener('click', acceptAllCookies);
    }
    
    const cookieSettingsBtn = document.getElementById('cookie-settings-btn');
    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', showCookieSettings);
    }
    
    const declineNonEssentialBtn = document.getElementById('decline-non-essential');
    if (declineNonEssentialBtn) {
        declineNonEssentialBtn.addEventListener('click', declineNonEssential);
    }
}

// ================================================================
// UTILITY FUNCTIONS
// ================================================================

// Form validation utilities
function clearFormErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());
    
    const fields = document.querySelectorAll('.error');
    fields.forEach(field => field.classList.remove('error'));
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    field.classList.add('error');
    
    // Remove existing error for this field
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    field.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Sanitize message to prevent XSS
    const sanitizeHTML = (input) => {
        const div = document.createElement('div');
        div.innerText = input;
        return div.innerHTML;
    };
    notification.innerHTML = `
        <span>${sanitizeHTML(message)}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Manual close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

// Accessibility statement modal
function showAccessibilityStatement() {
    const modal = document.createElement('div');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'accessibility-title');
    modal.className = 'accessibility-modal';
    
    // No user input is injected here, but if you ever add dynamic content, sanitize it before insertion.
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10001; display: flex; align-items: center; justify-content: center; padding: 20px;">
            <div style="background: white; padding: 2rem; border-radius: 10px; max-width: 600px; max-height: 80vh; overflow-y: auto; position: relative;">
                <h2 id="accessibility-title" style="color: #2c3e50; margin-bottom: 1rem;">Accessibility Statement</h2>
                <div style="text-align: left; line-height: 1.6;">
                    <p><strong>Town of Wiley</strong> is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards.</p>
                    
                    <h3 style="color: #2c3e50; margin-top: 1.5rem;">Conformance Status</h3>
                    <p>This website conforms to <strong>WCAG 2.1 Level AA</strong> standards as required by the 2024 ADA Web Accessibility Rule for state and local governments.</p>
                    
                    <h3 style="color: #2c3e50; margin-top: 1.5rem;">Accessibility Features</h3>
                    <ul>
                        <li>Semantic HTML structure</li>
                        <li>Keyboard navigation support</li>
                        <li>Screen reader compatibility</li>
                        <li>High contrast color schemes</li>
                        <li>Descriptive link text</li>
                        <li>Form labels and error messaging</li>
                        <li>Skip to main content link</li>
                    </ul>
                    
                    <h3 style="color: #2c3e50; margin-top: 1.5rem;">Feedback</h3>
                    <p>We welcome your feedback on the accessibility of our website. Please contact us if you encounter accessibility barriers:</p>
                    <ul>
                        <li><strong>Email:</strong> <a href="mailto:accessibility@townofwiley.gov" style="color: #3498db;">accessibility@townofwiley.gov</a></li>
                        <li><strong>Phone:</strong> <a href="tel:5551234567" style="color: #3498db;">(555) 123-4567</a></li>
                        <li><strong>Mail:</strong> Town of Wiley, ATTN: Accessibility, 123 Main Street, Wiley, State 12345</li>
                    </ul>
                </div>
                <button onclick="this.closest('.accessibility-modal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;" aria-label="Close accessibility statement">&times;</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus management
    modal.querySelector('h2').focus();
    
    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Placeholder functions for missing implementations
function adjustTextSize(size) {
    DEBUG.log(`Adjusting text size to: ${size}`);
}

function adjustContrast(contrast) {
    DEBUG.log(`Adjusting contrast to: ${contrast}`);
}

function closeEmergencyAlert() {
    DEBUG.log('Closing emergency alert');
}

function saveCookiePreferences() {
    DEBUG.log('Saving cookie preferences');
}

function acceptAllCookies() {
    DEBUG.log('Accepting all cookies');
}

function showCookieSettings() {
    DEBUG.log('Showing cookie settings');
}

function declineNonEssential() {
    DEBUG.log('Declining non-essential cookies');
}

function showEmergencyAlert(message) {
    DEBUG.log('Showing emergency alert:', message);
}

// ================================================================
// PAGE LOAD COMPLETION
// ================================================================
window.addEventListener('load', function() {
    DEBUG.checkAccessibility();
    DEBUG.log('🎉 Town of Wiley website fully loaded and initialized');
});
