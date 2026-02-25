import { test, expect } from '../../hooks/pageSetup.hook.js';
import { RadioButtonPage } from '../../pages/radioButton.page.js';

test.describe('Radio Button - E2E Regression', () => {
    let radioPage: RadioButtonPage;

    test.beforeEach(async ({ page }) => {
        radioPage = new RadioButtonPage(page);
        await radioPage.goToRadioButtonPage();
        await page.waitForTimeout(500);
    });

    test('TC-RB-001: Should select a radio button and verify selection', async ({ page }) => {
        await radioPage.selectUPI();
        await expect(radioPage.upiRadio).toBeChecked();
    });

    test('TC-RB-002: Should switch between radio buttons (mutual exclusion)', async ({ page }) => {
        await radioPage.selectUPI();
        await expect(radioPage.upiRadio).toBeChecked();

        await radioPage.selectWallet();
        await expect(radioPage.walletRadio).toBeChecked();
        await expect(radioPage.upiRadio).not.toBeChecked();
    });

    test('TC-RB-003: Should select Net Banking and verify', async ({ page }) => {
        await radioPage.selectNetBanking();
        await expect(radioPage.netBankingRadio).toBeChecked();
        await expect(radioPage.upiRadio).not.toBeChecked();
    });

    test('TC-RB-004: Should navigate to Selected tab and verify radio buttons exist', async ({ page }) => {
        await radioPage.clickSelectedTab();
        await page.waitForTimeout(1000);

        // Verify radio buttons are present on this tab
        const allRadios = page.locator('input[type="radio"]');
        const count = await allRadios.count();
        expect(count).toBeGreaterThan(0);
    });

    test('TC-RB-005: Should navigate to Disabled tab and verify radio buttons exist', async ({ page }) => {
        await radioPage.clickDisabledTab();
        await page.waitForTimeout(1000);

        const allRadios = page.locator('input[type="radio"]');
        const count = await allRadios.count();
        expect(count).toBeGreaterThan(0);
    });

    test('TC-RB-006: Should select payment method and click Continue', async ({ page }) => {
        await radioPage.selectCOD();
        await expect(radioPage.codRadio).toBeChecked();

        await radioPage.clickContinue();
        await page.waitForTimeout(500);
    });
});
