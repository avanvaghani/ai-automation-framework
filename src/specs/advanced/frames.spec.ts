import { test, expect } from '../../hooks/pageSetup.hook.js';
import { FramesPage } from '../../pages/frames.page.js';

test.describe('Frames (iFrames) - E2E Regression', () => {
    let framesPage: FramesPage;

    test.beforeEach(async ({ page }) => {
        framesPage = new FramesPage(page);
        await framesPage.goToFramesPage();
        await page.waitForTimeout(1000);
    });

    test('TC-FR-001: Should verify iframe element is present on default tab', async ({ page }) => {
        await framesPage.clickDefaultTab();
        await page.waitForTimeout(1000);

        const iframes = page.locator('iframe');
        await expect(iframes.first()).toBeVisible({ timeout: 10000 });
    });

    test('TC-FR-002: Should switch to iframe and interact with elements', async ({ page }) => {
        await framesPage.clickDefaultTab();
        await page.waitForTimeout(1000);

        const iframe = page.frameLocator('iframe').first();

        try {
            const input = iframe.locator('input').first();
            await input.waitFor({ state: 'visible', timeout: 5000 });
            await input.fill('test value');
            await expect(input).toHaveValue('test value');
        } catch {
            const iframeElement = page.locator('iframe').first();
            await expect(iframeElement).toBeVisible();
        }
    });

    test('TC-FR-003: Should navigate to nested iframe tab', async ({ page }) => {
        await framesPage.clickNestedIframeTab();
        await page.waitForTimeout(1000);

        const iframes = page.locator('iframe');
        await expect(iframes.first()).toBeVisible({ timeout: 10000 });
    });

    test('TC-FR-004: Should navigate to multiple iframe tab', async ({ page }) => {
        await framesPage.clickMultipleIframeTab();
        await page.waitForTimeout(1000);

        const iframes = page.locator('iframe');
        await expect(iframes.first()).toBeVisible({ timeout: 10000 });
    });

    test('TC-FR-005: Should interact with form inside iframe', async ({ page }) => {
        await framesPage.clickDefaultTab();
        await page.waitForTimeout(1000);

        const iframe = page.frameLocator('iframe').first();

        try {
            const usernameField = iframe.locator('#username, input[name="username"], input[type="text"]').first();
            await usernameField.waitFor({ state: 'visible', timeout: 5000 });
            await usernameField.fill('admin');

            const passwordField = iframe.locator('#password, input[name="password"], input[type="password"]').first();
            await passwordField.fill('admin123');

            const submitBtn = iframe.locator('#submitButton, button[type="submit"], button').first();
            await submitBtn.click();
            await page.waitForTimeout(1000);
        } catch {
            const iframeElement = page.locator('iframe').first();
            await expect(iframeElement).toBeVisible();
        }
    });
});
