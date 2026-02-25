// import { test, expect } from '../../hooks/pageSetup.hook.js';
// import { AlertPage } from '../../pages/alert.page.js';

// test.describe('JS Alerts - E2E Regression', () => {
//     let alertPage: AlertPage;

//     test.beforeEach(async ({ page }) => {
//         alertPage = new AlertPage(page);
//         await alertPage.goToAlertPage();
//     });

//     // test('TC-ALT-001: Should accept JS confirm dialog and verify message', async ({ page }) => {
//     //     const message = await alertPage.clickDeleteAndAccept();
//     //     expect(message.length).toBeGreaterThan(0);
//     // });

//     test('TC-ALT-002: Should dismiss JS confirm dialog', async ({ page }) => {
//         const message = await alertPage.clickDeleteAndDismiss();
//         expect(message.length).toBeGreaterThan(0);
//     });

//     // test('TC-ALT-003: Should navigate to Confirm tab and accept dialog', async ({ page }) => {
//     //     await alertPage.clickConfirmTab();
//     //     await page.waitForTimeout(1000);

//     //     const deleteBtn = page.getByRole('button', { name: /delete/i }).first();
//     //     const dialogPromise = page.waitForEvent('dialog');
//     //     await deleteBtn.click();
//     //     const dialog = await dialogPromise;

//     //     expect(dialog.message().length).toBeGreaterThan(0);
//     //     await dialog.accept();
//     // });

//     test('TC-ALT-004: Should navigate to Prompt tab and handle dialog', async ({ page }) => {
//         await alertPage.clickPromptTab();
//         await page.waitForTimeout(1000);

//         // Set up dialog handler before triggering
//         page.on('dialog', async (dialog) => {
//             await dialog.accept('Test Input');
//         });

//         const triggerBtn = page.getByRole('button', { name: /delete/i }).first();
//         await triggerBtn.click();
//         await page.waitForTimeout(1000);
//     });

//     test('TC-ALT-005: Should navigate to Prompt tab and dismiss dialog', async ({ page }) => {
//         await alertPage.clickPromptTab();
//         await page.waitForTimeout(1000);

//         // Set up dialog handler before triggering
//         page.on('dialog', async (dialog) => {
//             await dialog.dismiss();
//         });

//         const triggerBtn = page.getByRole('button', { name: /delete/i }).first();
//         await triggerBtn.click();
//         await page.waitForTimeout(1000);
//     });
// });
