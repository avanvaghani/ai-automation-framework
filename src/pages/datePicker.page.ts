import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class DatePickerPage extends BasePage {
    readonly dateInput: Locator;
    readonly calendarPopup: Locator;
    readonly calendarDays: Locator;
    readonly calendarNextMonth: Locator;
    readonly calendarPrevMonth: Locator;
    readonly calendarMonthYear: Locator;
    readonly iconTrigger: Locator;

    constructor(page: Page) {
        super(page);
        this.dateInput = page.locator('input[placeholder*="Date" i], input[type="date"]').first();
        this.calendarPopup = page.locator('.datepicker, .calendar, .react-datepicker').first();
        this.calendarDays = page.locator('.datepicker td, .calendar td, .react-datepicker__day').filter({ hasNot: page.locator('.disabled, .other-month') });
        this.calendarNextMonth = page.locator('.next, [aria-label="Next Month"], .react-datepicker__navigation--next').first();
        this.calendarPrevMonth = page.locator('.prev, [aria-label="Previous Month"], .react-datepicker__navigation--previous').first();
        this.calendarMonthYear = page.locator('.datepicker-switch, .react-datepicker__current-month').first();
        this.iconTrigger = page.locator('.input-group-addon, .calendar-icon, button[aria-label="calendar"]').first();
    }

    async goToDatePickerPage(): Promise<void> {
        await this.navigate('/ui/datePick');
    }

    async clickDateInput(): Promise<void> {
        await this.dateInput.click();
    }

    async selectDay(day: number): Promise<void> {
        await this.calendarDays.getByText(day.toString(), { exact: true }).first().click();
    }

    async goToNextMonth(): Promise<void> {
        await this.calendarNextMonth.click();
    }

    async goToPreviousMonth(): Promise<void> {
        await this.calendarPrevMonth.click();
    }

    async getSelectedDate(): Promise<string> {
        return await this.dateInput.inputValue();
    }

    async typeDate(date: string): Promise<void> {
        await this.dateInput.fill(date);
    }

    async clickIconTrigger(): Promise<void> {
        await this.iconTrigger.click();
    }

    async clickSimpleDatePickerTab(): Promise<void> {
        await this.page.getByText('Simple Date Picker', { exact: false }).first().click();
    }

    async clickDropdownDatePickerTab(): Promise<void> {
        await this.page.getByText('Dropdown DatePicker', { exact: false }).first().click();
    }

    async clickIconTriggerTab(): Promise<void> {
        await this.page.getByText('Icon Trigger', { exact: false }).first().click();
    }
}
