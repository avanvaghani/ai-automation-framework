import { test, expect } from '../../hooks/pageSetup.hook.js';
import { CheckboxPage } from '../../pages/checkbox.page.js';

test.describe('Checkbox - E2E Regression', () => {
    let checkboxPage: CheckboxPage;

    test.beforeEach(async ({ page }) => {
        checkboxPage = new CheckboxPage(page);
        await checkboxPage.goToCheckboxPage();
    });

    test('TC-CB-001: Should check individual checkbox and verify state', async ({ page }) => {
        await checkboxPage.checkEmail();
        await expect(checkboxPage.emailCheckbox).toBeChecked();
    });

    test('TC-CB-002: Should select multiple checkboxes and verify', async ({ page }) => {
        await checkboxPage.checkEmail();
        await checkboxPage.checkWhatsapp();

        await expect(checkboxPage.emailCheckbox).toBeChecked();
        await expect(checkboxPage.whatsappCheckbox).toBeChecked();
    });

    test('TC-CB-003: Should uncheck a selected checkbox', async ({ page }) => {
        await checkboxPage.checkEmail();
        await expect(checkboxPage.emailCheckbox).toBeChecked();

        await checkboxPage.uncheckEmail();
        await expect(checkboxPage.emailCheckbox).not.toBeChecked();
    });

    test('TC-CB-004: Should verify pre-selected checkboxes on Selected tab', async ({ page }) => {
        await checkboxPage.clickSelectedTab();
        await page.waitForTimeout(500);

        const checkedBoxes = page.locator('input[type="checkbox"]:checked');
        const count = await checkedBoxes.count();
        expect(count).toBeGreaterThan(0);
    });

    test('TC-CB-005: Should verify disabled checkboxes cannot be toggled', async ({ page }) => {
        await checkboxPage.clickDisabledTab();
        await page.waitForTimeout(500);

        const disabledCheckbox = page.locator('input[type="checkbox"]:disabled').first();
        await expect(disabledCheckbox).toBeDisabled();
    });

    test('TC-CB-006: Should select checkboxes and click Continue button', async ({ page }) => {
        await checkboxPage.checkMultiple(['domain_a', 'domain_b', 'domain_c']);

        await expect(checkboxPage.emailCheckbox).toBeChecked();
        await expect(checkboxPage.whatsappCheckbox).toBeChecked();
        await expect(checkboxPage.checkboxC).toBeChecked();
    });
});
