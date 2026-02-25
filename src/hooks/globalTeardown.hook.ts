import { CustomLogger } from '../helpers/customLogger.helper.js';

async function globalTeardown() {
    CustomLogger.separator();
    CustomLogger.info('✅ E2E Test Suite Complete');
    CustomLogger.separator();
}

export default globalTeardown;
