// ================================================================
// TOWN OF WILEY - CONSOLIDATED JAVASCRIPT
// ================================================================
// Version: 2.0.0 - Consolidated DOMContentLoaded handlers
// Dependencies: modernizr-custom.js (MUST load first)
// Purpose: Main functionality with single initialization point
// ================================================================

// 1. DEPENDENCY VERIFICATION
// ================================================================
// console.log('🏛️ Initializing Town of Wiley (consolidated version)...');

// Check critical dependencies
const dependencies = {
  modernizr: typeof Modernizr !== 'undefined',
  dom: typeof document !== 'undefined',
  console: typeof console !== 'undefined',
  localStorage: typeof localStorage !== 'undefined',
};

// console.log('🔍 Dependency Check:', dependencies);

// Verify Modernizr is loaded first (critical dependency)
if (!dependencies.modernizr) {
  DEBUG.error(
    '⚠️ Modernizr not detected at startup, attempting delayed detection...',
  );
  // Attempt graceful degradation
  window.Modernizr = {
    flexbox: true, // Assume modern browser
    cssgrid: true,
    csstransforms: true,
    localstorage: true,
  };
} else {
  //   console.log('✅ Modernizr loaded successfully at startup');
}

// 2. MODERNIZR FEATURE DETECTION
// ================================================================
// Delayed check for Modernizr (it might load after this script initially runs)
setTimeout(function () {
  if (typeof Modernizr !== 'undefined') {
    // console.log('🔧 Modernizr loaded successfully. Detected features:', {
    //   flexbox: Modernizr.flexbox,
    //   cssgrid: Modernizr.cssgrid,
    //   csstransforms: Modernizr.csstransforms,
    //   csstransitions: Modernizr.csstransitions,
    //   touchevents: Modernizr.touchevents,
    //   localstorage: Modernizr.localstorage,
    //   canvas: Modernizr.canvas,
    //   svg: Modernizr.svg,
    //   video: Modernizr.video,
    //   audio: Modernizr.audio,
    //   webgl: Modernizr.webgl,
    //   websockets: Modernizr.websockets,
    //   serviceworker: Modernizr.serviceworker,
    //   cssanimations: Modernizr.cssanimations,
    // });
    // Store feature detection results for later use
    window.BROWSER_FEATURES = {
      modern: Modernizr.flexbox && Modernizr.cssgrid,
      mobile: Modernizr.touchevents || 'ontouchstart' in window,
      storage: Modernizr.localstorage || true,
      graphics: (Modernizr.canvas && Modernizr.svg) || true,
      multimedia: (Modernizr.video && Modernizr.audio) || true,
    };

    // DEBUG.log('📱 Browser Capability Assessment:', window.BROWSER_FEATURES);
  } else {
    DEBUG.log('ℹ️ Modernizr not available - using fallback detection');
    window.BROWSER_FEATURES = {
      modern: true, // Assume modern browser
      mobile: 'ontouchstart' in window,
      storage: true,
      graphics: true,
      multimedia: true,
    };
  }
}, 100); // Small delay to allow Modernizr to load

// 3. DEBUG UTILITIES
// ================================================================
window.DEBUG = window.DEBUG || {
  enabled:
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1',
  log: function (message, data = null) {
    /* eslint-disable-next-line no-console */
    if (this.enabled) {
      console.log(`🏛️ [Town of Wiley Debug] ${message}`, data || '');
    }
  },
  error: function (message, error = null) {
    /* eslint-disable-next-line no-console */
    if (this.enabled) {
      console.error(`🚨 [Town of Wiley Error] ${message}`, error || '');
    }
  },
  checkAccessibility: function () {
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
      const inputsWithoutLabels = document.querySelectorAll(
        'input:not([aria-label]):not([aria-labelledby])',
      );
      const inputsWithoutLabelsCount = Array.from(inputsWithoutLabels).filter(
        input => {
          const label = document.querySelector(`label[for="${input.id}"]`);
          return !label;
        },
      ).length;

      if (inputsWithoutLabelsCount > 0) {
        issues.push(
          `${inputsWithoutLabelsCount} form inputs missing proper labels`,
        );
      }

      if (issues.length === 0) {
        this.log('✅ Basic accessibility checks passed');
      } else {
        this.error('Accessibility issues found:', issues);
      }

      return issues;
    }
  },
};
const DEBUG = window.DEBUG;

