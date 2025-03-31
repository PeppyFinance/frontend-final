import { expect, test } from "@playwright/test";
import { TEST_CONFIG } from "../config/env";
import { waitForPageLoad } from "../utils/test-utils";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_CONFIG.baseUrl);
    await waitForPageLoad(page);
  });

  test("should navigate to markets page when clicking markets link", async ({
    page,
  }) => {
    // Click on the markets link
    await page.getByRole("link", { name: /markets/i }).click();

    // Wait for navigation and page load
    await waitForPageLoad(page);

    // Verify we're on the markets page
    await expect(page).toHaveURL(/.*markets/);
  });
});
