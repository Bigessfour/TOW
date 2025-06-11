# Dependencies & Cross-References Tracking - UPDATED June 7, 2025

## 📋 Master Dependency List (Current State)

### 1. **Core Application Files**

#### `index.html` (Main Entry Point) ✅ VERIFIED

- **Dependencies:**
  - `assets/css/styles.css` - Main stylesheet with Tailwind overrides
  - `assets/js/modernizr-custom.js` - Custom feature detection build (MUST load
    first)
  - `assets/js/script.js` - Main functionality with accessibility features
  - `assets/images/logo.png` - Town logo (referenced in header)
  - `manifest.json` - PWA configuration
  - Tailwind CSS (CDN) - Utility-first CSS framework
  - Google Fonts (CDN) - Open Sans typography
- **File Size:** 1,315 lines (well-organized structure)
- **Load Order:** Critical CSS → Modernizr → Main JS

#### `assets/js/script.js` (Main JavaScript) ✅ VERIFIED

- **Dependencies:**
  - `assets/js/modernizr-custom.js` (feature detection - must load first)
  - Browser APIs: DOM, localStorage, console, IntersectionObserver
- **Provides:**
  - Debug utilities (`window.DEBUG`)
  - Accessibility checking functions (`checkAccessibility()`)
  - Navigation functionality (mobile menu, smooth scroll)
  - Modernizr feature detection logging
  - Form validation and modal controls
- **Features:** Modern ES6+ syntax, accessibility-first design

#### `assets/js/modernizr-custom.js` (Feature Detection) ✅ VERIFIED

- **Generated From:** `modernizr-config.json`
- **Built Via:** `npm run modernizr:build`
- **Version:** 3.13.1 (optimized custom build)
- **Size:** ~15KB (minimized for performance)
- **Features Detected:** 15+ critical web APIs including:
  - CSS Grid, Flexbox, Custom Properties
  - Touch events, Geolocation, Local Storage
  - Service Workers, WebP support

### 2. **Configuration Files**

#### `package.json` (Package Management) ✅ UPDATED

- **Production Dependencies:** None (static site architecture)
- **Dev Dependencies (Latest Versions):**
  ```json
  {
    "@axe-core/cli": "^4.8.0", // Accessibility CLI testing
    "@lhci/cli": "^0.12.0", // Lighthouse CI automation
    "axe-core": "^4.8.0", // Accessibility testing core
    "css-validator": "^0.11.0", // CSS validation
    "gh-pages": "^6.0.0", // GitHub Pages deployment
    "html-validate": "^8.0.0", // HTML validation & linting
    "js-yaml": "^4.1.0", // YAML parsing (for scripts)
    "lighthouse": "^11.0.0", // Performance & best practices
    "live-server": "^1.2.2", // Development server with live reload
    "modernizr": "^3.13.1", // Feature detection build tool
    "pa11y": "^6.2.3", // Accessibility testing
    "pa11y-ci": "^3.0.1", // Accessibility CI/CD
    "stylelint": "^15.0.0", // CSS linting & formatting
    "stylelint-config-standard": "^34.0.0" // CSS linting standard rules
  }
  ```

#### `modernizr-config.json` (Feature Detection Config)

- **Purpose:** Defines which features to detect
- **Generates:** `assets/js/modernizr-custom.js`
- **Features:** CSS Grid, Flexbox, Touch Events, Storage APIs, Canvas, etc.

#### `.vscode/launch.json` (Debug Configuration)

- **Configurations:**
  1. Chrome Debug (port 9222)
  2. Edge Debug
  3. Live Server Debug
  4. Attach to Chrome
- **Dependencies:** Chrome/Edge browsers, Live Server

#### `.vscode/tasks.json` (Automated Tasks)

- **Tasks:**
  1. Start Live Server
  2. Chrome with Debug Port
  3. Validation Scripts
  4. Open Website
- **Dependencies:** PowerShell, NPM scripts

#### `.github/copilot-instructions.md` (AI Configuration)

- **Purpose:** GitHub Copilot agent instructions
- **Influences:** All AI-generated code suggestions
- **Standards:** ADA compliance, Tailwind CSS, Government requirements

### 3. **Documentation Files Dependencies**

#### Required Reading Order for Developers:

1. `README.md` - Project overview and setup
2. `docs/FILE_ORGANIZATION.md` - This file
3. `docs/DEBUG_GUIDE.md` - Development debugging
4. `docs/AGENTIC_WORKFLOW_SUCCESS.md` - Implementation status
5. `.github/copilot-instructions.md` - AI agent configuration

