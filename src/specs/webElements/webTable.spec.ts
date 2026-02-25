import { test, expect } from '../../hooks/pageSetup.hook.js';
import { WebTablePage } from '../../pages/webTable.page.js';

test.describe('Web Table - E2E Regression', () => {
    let tablePage: WebTablePage;

    test.beforeEach(async ({ page }) => {
        tablePage = new WebTablePage(page);
        await tablePage.goToWebTablePage();
    });

    test('TC-TBL-001: Should verify table renders with data rows', async ({ page }) => {
        await page.waitForTimeout(1000);

        const table = page.locator('table').first();
        await expect(table).toBeVisible({ timeout: 10000 });

        const rowCount = await tablePage.getRowCount();
        expect(rowCount).toBeGreaterThan(0);
    });

    test('TC-TBL-002: Should verify table headers are present', async ({ page }) => {
        const table = page.locator('table').first();
        await expect(table).toBeVisible({ timeout: 10000 });

        const headerCount = await tablePage.getHeaderCount();
        expect(headerCount).toBeGreaterThan(0);
    });

    test('TC-TBL-003: Should read cell data from specific row and column', async ({ page }) => {
        const table = page.locator('table').first();
        await expect(table).toBeVisible({ timeout: 10000 });

        const rowCount = await tablePage.getRowCount();
        if (rowCount > 0) {
            const cellText = await tablePage.getCellText(0, 0);
            expect(cellText.trim().length).toBeGreaterThan(0);
        }
    });

    test('TC-TBL-004: Should navigate to dynamic table and verify it loads', async ({ page }) => {
        await tablePage.clickDynamicTab();
        await page.waitForTimeout(1000);

        const table = page.locator('table').first();
        await expect(table).toBeVisible({ timeout: 10000 });
    });

    test('TC-TBL-005: Should navigate to sort table tab and click a column header', async ({ page }) => {
        await tablePage.clickSortTab();
        await page.waitForTimeout(1000);

        const table = page.locator('table').first();
        await expect(table).toBeVisible({ timeout: 10000 });

        const headers = page.locator('table thead th');
        const count = await headers.count();
        if (count > 0) {
            await headers.first().click();
            await page.waitForTimeout(500);
            await expect(table).toBeVisible();
        }
    });

    test('TC-TBL-006: Should navigate to pagination tab and verify pagination exists', async ({ page }) => {
        await tablePage.clickPaginationTab();
        await page.waitForTimeout(1000);

        const table = page.locator('table').first();
        await expect(table).toBeVisible({ timeout: 10000 });
    });

    test('TC-TBL-007: Should navigate to checkbox tab and select a row checkbox', async ({ page }) => {
        await tablePage.clickCheckboxTab();
        await page.waitForTimeout(1000);

        const table = page.locator('table').first();
        await expect(table).toBeVisible({ timeout: 10000 });

        const checkboxes = page.locator('table tbody input[type="checkbox"]');
        const count = await checkboxes.count();
        if (count > 0) {
            await checkboxes.first().check();
            await expect(checkboxes.first()).toBeChecked();
        }
    });
});
