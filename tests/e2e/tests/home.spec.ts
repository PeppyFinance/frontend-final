import { expect, test } from "@playwright/test";
import { TEST_CONFIG } from "../config/env";
import { expectElementToBeVisible, waitForPageLoad } from "../utils/test-utils";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_CONFIG.baseUrl);
    await waitForPageLoad(page);
  });

  test("should load the home page", async ({ page }) => {
    await expect(page).toHaveTitle(/Cybar/);
  });

  test("should have main navigation elements", async ({ page }) => {
    await expectElementToBeVisible(page, "nav");
  });
});