// Initialize debug logging
DEBUG.log('🚀 Town of Wiley website JavaScript loaded');
DEBUG.log(
  '📱 Tailwind CSS detected:',
  !!window.tailwind ||
    document.querySelector('script[src*="tailwind"]') !== null,
);

// ================================================================
// CONSOLIDATED DOM INITIALIZATION
// ================================================================
// Single DOMContentLoaded handler to prevent conflicts and ensure proper initialization order

document.addEventListener('DOMContentLoaded', function () {
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

  navToggle.addEventListener('click', function () {
    const isExpanded = navMenu.classList.contains('active');
    DEBUG.log(
      `📱 Navigation toggle clicked - Currently expanded: ${isExpanded}`,
    );

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
  navToggle.addEventListener('keydown', function (e) {
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
  document.addEventListener('click', function (e) {
    const isClickInsideNav =
      navMenu.contains(e.target) || navToggle.contains(e.target);

    if (!isClickInsideNav && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
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
          behavior: 'smooth',
        });
      }
    });
  });
}

// ================================================================
// CONTACT FORM INITIALIZATION
// ================================================================
/**
 * Initializes the contact form by attaching validation and submission handling.
 * - Validates required fields (name, email, subject, message) with specific error messages.
 * - Validates email format.
 * - Displays error messages and focuses the first invalid field for accessibility.
 * - On successful validation, simulates form submission, shows a notification, and resets the form.
 * - Logs debug information throughout the process.
 *
 * Dependencies:
 * - DEBUG.log: Function for logging debug messages.
 * - clearFormErrors: Function to clear previous error states from the form.
 * - showFieldError: Function to display error messages for specific fields.
 * - isValidEmail: Function to validate email format.
 * - showNotification: Function to display notifications to the user.
 *
 * @function
 * @returns {void}
 */
function initContactForm() {
  DEBUG.log('🔄 Initializing contact form');

  const contactFormElement = document.getElementById('quickContactForm');
  if (!contactFormElement) {
    DEBUG.log('ℹ️ Contact form not found on this page');
    return;
  }

  DEBUG.log('✅ Contact form found');

  contactFormElement.addEventListener('submit', function (e) {
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
    showNotification(
      'Thank you for your message. We will respond within 2 business days.',
      'success',
    );
    this.reset();
  });
}

// ================================================================
// SCROLL ANIMATIONS
// ================================================================
function initScrollAnimations() {
  DEBUG.log('🔄 Initializing scroll animations');

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    },
  );

  // Observe sections for animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Header scroll effect
  window.addEventListener('scroll', function () {
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
/**
 * Initializes event listeners for quick link buttons on the page.
 * When a button within a quick-link card is clicked, checks if the card title
 * matches specific services (e.g., "Pay Utilities" or "Permits"). If so, prevents
 * the default action and displays an informational notification instead of navigating.
 *
 * Relies on the presence of a global `DEBUG` object for logging and a `showNotification`
 * function for displaying messages to the user.
 */
function initQuickLinks() {
  DEBUG.log('🔄 Initializing quick links');

  const quickLinkButtons = document.querySelectorAll('.quick-link-card .btn');

  quickLinkButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      // For demo purposes, show notification for external services
      const cardTitle =
        this.closest('.quick-link-card').querySelector('h3').textContent;

      if (
        cardTitle.includes('Pay Utilities') ||
        cardTitle.includes('Permits')
      ) {
        e.preventDefault();
        showNotification(
          `${cardTitle} portal would open in a real implementation. Contact town hall for assistance.`,
          'info',
        );
      }
    });
  });
}

// ================================================================
// ACCESSIBILITY FEATURES
// ================================================================
function initAccessibilityModal() {
  DEBUG.log('🔄 Initializing accessibility modal');

  const accessibilityLink = document.querySelector(
    'a[href="#accessibility-statement"]',
  );
  if (accessibilityLink) {
    accessibilityLink.addEventListener('click', function (e) {
      e.preventDefault();
      showAccessibilityStatement();
    });
  }
}

