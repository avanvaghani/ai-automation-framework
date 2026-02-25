export class CustomLogger {
    private static formatMessage(level: string, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}`;
    }

    static info(message: string): void {
        console.log(this.formatMessage('INFO', message));
    }

    static warn(message: string): void {
        console.warn(this.formatMessage('WARN', message));
    }

    static error(message: string): void {
        console.error(this.formatMessage('ERROR', message));
    }

    static step(stepName: string): void {
        console.log(this.formatMessage('STEP', `▶ ${stepName}`));
    }

    static success(message: string): void {
        console.log(this.formatMessage('PASS', `✅ ${message}`));
    }

    static separator(): void {
        console.log('─'.repeat(60));
    }
}
