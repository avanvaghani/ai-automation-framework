export class UtilsHelper {
    static generateRandomString(length: number = 8): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    static generateRandomEmail(): string {
        return `test_${this.generateRandomString(6)}@test.com`;
    }

    static generateRandomPhone(): string {
        return `9${Math.floor(100000000 + Math.random() * 900000000)}`;
    }

    static formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day);
    }

    static async sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    static async retryAction<T>(
        action: () => Promise<T>,
        retries: number = 3,
        delay: number = 1000,
    ): Promise<T> {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                return await action();
            } catch (error) {
                if (attempt === retries) throw error;
                await this.sleep(delay);
            }
        }
        throw new Error('Retry action failed');
    }
}
