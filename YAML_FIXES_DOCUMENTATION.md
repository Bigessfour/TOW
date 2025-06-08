# YAML Workflow Fixes Documentation
## GitHub Actions Quality Assurance and Release Workflows

### 🔧 Issues Identified and Fixed

#### 1. **YAML Syntax and Structure Issues**

**Problem**: Inconsistent indentation causing nested mapping errors
```yaml
# ❌ BEFORE (incorrect)
jobs:  accessibility-test:
  steps:
  - name: Checkout code
    uses: actions/checkout@v4
```

**Solution**: Fixed to proper 2-space indentation
```yaml
# ✅ AFTER (correct)
jobs:
  accessibility-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
```

#### 2. **Context Access Issues**

**Problem**: Invalid or inappropriate secret reference causing workflow warnings
```yaml
# ❌ BEFORE - May not provide all required permissions
env:
  LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

**Solution**: Use appropriate token based on requirements
```yaml
# ✅ AFTER - For basic Lighthouse CI functionality
env:
  LHCI_GITHUB_APP_TOKEN: ${{ secrets.GITHUB_TOKEN }}

# 🔧 ADVANCED - When custom app permissions needed
# Create a GitHub App with specific permissions and use:
# env:
#   LHCI_GITHUB_APP_TOKEN: ${{ secrets.LIGHTHOUSE_CI_TOKEN }}
```

**Note**: `GITHUB_TOKEN` provides sufficient permissions for most Lighthouse CI operations including:
- Reading repository content
- Posting status checks
- Creating comments on pull requests

For advanced features like custom status check contexts or enhanced GitHub App integrations, create a dedicated secret `LIGHTHOUSE_CI_TOKEN` with a GitHub App token.

#### 3. **Deprecated Actions**

**Problem**: Using deprecated `actions/create-release@v1`
```yaml
# ❌ BEFORE
- name: Create Release
  uses: actions/create-release@v1
```

**Solution**: Updated to modern `softprops/action-gh-release@v1`
```yaml
# ✅ AFTER
- name: Create Release
  uses: softprops/action-gh-release@v1
```

### 📋 Complete Fixes Applied

#### **QA Workflow (`.github/workflows/qa.yml`)**

1. **Fixed Indentation**: All steps now use consistent 2-space indentation
2. **Corrected Mapping Structure**: Fixed `jobs:` to proper YAML mapping format
3. **Updated Secret References**: Changed `LHCI_GITHUB_APP_TOKEN` to use `GITHUB_TOKEN`
4. **Improved Step Organization**: Each step properly aligned under parent keys

#### **Release Workflow (`.github/workflows/release.yml`)**

1. **Modernized Actions**: Replaced deprecated actions with current versions
2. **Streamlined Process**: Consolidated steps for better efficiency  
3. **Fixed File Paths**: Corrected archive creation and asset upload paths
4. **Enhanced Error Handling**: Added comprehensive conditional checks and error reporting

**Error Handling Examples:**
```yaml
# Conditional execution with proper error handling
- name: Create Release Archive
  run: |
    if [ ! -f "index.html" ]; then
      echo "❌ Error: index.html not found"
      exit 1
    fi
    zip -r release.zip . -x ".git/*" "node_modules/*" "*.md"
  continue-on-error: false

# Conditional release creation with validation
- name: Create GitHub Release
  uses: softprops/action-gh-release@v1
  if: startsWith(github.ref, 'refs/tags/')
  with:
    files: release.zip
    fail_on_unmatched_files: true
    draft: false
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

# Error reporting step
- name: Report Deployment Status
  if: failure()
  run: |
    echo "❌ Deployment failed at step: ${{ github.job }}"
    echo "📊 Workflow run: ${{ github.run_id }}"
    echo "🔗 View logs: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
```

### 🧪 Validation Implementation

#### **YAML Validation Script** (`validate-yaml.js`)
Enhanced script with semantic validation and error handling:
```javascript
const fs = require('fs');
const yaml = require('js-yaml');

