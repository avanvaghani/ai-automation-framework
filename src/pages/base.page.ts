import type { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    // Sidebar navigation
    readonly sidebarNav: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebarNav = page.locator('.sidebar, nav');
    }

    async navigate(path: string): Promise<void> {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getCurrentURL(): Promise<string> {
        return this.page.url();
    }

    async clickSidebarLink(linkText: string): Promise<void> {
        await this.page.getByText(linkText, { exact: false }).first().click();
    }

    async clickActionTab(tabText: string): Promise<void> {
        await this.page.locator('.action-tab, .nav-link, .tab-link, [role="tab"]')
            .getByText(tabText, { exact: false }).first().click();
    }

    async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
        await this.page.waitForSelector(selector, { state: 'visible', timeout });
    }
}
