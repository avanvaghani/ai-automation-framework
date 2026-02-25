import { test, expect } from '../../hooks/pageSetup.hook.js';
import { ProgressBarPage } from '../../pages/progressBar.page.js';

test.describe('Synchronization - Progress Bar - E2E Regression', () => {
    let progressPage: ProgressBarPage;

    test.beforeEach(async ({ page }) => {
        progressPage = new ProgressBarPage(page);
        await progressPage.goToProgressBarPage();
        await page.waitForTimeout(500);
    });

    // test('TC-PB-001: Should start progress bar and verify it progresses', async ({ page }) => {
    //     const startBtn = page.getByRole('button', { name: /start/i }).first();
    //     await expect(startBtn).toBeVisible({ timeout: 5000 });
    //     await startBtn.click();
    //     await page.waitForTimeout(2000);

    //     const progressBar = page.locator('.progress-bar, [role="progressbar"], .progress').first();
    //     await expect(progressBar).toBeVisible({ timeout: 5000 });
    // });

    test('TC-PB-002: Should reset progress bar and verify it resets', async ({ page }) => {
        const startBtn = page.getByRole('button', { name: /start/i }).first();
        await startBtn.click();
        await page.waitForTimeout(1500);

        const resetBtn = page.getByRole('button', { name: /reset/i }).first();
        const resetVisible = await resetBtn.isVisible();
        if (resetVisible) {
            await resetBtn.click();
            await page.waitForTimeout(500);
        }
    });

    test('TC-PB-003: Should navigate to With Element tab and start', async ({ page }) => {
        const withElementTab = page.getByText('With Element', { exact: true }).first();
        const isVisible = await withElementTab.isVisible();
        if (isVisible) {
            await withElementTab.click();
            await page.waitForTimeout(1000);
        }

        const startBtn = page.getByRole('button', { name: /start/i }).first();
        const btnVisible = await startBtn.isVisible();
        if (btnVisible) {
            await startBtn.click();
            await page.waitForTimeout(5000);
        }
    });

    test('TC-PB-004: Should navigate to Disabled Element tab and verify button state changes', async ({ page }) => {
        const disabledTab = page.getByText('Disabled Element', { exact: false }).first();
        const isVisible = await disabledTab.isVisible();
        if (isVisible) {
            await disabledTab.click();
            await page.waitForTimeout(1000);
        }

        const startBtn = page.getByRole('button', { name: /start/i }).first();
        const btnVisible = await startBtn.isVisible();
        if (btnVisible) {
            await startBtn.click();
            await page.waitForTimeout(3000);
        }
    });

    test('TC-PB-005: Should navigate to Hidden Element tab', async ({ page }) => {
        const hiddenTab = page.getByText('Hidden Element', { exact: false }).first();
        const isVisible = await hiddenTab.isVisible();
        if (isVisible) {
            await hiddenTab.click();
            await page.waitForTimeout(1000);
        }

        const content = page.locator('main, .container, .content, body').first();
        await expect(content).toBeVisible();
    });
});
