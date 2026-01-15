import { test, expect, Page } from '@playwright/test';

async function mockContactApi(page: Page) {
  await page.addInitScript((responseBody) => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [input] = args;
      const url = typeof input === 'string' ? input : input?.url ?? '';

      if (url.includes('/api/contact')) {
        return new Response(JSON.stringify(responseBody), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return originalFetch(...args);
    };
  }, { success: true, message: 'Thank you for your request.' });
}

test.describe('Contact Page', () => {
  test('should load contact page successfully', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });
    
    // Check page title
    await expect(page).toHaveTitle(/Contact/i);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /Contact Find Your Light Psychiatry/i })).toBeVisible();
    
    // Wait for the dynamically imported contact form to hydrate
    await page.waitForSelector('[data-testid="contact-form"]', { timeout: 15000 });
    
    // Check form is present
    await expect(page.getByRole('textbox', { name: /name/i })).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });
    
    // Wait for the dynamically imported contact form to hydrate
    await page.waitForSelector('[data-testid="contact-form"]', { timeout: 15000 });
    
    // Try to submit without filling required fields
    const submitButton = page.getByRole('button', { name: /submit intake form/i });
    await submitButton.click();
    
    // Check HTML5 validation
    const nameInput = page.getByLabel(/^name/i);
    await expect(nameInput).toHaveAttribute('required');
  });

  test('should submit form with valid data', async ({ page }) => {
    await mockContactApi(page);
    await page.goto('/contact', { waitUntil: 'networkidle' });
    
    // Wait for the dynamically imported contact form to hydrate
    await page.waitForSelector('[data-testid="contact-form"]', { timeout: 15000 });
    
    // Fill form
    await page.getByLabel(/^name/i).fill('John Doe');
    await page.getByLabel(/date of birth/i).fill('1990-01-01');
    await page.getByLabel(/phone number/i).fill('2065551234');
    await page.locator('#email').fill('john@example.com');
    await page.getByLabel(/Queen Anne/i).check();
    const insuranceGroup = page.getByRole('group', { name: /Do you have insurance\?/i });
    await insuranceGroup.getByRole('radio', { name: /^No$/i }).check();
    await page.getByLabel(/Medication Management/i).check();
    await page.getByLabel(/Brief description/i).fill('Test message for care');
    const safetyGroup = page.getByRole('group', {
      name: /Are you experiencing any thoughts of harming yourself or others\?/i,
    });
    await safetyGroup.getByRole('radio', { name: /^No$/i }).check();
    const diagnosisGroup = page.getByRole('group', {
      name: /Have you been diagnosed with a mental health condition\?/i,
    });
    await diagnosisGroup.getByRole('radio', { name: /^No$/i }).check();
    const medsGroup = page.getByRole('group', {
      name: /Are you currently taking psychiatric medications\?/i,
    });
    await medsGroup.getByRole('radio', { name: /^No$/i }).check();
    const hospitalizationGroup = page.getByRole('group', {
      name: /Have you ever been hospitalized for mental health reasons\?/i,
    });
    await hospitalizationGroup.getByRole('radio', { name: /^No$/i }).check();
    await page.getByLabel(/consent or establish a patient-provider relationship/i).check();
    await page.getByLabel(/not for emergencies/i).check();
    
    // Submit
    await page.getByRole('button', { name: /submit intake form/i }).click();
    
    // Check for success message
    await expect(page.getByText(/thank you/i, { exact: false })).toBeVisible({ timeout: 10000 });
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact', { waitUntil: 'networkidle' });
    
    // Wait for the dynamically imported contact form to hydrate
    await page.waitForSelector('[data-testid="contact-form"]', { timeout: 15000 });
    
    // Check that form is still accessible
    await expect(page.getByRole('textbox', { name: /name/i })).toBeVisible();
  });
});
