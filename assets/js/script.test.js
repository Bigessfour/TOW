const { test, expect } = require('@playwright/test');

// assets/js/script.test.js
// Tests for initContactForm using Playwright Test
// We recommend installing an extension to run playwright tests.


test.describe('Contact Form Validation', () => {
    test.beforeEach(async ({ page }) => {
        // Set up a minimal HTML page with the contact form
        await page.setContent(`
            <form id="quickContactForm">
                <input id="name" name="name" type="text" />
                <span id="name-error"></span>
                <input id="email" name="email" type="email" />
                <span id="email-error"></span>
                <input id="subject" name="subject" type="text" />
                <span id="subject-error"></span>
                <textarea id="message" name="message"></textarea>
                <span id="message-error"></span>
                <button type="submit">Send</button>
            </form>
            <div id="notification"></div>
            <script>
                window.DEBUG = { log: () => {}, error: () => {} };
                function clearFormErrors() {
                    document.querySelectorAll('.field-error').forEach(e => e.remove());
                }
                function showFieldError(field, msg) {
                    const input = document.getElementById(field);
                    const error = document.createElement('div');
                    error.className = 'field-error';
                    error.textContent = msg;
                    input.insertAdjacentElement('afterend', error);
                }
                function isValidEmail(email) {
                    return /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email);
                }
                function showNotification(msg, type) {
                    document.getElementById('notification').textContent = msg;
                }
                ${initContactForm.toString()}
                initContactForm();
            </script>
        `);
    });

    test('shows errors when submitting empty form', async ({ page }) => {
        await page.click('button[type="submit"]');
        const errors = await page.locator('.field-error').allTextContents();
        expect(errors).toContain('Name is required');
        expect(errors).toContain('Email is required');
        expect(errors).toContain('Subject is required');
        expect(errors).toContain('Message is required');
    });

    test('shows error for invalid email', async ({ page }) => {
        await page.fill('#name', 'John Doe');
        await page.fill('#email', 'not-an-email');
        await page.fill('#subject', 'Test Subject');
        await page.fill('#message', 'Test message');
        await page.click('button[type="submit"]');
        const errors = await page.locator('.field-error').allTextContents();
        expect(errors).toContain('Please enter a valid email address');
    });

    test('submits successfully with valid data', async ({ page }) => {
        await page.fill('#name', 'Jane Doe');
        await page.fill('#email', 'jane@example.com');
        await page.fill('#subject', 'Hello');
        await page.fill('#message', 'This is a message.');
        await page.click('button[type="submit"]');
        const notification = await page.locator('#notification').textContent();
        expect(notification).toContain('Thank you for your message');
        // Form should be reset (fields empty)
        expect(await page.inputValue('#name')).toBe('');
        expect(await page.inputValue('#email')).toBe('');
        expect(await page.inputValue('#subject')).toBe('');
        expect(await page.inputValue('#message')).toBe('');
    });
});