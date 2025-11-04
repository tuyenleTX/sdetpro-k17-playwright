import { test, expect, Dialog, Page } from "@playwright/test";

import { SLUGS } from "../constants/slugs";
import { TIMEOUT, TIMEOUT_AMOUNT } from "../constants/timeout";

const SELECTORS = {
    jsAlert: 'button[onclick="jsAlert()"]',
    jsConfirm: 'button[onclick="jsConfirm()"]',
    jsPrompt: 'button[onclick="jsPrompt()"]',
    textResult: '#result'
}
/**
 * 
 * @description Handle dialog
 * @param page
 * @param accept 
 * @param promptText 
 */
const handleJSDialog = async (page: Page, accept: boolean, promptText?: string) => {
    page.on("dialog", async (dialog: Dialog) => {
        if (accept && promptText) {
            await dialog.accept(promptText);
        } else if (accept && !promptText) {
            await dialog.accept();
        }
        else {
            await dialog.dismiss();
        }
    })
}

const printTextResult = async (page: Page) => {
    const textResult = await page.locator(SELECTORS.textResult).innerText();
    console.log(`${textResult}`);
}

const getAdvertisingParams = async (page: Page, adId: string) => {
    return await page.evaluate((adSlotId) => {
        const slot = googletag.pubads().getSlots().find(({ getSlotElementId }) => getSlotElementId() === adSlotId);
        return slot.getTargetingMap();
    }, adId)

}
/**
 * 
 * @description Scroll to bottom base on percentage
 * @param page
 */
const scrollToBottom = async (page: Page, scrollPercentage: number = 1) => {
    if (scrollPercentage) {
        await page.evaluate((percentage: number) => {
            window.scrollTo(0, document.body.scrollHeight * percentage);
        }, scrollPercentage)
    }
}

test.describe('Handle dialog', () => {
    test('Handle JS Alert', async ({ page }) => {
        await page.goto(SLUGS.JSALERT);
        await handleJSDialog(page, true);
        await page.locator(SELECTORS.jsAlert).click();
        await page.waitForTimeout(TIMEOUT_AMOUNT.TWO_SECONDS);
        await printTextResult(page);
    });

    test('Handle JS Confirm', async ({ page }) => {
        await page.goto(SLUGS.JSALERT);
        await handleJSDialog(page, false);
        await page.locator(SELECTORS.jsConfirm).click();
        await page.waitForTimeout(TIMEOUT_AMOUNT.TWO_SECONDS);
        await printTextResult(page);
    });

    test('Handle JS Prompt', async ({ page }) => {
        await page.goto(SLUGS.JSALERT);
        await handleJSDialog(page, true, 'Hello, tui ten teo');
        await page.locator(SELECTORS.jsPrompt).click();
        await page.waitForTimeout(TIMEOUT_AMOUNT.TWO_SECONDS);
        await printTextResult(page);
    });
})

test.describe('Execute JS Snippet', () => {
    test('Execute without parameter', async ({ page }) => {
        await page.goto(SLUGS.FLOATING_MENU);
        // Scroll to botton
        await scrollToBottom(page);
        // Verification menu still in viewport
        await expect(page.locator('#menu')).toBeInViewport();
        await page.waitForTimeout(TIMEOUT_AMOUNT.TWO_SECONDS);
    });

    test('Execute with parameter', async ({ page }) => {
        await page.goto(SLUGS.FLOATING_MENU);
        const scrollPercentage = 0.5;
        // Scroll to botton
        scrollToBottom(page, scrollPercentage);

        // Verification menu still in viewport
        await expect(page.locator('#menu')).toBeInViewport();
        await page.waitForTimeout(TIMEOUT_AMOUNT.TWO_SECONDS);
    });

    test('Execute JS Prompt', async ({ page }) => {
        await page.goto(SLUGS.FLOATING_MENU);
        const scrollPercentage = 0.5;
        // Scroll to botton
        scrollToBottom(page, scrollPercentage);

        // Verification menu still in viewport
        await expect(page.locator('#menu')).toBeInViewport();
        await page.waitForTimeout(TIMEOUT_AMOUNT.TWO_SECONDS);
    });

    test('Execute and return values in real page', async ({ page }) => {
        await page.goto("https://www.foodandwine.com/");
        const adId = "leaderboard-flex-1";
        const leaderBoarFlexSel = `#${adId}`;
        // Trigger lazy load app
        // Scroll down a little
        await scrollToBottom(page, 0.1)
        // Click on any plank area
        page.mouse.click(0, 0);
        // Scroll up a little
        await page.mouse.wheel(0, -100);
        await scrollToBottom(page, 0);
        await page.waitForSelector(leaderBoarFlexSel, TIMEOUT.SECOND_15);

        const adParams = await getAdvertisingParams(page, adId);

        expect(adParams.docId[0]).toBe('6361217');

    });
})