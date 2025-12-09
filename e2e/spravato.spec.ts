import { test, expect } from "@playwright/test";

test.describe("SPRAVATO Treatment Page", () => {
  test("loads page and shows hero", async ({ page }) => {
    await page.goto("/spravato", { waitUntil: "networkidle" });
    await expect(
      page.getByRole("heading", {
        name: /SPRAVATO® \(Esketamine\) Treatment at Find Your Light Psychiatry/i,
      })
    ).toBeVisible();
  });

  test("CTA navigates to contact form", async ({ page }) => {
    await page.goto("/spravato", { waitUntil: "networkidle" });
    
    // Wait for hydration by checking if link is interactive
    const ctaLink = page.getByRole("link", { name: /Request Consultation/i }).first();
    await ctaLink.waitFor({ state: 'visible', timeout: 10000 });
    
    // Use Promise.all to handle navigation reliably across browsers
    await Promise.all([
      page.waitForURL(/\/contact\?service=spravato/, {
        timeout: 20000,
        waitUntil: "domcontentloaded",
      }),
      ctaLink.click(),
    ]);
    
    await expect(page).toHaveURL(/\/contact\?service=spravato/);
    
    // Wait for contact form to load on new page
    await page.waitForSelector('[data-testid="contact-form"]', { timeout: 15000 });
    
    await expect(
      page.getByRole("heading", {
        name: /Contact Find Your Light Psychiatry/i,
      })
    ).toBeVisible();
  });
});
