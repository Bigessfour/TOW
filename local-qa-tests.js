// local-qa-tests.js
// Automated local QA tests for Town of Wiley website
// Run with: node local-qa-tests.js
// Requires: Node.js, playwright (npm install playwright)

const { chromium, firefox, webkit, devices } = require('playwright');

const URL = 'http://localhost:8000/'; // Updated to test built _site output

async function testCrossBrowser() {
  const browsers = [chromium, firefox, webkit];
  for (const browserType of browsers) {
    const browser = await browserType.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(URL);
    console.log(`[${browserType.name()}] Title:`, await page.title());
    // Check navigation bar exists
    const nav = await page.$('nav');
    console.log(`[${browserType.name()}] Navigation exists:`, !!nav);
    await browser.close();
  }
}

async function testResponsiveness() {
  const browser = await chromium.launch();
  const iPhone = devices['iPhone 12'];
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();
  await page.goto(URL);
  const mobileNav = await page.$('button[aria-label*="menu"], .hamburger');
  console.log('[Mobile] Hamburger menu exists:', !!mobileNav);
  await browser.close();
}

async function testLinks() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  const links = await page.$$('a');
  let broken = 0;
  for (const link of links) {
    const href = await link.getAttribute('href');
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:'))
      continue;
    try {
      const resp = await page.goto(href, {
        waitUntil: 'domcontentloaded',
        timeout: 5000,
      });
      if (!resp || resp.status() >= 400) {
        console.log('Broken link:', href);
        broken++;
      }
      await page.goBack();
    } catch (e) {
      console.log('Error checking link:', href);
      broken++;
    }
  }
  console.log('Broken links found:', broken);
  await browser.close();
}

async function testAccessibility() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  // Check for skip to content link
  const skip = await page.$('a[href="#main"], a.skip-to-content');
  console.log('Skip to content link exists:', !!skip);
  // Check for alt text on images
  const images = await page.$$('img');
  let missingAlt = 0;
  for (const img of images) {
    const alt = await img.getAttribute('alt');
    if (!alt) missingAlt++;
  }
  console.log('Images missing alt text:', missingAlt);
  await browser.close();
}

async function testForms() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  // Test contact form
  const nameInput = await page.$('input[name="name"]');
  const emailInput = await page.$('input[name="email"]');
  const subjectInput = await page.$('input[name="subject"]');
  const messageInput = await page.$('textarea[name="message"]');
  if (nameInput && emailInput && subjectInput && messageInput) {
    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await subjectInput.fill('Test Subject');
    await messageInput.fill('Test message body.');
    await page.click('button[type="submit"]');
    // Wait for possible notification or error
    await page.waitForTimeout(1000);
    console.log(
      'Contact form submitted (check for success notification manually).'
    );
  } else {
    console.log('Contact form fields not found.');
  }
  await browser.close();
}

async function runAll() {
  console.log('--- Cross-Browser Test ---');
  await testCrossBrowser();
  console.log('--- Responsiveness Test ---');
  await testResponsiveness();
  console.log('--- Link Test ---');
  await testLinks();
  console.log('--- Accessibility Test ---');
  await testAccessibility();
  console.log('--- Form Test ---');
  await testForms();
  console.log('All local QA tests complete.');
}

runAll();
