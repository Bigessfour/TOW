# Manual Accessibility Review Checklist

This checklist must be completed before every release to production (.gov) to
ensure full accessibility compliance (WCAG 2.1 AA, Section 508).

## 1. Keyboard Navigation

- [ ] All interactive elements are reachable by Tab/Shift+Tab
- [ ] Logical tab order
- [ ] No keyboard traps
- [ ] All menus, dialogs, and forms are operable by keyboard only

## 2. Screen Reader Compatibility

- [ ] All content is announced in a logical order
- [ ] All images have meaningful alt text
- [ ] ARIA labels and roles (e.g., banner, navigation, main, contentinfo, region) are used appropriately
- [ ] Headings are used for structure (not just style)
- [ ] All ARIA landmarks are present and correctly implemented
- [ ] Manual screen reader testing (NVDA, VoiceOver, or JAWS) is performed for all major user flows (navigation, forms, notifications)

## 3. Color & Contrast

- [ ] Text and UI elements have sufficient contrast (AA minimum)
- [ ] No color is used as the only means of conveying information
- [ ] Focus indicators are visible and clear

## 4. Forms & Validation

- [ ] All form fields have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Required fields are clearly indicated

## 5. Dynamic Content

- [ ] Live regions (alerts, notifications) are announced
- [ ] Modals and dialogs trap focus and return it when closed

## 6. Downloadable Documents

- [ ] All PDFs and documents are accessible (tagged, readable order, alt text,
      etc.)

## 7. Accessibility Statement

- [ ] Accessibility statement is present and up-to-date on the website

---

**Sign-off:**

- [ ] Manual accessibility review completed by: **********\_\_**********
- [ ] Date: **********\_\_**********

---

_Attach this checklist to your release documentation for every production
deployment._
