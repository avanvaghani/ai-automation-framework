import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class AlertPage extends BasePage {
    readonly deleteButton: Locator;
    readonly resultMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.deleteButton = page.getByRole('button', { name: /delete/i }).first();
        this.resultMessage = page.locator('span.text-green-600, span.text-red-600, .result, .message').first();
    }

    async goToAlertPage(): Promise<void> {
        await this.navigate('/ui/alert');
    }

    async clickDeleteAndAccept(): Promise<string> {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.deleteButton.click();
        const dialog = await dialogPromise;
        const message = dialog.message();
        await dialog.accept();
        return message;
    }

    async clickDeleteAndDismiss(): Promise<string> {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.deleteButton.click();
        const dialog = await dialogPromise;
        const message = dialog.message();
        await dialog.dismiss();
        return message;
    }

    async clickDeleteAndPromptAccept(inputText: string): Promise<string> {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.deleteButton.click();
        const dialog = await dialogPromise;
        const message = dialog.message();
        await dialog.accept(inputText);
        return message;
    }

    async clickDeleteAndPromptDismiss(): Promise<string> {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.deleteButton.click();
        const dialog = await dialogPromise;
        const message = dialog.message();
        await dialog.dismiss();
        return message;
    }

    async clickConfirmTab(): Promise<void> {
        await this.page.getByText('Confirm', { exact: true }).first().click();
    }

    async clickPromptTab(): Promise<void> {
        await this.page.getByText('Prompt', { exact: true }).first().click();
    }
}
