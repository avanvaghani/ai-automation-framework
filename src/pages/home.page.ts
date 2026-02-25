import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class HomePage extends BasePage {
    readonly uiTestingCard: Locator;
    readonly apiTestingCard: Locator;
    readonly dbTestingCard: Locator;
    readonly heading: Locator;

    constructor(page: Page) {
        super(page);
        this.uiTestingCard = page.getByText('UI Testing Concepts', { exact: false });
        this.apiTestingCard = page.getByText('API Testing', { exact: false });
        this.dbTestingCard = page.getByText('Database Testing', { exact: false });
        this.heading = page.locator('h1, .hero-title').first();
    }

    async goToHomePage(): Promise<void> {
        await this.navigate('/');
    }

    async clickUITestingConcepts(): Promise<void> {
        await this.uiTestingCard.click();
    }

    async clickAPITesting(): Promise<void> {
        await this.apiTestingCard.click();
    }
}
