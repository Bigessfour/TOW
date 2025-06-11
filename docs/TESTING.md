# Automated Testing Configuration

## Accessibility Testing (WCAG 2.1 Compliance)

### Pa11y Configuration

```json
{
  "standard": "WCAG2AA",
  "level": "AA",
  "ignore": [],
  "hideElements": ".cookie-banner",
  "includeNotices": false,
  "includeWarnings": true,
  "timeout": 30000,
  "wait": 3000,
  "chromeLaunchConfig": {
    "args": ["--no-sandbox", "--disable-setuid-sandbox"]
  },
  "actions": [
    "wait for element .main-content to be visible",
    "click element #accessibility-toggle",
    "wait for 2000"
  ]
}
```

### Axe-Core Configuration

```json
{
  "rules": {
    "color-contrast": { "enabled": true },
    "keyboard-navigation": { "enabled": true },
    "focus-order": { "enabled": true },
    "aria-labels": { "enabled": true },
    "heading-structure": { "enabled": true }
  },
  "tags": ["wcag2a", "wcag2aa", "section508"],
  "exclude": [".cookie-banner", ".dev-tools"]
}
```

## Performance Testing

### Lighthouse CI Configuration

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/"],
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "throttling": {
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 1.0 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### Web Vitals Monitoring

```javascript
// performance-monitor.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Replace with your analytics endpoint
  console.log('Performance metric:', metric);

  // Example: Send to Google Analytics
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    value: Math.round(metric.value),
    event_label: metric.id,
  });
}

// Measure all Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## Browser Compatibility Testing

### Supported Browsers

```yaml
browsers:
  - chrome: latest
  - firefox: latest
  - safari: latest
  - edge: latest
  - chrome: latest-2
  - firefox: latest-2
  mobile:
  - ios_safari: latest
  - chrome_android: latest
  - samsung_android: latest
```

### Cross-browser Test Suite

```javascript
// playwright.config.js
module.exports = {
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
};
```

## Security Testing

### OWASP ZAP Configuration

```yaml
# zap-baseline.yaml
target: 'http://localhost:3000'
include:
  - '/'
exclude:
  - '/admin'
  - '/test'
rules:
  10015: IGNORE # Private IP Disclosure
  10016: IGNORE # Web Browser XSS Protection Not Enabled
auth:
  method: 'form'
  loginUrl: '/login'
  username: 'test@example.com'
  password: 'testpassword'
```

### SSL/TLS Testing

```bash
#!/bin/bash
# ssl-test.sh

echo "Testing SSL/TLS Configuration..."

# Test with SSL Labs API
curl -s "https://api.ssllabs.com/api/v3/analyze?host=townofwiley.gov&publish=off&all=done" | jq '.endpoints[0].grade'

# Test certificate expiration
openssl s_client -connect townofwiley.gov:443 -servername townofwiley.gov 2>/dev/null | openssl x509 -noout -dates

# Test security headers
curl -I https://townofwiley.gov | grep -E "(Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options|X-XSS-Protection)"
```

## Content Validation

### HTML Validation

```json
{
  "rules": {
    "valid-lang": "error",
    "require-sri": "off",
    "no-trailing-whitespace": "error",
    "close-attr": "error",
    "element-permitted-content": "error",
    "element-required-attributes": "error",
    "no-dup-attr": "error",
    "no-dup-id": "error",
    "prefer-native-element": "error",
    "tel-non-breaking": "error"
  }
}
```

### Content Accessibility

```javascript
// content-accessibility-check.js
const checks = {
  images: () => {
    const images = document.querySelectorAll('img');
    return Array.from(images).every(
      img => img.hasAttribute('alt') && img.alt.trim() !== ''
    );
  },

  headings: () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let currentLevel = 0;
    return Array.from(headings).every(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > currentLevel + 1) return false;
      currentLevel = level;
      return true;
    });
  },

  forms: () => {
    const inputs = document.querySelectorAll('input, select, textarea');
    return Array.from(inputs).every(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      return label || input.hasAttribute('aria-label');
    });
  },
};

// Run all checks
Object.entries(checks).forEach(([name, check]) => {
  console.log(`${name}: ${check() ? 'PASS' : 'FAIL'}`);
});
```

## Continuous Integration

### GitHub Actions Workflow (Enhanced)

```yaml
name: Comprehensive Quality Assurance

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 6 * * 1' # Weekly Monday 6 AM

jobs:
  accessibility-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Start server
        run: npm run serve &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run accessibility tests
        run: |
          npx pa11y-ci --sitemap false --standard WCAG2AA http://localhost:3000
          npx axe-core-cli http://localhost:3000

      - name: Performance audit
        run: npx lighthouse-ci autorun

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run security scan
        uses: securecodewarrior/github-action-add-sarif@v1
        with:
          sarif-file: security-scan.sarif

      - name: OWASP ZAP Baseline Scan
        uses: zaproxy/action-baseline@v0.7.0
        with:
          target: 'http://localhost:3000'

  cross-browser-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install Playwright
        run: npx playwright install ${{ matrix.browser }}

      - name: Run cross-browser tests
        run: npx playwright test --project=${{ matrix.browser }}
```

## Monitoring and Alerts

### Performance Monitoring

```javascript
// real-user-monitoring.js
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Monitor Core Web Vitals
    this.observeMetrics();

    // Monitor errors
    window.addEventListener('error', this.logError.bind(this));
    window.addEventListener('unhandledrejection', this.logError.bind(this));
  }

  observeMetrics() {
    const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        this.recordMetric(entry.name, entry.value);
      });
    });

    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
  }

  recordMetric(name, value) {
    this.metrics[name] = value;

    // Send to monitoring service
    if (this.shouldReport(name, value)) {
      this.sendToMonitoring(name, value);
    }
  }

  shouldReport(name, value) {
    const thresholds = {
      'largest-contentful-paint': 2500,
      'first-input-delay': 100,
      'cumulative-layout-shift': 0.1,
    };

    return value > (thresholds[name] || Infinity);
  }

  sendToMonitoring(name, value) {
    fetch('/api/monitoring', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metric: name, value, timestamp: Date.now() }),
    });
  }
}

new PerformanceMonitor();
```

## Testing Schedule

### Automated (Continuous)

- **Every commit**: HTML validation, accessibility checks
- **Every pull request**: Full test suite, performance audit
- **Daily**: Security scan, uptime monitoring
- **Weekly**: Full cross-browser compatibility test
- **Monthly**: Comprehensive security audit

### Manual Testing Checklist

- [ ] Form submissions work correctly
- [ ] All links are functional
- [ ] Images load properly
- [ ] Responsive design works on actual devices
- [ ] Accessibility with real assistive technologies
- [ ] Content accuracy and spelling
- [ ] Emergency alert system functionality
- [ ] Search functionality works correctly
