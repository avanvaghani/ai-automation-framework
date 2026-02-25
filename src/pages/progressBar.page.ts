import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class ProgressBarPage extends BasePage {
    readonly startButton: Locator;
    readonly resetButton: Locator;
    readonly progressBar: Locator;
    readonly progressText: Locator;
    readonly resultMessage: Locator;
    readonly hiddenElement: Locator;
    readonly disabledElement: Locator;

    constructor(page: Page) {
        super(page);
        this.startButton = page.getByRole('button', { name: /start/i }).first();
        this.resetButton = page.getByRole('button', { name: /reset/i }).first();
        this.progressBar = page.locator('.progress-bar, [role="progressbar"], .progress').first();
        this.progressText = page.locator('.progress-bar, .progress-text, [role="progressbar"]').first();
        this.resultMessage = page.locator('#result, .result, .success, .message').first();
        this.hiddenElement = page.locator('#hidden-element, .hidden-element').first();
        this.disabledElement = page.locator('#disabled-element, .disabled-element, button:disabled').first();
    }

    async goToProgressBarPage(): Promise<void> {
        await this.navigate('/ui/progress');
    }

    async clickStart(): Promise<void> {
        await this.startButton.click();
    }

    async clickReset(): Promise<void> {
        await this.resetButton.click();
    }

    async getProgressPercentage(): Promise<string> {
        return (await this.progressText.textContent()) ?? '0';
    }

    async waitForProgressComplete(timeout: number = 20000): Promise<void> {
        await this.progressBar.waitFor({ state: 'visible', timeout: 5000 });
        await this.page.waitForFunction(
            () => {
                const bar = document.querySelector('.progress-bar, [role="progressbar"]');
                if (!bar) return false;
                const width = bar.getAttribute('style')?.match(/width:\s*(\d+)%/);
                return width && parseInt(width[1]) >= 100;
            },
            { timeout }
        );
    }

    async clickDefaultTab(): Promise<void> {
        await this.page.getByText('Default', { exact: true }).first().click();
    }

    async clickWithTimerTab(): Promise<void> {
        await this.page.getByText('With Timer', { exact: false }).first().click();
    }

    async clickWithElementTab(): Promise<void> {
        await this.page.getByText('With Element', { exact: true }).first().click();
    }

    async clickElementDisappearTab(): Promise<void> {
        await this.page.getByText('With Element Disappear', { exact: false }).first().click();
    }

    async clickDisabledElementTab(): Promise<void> {
        await this.page.getByText('Disabled Element', { exact: false }).first().click();
    }

    async clickHiddenElementTab(): Promise<void> {
        await this.page.getByText('Hidden Element', { exact: false }).first().click();
    }
}
