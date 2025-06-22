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
  test("should navigate to account page when clicking account link", async ({
    page,
  }) => {
    // Click on the account link
    await page.getByRole("link", { name: /account/i }).click();

    // Wait for navigation and page load
    await waitForPageLoad(page);

    // Verify we're on the account page
    await expect(page).toHaveURL(/.*account/);
  });

  test("should navigate to trade page when clicking trade link", async ({
    page,
  }) => {
    // Click on the trade link
    await page.getByRole("link", { name: /trade/i }).click();

    // Wait for navigation and page load
    await waitForPageLoad(page);

    // Verify we're on the trade page
    await expect(page).toHaveURL(/.*trade/);
  });

  test("should navigate to base route page when clicking Cybar symbol", async ({
    page,
  }) => {
    // Goto trade route
    await page.getByRole("link", { name: /trade/i }).click();
    await waitForPageLoad(page);
    await expect(page).toHaveURL(/.*trade/);

    await page.getByAltText("cybar_header_logo").click();
    await waitForPageLoad(page);
    await expect(page).toHaveURL(TEST_CONFIG.baseUrl);
  });
});
