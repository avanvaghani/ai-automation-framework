import { CustomLogger } from '../helpers/customLogger.helper.js';

async function globalSetup() {
    CustomLogger.separator();
    CustomLogger.info('🚀 Starting E2E Test Suite');
    CustomLogger.info(`Base URL: ${process.env.BASE_URL || 'https://demoapps.qspiders.com'}`);
    CustomLogger.info(`Environment: ${process.env.NODE_ENV || 'test'}`);
    CustomLogger.separator();
}

export default globalSetup;
