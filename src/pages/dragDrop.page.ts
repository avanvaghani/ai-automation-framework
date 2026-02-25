import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class DragDropPage extends BasePage {
    readonly draggable: Locator;
    readonly dropZone: Locator;
    readonly resultMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.draggable = page.locator('#draggable, .draggable, [draggable="true"]').first();
        this.dropZone = page.locator('#droppable, .droppable, .drop-zone').first();
        this.resultMessage = page.locator('#result, .result, .message').first();
    }

    async goToDragDropPage(): Promise<void> {
        await this.navigate('/ui/dragDrop');
    }

    async dragToDropZone(): Promise<void> {
        await this.draggable.dragTo(this.dropZone);
    }

    async getDropZoneText(): Promise<string> {
        return (await this.dropZone.textContent()) ?? '';
    }

    async isDragComplete(): Promise<boolean> {
        const text = await this.getDropZoneText();
        return text.toLowerCase().includes('dropped') || text.toLowerCase().includes('success');
    }

    async clickDefaultTab(): Promise<void> {
        await this.page.getByText('Default', { exact: true }).first().click();
    }

    async clickAxisRestrictedTab(): Promise<void> {
        await this.page.getByText('Axis Restricted', { exact: false }).first().click();
    }

    async clickDragPositionTab(): Promise<void> {
        await this.page.getByText('Drag Position', { exact: false }).first().click();
    }

    async clickDragMultipleTab(): Promise<void> {
        await this.page.getByText('Drag Multiple', { exact: false }).first().click();
    }
}
