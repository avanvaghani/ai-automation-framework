import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class CheckboxPage extends BasePage {
    readonly emailCheckbox: Locator;
    readonly whatsappCheckbox: Locator;
    readonly checkboxC: Locator;
    readonly checkboxD: Locator;
    readonly modeCheckboxes: Locator;
    readonly continueButton: Locator;
    readonly resultMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.emailCheckbox = page.locator('#domain_a');
        this.whatsappCheckbox = page.locator('#domain_b');
        this.checkboxC = page.locator('#domain_c');
        this.checkboxD = page.locator('#domain_d');
        this.modeCheckboxes = page.locator('[id^="mode_"]');
        this.continueButton = page.locator('#mode_g');
        this.resultMessage = page.locator('#result, .result, .message').first();
    }

    async goToCheckboxPage(): Promise<void> {
        await this.navigate('/ui/checkbox');
    }

    async checkEmail(): Promise<void> {
        await this.emailCheckbox.check();
    }

    async uncheckEmail(): Promise<void> {
        await this.emailCheckbox.uncheck();
    }

    async checkWhatsapp(): Promise<void> {
        await this.whatsappCheckbox.check();
    }

    async checkMultiple(ids: string[]): Promise<void> {
        for (const id of ids) {
            await this.page.locator(`#${id}`).check();
        }
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async isEmailChecked(): Promise<boolean> {
        return await this.emailCheckbox.isChecked();
    }

    async isCheckboxDisabled(id: string): Promise<boolean> {
        return await this.page.locator(`#${id}`).isDisabled();
    }

    async clickDefaultTab(): Promise<void> {
        await this.page.getByText('Default', { exact: true }).first().click();
    }

    async clickSelectedTab(): Promise<void> {
        await this.page.getByText('Selected', { exact: false }).first().click();
    }

    async clickDisabledTab(): Promise<void> {
        await this.page.getByText('Disabled', { exact: false }).first().click();
    }
}
