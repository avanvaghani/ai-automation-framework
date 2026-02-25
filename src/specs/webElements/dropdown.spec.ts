import { test, expect } from '../../hooks/pageSetup.hook.js';
import { DropdownPage } from '../../pages/dropdown.page.js';
import { UtilsHelper } from '../../helpers/utils.helper.js';

test.describe('Dropdown - E2E Regression', () => {
    let dropdownPage: DropdownPage;

    test.beforeEach(async ({ page }) => {
        dropdownPage = new DropdownPage(page);
        await dropdownPage.goToDropdownPage();
    });

    test('TC-DD-001: Should select from single-select dropdown', async ({ page }) => {
        await dropdownPage.clickSingleSelectTab();
        await page.waitForTimeout(500);

        const selectElement = page.locator('select').first();
        await selectElement.waitFor({ state: 'visible' });

        const options = await selectElement.locator('option').allTextContents();
        if (options.length > 1) {
            await selectElement.selectOption({ index: 1 });
        }
    });

    test('TC-DD-002: Should select country code from dropdown', async ({ page }) => {
        const countryCode = dropdownPage.countryCodeSelect;
        const isVisible = await countryCode.isVisible();
        if (isVisible) {
            const options = await countryCode.locator('option').allTextContents();
            if (options.length > 1) {
                await countryCode.selectOption({ index: 1 });
            }
        }
    });

    test('TC-DD-003: Should fill phone number and select gender', async ({ page }) => {
        const phone = UtilsHelper.generateRandomPhone();
        const phoneInput = dropdownPage.phoneInput;
        const isVisible = await phoneInput.isVisible();
        if (isVisible) {
            await dropdownPage.fillPhone(phone);
            await expect(phoneInput).toHaveValue(phone);
        }

        await dropdownPage.selectGender('male');
        await expect(dropdownPage.maleRadio).toBeChecked();
    });

    test('TC-DD-004: Should navigate to multi-select tab and interact', async ({ page }) => {
        await dropdownPage.clickMultiSelectTab();
        await page.waitForTimeout(500);

        const multiSelect = page.locator('select[multiple]').first();
        const isVisible = await multiSelect.isVisible();
        if (isVisible) {
            const options = await multiSelect.locator('option').allTextContents();
            if (options.length >= 2) {
                await multiSelect.selectOption([{ index: 0 }, { index: 1 }]);
            }
        }
    });

    test('TC-DD-005: Should verify disabled dropdown is non-interactive', async ({ page }) => {
        await dropdownPage.clickDisabledTab();
        await page.waitForTimeout(500);

        const disabledSelect = page.locator('select:disabled').first();
        await expect(disabledSelect).toBeDisabled();
    });

    test('TC-DD-006: Should navigate to search-select tab', async ({ page }) => {
        await dropdownPage.clickSearchSelectTab();
        await page.waitForTimeout(500);

        // Verify the search-select page loaded
        const pageContent = page.locator('.content, main, .container').first();
        await expect(pageContent).toBeVisible();
    });
});
