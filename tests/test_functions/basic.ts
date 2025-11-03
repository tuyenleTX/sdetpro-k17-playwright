import { Locator, Page } from "@playwright/test";
import { SLUGS } from "../../constants/slugs";

export const handleDropdown = async (page: Page) => {
    await page.goto(SLUGS.DROPDOWN_SLUG);
    const dropdownLoc: Locator = page.locator('#dropdown');

    //1. Select Option 1 - Index
    await page.waitForTimeout(2 * 1000);
    await dropdownLoc.selectOption({ index: 1 });
    //2. Select Option 2 - Value
    await page.waitForTimeout(2 * 1000);
    await dropdownLoc.selectOption({ value: '2' })
    //3. Select Option 3 - Label or Visible text
    await page.waitForTimeout(2 * 1000);
    await dropdownLoc.selectOption({ label: 'Option 1' });
}


export const handleIframe = async (page: Page, iFrameSel: string) => {

    const iframeLoc = page.frameLocator(iFrameSel);

    const textEditorLoc = iframeLoc.locator('body > p');

    await textEditorLoc.click();
}