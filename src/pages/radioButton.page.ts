import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class RadioButtonPage extends BasePage {
    readonly upiRadio: Locator;
    readonly walletRadio: Locator;
    readonly netBankingRadio: Locator;
    readonly codRadio: Locator;
    readonly emiRadio: Locator;
    readonly continueButton: Locator;
    readonly resultMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.upiRadio = page.locator('#attended');
        this.walletRadio = page.locator('#attended_b');
        this.netBankingRadio = page.locator('#attended_c');
        this.codRadio = page.locator('#attended_d');
        this.emiRadio = page.locator('#attended_e');
        this.continueButton = page.locator('#btn');
        this.resultMessage = page.locator('#result, .result, .message').first();
    }

    async goToRadioButtonPage(): Promise<void> {
        await this.navigate('/ui/radio');
    }

    async selectUPI(): Promise<void> {
        await this.upiRadio.check();
    }

    async selectWallet(): Promise<void> {
        await this.walletRadio.check();
    }

    async selectNetBanking(): Promise<void> {
        await this.netBankingRadio.check();
    }

    async selectCOD(): Promise<void> {
        await this.codRadio.check();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async isUPISelected(): Promise<boolean> {
        return await this.upiRadio.isChecked();
    }

    async isRadioDisabled(id: string): Promise<boolean> {
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
