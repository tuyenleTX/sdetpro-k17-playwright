import { test, expect, Dialog, Page } from "@playwright/test";

import { SLUGS } from "../constants/slugs";
import { TIMEOUT_AMOUNT } from "../constants/timeout";

const SELECTORS = {
    jsAlert: 'button[onclick="jsAlert()"]',
    jsConfirm: 'button[onclick="jsConfirm()"]',
    jsPrompt: 'button[onclick="jsPrompt()"]',
    textResult: '#result'
}

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