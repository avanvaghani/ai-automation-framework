import type { Page, Locator, FrameLocator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class FramesPage extends BasePage {
    readonly iframeLocator: FrameLocator;

    constructor(page: Page) {
        super(page);
        this.iframeLocator = page.frameLocator('iframe').first();
    }

    async goToFramesPage(): Promise<void> {
        await this.navigate('/ui/frames');
    }

    getFrame(selector: string = 'iframe'): FrameLocator {
        return this.page.frameLocator(selector).first();
    }

    getNestedFrame(outerSelector: string, innerSelector: string): FrameLocator {
        return this.page.frameLocator(outerSelector).first().frameLocator(innerSelector).first();
    }

    getFrameByIndex(index: number): FrameLocator {
        return this.page.frameLocator('iframe').nth(index);
    }

    async getFrameUsername(frame?: FrameLocator): Promise<Locator> {
        const f = frame ?? this.iframeLocator;
        return f.locator('#username');
    }

    async getFramePassword(frame?: FrameLocator): Promise<Locator> {
        const f = frame ?? this.iframeLocator;
        return f.locator('#password');
    }

    async getFrameSubmitButton(frame?: FrameLocator): Promise<Locator> {
        const f = frame ?? this.iframeLocator;
        return f.locator('#submitButton, button[type="submit"]').first();
    }

    async fillFrameLoginForm(username: string, password: string, frame?: FrameLocator): Promise<void> {
        const f = frame ?? this.iframeLocator;
        await f.locator('#username').fill(username);
        await f.locator('#password').fill(password);
    }

    async submitFrameLogin(frame?: FrameLocator): Promise<void> {
        const f = frame ?? this.iframeLocator;
        await f.locator('#submitButton, button[type="submit"]').first().click();
    }

    async clickDefaultTab(): Promise<void> {
        await this.page.getByText('Default', { exact: true }).first().click();
    }

    async clickNestedIframeTab(): Promise<void> {
        await this.page.getByText('Nested iframe', { exact: false }).first().click();
    }

    async clickMultipleIframeTab(): Promise<void> {
        await this.page.getByText('Multiple iframe', { exact: false }).first().click();
    }

    async clickNestedWithMultipleTab(): Promise<void> {
        await this.page.getByText('Nested with Multiple', { exact: false }).first().click();
    }

    async clickWindowAlertFrameTab(): Promise<void> {
        await this.page.getByText('Window Alert Frame', { exact: false }).first().click();
    }
}
