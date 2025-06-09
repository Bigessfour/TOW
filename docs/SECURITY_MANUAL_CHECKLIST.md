# Security Compliance Checklist for .gov Websites

This checklist must be completed before every release to production (.gov) to ensure security compliance and best practices.

## 1. Dependency Vulnerability Scanning
- [ ] Run `npm audit` and resolve all vulnerabilities
- [ ] Run Trivy or Snyk scans for deeper checks (if available)
- [ ] All dependencies are up-to-date

## 2. HTTPS & Content Security Policy (CSP)
- [ ] HTTPS is enforced for all traffic
- [ ] No mixed content (all resources load over HTTPS)
- [ ] CSP headers are set and tested (see [securityheaders.com](https://securityheaders.com/))

## 3. Forms & Input Security
- [ ] All forms have input validation (client and server side)
- [ ] Spam protection is enabled (CAPTCHA, honeypot, or similar)
- [ ] No sensitive data is sent via email or insecure channels

## 4. Privacy & Data Protection
- [ ] Privacy policy is present, accessible, and up-to-date
- [ ] No analytics or cookies are set without user consent
- [ ] Data retention and deletion policies are documented and followed
- [ ] Public records policy is documented and followed
- [ ] Children's privacy is addressed (no data collected from children under 13)
- [ ] Privacy contact information is published on the website

## 5. Monitoring & Incident Response
- [ ] Uptime monitoring is enabled
- [ ] Security contact information is published
- [ ] Incident response plan is documented

## 6. Content Security Policy (CSP) & HTTPS Enforcement
- [ ] CSP headers are set and tested (use https://securityheaders.com/)
- [ ] HTTPS is enforced for all environments (production and staging)
- [ ] No mixed content (all resources load over HTTPS)

## 7. Form Spam Protection
- [ ] All forms use CAPTCHA, honeypot, or similar spam protection
- [ ] Form submissions are rate-limited or protected from abuse

## 8. Security Contact & Incident Response
- [ ] Security contact information is published on the website
- [ ] Incident response plan is documented and accessible to staff

---

**Sign-off:**
- [ ] Security review completed by: ______________________
- [ ] Date: ______________________

---

*Attach this checklist to your release documentation for every production deployment.*
