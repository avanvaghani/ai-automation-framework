import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class WebTablePage extends BasePage {
    readonly table: Locator;
    readonly tableHeaders: Locator;
    readonly tableRows: Locator;
    readonly tableCells: Locator;
    readonly searchInput: Locator;
    readonly paginationNext: Locator;
    readonly paginationPrev: Locator;
    readonly paginationPages: Locator;

    constructor(page: Page) {
        super(page);
        this.table = page.locator('table').first();
        this.tableHeaders = page.locator('table thead th');
        this.tableRows = page.locator('table tbody tr');
        this.tableCells = page.locator('table tbody td');
        this.searchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first();
        this.paginationNext = page.locator('[aria-label="Next"], .next, button:has-text("Next")').first();
        this.paginationPrev = page.locator('[aria-label="Previous"], .prev, button:has-text("Previous")').first();
        this.paginationPages = page.locator('.pagination a, .pagination button, .page-link');
    }

    async goToWebTablePage(): Promise<void> {
        await this.navigate('/ui/table');
    }

    async getRowCount(): Promise<number> {
        return await this.tableRows.count();
    }

    async getHeaderCount(): Promise<number> {
        return await this.tableHeaders.count();
    }

    async getCellText(row: number, col: number): Promise<string> {
        return (await this.tableRows.nth(row).locator('td').nth(col).textContent()) ?? '';
    }

    async getHeaderText(index: number): Promise<string> {
        return (await this.tableHeaders.nth(index).textContent()) ?? '';
    }

    async clickColumnHeader(headerText: string): Promise<void> {
        await this.tableHeaders.getByText(headerText, { exact: false }).click();
    }

    async searchTable(searchText: string): Promise<void> {
        await this.searchInput.fill(searchText);
    }

    async goToNextPage(): Promise<void> {
        await this.paginationNext.click();
    }

    async goToPreviousPage(): Promise<void> {
        await this.paginationPrev.click();
    }

    async goToPage(pageNumber: number): Promise<void> {
        await this.paginationPages.getByText(pageNumber.toString(), { exact: true }).click();
    }

    async selectRowCheckbox(rowIndex: number): Promise<void> {
        await this.tableRows.nth(rowIndex).locator('input[type="checkbox"]').check();
    }

    async clickStaticTab(): Promise<void> {
        await this.page.getByText('Static Web Table', { exact: false }).first().click();
    }

    async clickDynamicTab(): Promise<void> {
        await this.page.getByText('Dynamic Web Table', { exact: false }).first().click();
    }

    async clickSortTab(): Promise<void> {
        await this.page.getByText('Table With Sort', { exact: false }).first().click();
    }

    async clickPaginationTab(): Promise<void> {
        await this.page.getByText('Table Pagination', { exact: false }).first().click();
    }

    async clickCheckboxTab(): Promise<void> {
        await this.page.getByText('Table With Checkbox', { exact: false }).first().click();
    }

    async clickMultipleTableTab(): Promise<void> {
        await this.page.getByText('Multiple Table', { exact: false }).first().click();
    }
}
