import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class ButtonPage extends BasePage {
    readonly yesButton: Locator;
    readonly noButton: Locator;
    readonly resultMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.yesButton = page.locator('#btn');
        this.noButton = page.locator('#btn_two');
        this.resultMessage = page.locator('span.text-green-600, span.text-red-600').first();
    }

    async goToButtonPage(): Promise<void> {
        await this.navigate('/ui/button');
    }

    async clickYesButton(): Promise<void> {
        await this.yesButton.click();
    }

    async clickNoButton(): Promise<void> {
        await this.noButton.click();
    }

    async doubleClickYesButton(): Promise<void> {
        await this.yesButton.dblclick();
    }

    async rightClickYesButton(): Promise<void> {
        await this.yesButton.click({ button: 'right' });
    }

    async getResultMessage(): Promise<string> {
        await this.resultMessage.waitFor({ state: 'visible', timeout: 5000 });
        return (await this.resultMessage.textContent()) ?? '';
    }

    async clickDefaultTab(): Promise<void> {
        await this.page.getByText('Default Click', { exact: false }).first().click();
    }

    async clickRightClickTab(): Promise<void> {
        await this.page.getByText('Right Click', { exact: false }).first().click();
    }

    async clickDoubleClickTab(): Promise<void> {
        await this.page.getByText('Double Click', { exact: false }).first().click();
    }

    async clickSubmitTab(): Promise<void> {
        await this.page.getByText('Submit Click', { exact: false }).first().click();
    }

    async clickDisabledTab(): Promise<void> {
        await this.page.getByText('Disabled', { exact: true }).first().click();
    }
}
