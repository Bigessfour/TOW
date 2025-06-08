# VS Code Debugging Guide for Town of Wiley Website

## Overview
This guide explains how to use the debugging features set up for the Town of Wiley website in VS Code.

## Debugging Configurations Available

### 1. **Launch Town of Wiley Website** (Default)
- Opens the website directly in Chrome from the file system
- Best for: Quick testing without a server
- URL: `file://...path.../index.html`

### 2. **Launch with Live Server**
- Uses Live Server extension for auto-reload
- Best for: Development with live changes
- URL: `http://127.0.0.1:5500/index.html`

### 3. **Debug Town Website (Edge)**
- Opens the website in Microsoft Edge
- Best for: Cross-browser testing
- URL: `file://...path.../index.html`

### 4. **Attach to Chrome**
- Attaches to an already running Chrome instance with debugging enabled
- Best for: Advanced debugging scenarios

## How to Use the Debug Button

### Step 1: Open Debug Panel
1. Click on the **Debug** icon in the VS Code Activity Bar (left side)
2. Or press `Ctrl+Shift+D`

### Step 2: Select Debug Configuration
1. At the top of the Debug panel, you'll see a dropdown
2. Select one of the configurations:
   - "Launch Town of Wiley Website" (recommended for beginners)
   - "Launch with Live Server" (recommended for development)

### Step 3: Start Debugging
1. Click the **green play button** (▶️) next to the configuration dropdown
2. Or press `F5`

## Setting Breakpoints in JavaScript

### In script.js:
1. Open `assets/js/script.js`
2. Click in the gutter (left of line numbers) to set a breakpoint
3. A red dot will appear indicating the breakpoint
4. Start debugging - execution will pause at breakpoints

### Example Breakpoint Locations:
```javascript
// Set breakpoint on these lines in script.js:
- Line with: document.addEventListener('DOMContentLoaded', ...)
- Lines inside event handlers
- Form submission functions
- Animation functions
```

## Debug Console
When debugging is active:
1. Use the **Debug Console** tab at the bottom
2. Type JavaScript expressions to evaluate
3. Inspect variables and DOM elements

### Useful Debug Console Commands:
```javascript
// Check if elements exist
document.querySelector('.header')

// Inspect form data
document.getElementById('contact-form')

// Check CSS styles
getComputedStyle(document.querySelector('.logo'))

// Test Tailwind classes
document.querySelector('.bg-gray-800')
```

## Live Server Features

### Auto-Reload
- Changes to HTML, CSS, or JS files automatically reload the browser
- No need to manually refresh

### Mobile Testing
- Access from other devices on your network
- URL will be displayed in the terminal (e.g., `http://192.168.1.100:5500`)

## Tasks Integration

### Available Tasks (Ctrl+Shift+P → "Tasks: Run Task"):

1. **Open Town Website**
   - Opens website in default browser
   - Quick preview without debugging

2. **Start Live Server**
   - Starts development server on port 5500
   - Background task with auto-reload

3. **Start Chrome with Debug Port**
   - Opens Chrome with remote debugging enabled
   - Allows "Attach to Chrome" debugging

4. **Validate HTML**
   - Runs HTML validation
   - Checks for errors and accessibility issues

## Debugging Workflow Recommendations

### For Development:
1. Use "Launch with Live Server" configuration
2. Set breakpoints in JavaScript files
3. Make changes and see them live
4. Use Debug Console for testing

### For Testing:
1. Use "Launch Town of Wiley Website" for quick tests
2. Use "Debug Town Website (Edge)" for cross-browser testing
3. Run validation tasks regularly

### For Advanced Debugging:
1. Start Chrome with debug port (use task)
2. Use "Attach to Chrome" configuration
3. Access Chrome DevTools alongside VS Code debugging

## Troubleshooting

### Chrome/Edge Won't Launch:
- Ensure browsers are installed
- Try running as administrator
- Check Windows Defender/antivirus settings

### Live Server Not Working:
- Ensure Live Server extension is installed
- Check if port 5500 is available
- Try different port in settings.json

### Breakpoints Not Hit:
- Ensure source maps are enabled
- Check that the correct file is being debugged
- Verify breakpoints are set in executed code paths

### JavaScript Errors:
- Check Browser Console (F12) for additional errors
- Verify Tailwind CSS is loading properly
- Check for typos in class names or selectors

## Browser DevTools Integration

### While debugging, you can also use:
1. **Chrome DevTools** (F12)
   - Elements panel for DOM inspection
   - Console for JavaScript
   - Network tab for resource loading
   - Lighthouse for performance/accessibility

2. **VS Code Debug Features**
   - Variables panel
   - Call stack
   - Watch expressions
   - Debug console

## Accessibility Testing During Debug

### Run these commands in Debug Console:
```javascript
// Check ARIA labels
document.querySelectorAll('[aria-label]')

// Find missing alt text
document.querySelectorAll('img:not([alt])')

// Check heading hierarchy
document.querySelectorAll('h1, h2, h3, h4, h5, h6')

// Test keyboard navigation
document.activeElement
```

## Performance Monitoring

### Use Debug Console:
```javascript
// Check page load time
performance.now()

// Monitor resource loading
performance.getEntriesByType('resource')

// Check Tailwind CSS loading
document.querySelector('script[src*="tailwind"]')
```

This debugging setup provides comprehensive tools for developing, testing, and maintaining the Town of Wiley website with proper ADA compliance and modern web standards.
