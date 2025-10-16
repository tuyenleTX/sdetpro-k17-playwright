import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: './tests',
    projects: [
        {
            name: 'iPhone 14 Pro Max',
            use: { ...devices['iPhone 14 Pro Max'] }
        },
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] }
        }

    ],
    use: {
        baseURL: 'https://playwright.dev/',
        headless: false
    }
});