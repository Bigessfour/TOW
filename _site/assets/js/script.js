// ================================================================
// TOWN OF WILEY - AGENTIC WORKFLOW SCRIPT
// ================================================================
// Version: 1.0.0
// Dependencies: modernizr-custom.js (MUST load first)
// Purpose: Main functionality with AI-assisted development support
// ================================================================

// 1. DEPENDENCY VERIFICATION
// ================================================================
console.log('🏛️ Initializing Town of Wiley agentic workflow...');

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
    console.error('❌ CRITICAL: Modernizr not loaded. Please ensure modernizr-custom.js loads before script.js');
    // Attempt graceful degradation
    window.Modernizr = {
        flexbox: true, // Assume modern browser
        cssgrid: true,
        csstransforms: true,
        localstorage: true
    };
}

// 2. MODERNIZR FEATURE DETECTION
// ================================================================
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
        mobile: Modernizr.touchevents,
        storage: Modernizr.localstorage,
        graphics: Modernizr.canvas && Modernizr.svg,
        multimedia: Modernizr.video && Modernizr.audio
    };
    
    console.log('📱 Browser Capability Assessment:', window.BROWSER_FEATURES);
} else {
    console.error('❌ Modernizr failed to load - using fallback detection');
    window.BROWSER_FEATURES = {
        modern: true, // Assume modern browser
        mobile: 'ontouchstart' in window,
        storage: true,
        graphics: true,
        multimedia: true
    };
}

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

// Mobile Navigation Toggle with ARIA support
document.addEventListener('DOMContentLoaded', function() {
    DEBUG.log('🔄 DOM Content Loaded - Initializing navigation');
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!navToggle) {
        DEBUG.error('Navigation toggle button not found');
        return;
    }
    
    if (!navMenu) {
        DEBUG.error('Navigation menu not found');
        return;
    }
    
    DEBUG.log('✅ Navigation elements found', { navToggle: !!navToggle, navMenu: !!navMenu });

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

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle Escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus(); // Return focus to toggle button
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling with Enhanced Accessibility
document.getElementById('contactForm').addEventListener('submit', function(e) {
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
        // Focus first error field
        const firstError = this.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
        // Announce errors to screen readers
        announceToScreenReader('Please correct the errors in the form');
        return;
    }
    
    // Simulate form submission (in a real implementation, you'd send this to a server)
    showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
    announceToScreenReader('Your message has been sent successfully');
    
    // Reset form
    this.reset();
});

// Helper function to show field errors
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const container = field.closest('.form-group');
    
    // Remove existing error
    const existingError = container.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.id = `${fieldName}-error`;
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    // Associate error with field
    field.setAttribute('aria-describedby', errorElement.id);
    
    container.appendChild(errorElement);
}

// Helper function to clear form errors
function clearFormErrors() {
    const errorFields = document.querySelectorAll('.error');
    const errorMessages = document.querySelectorAll('.error-message');
    
    errorFields.forEach(field => {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        field.removeAttribute('aria-describedby');
    });
    
    errorMessages.forEach(message => message.remove());
}

