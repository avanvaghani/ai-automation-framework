import type { Page } from '@playwright/test';

export class BrowserHelper {
    constructor(private page: Page) { }

    async handleAlertAccept(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.page.once('dialog', async (dialog) => {
                const message = dialog.message();
                await dialog.accept();
                resolve(message);
            });
        });
    }

    async handleAlertDismiss(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.page.once('dialog', async (dialog) => {
                const message = dialog.message();
                await dialog.dismiss();
                resolve(message);
            });
        });
    }

    async handlePromptAccept(inputText: string): Promise<string> {
        return new Promise<string>((resolve) => {
            this.page.once('dialog', async (dialog) => {
                const message = dialog.message();
                await dialog.accept(inputText);
                resolve(message);
            });
        });
    }

    async handlePromptDismiss(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.page.once('dialog', async (dialog) => {
                const message = dialog.message();
                await dialog.dismiss();
                resolve(message);
            });
        });
    }

    async switchToFrame(frameSelector: string) {
        return this.page.frameLocator(frameSelector);
    }

    async waitForNewPage(action: () => Promise<void>): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            action(),
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }

    async getAllPages(): Promise<Page[]> {
        return this.page.context().pages();
    }

    async closeCurrentPage(): Promise<void> {
        await this.page.close();
    }

    async reloadPage(): Promise<void> {
        await this.page.reload();
    }

    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    async goForward(): Promise<void> {
        await this.page.goForward();
    }
}
