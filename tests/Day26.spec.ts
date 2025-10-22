import { test } from "@playwright/test"
import { TIMEOUT } from "../constants/timeout";
//Explicit wait
//const CUSTOM_TIMEOUT = { timeout: 15 * 1000 };

test(`Link text - XPATH`, async ({ page }) => {
    await page.goto('/');
    //Explicit wait | Custom wait
    const footerElement = await page.waitForSelector(
        '//a[contains(text(),"Elemental Selenium")]', TIMEOUT.SECOND_15);
    await footerElement.click();
    //debug purpose only
    await page.waitForTimeout(3 * 1000);
})

test(`Link text - CSS`, async ({ page }) => {
    await page.goto('/');
    //Explicit wait | Custom wait
    const footerElement = await page.waitForSelector(
        'a:has-text("Elemental Selenium")', TIMEOUT.SECOND_15);
    await footerElement.click();
    //debug purpose only
    await page.waitForTimeout(3 * 1000);
})


test(`Link text - Filtering`, async ({ page }) => {
    await page.goto('/');
    //Explicit wait | Custom wait
    const formAuthenLink = await page.locator("a").filter({ hasText: 'Form Authentication' })
    await formAuthenLink.click();
    //debug purpose only
    await page.waitForTimeout(3 * 1000);
})

test(`Link text - multimatching`, async ({ page }) => {
    await page.goto('/');
    //Explicit wait | Custom wait
    const allLinks = page.locator("a").filter({ visible: true });

    const matchItemCount = await allLinks.count();
    console.log(`matchItemCount: ${matchItemCount}`);

    await allLinks.first().click();
    await page.goBack();
    await allLinks.nth(2).click();


    await page.goBack();
    await allLinks.last().click();

    //debug purpose only
    await page.waitForTimeout(3 * 1000);
})