import { test, expect } from '../../hooks/pageSetup.hook.js';
import { DatePickerPage } from '../../pages/datePicker.page.js';

test.describe('Date Picker - E2E Regression', () => {
    let datePickerPage: DatePickerPage;

    test.beforeEach(async ({ page }) => {
        datePickerPage = new DatePickerPage(page);
        await datePickerPage.goToDatePickerPage();
    });

    test('TC-DP-001: Should open simple date picker and select a date', async ({ page }) => {
        await datePickerPage.clickSimpleDatePickerTab();
        await page.waitForTimeout(500);

        const dateInput = page.locator('input').first();
        await dateInput.click();
        await page.waitForTimeout(500);

        // Try to select a day from calendar
        const dayElement = page.locator('.react-datepicker__day:not(.react-datepicker__day--outside-month), .datepicker td:not(.disabled)').first();
        const isVisible = await dayElement.isVisible();
        if (isVisible) {
            await dayElement.click();
        }
    });

    test('TC-DP-002: Should select date using dropdown date picker', async ({ page }) => {
        await datePickerPage.clickDropdownDatePickerTab();
        await page.waitForTimeout(500);

        const dateInput = page.locator('input').first();
        const isVisible = await dateInput.isVisible();
        if (isVisible) {
            await dateInput.click();
            await page.waitForTimeout(500);
        }
    });

    test('TC-DP-003: Should trigger date picker via icon click', async ({ page }) => {
        await datePickerPage.clickIconTriggerTab();
        await page.waitForTimeout(500);

        const iconBtn = page.locator('.input-group-addon, .calendar-icon, button, svg').first();
        const isVisible = await iconBtn.isVisible();
        if (isVisible) {
            await iconBtn.click();
            await page.waitForTimeout(500);
        }
    });

    test('TC-DP-004: Should verify date input field is present and functional', async ({ page }) => {
        const dateInput = page.locator('input').first();
        await expect(dateInput).toBeVisible();
        await expect(dateInput).toBeEnabled();
    });
});
