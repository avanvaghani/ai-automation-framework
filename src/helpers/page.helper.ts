import type { Page } from '@playwright/test';
import { TIMEOUTS } from '../constants/timeouts.constants.js';

export class PageHelper {
    constructor(private page: Page) { }

    async navigateTo(path: string): Promise<void> {
        await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: TIMEOUTS.NAVIGATION });
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getCurrentURL(): Promise<string> {
        return this.page.url();
    }

    async takeScreenshot(name: string): Promise<Buffer> {
        return await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
    }

    async waitForURL(url: string | RegExp, timeout?: number): Promise<void> {
        await this.page.waitForURL(url, { timeout: timeout ?? TIMEOUTS.NAVIGATION });
    }

    async waitForSelector(selector: string, timeout?: number): Promise<void> {
        await this.page.waitForSelector(selector, { timeout: timeout ?? TIMEOUTS.LONG });
    }

    async getPage(): Page {
        return this.page;
    }
}
