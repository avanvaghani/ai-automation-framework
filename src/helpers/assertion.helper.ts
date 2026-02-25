import { expect, type Locator, type Page } from '@playwright/test';

export class AssertionHelper {
    constructor(private page: Page) { }

    async expectVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    async expectHidden(locator: Locator): Promise<void> {
        await expect(locator).toBeHidden();
    }

    async expectText(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator).toHaveText(expectedText);
    }

    async expectContainsText(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator).toContainText(expectedText);
    }

    async expectValue(locator: Locator, expectedValue: string): Promise<void> {
        await expect(locator).toHaveValue(expectedValue);
    }

    async expectChecked(locator: Locator): Promise<void> {
        await expect(locator).toBeChecked();
    }

    async expectNotChecked(locator: Locator): Promise<void> {
        await expect(locator).not.toBeChecked();
    }

    async expectDisabled(locator: Locator): Promise<void> {
        await expect(locator).toBeDisabled();
    }

    async expectEnabled(locator: Locator): Promise<void> {
        await expect(locator).toBeEnabled();
    }

    async expectURL(expectedURL: string | RegExp): Promise<void> {
        await expect(this.page).toHaveURL(expectedURL);
    }

    async expectTitle(expectedTitle: string | RegExp): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async expectCount(locator: Locator, count: number): Promise<void> {
        await expect(locator).toHaveCount(count);
    }

    async expectAttribute(locator: Locator, attribute: string, value: string | RegExp): Promise<void> {
        await expect(locator).toHaveAttribute(attribute, value);
    }

    async expectPlaceholder(locator: Locator, placeholder: string): Promise<void> {
        await expect(locator).toHaveAttribute('placeholder', placeholder);
    }
}
