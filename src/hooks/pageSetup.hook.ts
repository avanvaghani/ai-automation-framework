import { test as base } from '@playwright/test';
import { ActionsHelper } from '../helpers/actions.helper.js';
import { AssertionHelper } from '../helpers/assertion.helper.js';
import { BrowserHelper } from '../helpers/browser.helper.js';
import { PageHelper } from '../helpers/page.helper.js';

interface TestFixtures {
    actions: ActionsHelper;
    assertions: AssertionHelper;
    browserHelper: BrowserHelper;
    pageHelper: PageHelper;
}

export const test = base.extend<TestFixtures>({
    actions: async ({ page }, use) => {
        await use(new ActionsHelper(page));
    },
    assertions: async ({ page }, use) => {
        await use(new AssertionHelper(page));
    },
    browserHelper: async ({ page }, use) => {
        await use(new BrowserHelper(page));
    },
    pageHelper: async ({ page }, use) => {
        await use(new PageHelper(page));
    },
});

export { expect } from '@playwright/test';
