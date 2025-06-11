# Website Formatting & Function Workflow Guide

This GitHub workflow is designed to ensure your Town of Wiley website maintains
high standards for formatting, functionality, and government compliance.

## Workflow Features

### 🎨 Code Formatting & Style Validation

- **HTML**: Structure validation, semantic markup, and accessibility compliance
- **CSS**: Tailwind CSS formatting, unused class detection, and best practices
- **JavaScript**: ESLint validation, formatting checks, and code quality
- **Markdown**: Consistent formatting for documentation and content pages
- **YAML**: Configuration file validation for Jekyll and GitHub Actions

### 🧪 Functionality Testing

- **Contact Forms**: Validation and submission testing
- **Navigation**: Link checking and responsive menu functionality
- **Responsive Design**: Mobile-first testing across device sizes
- **JavaScript Features**: Interactive element testing and error detection
- **Performance**: Core Web Vitals and loading speed analysis
- **SEO**: Meta tags, structured data, and search optimization

### 🏛️ Government Compliance

- **ADA Compliance**: WCAG 2.1 AA accessibility standards
- **Required Pages**: Contact, accessibility, privacy, services verification
- **Public Information**: Meeting schedules and government transparency
- **Contact Validation**: Official contact information accuracy

## How to Use

### Automatic Triggers

The workflow runs automatically on:

- Push to `main` or `develop` branches
- Pull requests to `main`
- Changes to website files (HTML, CSS, JS, Markdown, assets)

### Manual Execution

You can also run the workflow manually:

1. Go to **Actions** tab in your repository
2. Select **Website Formatting & Function Validation**
3. Click **Run workflow**
4. Choose options:
   - **Format only**: Run only formatting checks (faster)
   - **Auto-fix formatting**: Automatically fix formatting issues

### Workflow Options

#### Format Only Mode

```yaml
format_only: true
```

- Runs only formatting and style validation
- Skips functional testing and compliance checks
- Faster execution for quick code reviews

#### Auto-Fix Formatting

```yaml
fix_formatting: true
```

- Automatically fixes formatting issues
- Commits changes back to the repository
- Uses Prettier, ESLint, and other tools

## Understanding Results

### ✅ Success Indicators

- All formatting checks pass
- Website functions correctly
- Government compliance requirements met
- No accessibility violations

### ❌ Common Issues and Fixes

#### HTML Issues

```html
<!-- ❌ Missing alt text -->
<img src="town-hall.jpg" />

<!-- ✅ Proper alt text -->
<img src="town-hall.jpg" alt="Town Hall building entrance" />
```

#### CSS Issues

```css
/* ❌ Unused or inefficient CSS */
.unused-class { color: red; }

/* ✅ Use Tailwind utilities */
<div class="text-red-500">Error message</div>
```

#### JavaScript Issues

```javascript
// ❌ Console logs left in production
console.log('Debug message');

// ✅ Clean production code
// Remove debug statements before deployment
```

#### Accessibility Issues

```html
<!-- ❌ Missing ARIA labels -->
<button onclick="toggleMenu()">☰</button>

<!-- ✅ Proper ARIA labels -->
<button onclick="toggleMenu()" aria-label="Toggle navigation menu">☰</button>
```

## Workflow Jobs Breakdown

### 1. Formatting Validation

- Checks code style and formatting
- Validates file structure
- Reports syntax errors

### 2. Functional Testing

- Tests website functionality
- Validates user interactions
- Checks performance metrics

### 3. Compliance Check

- Ensures ADA compliance
- Validates government requirements
- Checks required content

### 4. Report Generation

- Creates comprehensive report
- Comments on pull requests
- Archives test results

## Configuration Files

The workflow uses several configuration files:

- `.htmlhintrc` - HTML validation rules
- `.prettierrc` - Code formatting standards
- `.eslintrc.json` - JavaScript quality rules
- `.jshintrc` - JavaScript backup linting
- `.markdownlint.json` - Markdown formatting rules

## Best Practices

### Before Committing

1. Run local formatting checks: `npm run validate`
2. Test changes locally: `npm run dev`
3. Check accessibility: `npm run test:accessibility`

### Pull Request Guidelines

1. Ensure workflow passes
2. Review automated formatting fixes
3. Address any compliance issues
4. Test on mobile devices

### Maintenance Schedule

- **Daily**: Monitor workflow results
- **Weekly**: Review performance metrics
- **Monthly**: Update dependencies and tools
- **Quarterly**: Full accessibility audit

## Troubleshooting

### Common Workflow Failures

#### Node.js Version Issues

Update your Node.js version in the workflow:

```yaml
uses: actions/setup-node@v4
with:
  node-version: '18'
```

#### Dependency Installation Failures

Clear npm cache and reinstall:

```bash
npm ci --cache /tmp/empty-cache
```

#### Ruby/Jekyll Issues

Update Ruby version:

```yaml
uses: ruby/setup-ruby@v1
with:
  ruby-version: '3.2'
```

### Getting Help

1. **Check workflow logs**: Review failed job details
2. **Local testing**: Run commands locally first
3. **Documentation**: Refer to tool-specific docs
4. **Issues**: Create GitHub issue with workflow logs

## Integration with Existing Workflows

This workflow complements your existing CI/CD pipeline:

- **CI/CD Pipeline**: Handles deployment and security
- **Formatting Workflow**: Focuses on code quality and compliance
- **Content Monitoring**: Tracks content changes
- **Security Monitoring**: Handles security scans

## Performance Impact

### Timing Estimates

- **Format only**: 2-3 minutes
- **Full workflow**: 8-12 minutes
- **With auto-fix**: 3-5 minutes

### Resource Usage

- **Minimal**: Uses GitHub's standard runners
- **Parallel**: Jobs run concurrently when possible
- **Cached**: Dependencies are cached for speed

---

## Quick Reference

### Manual Workflow Commands

```bash
# Local formatting check
npm run validate:all

# Build and test
npm run build && npm run test

# Start development server
npm run dev:jekyll

# Run accessibility test
npm run test:accessibility
```

### Workflow File Location

`.github/workflows/website-formatting-and-function.yml`

### Last Updated

This workflow was created to maintain the Town of Wiley website's professional
standards and government compliance requirements.
