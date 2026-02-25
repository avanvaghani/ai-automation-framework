import type { Page, Locator } from '@playwright/test';
import { TIMEOUTS } from '../constants/timeouts.constants.js';

export class ActionsHelper {
    constructor(private page: Page) { }

    async clickElement(locator: Locator, options?: { timeout?: number }): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: options?.timeout ?? TIMEOUTS.MEDIUM });
        await locator.click();
    }

    async doubleClickElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await locator.dblclick();
    }

    async rightClickElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await locator.click({ button: 'right' });
    }

    async typeText(locator: Locator, text: string, options?: { clear?: boolean }): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        if (options?.clear) {
            await locator.clear();
        }
        await locator.fill(text);
    }

    async selectDropdownByValue(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await locator.selectOption({ value });
    }

    async selectDropdownByLabel(locator: Locator, label: string): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await locator.selectOption({ label });
    }

    async selectDropdownByIndex(locator: Locator, index: number): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await locator.selectOption({ index });
    }

    async checkCheckbox(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await locator.check();
    }

    async uncheckCheckbox(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await locator.uncheck();
    }

    async selectRadio(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await locator.check();
    }

    async hoverElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await locator.hover();
    }

    async dragAndDrop(source: Locator, target: Locator): Promise<void> {
        await source.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await target.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await source.dragTo(target);
    }

    async scrollToElement(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    async getTextContent(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        return (await locator.textContent()) ?? '';
    }

    async getInputValue(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        return await locator.inputValue();
    }

    async waitForElementVisible(locator: Locator, timeout?: number): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: timeout ?? TIMEOUTS.LONG });
    }

    async waitForElementHidden(locator: Locator, timeout?: number): Promise<void> {
        await locator.waitFor({ state: 'hidden', timeout: timeout ?? TIMEOUTS.LONG });
    }
}
