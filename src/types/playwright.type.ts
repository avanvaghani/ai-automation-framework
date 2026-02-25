import { type Page, type Locator, type BrowserContext, type FrameLocator } from '@playwright/test';

export type { Page, Locator, BrowserContext, FrameLocator };

export interface TestConfig {
    baseURL: string;
    headless: boolean;
    timeout: number;
}

export interface SelectOption {
    label?: string;
    value?: string;
    index?: number;
}

export interface DragDropCoordinates {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
}
