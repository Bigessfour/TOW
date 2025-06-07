# Contributing to Town of Wiley Website

Thank you for your interest in contributing to the Town of Wiley official website project!

## 🚀 Getting Started

### Prerequisites
- Git installed on your local machine
- Modern web browser for testing
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of web accessibility principles

### Repository Setup
```bash
git clone https://github.com/Bigessfour/TOW.git
cd TOW
```

## 📋 Development Guidelines

### Code Standards
- Follow semantic HTML5 markup
- Maintain WCAG 2.1 Level AA accessibility compliance
- Use consistent indentation (2 spaces)
- Write descriptive commit messages
- Test across multiple browsers

### Accessibility Requirements
- All interactive elements must be keyboard accessible
- Provide ARIA labels for complex UI components
- Ensure color contrast ratios meet WCAG standards
- Test with screen readers
- Include skip links for navigation

### File Structure
```
TOW/
├── index.html              # Main website file
├── styles.css              # All CSS styling
├── script.js               # JavaScript functionality
├── README.md               # Project documentation
├── CONTRIBUTING.md         # This file
├── .github/
│   └── copilot-instructions.md
└── .vscode/
    └── tasks.json
```

## 🔧 Development Workflow

### Making Changes
1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the guidelines above

3. Test your changes thoroughly:
   - Test on mobile, tablet, and desktop
   - Verify accessibility with keyboard navigation
   - Check browser compatibility
   - Validate HTML and CSS

4. Commit your changes:
   ```bash
   git add .
   git commit -m "Add: Brief description of changes"
   ```

5. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request on GitHub

### Commit Message Format
Use clear, descriptive commit messages:
- `Add: New feature or section`
- `Fix: Bug fix or correction`
- `Update: Modification to existing feature`
- `Style: CSS or visual changes`
- `Docs: Documentation updates`
- `Accessibility: Accessibility improvements`

## 🧪 Testing Checklist

Before submitting a pull request, ensure:

### Functionality Tests
- [ ] All forms submit correctly
- [ ] Navigation works on all devices
- [ ] Search functionality operates properly
- [ ] All buttons and links function as expected
- [ ] JavaScript features work without errors

### Accessibility Tests
- [ ] Can navigate entire site using only keyboard
- [ ] Screen reader announces content properly
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG standards
- [ ] All images have appropriate alt text
- [ ] Forms have proper labels and error messages

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Android Chrome)

### Performance Tests
- [ ] Page loads quickly (< 3 seconds)
- [ ] Images are optimized
- [ ] CSS and JS are minified (for production)
- [ ] No console errors

## 📱 Responsive Design Guidelines

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 769px - 1024px
- Desktop: 1025px and up

### Mobile-First Approach
- Start with mobile design
- Progressive enhancement for larger screens
- Touch-friendly interface elements
- Readable text without zooming

## 🎨 Design Guidelines

### Color Palette
- Primary: #2c3e50 (Dark blue-gray)
- Secondary: #3498db (Blue)
- Success: #27ae60 (Green)
- Warning: #f39c12 (Orange)
- Error: #e74c3c (Red)
- Text: #1a1a1a (Near black)

### Typography
- Font Family: 'Open Sans', sans-serif
- Base Size: 16px
- Line Height: 1.6
- Headings: Use semantic hierarchy (h1-h6)

### Spacing
- Use consistent spacing units (8px base)
- Maintain adequate white space
- Ensure touch targets are at least 44px

## 🔒 Security Considerations

### Input Validation
- Sanitize all user inputs
- Use proper form validation
- Implement CSRF protection for forms

### Privacy Compliance
- Maintain GDPR/CCPA compliance
- Implement proper cookie consent
- Follow data minimization principles

## 📚 Resources

### Accessibility Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Government Web Standards
- [U.S. Web Design System](https://designsystem.digital.gov/)
- [Section 508 Guidelines](https://www.section508.gov/)

## 🐛 Reporting Issues

When reporting bugs or issues:

1. Use the GitHub issue template
2. Provide steps to reproduce
3. Include browser and device information
4. Add screenshots if applicable
5. Mention any accessibility concerns

### Issue Labels
- `bug`: Something isn't working
- `enhancement`: New feature request
- `accessibility`: Accessibility improvement
- `documentation`: Documentation update
- `help wanted`: Extra attention needed

## 📞 Contact

For questions about contributing:
- Create a GitHub issue
- Email: webmaster@townofwiley.gov
- Accessibility concerns: accessibility@townofwiley.gov

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make the Town of Wiley website better for everyone!
