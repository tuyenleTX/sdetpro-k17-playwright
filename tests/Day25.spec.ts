import {test} from "@playwright/test"

// Fixture: set up and provide by default: 5 fixtures totally
test(`Hello Playwright`, async ({page}) => {
    await page.goto('/');
   // await page.waitForTimeout(1000);
})