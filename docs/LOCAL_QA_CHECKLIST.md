# Website QA Local Test Checklist for Town of Wiley

This checklist is based on the BrowserStack QA Testing Guide and tailored for
local manual testing. Use this to validate your site before deployment.

## 1. Cross-Browser Compatibility

- [ ] Open the site in Chrome, Firefox, Edge, and Safari (if available)
- [ ] Check layout, navigation, and functionality in each browser

## 2. Responsiveness

- [ ] Resize browser window to test mobile, tablet, and desktop layouts
- [ ] Use browser dev tools (Device Mode) to preview on common devices
- [ ] Verify navigation, buttons, and forms are usable on all sizes

## 3. Functionality Testing

- [ ] Test all navigation links and buttons
- [ ] Submit all forms (contact, payments, etc.) with valid and invalid data
- [ ] Check for proper error messages and validation
- [ ] Test interactive elements (menus, modals, alerts)

## 4. Broken Links

- [ ] Click all internal and external links to ensure they work
- [ ] Check for 404 or misdirected pages

## 5. Security

- [ ] Confirm the site loads with HTTPS locally (if possible)
- [ ] Test that sensitive pages (payments, contact) do not expose data

## 6. Cookie Testing

- [ ] Clear cookies and reload the site; verify login/session behavior (if
      applicable)
- [ ] Test with cookies disabled in browser settings

## 7. Accessibility

- [ ] Tab through the site to check keyboard navigation
- [ ] Use browser accessibility tools to check color contrast and ARIA labels
- [ ] Test with a screen reader (if available)

## 8. Performance

- [ ] Use browser dev tools (Lighthouse, Network tab) to check load times
- [ ] Test on slow network (throttle in dev tools)

## 9. Regression & User Acceptance

- [ ] After any update, repeat all above tests
- [ ] Ask a non-developer to use the site and provide feedback

---

**How to Use:**

- Open this checklist in your editor or print it out
- Check off each item as you test locally
- Repeat before every major deployment

Reference: https://www.browserstack.com/guide/how-to-perform-website-qa-testing
