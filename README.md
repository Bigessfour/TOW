# Town of Wiley - Official Government Website

[![Website Status](https://img.shields.io/website?url=https%3A//townofwiley.github.io)](https://townofwiley.github.io)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official website for the Town of Wiley - a modern, accessible, and compliant municipal government website built with Jekyll and Tailwind CSS.

## 🏛️ About

This website provides essential services and information to Town of Wiley residents, including:

- Government services and contact information
- Meeting schedules and agendas
- News and announcements
- Online payment systems
- Accessibility-first design

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- Ruby 3.2+ and Bundler
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/Bigessfour/TOW.git
cd TOW

# Install dependencies
npm install
bundle install

# Build CSS
npm run css:build

# Start development server
npm run dev:jekyll
```

## Local Development Server (Best Practice)

For security and compliance, this project uses [http-server](https://www.npmjs.com/package/http-server) for local development:

```
npm run dev
```

This avoids vulnerabilities found in other dev servers and is recommended for all .gov and public sector sites.

---

The site will be available at `http://localhost:4000`

## 🛠️ Development Workflow

### Code Quality & Formatting
We use automated workflows to ensure code quality:

#### Website Formatting & Function Workflow
- **Automatic**: Runs on every push and pull request
- **Manual**: Available in GitHub Actions tab
- **Features**: 
  - Code formatting validation (HTML, CSS, JS, Markdown)
  - Functionality testing (forms, navigation, responsive design)
  - Government compliance checks (ADA, required pages)
  - Performance and SEO auditing

#### Available Commands
```bash
# Development
npm run dev                 # Start development server
npm run build              # Production build
npm run css:watch          # Watch CSS changes

# Testing & Validation
npm run test               # Run all tests
npm run validate:all       # Complete validation suite
npm run test:accessibility # Accessibility audit
npm run test:performance   # Performance testing

# Formatting
npm run format:check       # Check formatting
npm run format:fix         # Auto-fix formatting issues
```

### GitHub Workflows

Our automated CI/CD pipeline includes:

1. **Website Formatting & Function** - Code quality and compliance
2. **CI/CD Pipeline** - Build, test, and deploy
3. **Security Monitoring** - Dependency and code security
4. **Content Monitoring** - Content updates and validation

## 📁 Project Structure

```
Town of Wiley/
├── _config.yml              # Jekyll configuration
├── _data/                   # Data files
├── _includes/               # Reusable components
│   ├── header.html
│   ├── footer.html
│   └── navigation.html
├── _layouts/                # Page templates
│   ├── default.html
│   ├── page.html
│   └── post.html
├── _pages/                  # Static pages
│   ├── contact.md
│   ├── services.md
│   ├── government.md
│   └── accessibility.md
├── _posts/                  # News and announcements
├── assets/                  # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── admin/                   # Netlify CMS admin
└── docs/                    # Documentation
```

## 🎨 Design System

### Technology Stack
- **Static Site Generator**: Jekyll 4.3+
- **CSS Framework**: Tailwind CSS 2.2+
- **Build Tools**: npm, Webpack
- **Deployment**: GitHub Pages, Netlify
- **CMS**: Netlify CMS for content management

### Design Principles
- **Accessibility First**: WCAG 2.1 AA compliance
- **Mobile Responsive**: Mobile-first design approach
- **Government Standards**: Professional, official appearance
- **Performance**: Optimized for fast loading
- **SEO Optimized**: Search engine friendly

### Color Palette
```css
:root {
  --town-blue: #1e40af;      /* Primary government blue */
  --town-gray: #64748b;      /* Secondary gray */
  --town-green: #059669;     /* Success/accent green */
}
```

## 🔒 Security & Compliance

### Government Standards
- **ADA Compliance**: WCAG 2.1 AA accessibility standards
- **Privacy Policy**: Comprehensive privacy protection
- **Security Headers**: Proper security configurations
- **Data Protection**: GDPR/CCPA compliant practices

### Security Features
- Content Security Policy (CSP)
- HTTPS enforcement
- Regular security audits
- Dependency vulnerability scanning

## 🧪 Testing

### Automated Testing
- **HTML Validation**: W3C compliance
- **CSS Linting**: Stylelint with government standards
- **JavaScript Testing**: ESLint + custom rules
- **Accessibility**: Pa11y + Axe testing
- **Performance**: Lighthouse CI
- **Link Checking**: Broken link detection

### Manual Testing Checklist
- [ ] All forms function correctly
- [ ] Navigation works on mobile devices
- [ ] Contact information is accurate
- [ ] Meeting schedules are current
- [ ] Payment systems are functional

## 📖 Documentation

- [Website Formatting Workflow Guide](docs/WEBSITE_FORMATTING_WORKFLOW_GUIDE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)
- [Security Audit](docs/SECURITY_AUDIT.md)
- [Accessibility Guide](docs/ACCESSIBILITY.md)

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/improvement`)
3. **Commit** changes (`git commit -am 'Add improvement'`)
4. **Push** to branch (`git push origin feature/improvement`)
5. **Create** a Pull Request

### Code Standards
- Follow existing code style
- Ensure accessibility compliance
- Add tests for new features
- Update documentation as needed

## 📞 Support

### For Residents
- **Website Issues**: Submit GitHub issue
- **General Inquiries**: Contact Town Hall
- **Technical Support**: IT Department

### For Developers
- **Documentation**: See `/docs` folder
- **Issues**: GitHub Issues tab
- **Discussions**: GitHub Discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Recognition

- **Accessibility**: WCAG 2.1 AA Compliant
- **Performance**: 95+ Lighthouse Score
- **Security**: A+ Security Headers Grade
- **SEO**: 100% SEO Score

---

**Town of Wiley Government**  
Serving our community with modern, accessible technology.

Last Updated: June 2025
