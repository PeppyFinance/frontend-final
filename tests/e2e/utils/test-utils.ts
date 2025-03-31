import { Page, expect } from "@playwright/test";

export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForLoadState("domcontentloaded");
}

export async function expectElementToBeVisible(
  page: Page,
  selector: string,
  timeout = 5000,
) {
  const element = page.locator(selector);
  await element.waitFor({ timeout });
  await expect(element).toBeVisible();
}

export async function expectElementToHaveText(
  page: Page,
  selector: string,
  text: string,
  timeout = 5000,
) {
  const element = page.locator(selector);
  await element.waitFor({ timeout });
  await expect(element).toHaveText(text);
}

export async function expectElementToBeEnabled(
  page: Page,
  selector: string,
  timeout = 5000,
) {
  const element = page.locator(selector);
  await element.waitFor({ timeout });
  await expect(element).toBeEnabled();
}

export async function expectElementToBeDisabled(
  page: Page,
  selector: string,
  timeout = 5000,
) {
  const element = page.locator(selector);
  await element.waitFor({ timeout });
  await expect(element).toBeDisabled();
}

export async function expectElementToHaveAttribute(
  page: Page,
  selector: string,
  attribute: string,
  value: string,
  timeout = 5000,
) {
  const element = page.locator(selector);
  await element.waitFor({ timeout });
  await expect(element).toHaveAttribute(attribute, value);
}
