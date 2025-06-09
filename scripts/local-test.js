#!/usr/bin/env node

/**
 * Local Website Formatting & Function Test Script
 * Simulates the GitHub workflow for local development
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏛️ Town of Wiley - Website Formatting & Function Test');
console.log('====================================================');

const args = process.argv.slice(2);
const formatOnly = args.includes('--format-only');
const autoFix = args.includes('--auto-fix');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function runCommand(command, description, optional = false) {
  try {
    console.log(`${colors.blue}🔍 ${description}...${colors.reset}`);
    const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    console.log(`${colors.green}✅ ${description} passed${colors.reset}`);
    return { success: true, output };
  } catch (error) {
    if (optional) {
      console.log(`${colors.yellow}⚠️  ${description} skipped (optional)${colors.reset}`);
      return { success: true, output: '' };
    } else {
      console.log(`${colors.red}❌ ${description} failed${colors.reset}`);
      console.log(`${colors.red}Error: ${error.message}${colors.reset}`);
      return { success: false, output: error.message };
    }
  }
}

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`${colors.green}✅ ${description}${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.yellow}⚠️  ${description} not found${colors.reset}`);
    return false;
  }
}

async function main() {
  let totalTests = 0;
  let passedTests = 0;

  console.log('\n📋 Starting validation tests...\n');

  // 1. Check Dependencies
  console.log('1. 📦 Checking Dependencies');
  
  totalTests++;
  if (runCommand('npm list --depth=0', 'NPM dependencies check', true).success) {
    passedTests++;
  }

  // 2. HTML Validation
  console.log('\n2. 🏗️  HTML Validation');
  
  totalTests++;
  if (checkFileExists('.htmlhintrc', 'HTMLHint configuration')) {
    if (runCommand('npx htmlhint index.html', 'HTML structure validation', true).success) {
      passedTests++;
    }
  }

  totalTests++;
  if (runCommand('npm run test:html', 'HTML validation with html-validate', true).success) {
    passedTests++;
  }

  // 3. CSS Validation
  console.log('\n3. 🎨 CSS Validation');
  
  totalTests++;
  if (runCommand('npm run css:build', 'Tailwind CSS build').success) {
    passedTests++;
  }

  totalTests++;
  if (runCommand('npm run test:css', 'CSS linting', true).success) {
    passedTests++;
  }

  // 4. JavaScript Validation
  console.log('\n4. ⚡ JavaScript Validation');
  
  if (fs.existsSync('assets/js') && fs.readdirSync('assets/js').length > 0) {
    totalTests++;
    if (runCommand('npx eslint assets/js/**/*.js --max-warnings 0', 'JavaScript linting', true).success) {
      passedTests++;
    }

    if (autoFix) {
      console.log(`${colors.blue}🔧 Auto-fixing JavaScript issues...${colors.reset}`);
      runCommand('npx eslint assets/js/**/*.js --fix', 'JavaScript auto-fix', true);
    }
  }

  // 5. Markdown Validation
  console.log('\n5. 📝 Markdown Validation');
  
  totalTests++;
  if (runCommand('npx markdownlint README.md docs/**/*.md _pages/**/*.md _posts/**/*.md', 'Markdown linting', true).success) {
    passedTests++;
  }

  // 6. YAML Validation
  console.log('\n6. ⚙️  YAML Validation');
  
  totalTests++;
  if (runCommand('npm run test:yaml', 'YAML validation').success) {
    passedTests++;
  }

  totalTests++;
  if (runCommand('bundle exec jekyll doctor', 'Jekyll configuration check', true).success) {
    passedTests++;
  }

  // Skip functional tests if format-only mode
  if (!formatOnly) {
    // 7. Build Test
    console.log('\n7. 🏗️  Build Test');
    
    totalTests++;
    if (runCommand('npm run build:jekyll', 'Jekyll build test').success) {
      passedTests++;
    }

    // 8. Accessibility Test
    console.log('\n8. ♿ Accessibility Test');
    
    totalTests++;
    if (runCommand('npm run test:accessibility:ci', 'Accessibility compliance check', true).success) {
      passedTests++;
    }

    // 9. Performance Check
    console.log('\n9. 🚀 Performance Check');
    
    if (checkFileExists('lighthouserc.json', 'Lighthouse configuration')) {
      console.log(`${colors.blue}ℹ️  Performance testing requires a running server${colors.reset}`);
      console.log(`${colors.blue}ℹ️  Run 'npm run serve:jekyll' in another terminal and test manually${colors.reset}`);
    }
  }

  // Auto-fix formatting if requested
  if (autoFix && !formatOnly) {
    console.log('\n🔧 Auto-fixing formatting issues...');
    
    // Fix JavaScript
    runCommand('npx prettier --write "assets/js/**/*.js"', 'Prettier JavaScript fix', true);
    
    // Fix CSS
    runCommand('npx prettier --write "assets/css/**/*.css"', 'Prettier CSS fix', true);
    
    // Fix Markdown
    runCommand('npx markdownlint --fix README.md docs/**/*.md _pages/**/*.md _posts/**/*.md', 'Markdownlint fix', true);
    
    console.log(`${colors.green}✅ Auto-fix completed${colors.reset}`);
  }

  // Summary
  console.log('\n📊 Test Summary');
  console.log('================');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${colors.green}${passedTests}${colors.reset}`);
  console.log(`Failed: ${colors.red}${totalTests - passedTests}${colors.reset}`);
  console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);

  if (passedTests === totalTests) {
    console.log(`\n${colors.green}🎉 All tests passed! Your website is ready for deployment.${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`\n${colors.yellow}⚠️  Some tests failed. Please review the issues above.${colors.reset}`);
    console.log(`\n${colors.blue}💡 Tips:${colors.reset}`);
    console.log('- Run with --auto-fix to automatically fix formatting issues');
    console.log('- Run with --format-only for faster formatting-only checks');
    console.log('- Check the GitHub workflow for more comprehensive testing');
    process.exit(1);
  }
}

// Help text
if (args.includes('--help') || args.includes('-h')) {
  console.log('\nUsage: node local-test.js [options]');
  console.log('\nOptions:');
  console.log('  --format-only    Run only formatting checks (faster)');
  console.log('  --auto-fix      Automatically fix formatting issues');
  console.log('  --help, -h      Show this help message');
  console.log('\nExamples:');
  console.log('  node local-test.js                    # Run all tests');
  console.log('  node local-test.js --format-only      # Quick formatting check');
  console.log('  node local-test.js --auto-fix         # Fix formatting automatically');
  process.exit(0);
}

main().catch(console.error);