function initSkipLinks() {
  DEBUG.log('🔄 Initializing skip links');

  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
        // Remove tabindex after focus to avoid affecting normal tab order
        mainContent.addEventListener(
          'blur',
          function () {
            mainContent.removeAttribute('tabindex');
          },
          { once: true },
        );
      }
    });
  }
}

function initKeyboardSupport() {
  DEBUG.log('🔄 Initializing keyboard support');

  // Enhance all buttons with keyboard support
  const buttons = document.querySelectorAll(
    'button:not([type="submit"]):not(.notification-close)',
  );
  buttons.forEach(button => {
    button.addEventListener('keydown', function (e) {
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
    const textSizeButton = document.querySelector(
      `[data-size="${savedTextSize}"]`,
    );
    if (textSizeButton) {
      textSizeButton.classList.add('active');
    }
  }

  // Load saved contrast preference
  const savedContrast = localStorage.getItem('contrast-preference');
  if (savedContrast) {
    adjustContrast(savedContrast);
    const contrastButton = document.querySelector(
      `[data-contrast="${savedContrast}"]`,
    );
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
    showEmergencyAlert(
      'Example: Road closure on Main Street due to construction. Use alternate routes.',
    );
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

  const declineNonEssentialBtn = document.getElementById(
    'decline-non-essential',
  );
  if (declineNonEssentialBtn) {
    declineNonEssentialBtn.addEventListener('click', declineNonEssential);
  }
}

// ================================================================
// GOVERNMENT WEBSITE SPECIFIC FUNCTIONALITY
// ================================================================

// Government Website Enhancement Class
/**
 * GovernmentWebsiteEnhancements
 * 
 * A comprehensive utility class designed to enhance government websites with modern UI/UX features,
 * accessibility improvements, and interactive components. This class provides:
 * 
 * - An accessible notification system for government alerts.
 * - Enhanced contact form validation and submission handling.
 * - Interactive service card navigation and keyboard accessibility.
 * - Scroll-triggered animations for government content sections.
 * - Accessibility enhancements including skip links, ARIA landmarks, navigation announcements, and focus management.
 * - Public API for smooth scrolling to sections with accessibility announcements.
 * 
 * Usage:
 *   const governmentEnhancements = new GovernmentWebsiteEnhancements();
 * 
 * @class
 */
class GovernmentWebsiteEnhancements {
  constructor() {
    this.notificationSystem = null;
    this.init();
  }

  init() {
    DEBUG.log('🏛️ Initializing Government Website Enhancements...');
    this.setupNotificationSystem();
    this.enhanceContactForms();
    this.setupServiceCardInteractions();
    this.setupScrollAnimations();
    this.enhanceAccessibility();
    DEBUG.log('✅ Government Website Enhancements initialized');
  }

  // Enhanced Notification System for Government Alerts
  setupNotificationSystem() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
      const container = document.createElement('div');
      container.id = 'notification-container';
      container.className = 'fixed top-4 right-4 z-50 space-y-2';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }
    this.notificationSystem = document.getElementById('notification-container');
  }

  showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    const id = 'notification-' + Date.now();
    notification.id = id;

    const typeClasses = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-black',
      info: 'bg-blue-500 text-white',
    };

    notification.className = `max-w-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full opacity-0 ${
      typeClasses[type] || typeClasses.info
    }`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');

    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="flex-1 mr-3">${message}</span>
        <button
          type="button"
          class="flex-shrink-0 p-1 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded"
          onclick="governmentEnhancements.hideNotification('${id}')"
          aria-label="Close notification"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    `;

    this.notificationSystem.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full', 'opacity-0');
    }, 100);

    // Auto-hide
    if (duration > 0) {
      setTimeout(() => {
        this.hideNotification(id);
      }, duration);
    }

    DEBUG.log(`📢 Government notification shown: ${type} - ${message}`);
  }

  hideNotification(id) {
    const notification = document.getElementById(id);
    if (notification) {
      notification.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }

  // Enhanced Contact Form Validation for Government Forms
  enhanceContactForms() {
    const forms = document.querySelectorAll(
      'form[id*="contact"], form[id*="government"], form[id*="service"]',
    );

    forms.forEach(form => {
      DEBUG.log(`📝 Enhancing government form: ${form.id || 'unnamed'}`);

      // Add real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateFormField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            this.validateFormField(input);
          }
        });
      });

      // Enhanced form submission
      form.addEventListener('submit', e => {
        e.preventDefault();
        this.handleGovernmentFormSubmission(form);
      });
    });
  }

  validateFormField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (required && !value) {
      isValid = false;
      errorMessage = `${this.getFieldLabel(field)} is required`;
    }
    // Email validation
    else if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
    // Phone validation
    else if (type === 'tel' && value && !/^[\d\s\-\(\)\+\.]{10,}$/.test(value.replace(/\s/g, ''))) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
    // Text length validation
    else if ((type === 'text' || field.tagName === 'TEXTAREA') && value && value.length < 2) {
      isValid = false;
      errorMessage = `${this.getFieldLabel(field)} must be at least 2 characters`;
    }

    this.updateFieldValidation(field, isValid, errorMessage);
    return isValid;
  }

  getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : field.name || 'This field';
  }

  updateFieldValidation(field, isValid, errorMessage) {
    // Remove existing error styling
    field.classList.remove('error', 'border-red-500', 'border-green-500');

    // Find or create error message element
    let errorElement = document.getElementById(`${field.id}-error`);
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = `${field.id}-error`;
      errorElement.className = 'text-red-600 text-sm mt-1';
      errorElement.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorElement);
    }

    if (isValid) {
      field.classList.add('border-green-500');
      field.setAttribute('aria-invalid', 'false');
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    } else {
      field.classList.add('error', 'border-red-500');
      field.setAttribute('aria-invalid', 'true');
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
    }
  }

  handleGovernmentFormSubmission(form) {
    DEBUG.log('🏛️ Processing government form submission...');

    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateFormField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      // Focus first error field
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.focus();
        this.showNotification('Please correct the errors in the form', 'error');
      }
      return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    submitButton.textContent = 'Processing...';

    // Simulate government form processing
    setTimeout(() => {
      // Reset form
      form.reset();
      inputs.forEach(input => {
        input.classList.remove('error', 'border-red-500', 'border-green-500');
        input.setAttribute('aria-invalid', 'false');
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
          errorElement.style.display = 'none';
        }
      });

      // Reset button
      submitButton.disabled = false;
      submitButton.classList.remove('loading');
      submitButton.textContent = originalText;

      // Success notification
      this.showNotification('Your message has been sent successfully! We will respond within 1-2 business days.', 'success');

      DEBUG.log('✅ Government form submitted successfully');
    }, 2000);
  }

  // Service Card Interactions for Government Services
  setupServiceCardInteractions() {
    const serviceCards = document.querySelectorAll('.service-card, [class*="service"]');

    serviceCards.forEach(card => {
      // Make cards focusable and interactive
      if (!card.hasAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
      }

      // Keyboard navigation
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const link = card.querySelector('a, .service-link');
          if (link) {
            link.click();
            DEBUG.log(`🔗 Service card activated: ${link.textContent || link.href}`);
          }
        }
      });

      // Enhanced hover effects with announcements
      card.addEventListener('mouseenter', () => {
        const title = card.querySelector('h2, h3, .service-title, .news-title');
        if (title) {
          card.setAttribute('aria-label', `${title.textContent} - Press Enter to access`);
        }
      });
    });
  }

  // Scroll Animations for Government Content
  setupScrollAnimations() {
    if (!window.IntersectionObserver) {
      DEBUG.log('⚠️ IntersectionObserver not supported, skipping animations');
      return;
    }

    const animatedElements = document.querySelectorAll('.hero, .services, .government, .news, .contact, section');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          // Announce section changes to screen readers
          const heading = entry.target.querySelector('h1, h2, h3');
          if (heading) {
            this.announceToScreenReader(`Entering ${heading.textContent} section`);
          }
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    });

    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });

    // CSS for animation
    const style = document.createElement('style');
    style.textContent = `
      .animate-fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Enhanced Accessibility for Government Website
  enhanceAccessibility() {
    // Add skip links if they don't exist
    this.addSkipLinks();

    // Enhance navigation announcements
    this.enhanceNavigationAnnouncements();

    // Add landmark roles
    this.addLandmarkRoles();

    // Setup focus management
    this.setupFocusManagement();
  }

  addSkipLinks() {
    if (document.querySelector('.skip-link')) return;

    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50';
    skipLink.textContent = 'Skip to main content';
    skipLink.addEventListener('click', e => {
      e.preventDefault();
      const mainContent = document.getElementById('main-content') || document.querySelector('main');
      if (mainContent) {
        mainContent.focus();
        mainContent.scrollIntoView({ behavior: 'smooth' });
      }
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  enhanceNavigationAnnouncements() {
    const navLinks = document.querySelectorAll('nav a, .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const destination = link.textContent.trim();
        this.announceToScreenReader(`Navigating to ${destination}`);
      });
    });
  }

  addLandmarkRoles() {
    // Add main role if missing
    const main = document.querySelector('main');
    if (main && !main.hasAttribute('role')) {
      main.setAttribute('role', 'main');
    }

    // Add navigation roles
    const navs = document.querySelectorAll('nav');
    navs.forEach(nav => {
      if (!nav.hasAttribute('role')) {
        nav.setAttribute('role', 'navigation');
      }
    });

    // Add banner role to header
    const header = document.querySelector('header');
    if (header && !header.hasAttribute('role')) {
      header.setAttribute('role', 'banner');
    }

    // Add contentinfo role to footer
    const footer = document.querySelector('footer');
    if (footer && !footer.hasAttribute('role')) {
      footer.setAttribute('role', 'contentinfo');
    }
  }

  setupFocusManagement() {
    // Trap focus in modals
    document.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('.modal:not(.hidden)');
        if (modal) {
          const focusableElements = modal.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  announceToScreenReader(message) {
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

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Public API for external use
  scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      targetElement.focus();
      this.announceToScreenReader(`Navigated to ${sectionId} section`);
    }
  }
}

// Initialize Government Website Enhancements
let governmentEnhancements;
document.addEventListener('DOMContentLoaded', () => {
  governmentEnhancements = new GovernmentWebsiteEnhancements();

  // Make available globally for external use
  window.GovernmentWebsite = {
    showNotification: (message, type, duration) => governmentEnhancements.showNotification(message, type, duration),
    scrollToSection: (sectionId) => governmentEnhancements.scrollToSection(sectionId),
    announceToScreenReader: (message) => governmentEnhancements.announceToScreenReader(message),
  };
});

// Initialize government features
let governmentFeatures;

document.addEventListener('DOMContentLoaded', function() {
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

  // Initialize government-specific features
  governmentFeatures = new GovernmentWebsiteFeatures();
    
  // Add government notification functionality to global scope
  window.showGovernmentNotification = (message, type, duration) => {
    if (governmentFeatures) {
      governmentFeatures.showGovernmentNotification(message, type, duration);
    }
  };
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GovernmentWebsiteFeatures };
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
  const field =
    document.getElementById(fieldName) ||
    document.querySelector(`[name="${fieldName}"]`);
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
window.addEventListener('load', function () {
  DEBUG.checkAccessibility();
  DEBUG.log('🎉 Town of Wiley website fully loaded and initialized');
});

// Government Website Specific Features
class GovernmentWebsiteFeatures {
  constructor() {
    this.setupEmergencyAlerts();
    this.setupGovernmentFormValidation();
    this.setupAccessibilityEnhancements();
    this.setupNotificationSystem();
  }

  // Emergency Alert System for Government Communications
  setupEmergencyAlerts() {
    const alertBanner = document.getElementById('emergency-alerts');
    const alertText = document.getElementById('alert-text');
    const closeBtn = document.getElementById('alert-close-btn');
        
    if (!alertBanner) return;

    // Check for emergency alerts (could be from API or local storage)
    this.checkEmergencyAlerts();
        
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.hideEmergencyAlert();
      });
    }

    // Auto-refresh emergency alerts every 5 minutes
    setInterval(() => this.checkEmergencyAlerts(), 300000);
  }

  checkEmergencyAlerts() {
    // In a real implementation, this would check an API
    // For now, simulate checking for alerts
    const mockAlerts = this.getMockEmergencyAlerts();
        
    if (mockAlerts.length > 0) {
      this.showEmergencyAlert(mockAlerts[0]);
    } else {
      this.hideEmergencyAlert();
    }
  }

  getMockEmergencyAlerts() {
    // Simulate emergency alerts - in production, this would come from a CMS or API
    const currentHour = new Date().getHours();
        
    // Show mock alert during certain hours for demonstration
    if (currentHour >= 9 && currentHour <= 17) {
      return [
        {
          type: 'info',
          title: 'City Hall Hours',
          message: 'City Hall is open Monday-Friday 8:00 AM to 5:00 PM. Saturday 9:00 AM to 1:00 PM.',
        },
      ];
    }
        
    return [];
  }

  showEmergencyAlert(alert) {
    const alertBanner = document.getElementById('emergency-alerts');
    const alertText = document.getElementById('alert-text');
        
    if (alertBanner && alertText) {
      alertText.textContent = alert.message;
      alertBanner.style.display = 'block';
      alertBanner.setAttribute('aria-hidden', 'false');
            
      // Announce to screen readers
      this.announceToScreenReader(`Emergency alert: ${alert.message}`);
    }
  }

  hideEmergencyAlert() {
    const alertBanner = document.getElementById('emergency-alerts');
    if (alertBanner) {
      alertBanner.style.display = 'none';
      alertBanner.setAttribute('aria-hidden', 'true');
    }
  }

  // Enhanced form validation for government forms
  setupGovernmentFormValidation() {
    const forms = document.querySelectorAll('form[data-government-form]');
        
    forms.forEach(form => {
      this.enhanceGovernmentForm(form);
    });
  }

  enhanceGovernmentForm(form) {
    // Add ARIA labels and descriptions
    const inputs = form.querySelectorAll('input, textarea, select');
        
    inputs.forEach(input => {
      // Add government-specific validation
      if (input.type === 'email') {
        input.setAttribute('aria-describedby', input.id + '-gov-help');
        this.addGovernmentEmailValidation(input);
      }
            
      if (input.type === 'tel') {
        this.addPhoneValidation(input);
      }
            
      // Add real-time validation feedback
      input.addEventListener('blur', () => {
        this.validateGovernmentField(input);
      });
    });
  }

  addGovernmentEmailValidation(emailInput) {
    emailInput.addEventListener('input', () => {
      const value = emailInput.value.trim();
      const isValid = this.isValidGovernmentEmail(value);
            
      if (value && !isValid) {
        this.showFieldError(emailInput, 'Please enter a valid email address');
      } else {
        this.clearFieldError(emailInput);
      }
    });
  }

  isValidGovernmentEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  addPhoneValidation(phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // Format phone number as user types
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
      }
      e.target.value = value;
    });
  }

  validateGovernmentField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Government-specific validation rules
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = `${this.getFieldLabel(field)} is required for government services`;
    } else if (field.type === 'email' && value && !this.isValidGovernmentEmail(value)) {
      isValid = false;
      errorMessage = 'Please provide a valid email address for official correspondence';
    }

    if (isValid) {
      this.clearFieldError(field);
    } else {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : 'This field';
  }

  showFieldError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
        
    let errorElement = document.getElementById(field.id + '-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = field.id + '-error';
      errorElement.className = 'error-message';
      errorElement.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorElement);
    }
        
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

  clearFieldError(field) {
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
        
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  // Enhanced accessibility features for government websites
  setupAccessibilityEnhancements() {
    this.addSkipLinks();
    this.enhanceKeyboardNavigation();
    this.setupHighContrastMode();
    this.addScreenReaderAnnouncements();
  }

  addSkipLinks() {
    // Skip links are already in the HTML, but enhance them
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
      link.addEventListener('focus', () => {
        link.style.transform = 'translateY(0)';
      });
            
      link.addEventListener('blur', () => {
        link.style.transform = 'translateY(-100%)';
      });
    });
  }

  enhanceKeyboardNavigation() {
    // Enhance tab navigation for complex components
    const serviceCards = document.querySelectorAll('.service-card, .quick-link');
        
    serviceCards.forEach(card => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
            
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const link = card.querySelector('a');
          if (link) {
            link.click();
          }
        }
      });
    });
  }

  setupHighContrastMode() {
    // Add high contrast mode toggle
    const contrastToggle = document.createElement('button');
    contrastToggle.textContent = 'High Contrast';
    contrastToggle.className = 'contrast-toggle';
    contrastToggle.setAttribute('aria-label', 'Toggle high contrast mode');
        
    contrastToggle.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isHighContrast = document.body.classList.contains('high-contrast');
      contrastToggle.textContent = isHighContrast ? 'Normal Contrast' : 'High Contrast';
            
      // Save preference
      localStorage.setItem('highContrast', isHighContrast);
    });
        
    // Add to header
    const header = document.querySelector('header .container');
    if (header) {
      header.appendChild(contrastToggle);
    }
        
    // Restore saved preference
    if (localStorage.getItem('highContrast') === 'true') {
      document.body.classList.add('high-contrast');
      contrastToggle.textContent = 'Normal Contrast';
    }
  }

  addScreenReaderAnnouncements() {
    // Announce page changes to screen readers
    const sections = document.querySelectorAll('section[id]');
        
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.querySelector('h1, h2')?.textContent || 
                                       entry.target.getAttribute('aria-label') || 
                                       'Section';
          this.announceToScreenReader(`Now viewing: ${sectionName}`);
        }
      });
    }, { threshold: 0.5 });
        
    sections.forEach(section => observer.observe(section));
  }

  // Notification system for government communications
  setupNotificationSystem() {
    this.createNotificationContainer();
  }

  createNotificationContainer() {
    if (document.getElementById('govt-notifications')) return;
        
    const container = document.createElement('div');
    container.id = 'govt-notifications';
    container.className = 'notification-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  showGovernmentNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('govt-notifications');
    if (!container) return;
        
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
    container.appendChild(notification);
        
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      this.hideNotification(notification);
    });
        
    // Auto-hide
    setTimeout(() => {
      this.hideNotification(notification);
    }, duration);
        
    // Announce to screen readers
    this.announceToScreenReader(message);
  }

  hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
        
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Utility method for screen reader announcements
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
        
    announcement.textContent = message;
    document.body.appendChild(announcement);
        
    setTimeout(() => {
      if (announcement.parentNode) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }
}

