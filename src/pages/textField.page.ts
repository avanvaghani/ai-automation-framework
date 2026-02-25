import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class TextFieldPage extends BasePage {
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly registerButton: Locator;
    readonly textArea: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = page.locator('#name');
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.registerButton = page.getByRole('button', { name: /register/i });
        this.textArea = page.locator('textarea').first();
        this.successMessage = page.locator('.success-message, .alert-success, .toast-message').first();
    }

    async goToTextFieldPage(): Promise<void> {
        await this.navigate('/ui');
    }

    async fillRegistrationForm(name: string, email: string, password: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async clickRegister(): Promise<void> {
        await this.registerButton.click();
    }

    async fillTextArea(text: string): Promise<void> {
        await this.textArea.fill(text);
    }

    async getNameValue(): Promise<string> {
        return await this.nameInput.inputValue();
    }

    async getEmailValue(): Promise<string> {
        return await this.emailInput.inputValue();
    }

    async isNameFieldDisabled(): Promise<boolean> {
        return await this.nameInput.isDisabled();
    }

    async clickWithPlaceholderTab(): Promise<void> {
        await this.page.getByText('With placeholder', { exact: false }).first().click();
    }

    async clickWithoutPlaceholderTab(): Promise<void> {
        await this.page.getByText('Without placeholder', { exact: false }).first().click();
    }

    async clickTooltipTab(): Promise<void> {
        await this.page.getByText('With ToolTip', { exact: false }).first().click();
    }

    async clickMultilineTab(): Promise<void> {
        await this.page.getByText('Multiline', { exact: false }).first().click();
    }

    async clickDisabledTab(): Promise<void> {
        await this.page.getByText('Disabled', { exact: false }).first().click();
    }
}