// Comprehensive validation with semantic checks
function validateYamlFile(filePath) {
  let isValid = true;
  let errors = [];
  let warnings = [];

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const document = yaml.load(content);
    
    // Syntax validation
    console.log(`✅ ${filePath} syntax is valid`);
    
    // Semantic validation for GitHub Actions
    if (document && typeof document === 'object') {
      validateWorkflowStructure(document, errors, warnings);
      if (document.jobs) {
        validateJobs(document.jobs, errors, warnings);
      }
    }
    
    // Report findings
    if (errors.length > 0) {
      isValid = false;
      console.log(`❌ Semantic errors found:`);
      errors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (warnings.length > 0) {
      console.log(`⚠️ Warnings:`);
      warnings.forEach(warning => console.log(`  - ${warning}`));
    }
    
    return isValid;
  } catch (error) {
    console.log(`❌ ${filePath} has syntax errors:`);
    console.log(error.message);
    return false;
  }
}

// Validates workflow structure, action versions, secret references
function validateWorkflowStructure(document, errors, warnings) {
  // Check required fields, deprecated actions, secret patterns
  // Full implementation includes version checking and best practices
}
```

**Enhanced Features:**
- ✅ **Syntax Validation**: YAML parsing and structure verification
- ✅ **Semantic Validation**: GitHub Actions workflow structure
- ✅ **Version Checking**: Validates action versions against known good versions
- ✅ **Secret Validation**: Checks secret reference patterns and common issues
- ✅ **Deprecation Warnings**: Identifies outdated actions and practices
- ✅ **Best Practice Enforcement**: Workflow naming, structure guidelines

#### **Package.json Integration**
Added YAML validation to the test suite:
```json
{
  "scripts": {
    "test:yaml": "node validate-yaml.js",
    "validate": "html-validate index.html && stylelint styles.css && npm run test:yaml"
  }
}
```

### 🚀 Testing and Verification

#### **Pre-Commit Validation**
```bash
# Test all validations locally before commit
npm run validate
```

#### **CI/CD Pipeline Improvements**
- **Accessibility Testing**: Enhanced with both pa11y and axe-core
- **Performance Testing**: Lighthouse CI with strict thresholds
- **Security Scanning**: Trivy vulnerability detection
- **YAML Validation**: Prevents workflow syntax errors

### ✅ Validation Results

```
✅ .github/workflows/qa.yml syntax is valid
✅ .github/workflows/release.yml syntax is valid
🎉 All YAML files are valid!
```

### 📈 Benefits of the Fixes

#### **Reliability Improvements**
- **Zero YAML syntax errors** in workflow files
- **Consistent formatting** for better maintainability
- **Modern GitHub Actions** with active support
- **Proper secret handling** for security

#### **Developer Experience**
- **Local validation** before committing changes
- **Clear error messages** when issues occur
- **Automated testing** prevents broken workflows
- **Documentation** for future maintenance

#### **CI/CD Enhancements**
- **Faster execution** with optimized steps
- **Better error handling** and reporting
- **Comprehensive testing** coverage
- **Automated releases** with proper asset packaging

### 🔄 Ongoing Maintenance

#### **Monthly Tasks**
- Run `npm run validate` to check all configurations
- Update GitHub Actions to latest versions
- Review workflow performance and optimize as needed

#### **When Adding New Workflows**
1. Create the workflow file
2. Run `npm run test:yaml` to validate syntax
3. Test in a feature branch first
4. Monitor workflow execution logs

#### **Best Practices Established**
- **Always validate YAML** before committing
- **Use consistent indentation** (2 spaces)
- **Reference official GitHub Actions documentation**
- **Test workflows in feature branches**
- **Keep actions up to date** with dependabot

### 📞 Support and Resources

- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **YAML Specification**: https://yaml.org/spec/1.2/spec.html
- **Workflow Validation**: Use `npm run test:yaml` command
- **Issue Reporting**: Use GitHub Issues with the bug report template

---

*These fixes ensure the Town of Wiley website has robust, maintainable CI/CD workflows that support ongoing development and deployment.*
