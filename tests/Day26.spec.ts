import { expect, test } from "@playwright/test"
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

test('Form Authentication', async ({ page }) => {
    const USERNAME_SEL = "#username";
    const PASSWORD_SEL = "#password";
    const LOGIN_CRED = { username: "tomsmith", password: "SuperSecretPassword!" };
    const LOGIN_SEL = "button[type='submit']";
    const DASHBOARD_HEADING_SEL = 'h2';
    const EXPECTED_DASHBOARD_HEADING_TEXT = 'Secure Area';

    // Go to homepage
    await page.goto('/');
    // Navigate to the authentication page
    await page.locator("a").filter({ hasText: 'Form Authentication' }).click();

    await page.locator(USERNAME_SEL).fill(LOGIN_CRED.username);
    await page.locator(PASSWORD_SEL).fill(LOGIN_CRED.password);
    // Submit the form
    await page.locator(LOGIN_SEL).click();

    // Get the heading text on dashboard page
    const dashboardHeadingText = await page.locator(DASHBOARD_HEADING_SEL).textContent();
    console.log(dashboardHeadingText?.trim());

    const dashboardHeadingInnerText = await page.locator(DASHBOARD_HEADING_SEL).innerText();
    console.log(dashboardHeadingInnerText);

    expect(dashboardHeadingInnerText).toBe(EXPECTED_DASHBOARD_HEADING_TEXT);

})