// Initialize government features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GovernmentWebsiteFeatures();
});

/**
 * Displays an accessible notification message.
 * @param {string} message - The notification text.
 * @param {string} type - 'success' | 'error' | 'info'
 */
function showNotification(message, type = 'info') {
  // Remove any existing notification
  const old = document.getElementById('notification');
  if (old) old.remove();

  // Create notification container
  const notification = document.createElement('div');
  notification.id = 'notification';
  notification.setAttribute('role', 'status');
  notification.setAttribute('aria-live', 'polite');
  notification.tabIndex = 0;

  // Tailwind classes for different types
  const baseClasses = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded shadow-lg text-center max-w-xs outline-none';
  let typeClasses = '';
  if (type === 'success') typeClasses = 'bg-green-600 text-white';
  else if (type === 'error') typeClasses = 'bg-red-600 text-white';
  else typeClasses = 'bg-blue-600 text-white';

  notification.className = `${baseClasses} ${typeClasses}`;
  notification.textContent = message;

  document.body.appendChild(notification);
  notification.focus();

  // Remove after 4 seconds
  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// Check town status and show notification
const isTownOpen = true; // This would be determined by your business logic

if (isTownOpen) {
  showNotification('Town offices are open today!', 'success');
} else {
  showNotification('Town offices are closed today.', 'error');
}
