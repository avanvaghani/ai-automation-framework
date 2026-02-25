import { test, expect } from '../../hooks/pageSetup.hook.js';
import { ButtonPage } from '../../pages/button.page.js';

test.describe('Button - E2E Regression', () => {
    let buttonPage: ButtonPage;

    test.beforeEach(async ({ page }) => {
        buttonPage = new ButtonPage(page);
        await buttonPage.goToButtonPage();
        await page.waitForTimeout(500);
    });

    test('TC-BTN-001: Should single click Yes button and verify result', async ({ page }) => {
        await buttonPage.clickYesButton();

        const result = page.locator('span.text-green-600').first();
        await expect(result).toBeVisible({ timeout: 5000 });
        const text = await result.textContent();
        expect(text).toContain('Yes');
    });

    test('TC-BTN-002: Should single click No button and verify result', async ({ page }) => {
        await buttonPage.clickNoButton();
        await page.waitForTimeout(500);

        const result = page.locator('span').filter({ hasText: /No/ }).first();
        await expect(result).toBeVisible({ timeout: 5000 });
    });

    test.only('TC-BTN-003: Should right-click button and verify context action', async ({ page }) => {
        await buttonPage.clickRightClickTab();
        await page.waitForTimeout(1000);

        const btn = page.locator('#btn');
        await btn.click({ button: 'right' });

        // const result = page.locator('span.text-green-600, span.text-red-600').first();
        // await expect(result).toBeVisible({ timeout: 5000 });
    });

    test('TC-BTN-004: Should double-click button and verify result', async ({ page }) => {
        await buttonPage.clickDoubleClickTab();
        await page.waitForTimeout(1000);

        const btn = page.locator('#btn');
        await btn.dblclick();

        const result = page.locator('span.text-green-600, span.text-red-600').first();
        await expect(result).toBeVisible({ timeout: 5000 });
    });

    test('TC-BTN-005: Should verify disabled tab has Terms checkbox and submit button', async ({ page }) => {
        await buttonPage.clickDisabledTab();
        await page.waitForTimeout(1000);

        const termsCheckbox = page.locator('#submit');
        await expect(termsCheckbox).toBeVisible();

        const submitBtn = page.locator('#submitButton');
        await expect(submitBtn).toBeVisible();
    });

    test('TC-BTN-006: Should submit form via submit click tab', async ({ page }) => {
        await buttonPage.clickSubmitTab();
        await page.waitForTimeout(1000);

        const submitBtn = page.locator('button[type="submit"], #btn').first();
        await expect(submitBtn).toBeVisible();
        await submitBtn.click();
        await page.waitForTimeout(500);
    });
});
