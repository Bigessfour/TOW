# Town of Wiley .gov Website Testing & Compliance Standards

This document defines the required testing and compliance rules for the Town of Wiley official government website (townofwiley.gov) to meet .gov, ADA, Section 508, and federal/state digital service standards.

## 1. Accessibility (ADA, Section 508, WCAG 2.1 AA)
- All pages must pass automated accessibility tests (Pa11y, Axe, Lighthouse, WAVE)
- Manual accessibility review for:
  - Keyboard navigation
  - Screen reader compatibility
  - Color contrast (AA minimum)
  - Focus indicators
  - ARIA attributes
- All downloadable documents (PDF, DOC, etc.) must be accessible

## 2. Security
- All dependencies must be free of known vulnerabilities (npm audit, Snyk, Trivy)
- HTTPS must be enforced; no mixed content
- Strict Content Security Policy (CSP) headers
- No inline scripts/styles unless necessary and reviewed
- All forms must have spam protection (CAPTCHA, honeypot, etc.)

## 3. Privacy & Data Protection
- Clear, accessible privacy policy
- No analytics or cookies without user consent
- Secure contact forms (input validation, spam protection)

## 4. Content & Usability
- Plain language for all content
- Required pages: Contact, Accessibility, Privacy, Government Officials, Meeting Schedules, Services
- No broken links (internal or external)
- Consistent, accessible navigation

## 5. Performance & Reliability
- Lighthouse performance score >90
- Mobile responsive (test on all device sizes)
- Uptime monitoring in place

## 6. SEO & Metadata
- Title, description, Open Graph, and structured data on all pages
- Valid sitemap.xml and robots.txt

## 7. Compliance & Transparency
- Public records (meeting minutes, agendas, notices) available
- FOIA request instructions present

---

# Enforcement Rule

**All code, content, and configuration must pass the following before deployment:**

- [ ] Automated accessibility tests (Pa11y, Axe, Lighthouse, WAVE)
- [ ] Manual accessibility review (keyboard, screen reader, contrast, ARIA)
- [ ] Security scan (npm audit, Snyk, Trivy)
- [ ] HTTPS and CSP headers enforced
- [ ] Privacy policy and accessibility statement present
- [ ] All forms tested for security and spam
- [ ] No broken links
- [ ] Mobile and desktop usability tested
- [ ] Performance score >90 (Lighthouse)
- [ ] SEO and metadata validated
- [ ] Required government content/pages present
- [ ] Public meeting info and contact details up-to-date

**No deployment to production (.gov) unless all checks pass.**

---

## Review & Audit
- This checklist must be reviewed before every release.
- Automated workflows must enforce all possible checks.
- Manual review required for accessibility and content.
- Audit logs and reports must be archived for compliance.
