# File Organization Update - Town of Wiley Website

**Date:** June 7, 2025  
**Purpose:** Complete file organization audit and dependency cross-reference update

## Current Project Structure

```
Town of Wiley/
├── .git/                           # Git repository
├── .github/                        # GitHub configuration
│   └── copilot-instructions.md     # AI coding instructions
├── .gitignore                      # Git ignore rules
├── .lighthouseci/                  # Lighthouse CI configuration
├── .nojekyll                       # GitHub Pages Jekyll bypass
├── .stylelintrc.json              # CSS linting configuration
├── .vscode/                       # VS Code workspace settings
│   ├── launch.json                # Debug configurations
│   ├── settings.json              # Editor settings
│   └── tasks.json                 # Task definitions
├── assets/                        # Static assets
│   ├── css/
│   │   └── styles.css             # Main stylesheet (Tailwind + custom)
│   ├── images/
│   │   └── logo.png               # Town logo
│   └── js/
│       ├── modernizr-custom.js    # Custom Modernizr build
│       └── script.js              # Main JavaScript functionality
├── docs/                          # Project documentation
│   ├── AGENTIC_WORKFLOW_IMPLEMENTATION.md
│   ├── AGENTIC_WORKFLOW_SETUP_COMPLETE.md
│   ├── AGENTIC_WORKFLOW_SUCCESS.md
│   ├── CHANGELOG.md
│   ├── COMMUNITY_ENGAGEMENT.md
│   ├── CONTRIBUTING.md
│   ├── COPILOT_AGENT_GUIDE.md
│   ├── CSS_FIXES_REPORT.md
│   ├── DEBUG_GUIDE.md
│   ├── DEBUG_SETUP_COMPLETE.md
│   ├── DEPENDENCIES_TRACKING.md
│   ├── DEPLOYMENT.md
│   ├── FILE_ORGANIZATION.md
│   ├── FILE_ORGANIZATION_COMPLETE.md
│   ├── FILE_ORGANIZATION_UPDATE.md  # This file
│   ├── FINAL_DEPLOYMENT_FIXES.md
│   ├── FINAL_SUCCESS_REPORT.md
│   ├── FINAL_VALIDATION_REPORT.md
│   ├── GITHUB_PAGES_SETUP.md
│   ├── GITHUB_SETUP.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── QA_FIXES_SUMMARY.md
│   ├── SECURITY_AUDIT.md
│   ├── TESTING.md
│   ├── VALIDATION_REPORT.md
│   └── YAML_FIXES_DOCUMENTATION.md
├── node_modules/                  # NPM dependencies (auto-generated)
├── scripts/                       # Automation scripts
│   ├── fix-css-final.js
│   ├── fix-nodejs-path.ps1
│   ├── setup-copilot-agent.ps1
│   ├── setup-git.bat
│   ├── setup-nodejs.bat
│   └── validate-yaml.js
├── index.html                     # Main website file
├── lighthouserc.json              # Lighthouse CI configuration
├── manifest.json                  # PWA manifest
├── modernizr-config.json          # Modernizr build configuration
├── package.json                   # NPM package configuration
├── package-lock.json              # NPM dependency lock
├── README.md                      # Project documentation
└── validate-yaml.ps1              # YAML validation script
```

## File Dependencies Cross-Reference

### Core HTML File
- **index.html** → Dependencies:
  - `assets/css/styles.css` (main stylesheet)
  - `assets/js/modernizr-custom.js` (feature detection)
  - `assets/js/script.js` (main functionality)
  - `assets/images/logo.png` (town logo)
  - `manifest.json` (PWA manifest)
  - External: Google Fonts, Tailwind CDN

### CSS Dependencies
- **assets/css/styles.css** → Referenced by:
  - `index.html` (main stylesheet link)
  - `package.json` (stylelint testing)
  - `.vscode/tasks.json` (CSS validation)

### JavaScript Dependencies
- **assets/js/script.js** → Dependencies:
  - `assets/js/modernizr-custom.js` (feature detection)
  - Referenced by: `index.html`
- **assets/js/modernizr-custom.js** → Generated from:
  - `modernizr-config.json` (build configuration)
  - `package.json` (build scripts)

### Configuration Dependencies
- **package.json** → References:
  - All devDependencies for testing/building
  - Scripts reference: `modernizr-config.json`, `scripts/validate-yaml.js`
  - Main entry: `index.html`
- **modernizr-config.json** → Used by:
  - `package.json` (modernizr:build script)
  - Generates: `assets/js/modernizr-custom.js`

### VS Code Configuration
- **.vscode/launch.json** → References:
  - `index.html` (debug entry point)
  - Live Server configurations
