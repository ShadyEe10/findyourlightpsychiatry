import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check page title
    await expect(page).toHaveTitle(/Compassionate Mental Health Care/i);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /Find Your Light Psychiatry PLLC/i })).toBeVisible();
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Click on contact link in navigation using JavaScript click for reliability
    const contactLink = page.getByRole('link', { name: /contact/i }).first();
    await contactLink.scrollIntoViewIfNeeded();
    
    // Use Promise.all to avoid race conditions
    await Promise.all([
      page.waitForURL(/\/contact/, { timeout: 20000, waitUntil: 'domcontentloaded' }),
      contactLink.click(),
    ]);
    
    // Should be on contact page
    await expect(page).toHaveURL(/contact/);
    await expect(page.getByRole('heading', { name: /Contact Find Your Light Psychiatry/i })).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check that mobile menu button is visible
    const menuButton = page.getByLabel('Toggle mobile menu');
    await expect(menuButton).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check that nav has proper role
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
  });
});
