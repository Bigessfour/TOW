# Deployment Guide for Town of Wiley Website

This guide covers deploying the Town of Wiley website to your GitHub repository at `https://github.com/Bigessfour/TOW`.

## 🚀 Initial Repository Setup

### 1. Initialize Git Repository
```bash
cd "c:\Users\biges\Desktop\Town of Wiley"
git init
git add .
git commit -m "Initial commit: Complete Town of Wiley website implementation"
```

### 2. Connect to GitHub Repository
```bash
git remote add origin https://github.com/Bigessfour/TOW.git
git branch -M main
git push -u origin main
```

## 📋 Repository Structure

Your repository will contain:
```
TOW/
├── index.html                    # Main website
├── styles.css                    # All styling
├── script.js                     # JavaScript functionality
├── README.md                     # Project documentation
├── CONTRIBUTING.md               # Contribution guidelines
├── package.json                  # Development dependencies
├── lighthouserc.json            # Lighthouse CI configuration
├── .gitignore                   # Git ignore rules
├── .github/
│   ├── workflows/
│   │   └── qa.yml               # GitHub Actions workflow
│   └── copilot-instructions.md  # Development guidelines
└── .vscode/
    └── tasks.json               # VS Code tasks
```

## 🌐 GitHub Pages Setup

### Enable GitHub Pages
1. Go to your repository: `https://github.com/Bigessfour/TOW`
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

Your website will be available at:
`https://bigessfour.github.io/TOW/`

### Custom Domain (Optional)
If you have a custom domain (e.g., `townofwiley.gov`):
1. Add a `CNAME` file with your domain name
2. Configure DNS records with your domain provider
3. Update the workflow file to use your domain

## 🔧 Development Workflow

### Local Development
```bash
# Install development tools
npm install

# Start local development server
npm start

# Run accessibility tests
npm run test:accessibility

# Validate HTML/CSS
npm run validate
```

### Making Changes
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ... edit files ...

# Test changes
npm test

# Commit changes
git add .
git commit -m "Add: Description of changes"

# Push to GitHub
git push origin feature/your-feature-name
```

### Automated Testing
The repository includes GitHub Actions that automatically:
- ✅ Validate HTML and CSS
- ✅ Test accessibility compliance (WCAG 2.1 AA)
- ✅ Run Lighthouse performance audits
- ✅ Deploy preview versions for pull requests
- ✅ Deploy to production on main branch updates

## 🔐 Security & Compliance

### Secrets Configuration
Add these secrets in GitHub repository settings:
- `LHCI_GITHUB_APP_TOKEN` - For Lighthouse CI (optional)

### Branch Protection
Consider enabling branch protection rules:
1. Go to **Settings** > **Branches**
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews
   - Require status checks to pass
   - Require up-to-date branches

## 📊 Monitoring & Analytics

### Performance Monitoring
- Lighthouse CI runs on every push
- Performance scores tracked over time
- Accessibility compliance verified

### Analytics Setup
To add Google Analytics:
1. Get your tracking ID
2. Replace placeholder code in `script.js`
3. Ensure privacy compliance settings

## 🚨 Emergency Updates

For urgent updates (security, emergency alerts):
```bash
# Quick hotfix workflow
git checkout main
git pull origin main
git checkout -b hotfix/emergency-update

# Make minimal necessary changes
# ... edit files ...

git add .
git commit -m "Hotfix: Emergency update description"
git push origin hotfix/emergency-update

# Create pull request and merge immediately
# Or push directly to main if critical
```

## 📱 Mobile Testing

Test on various devices:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Various screen sizes

Use browser dev tools for responsive testing.

## ♿ Accessibility Maintenance

Regular accessibility checks:
```bash
# Run accessibility audit
npm run accessibility-audit

# Test with screen readers
# Use NVDA, JAWS, or VoiceOver

# Validate keyboard navigation
# Tab through entire site

# Check color contrast
# Use online contrast checkers
```

## 🔄 Update Process

### Regular Updates
1. Review and update content monthly
2. Check for security vulnerabilities
3. Update emergency contact information
4. Refresh business directory listings
5. Update meeting schedules and calendars

### Version Control
Use semantic versioning for releases:
- `v1.0.0` - Initial release
- `v1.1.0` - New features
- `v1.0.1` - Bug fixes

## 📞 Support

For deployment issues:
- Check GitHub Actions logs
- Review the contributing guidelines
- Create GitHub issues for bugs
- Contact: webmaster@townofwiley.gov

## 🎯 Success Metrics

Track these metrics post-deployment:
- Page load speed (< 3 seconds)
- Accessibility score (100%)
- Mobile usability score (95%+)
- User engagement metrics
- Contact form submissions
- Service request usage

---

Your Town of Wiley website is now ready for professional deployment! 🏛️✨