// Helper function to announce messages to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Accessible Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        border: 2px solid ${type === 'success' ? '#1e7e4a' : type === 'error' ? '#c0392b' : '#2980b9'};
    `;
    
    // Add close button styles
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 4px;
        margin-left: 10px;
        border-radius: 3px;
        min-width: 24px;
        min-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add focus styles for close button
    closeBtn.addEventListener('focus', () => {
        closeBtn.style.outline = '2px solid white';
        closeBtn.style.outlineOffset = '2px';
    });
    
    closeBtn.addEventListener('blur', () => {
        closeBtn.style.outline = 'none';
    });
    
    document.body.appendChild(notification);
    
    // Focus the notification for screen readers
    notification.focus();
    
    // Auto remove after 5 seconds
    const autoCloseTimer = setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoCloseTimer);
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Keyboard support for close button
    closeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeBtn.click();
        }
    });
}

// Add animation styles for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections for animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#2c3e50';
        header.style.backdropFilter = 'none';
    }
});

// Quick link button interactions
document.addEventListener('DOMContentLoaded', function() {
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
});

// Service request handling
function handleServiceRequest(type) {
    showNotification(`Service request for ${type} has been submitted. You will receive a confirmation email shortly.`, 'success');
}

// Emergency contact modal with accessibility features
function showEmergencyInfo() {
    const emergencyModal = document.createElement('div');
    emergencyModal.setAttribute('role', 'dialog');
    emergencyModal.setAttribute('aria-modal', 'true');
    emergencyModal.setAttribute('aria-labelledby', 'emergency-title');
    emergencyModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10001; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 2rem; border-radius: 10px; max-width: 400px; text-align: center; position: relative;">
                <h3 id="emergency-title" style="color: #e74c3c; margin-bottom: 1rem;">Emergency Contacts</h3>
                <div style="text-align: left; margin-bottom: 1rem;">
                    <p><strong>Emergency Services:</strong> <a href="tel:911" style="color: #e74c3c; text-decoration: none;">911</a></p>
                    <p><strong>Police (Non-Emergency):</strong> <a href="tel:5551234569" style="color: #3498db; text-decoration: none;">(555) 123-4569</a></p>
                    <p><strong>Fire Department:</strong> <a href="tel:5551234570" style="color: #3498db; text-decoration: none;">(555) 123-4570</a></p>
                    <p><strong>Public Works Emergency:</strong> <a href="tel:5551234571" style="color: #3498db; text-decoration: none;">(555) 123-4571</a></p>
                </div>
                <button id="emergency-close" style="margin-top: 1rem; padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; min-width: 44px; min-height: 44px;">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(emergencyModal);
    
    // Focus management
    const closeButton = emergencyModal.querySelector('#emergency-close');
    closeButton.focus();
    
    // Trap focus within modal
    const focusableElements = emergencyModal.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    emergencyModal.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
    
    function closeModal() {
        document.body.removeChild(emergencyModal);
        // Return focus to the element that opened the modal
        const emergencyButton = document.querySelector('[onclick*="showEmergencyInfo"]');
        if (emergencyButton) {
            emergencyButton.focus();
        }
    }
    
    closeButton.addEventListener('click', closeModal);
    
    // Close on backdrop click
    emergencyModal.addEventListener('click', function(e) {
        if (e.target === emergencyModal) {
            closeModal();
        }
    });
}

// Accessibility Statement Modal
document.addEventListener('DOMContentLoaded', function() {
    const accessibilityLink = document.querySelector('a[href="#accessibility-statement"]');
    if (accessibilityLink) {
        accessibilityLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAccessibilityStatement();
        });
    }
});

function showAccessibilityStatement() {
    const modal = document.createElement('div');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'accessibility-title');
    modal.className = 'accessibility-modal';
    
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
                    
                    <p style="margin-top: 1.5rem;"><small><em>This statement was last updated on ${new Date().toLocaleDateString()}.</em></small></p>
                </div>
                <button id="accessibility-close" style="margin-top: 1.5rem; padding: 12px 24px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; min-width: 44px; min-height: 44px; font-size: 16px;">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus management
    const closeButton = modal.querySelector('#accessibility-close');
    closeButton.focus();
    
    // Trap focus within modal
    const focusableElements = modal.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
    
    function closeModal() {
        document.body.removeChild(modal);
        // Return focus to the link that opened the modal
        const accessibilityLink = document.querySelector('a[href="#accessibility-statement"]');
        if (accessibilityLink) {
            accessibilityLink.focus();
        }
    }
    
    closeButton.addEventListener('click', closeModal);
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Enhanced accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        });
        
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }
});

// Skip to main content functionality
document.addEventListener('DOMContentLoaded', function() {
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
});

// Print functionality for meeting agendas
function printAgenda(meetingType) {
    showNotification(`${meetingType} agenda would be opened for printing in a real implementation.`, 'info');
}

// Search functionality (basic implementation)
function searchSite(query) {
    if (!query) return;
    
    const sections = document.querySelectorAll('section');
    let found = false;
    
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            section.scrollIntoView({ behavior: 'smooth' });
            found = true;
            return;
        }
    });
    
    if (!found) {
        showNotification(`No results found for "${query}". Try contacting us directly.`, 'info');
    }
}

// Emergency Alerts Functionality
function closeEmergencyAlert() {
    const alertBanner = document.getElementById('emergency-alerts');
    alertBanner.style.display = 'none';
    localStorage.setItem('alertDismissed', new Date().toISOString());
}

function showEmergencyAlert(message, level = 'warning') {
    const alertBanner = document.getElementById('emergency-alerts');
    const alertText = document.getElementById('alert-text');
    
    if (alertBanner && alertText) {
        alertText.textContent = message;
        alertBanner.style.display = 'block';
        alertBanner.className = `emergency-alerts alert-${level}`;
        
        // Update timestamp
        const timestamp = document.getElementById('alert-timestamp');
        if (timestamp) {
            timestamp.textContent = new Date().toLocaleString();
        }
        
        // Announce to screen readers
        alertBanner.setAttribute('aria-live', 'assertive');
    }
}

// Business Directory Search
function initBusinessDirectory() {
    const searchInput = document.getElementById('business-search');
    const categorySelect = document.getElementById('business-category');
    const businessCards = document.querySelectorAll('.business-card');
    
    function filterBusinesses() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCategory = categorySelect ? categorySelect.value.toLowerCase() : '';
        
        businessCards.forEach(card => {
            const businessName = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const businessCategory = card.querySelector('.business-category')?.textContent.toLowerCase() || '';
            const businessDescription = card.querySelector('.business-description')?.textContent.toLowerCase() || '';
            
            const matchesSearch = !searchTerm || 
                businessName.includes(searchTerm) || 
                businessDescription.includes(searchTerm);
            
            const matchesCategory = !selectedCategory || 
                businessCategory.includes(selectedCategory);
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                card.setAttribute('aria-hidden', 'false');
            } else {
                card.style.display = 'none';
                card.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Update results count for screen readers
        const visibleCards = Array.from(businessCards).filter(card => 
            card.style.display !== 'none'
        );
        
        const resultsAnnouncement = `${visibleCards.length} businesses found`;
        announceToScreenReader(resultsAnnouncement);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterBusinesses);
    }
    
    if (categorySelect) {
        categorySelect.addEventListener('change', filterBusinesses);
    }
    
    // Form submission handler
    const businessSearchForm = document.querySelector('.business-search-form');
    if (businessSearchForm) {
        businessSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            filterBusinesses();
        });
    }
}

// Cookie Consent Management
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    const hasConsent = localStorage.getItem('cookie-consent');
    
    if (!hasConsent && cookieConsent) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieConsent.style.display = 'block';
            cookieConsent.setAttribute('aria-hidden', 'false');
        }, 2000);
    }
}

function acceptAllCookies() {
    localStorage.setItem('cookie-consent', 'all');
    localStorage.setItem('analytics-consent', 'true');
    localStorage.setItem('preference-consent', 'true');
    hideCookieConsent();
    initializeAnalytics();
    showNotification('Cookie preferences saved. All cookies accepted.', 'success');
}

function declineNonEssential() {
    localStorage.setItem('cookie-consent', 'essential');
    localStorage.setItem('analytics-consent', 'false');
    localStorage.setItem('preference-consent', 'false');
    hideCookieConsent();
    showNotification('Cookie preferences saved. Only essential cookies accepted.', 'info');
}

function showCookieSettings() {
    // Scroll to privacy policy section where cookie controls are
    const privacySection = document.getElementById('privacy-policy');
    if (privacySection) {
        privacySection.scrollIntoView({ behavior: 'smooth' });
        hideCookieConsent();
    }
}

function hideCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    if (cookieConsent) {
        cookieConsent.style.display = 'none';
        cookieConsent.setAttribute('aria-hidden', 'true');
    }
}

function saveCookiePreferences() {
    const analyticsCookies = document.getElementById('analytics-cookies');
    const preferenceCookies = document.getElementById('preference-cookies');
    
    const analyticsEnabled = analyticsCookies ? analyticsCookies.checked : false;
    const preferencesEnabled = preferenceCookies ? preferenceCookies.checked : false;
    
    localStorage.setItem('analytics-consent', analyticsEnabled.toString());
    localStorage.setItem('preference-consent', preferencesEnabled.toString());
    localStorage.setItem('cookie-consent', 'custom');
    
    if (analyticsEnabled) {
        initializeAnalytics();
    }
    
    showNotification('Cookie preferences saved successfully.', 'success');
}

// Analytics Initialization (Privacy-compliant)
function initializeAnalytics() {
    if (localStorage.getItem('analytics-consent') === 'true') {
        // Placeholder for actual analytics implementation
        console.log('Analytics initialized with user consent');
        
        // Example: Initialize Google Analytics
        // gtag('config', 'GA_MEASUREMENT_ID', {
        //     anonymize_ip: true,
        //     cookie_flags: 'SameSite=Strict;Secure'
        // });
    }
}

// Enhanced Search Functionality
function initSiteSearch() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('site-search');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                performSiteSearch(query);
            }
        });
        
        // Search suggestions (basic implementation)
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        });
    }
}

function performSiteSearch(query) {
    const sections = document.querySelectorAll('section[id]');
    const results = [];
    
    sections.forEach(section => {
        const sectionTitle = section.querySelector('h2')?.textContent || '';
        const sectionContent = section.textContent.toLowerCase();
        
        if (sectionContent.includes(query.toLowerCase())) {
            results.push({
                title: sectionTitle,
                section: section,
                id: section.id
            });
        }
    });
    
    if (results.length > 0) {
        // Scroll to first result
        results[0].section.scrollIntoView({ behavior: 'smooth' });
        showNotification(`Found ${results.length} result(s) for "${query}". Navigated to first match.`, 'success');
        
        // Highlight search terms (basic implementation)
        highlightSearchTerms(query);
    } else {
        showNotification(`No results found for "${query}". Try using different keywords.`, 'info');
    }
}

function showSearchSuggestions(query) {
    // Simple search suggestions based on section titles and common terms
    const suggestions = [
        'utilities', 'permits', 'meetings', 'council', 'mayor',
        'business license', 'building permit', 'water bill',
        'trash pickup', 'recycling', 'town hall', 'contact',
        'emergency', 'calendar', 'news', 'documents'
    ];
    
    const matchingSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
    );
    
    // Implementation would show dropdown with suggestions
    console.log('Search suggestions:', matchingSuggestions);
}

function hideSearchSuggestions() {
    // Hide suggestions dropdown
    console.log('Hide search suggestions');
}

function highlightSearchTerms(query) {
    // Basic text highlighting implementation
    // In a real implementation, this would use a more sophisticated text highlighting library
    console.log(`Highlighting search terms: ${query}`);
}

// Newsletter and Alert Signup
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const alertSignupForm = document.querySelector('.alert-signup-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate signup process
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            }
        });
    }
    
    if (alertSignupForm) {
        alertSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const phone = this.querySelector('#alert-phone').value;
            const email = this.querySelector('#alert-email').value;
            
            if (phone || email) {
                showNotification('Successfully signed up for emergency alerts!', 'success');
                this.reset();
            } else {
                showNotification('Please provide at least one contact method.', 'warning');
            }
        });
    }
}

// Accessibility Features Enhancement
function initAccessibilityFeatures() {
    // Text size controls
    const textSizeButtons = document.querySelectorAll('.text-size-btn');
    textSizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const size = this.dataset.size;
            adjustTextSize(size);
            
            // Update active state
            textSizeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Contrast controls
    const contrastButtons = document.querySelectorAll('.contrast-btn');
    contrastButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contrast = this.dataset.contrast;
            adjustContrast(contrast);
            
            // Update active state
            contrastButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Language toggle
    const languageButtons = document.querySelectorAll('.lang-btn');
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            toggleLanguage(lang);
            
            // Update active state
            languageButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
        });
    });
    
    // Screen reader mode
    const screenReaderButton = document.getElementById('screen-reader-mode');
    if (screenReaderButton) {
        screenReaderButton.addEventListener('click', function() {
            toggleScreenReaderMode();
        });
    }
}

function adjustTextSize(size) {
    const sizes = {
        'small': '14px',
        'medium': '16px',
        'large': '18px',
        'extra-large': '20px'
    };
    
    document.documentElement.style.fontSize = sizes[size] || sizes.medium;
    localStorage.setItem('text-size', size);
    showNotification(`Text size changed to ${size}`, 'info');
}

function adjustContrast(contrast) {
    const body = document.body;
    
    // Remove existing contrast classes
    body.classList.remove('high-contrast', 'low-contrast');
    
    if (contrast === 'high') {
        body.classList.add('high-contrast');
    } else if (contrast === 'low') {
        body.classList.add('low-contrast');
    }
    
    localStorage.setItem('contrast-preference', contrast);
    showNotification(`Contrast changed to ${contrast}`, 'info');
}

function toggleLanguage(lang) {
    // Basic language toggle implementation
    console.log(`Language changed to: ${lang}`);
    
    if (lang === 'es') {
        // In a real implementation, this would load Spanish translations
        showNotification('Idioma cambiado a español (función de demostración)', 'info');
    } else {
        showNotification('Language changed to English', 'info');
    }
    
    localStorage.setItem('preferred-language', lang);
}

function toggleScreenReaderMode() {
    const body = document.body;
    const isActive = body.classList.contains('screen-reader-mode');
    
    if (isActive) {
        body.classList.remove('screen-reader-mode');
        showNotification('Screen reader mode disabled', 'info');
    } else {
        body.classList.add('screen-reader-mode');
        showNotification('Screen reader mode enabled - enhanced navigation active', 'info');
    }
}

// Utility function for screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Initialize all new functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBusinessDirectory();
    initCookieConsent();
    initSiteSearch();
    initNewsletterSignup();
    initAccessibilityFeatures();
    
    // Load saved preferences
    const savedTextSize = localStorage.getItem('text-size');
    if (savedTextSize) {
        adjustTextSize(savedTextSize);
        const textSizeButton = document.querySelector(`[data-size="${savedTextSize}"]`);
        if (textSizeButton) {
            textSizeButton.classList.add('active');
        }
    }
    
    const savedContrast = localStorage.getItem('contrast-preference');
    if (savedContrast) {
        adjustContrast(savedContrast);
        const contrastButton = document.querySelector(`[data-contrast="${savedContrast}"]`);
        if (contrastButton) {
            contrastButton.classList.add('active');
        }
    }
    
    // Check for emergency alerts on page load
    // In a real implementation, this would fetch from an API
    checkForEmergencyAlerts();
});

function checkForEmergencyAlerts() {
    // Simulate checking for emergency alerts
    // In a real implementation, this would make an API call
    const hasActiveAlert = false; // Would come from server
    
    if (hasActiveAlert) {
        showEmergencyAlert('Example: Road closure on Main Street due to construction. Use alternate routes.');
    }
}

// Mobile Navigation Toggle with ARIA support
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    // Add event listeners for inline handlers to fix CSP issues
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
    
    // Modal handling
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            // Focus the first focusable element in the modal
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }
        }
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    }
    
    // Handle modal close buttons
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Handle modal backdrop clicks
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Handle keyboard navigation for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="flex"]');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
    
    // Handle links that open modals
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            // Check if target is a modal
            if (targetElement && targetElement.classList.contains('modal')) {
                e.preventDefault();
                openModal(targetId);
                return;
            }
        }    });
});

// Initialize debug logging at page load
window.addEventListener('load', function() {
    DEBUG.checkAccessibility();
});
