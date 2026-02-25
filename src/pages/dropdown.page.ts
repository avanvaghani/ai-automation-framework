import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class DropdownPage extends BasePage {
    readonly countryCodeSelect: Locator;
    readonly phoneInput: Locator;
    readonly maleRadio: Locator;
    readonly femaleRadio: Locator;
    readonly otherRadio: Locator;
    readonly countrySelect: Locator;
    readonly stateSelect: Locator;
    readonly quantitySelect: Locator;
    readonly submitButton: Locator;
    readonly resultMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.countryCodeSelect = page.locator('#country_code');
        this.phoneInput = page.locator('#phone');
        this.maleRadio = page.locator('#male');
        this.femaleRadio = page.locator('#female');
        this.otherRadio = page.locator('#other');
        this.countrySelect = page.locator('#select3');
        this.stateSelect = page.locator('#select5');
        this.quantitySelect = page.locator('#select7');
        this.submitButton = page.getByRole('button', { name: /submit|register|continue/i }).first();
        this.resultMessage = page.locator('#result, .result, .message').first();
    }

    async goToDropdownPage(): Promise<void> {
        await this.navigate('/ui/dropdown');
    }

    async selectCountryCode(value: string): Promise<void> {
        await this.countryCodeSelect.selectOption(value);
    }

    async fillPhone(phone: string): Promise<void> {
        await this.phoneInput.fill(phone);
    }

    async selectGender(gender: 'male' | 'female' | 'other'): Promise<void> {
        const radioMap = { male: this.maleRadio, female: this.femaleRadio, other: this.otherRadio };
        await radioMap[gender].check();
    }

    async selectCountry(value: string): Promise<void> {
        await this.countrySelect.selectOption(value);
    }

    async selectState(value: string): Promise<void> {
        await this.stateSelect.selectOption(value);
    }

    async selectQuantity(value: string): Promise<void> {
        await this.quantitySelect.selectOption(value);
    }

    async clickSingleSelectTab(): Promise<void> {
        await this.page.getByText('Single Select', { exact: false }).first().click();
    }

    async clickMultiSelectTab(): Promise<void> {
        await this.page.getByText('Multi Select', { exact: false }).first().click();
    }

    async clickSearchSelectTab(): Promise<void> {
        await this.page.getByText('Search With Select', { exact: false }).first().click();
    }

    async clickDisabledTab(): Promise<void> {
        await this.page.getByText('Disabled', { exact: false }).first().click();
    }
}
