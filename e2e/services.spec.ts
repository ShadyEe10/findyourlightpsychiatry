import { test, expect } from '@playwright/test';

test.describe('Services Page', () => {
  test('should load services content', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'networkidle' });

    await expect(
      page.getByRole('heading', { name: /SPRAVATO® \(esketamine\) Treatment/i })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: /CONDITIONS TREATED/i })
    ).toBeVisible();
  });
});

