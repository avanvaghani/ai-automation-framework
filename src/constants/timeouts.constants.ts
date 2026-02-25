export const TIMEOUTS = {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 10000,
    EXTRA_LONG: 15000,
    NAVIGATION: 30000,
    PROGRESS_BAR: 20000,
} as const;

export type TimeoutKey = keyof typeof TIMEOUTS;
