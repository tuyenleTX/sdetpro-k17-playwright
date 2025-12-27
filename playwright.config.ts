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
        baseURL: 'https://demowebshop.tricentis.com/',
        //baseURL: 'https://the-internet.herokuapp.com/',
        headless: false,
        //Implicit wait | Global wait
        actionTimeout: 5 * 1000
    },
    timeout: 60 * 1000
});