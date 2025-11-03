import { test, Page } from "@playwright/test";

import { handleDropdown, handleIframe } from "./test_functions/basic";
import { SLUGS } from "../constants/slugs";
import { TIMEOUT, TIMEOUT_AMOUNT } from "../constants/timeout";

const dropdownTest = "Handle Dropdown";
const iFrameTest = "Handle iFrame";
const mouseHoverDesc = "Handle mouse hover";
test(dropdownTest, async ({ page }) => {
    await handleDropdown(page);
});

test(iFrameTest, async ({ page }) => {
    const iframeSel = 'iframe[id^="mce"]';
    await page.goto(SLUGS.IFRAME_SLUG);
    //close license information
    await page.locator('button[class*="tox-notification__dismiss"] svg').click();

    await page.waitForTimeout(TIMEOUT_AMOUNT.THREE_SECONDS);
    await handleIframe(page, iframeSel);
});

test(mouseHoverDesc, async ({ page }) => {
    await page.goto(SLUGS.MOUSE_HOVER);

    const figureSel = '.figure';
    const imgSel = '.img';
    const usernameSel = 'h5';
    const hyperlinkSel = 'a';

    // Find all the figure locators
    const allFigureLocs = await page.locator(figureSel).all();

    // Loop over all figure elements
    for (const figure of allFigureLocs) {
        const imageLoc = figure.locator(imgSel);
        const usernameLoc = figure.locator(usernameSel);
        const hyperlinkLoc = figure.locator(hyperlinkSel);

        //before mouse hover
        console.log('before mouse hover');
        let usernameText = await usernameLoc.innerText();
        let isUsernameVisible = await usernameLoc.isVisible();
        let isHyperlinkVisible = await hyperlinkLoc.isVisible();

        console.log(`
            usernameText : ${usernameText},
            isUsernameVisible ${isUsernameVisible},
            isHyperlinkVisible ${isHyperlinkVisible}
            `);

        await imageLoc.hover();
        await page.waitForTimeout(TIMEOUT_AMOUNT.THREE_SECONDS);
        
        //after mouse hover
        console.log('after mouse hover');

        usernameText = await usernameLoc.innerText();
        isUsernameVisible = await usernameLoc.isVisible();
        isHyperlinkVisible = await hyperlinkLoc.isVisible();

        console.log(`
            usernameText : ${usernameText},
            isUsernameVisible ${isUsernameVisible},
            isHyperlinkVisible ${isHyperlinkVisible}
            `);
    }

});