- **.vscode/tasks.json** → References:
  - `index.html` (validation targets)
  - `assets/css/styles.css` (CSS validation)
  - `package.json` scripts

### Documentation Dependencies
- **README.md** → References:
  - `package.json` (installation instructions)
  - `docs/` directory (documentation links)
  - `.vscode/` configurations
- **docs/*.md** → Cross-reference each other and main project files

## Asset Organization

### Images
- **assets/images/logo.png**
  - Used in: `index.html` (header logo)
  - Format: PNG (optimized for web)
  - Alt text: "Town of Wiley Official Logo"

### CSS Architecture
- **assets/css/styles.css**
  - Includes: Custom CSS + Tailwind overrides
  - Responsive design with mobile-first approach
  - ADA compliance styling
  - Government color scheme

### JavaScript Architecture
- **assets/js/modernizr-custom.js**
  - Purpose: Feature detection for cross-browser compatibility
  - Generated from: `modernizr-config.json`
  - Size: ~15KB (optimized build)
- **assets/js/script.js**
  - Purpose: Main site functionality
  - Features: Form validation, navigation, accessibility
  - Dependencies: Modernizr for feature detection

## Build and Development Dependencies

### NPM Scripts Organization
```json
"scripts": {
  // Development
  "start": "live-server --port=3000 --entry-file=index.html",
  "dev": "live-server --port=5500 --entry-file=index.html --open",
  "debug": "live-server --port=5500 --entry-file=index.html --wait=500",
  
  // Agentic Workflow
  "agent:start": "npm run build && npm run dev",
  "agent:debug": "npm run debug",
  "workflow:init": "npm run build && npm run agent:start",
  
  // Building
  "build": "npm run modernizr:build",
  "modernizr:build": "npx modernizr -c modernizr-config.json -d assets/js/modernizr-custom.js",
  
  // Testing & Validation
  "test": "npm run test:html && npm run test:css && npm run test:yaml && npm run test:accessibility:ci",
  "test:html": "html-validate index.html",
  "test:css": "stylelint assets/css/styles.css",
  "test:yaml": "node scripts/validate-yaml.js",
  "test:modernizr": "node -e \"...check modernizr build...\"",
  "validate:all": "npm run validate && npm run test:modernizr",
  
  // Accessibility & Performance
  "test:accessibility": "pa11y http://localhost:3000 --standard WCAG2AA",
  "test:lighthouse": "lhci autorun",
  "accessibility-audit": "pa11y-ci --standard WCAG2AA --threshold 0 index.html",
  
  // Deployment
  "deploy": "gh-pages -d ."
}
```

### DevDependencies Cross-Reference
```json
"devDependencies": {
  "@axe-core/cli": "^4.8.0",        // Accessibility testing
  "@lhci/cli": "^0.12.0",           // Lighthouse CI
  "axe-core": "^4.8.0",             // Accessibility core
  "css-validator": "^0.11.0",       // CSS validation
  "gh-pages": "^6.0.0",             // GitHub Pages deployment
  "html-validate": "^8.0.0",        // HTML validation
  "js-yaml": "^4.1.0",              // YAML parsing (scripts/validate-yaml.js)
  "lighthouse": "^11.0.0",          // Performance testing
  "live-server": "^1.2.2",          // Development server
  "modernizr": "^3.13.1",           // Feature detection build
  "pa11y": "^6.2.3",                // Accessibility testing
  "pa11y-ci": "^3.0.1",             // Accessibility CI
  "stylelint": "^15.0.0",           // CSS linting
  "stylelint-config-standard": "^34.0.0" // CSS linting rules
}
```

## File Validation Status

### ✅ Properly Organized Files
- All assets in `assets/` subdirectories
- Documentation in `docs/` directory
- Scripts in `scripts/` directory
- VS Code config in `.vscode/` directory
- GitHub config in `.github/` directory

### ✅ Proper Dependencies
- All JavaScript files properly referenced in `index.html`
- CSS file properly linked
- Modernizr build configured and generated
- Package.json scripts reference correct files

### ✅ Cross-Referenced Files
- Documentation files reference each other
- README.md references all major components
- VS Code tasks reference correct files
- Build scripts use correct paths

## Recommendations

1. **File Organization**: ✅ Complete - all files properly categorized
2. **Dependencies**: ✅ Complete - all cross-references validated
3. **Build Process**: ✅ Complete - automated with npm scripts
4. **Documentation**: ✅ Complete - comprehensive documentation

## Next Steps

1. Regular dependency audits with `npm audit`
2. Update documentation when adding new features
3. Maintain cross-references when moving files
4. Use agentic workflow scripts for development

---

**Status**: File organization and dependencies are fully up to date and properly cross-referenced.
