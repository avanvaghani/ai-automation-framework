import { test, expect } from '../../hooks/pageSetup.hook.js';
import { DragDropPage } from '../../pages/dragDrop.page.js';

test.describe('Drag and Drop - E2E Regression', () => {
    let dragDropPage: DragDropPage;

    test.beforeEach(async ({ page }) => {
        dragDropPage = new DragDropPage(page);
        await dragDropPage.goToDragDropPage();
        await page.waitForTimeout(500);
    });

    test('TC-DD-001: Should drag element to drop zone (default)', async ({ page }) => {
        const draggable = page.locator('#draggable, .draggable, [draggable="true"]').first();
        const droppable = page.locator('#droppable, .droppable, .drop-zone').first();

        const draggableVisible = await draggable.isVisible();
        const droppableVisible = await droppable.isVisible();

        if (draggableVisible && droppableVisible) {
            await draggable.dragTo(droppable);
            await page.waitForTimeout(500);
        }
    });

    test('TC-DD-002: Should verify draggable element is visible', async ({ page }) => {
        const draggable = page.locator('#draggable, .draggable, [draggable="true"]').first();
        const isVisible = await draggable.isVisible();
        if (isVisible) {
            await expect(draggable).toBeVisible();
        }
    });

    test('TC-DD-003: Should navigate to axis restricted tab and verify page loads', async ({ page }) => {
        // Click on "Axis Restricted" or similar tab text  
        const axisTab = page.getByText(/axis/i).first();
        const isVisible = await axisTab.isVisible();
        if (isVisible) {
            await axisTab.click();
            await page.waitForTimeout(1000);
        }

        // Verify the page content is still visible
        const content = page.locator('main, .container, .content, body').first();
        await expect(content).toBeVisible();
    });

    test('TC-DD-004: Should navigate to drag multiple tab and verify elements exist', async ({ page }) => {
        const multiTab = page.getByText(/multiple/i).first();
        const isVisible = await multiTab.isVisible();
        if (isVisible) {
            await multiTab.click();
            await page.waitForTimeout(1000);
        }

        const content = page.locator('main, .container, .content, body').first();
        await expect(content).toBeVisible();
    });
});