#### Documentation Cross-References:

```
README.md
├── References: package.json scripts
├── Links to: docs/DEBUG_GUIDE.md
└── Mentions: .vscode/ configurations

DEBUG_GUIDE.md
├── References: .vscode/launch.json
├── References: .vscode/tasks.json
└── Cross-references: package.json scripts

AGENTIC_WORKFLOW_SUCCESS.md
├── Status of: All implementation files
├── References: modernizr-config.json
└── Links to: All .vscode/ files
```

## 🔗 Critical Load Order Dependencies

### 1. **HTML Load Sequence**

```
1. HTML structure
2. <meta> tags and CSP headers
3. Tailwind CSS (CDN) - CRITICAL
4. Google Fonts (preconnected) - OPTIONAL
5. modernizr-custom.js - CRITICAL (must load before script.js)
6. styles.css - CRITICAL
7. script.js - CRITICAL (depends on Modernizr)
```

### 2. **JavaScript Execution Order**

```
1. Modernizr feature detection (immediate)
2. Debug utilities initialization (DOMContentLoaded)
3. Navigation setup (DOMContentLoaded)
4. Accessibility checks (after page load)
5. Form validation setup (after page load)
```

### 3. **Development Workflow Dependencies**

```
Developer
├── VS Code (with extensions)
├── GitHub Copilot (with instructions)
├── Node.js (with npm packages)
├── Live Server (port 5500)
├── Chrome/Edge (with debug port)
└── Git (with repository)
```

## 🛠️ Build Dependencies & Scripts

### NPM Script Dependencies:

```bash
# Core Workflow Scripts
npm run modernizr:build     # Requires: modernizr package, modernizr-config.json
npm run agent:start         # Requires: live-server, VS Code
npm run dev                 # Requires: live-server package
npm run debug               # Requires: live-server, browser debugging

# Testing Scripts
npm run test:modernizr      # Requires: Node.js, modernizr-custom.js
npm run test:accessibility  # Requires: pa11y, running server
npm run validate:all        # Requires: html-validate, stylelint, yaml validator

# Advanced Scripts
npm run workflow:init       # Requires: ALL development dependencies
npm run full-audit          # Requires: lighthouse, pa11y, security tools
```

### File Generation Dependencies:

```
modernizr-config.json
    ↓ (npm run modernizr:build)
assets/js/modernizr-custom.js
    ↓ (referenced in index.html)
Browser Feature Detection
    ↓ (logged by script.js)
Development Console Output
```

## 🔧 Environment Dependencies

### Development Environment Requirements:

- **Operating System:** Windows 11 (PowerShell commands)
- **Node.js:** v16+ (for npm packages)
- **Git:** Latest (for version control)
- **VS Code:** Latest (with extensions)
- **Chrome/Edge:** Latest (for debugging)

### VS Code Extensions Required:

1. **GitHub Copilot** - AI assistance
2. **JavaScript Debugger (Nightly)** - Enhanced debugging
3. **Live Server** - Development server
4. **HTML Validate** (Optional) - HTML validation
5. **Stylelint** (Optional) - CSS validation

### Browser Requirements:

- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Feature Support:** ES6+, CSS Grid, Flexbox
- **Debug Capability:** Remote debugging port support

## 🔄 Update & Maintenance Dependencies

### When Adding New Features:

1. Update `modernizr-config.json` (if new web APIs needed)
2. Run `npm run modernizr:rebuild`
3. Update `script.js` (for new functionality)
4. Update `.github/copilot-instructions.md` (for AI guidance)
5. Test with `npm run validate:all`
6. Update documentation files

### When Updating Dependencies:

1. Update `package.json`
2. Run `npm install`
3. Test `npm run workflow:init`
4. Update VS Code configurations if needed
5. Update documentation

### Regular Maintenance:

- Weekly: `npm audit` for security updates
- Monthly: Dependency version updates
- Quarterly: Browser compatibility testing
- Annually: ADA compliance review

---

## 📊 Dependency Health Status

### ✅ All Dependencies Current (June 7, 2025)

- **Modernizr:** 3.13.1 (latest)
- **Live Server:** 1.2.2 (stable)
- **All Testing Tools:** Current versions
- **VS Code Extensions:** Installed and active
- **Documentation:** Complete and synchronized

### 🔧 Next Maintenance: July 1, 2025

- Dependency security audit
- Browser compatibility review
- Documentation updates
