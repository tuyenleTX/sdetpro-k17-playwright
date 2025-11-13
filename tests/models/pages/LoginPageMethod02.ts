import { ElementHandle, Locator, Page } from "@playwright/test";
import { TIMEOUT } from "../../../constants/timeout";

export default class LoginPageMethod01 {
    private usernameSel: string = '#username';
    private passwordSel: string = '#password';
    private loginBtnsel: string = 'button[type="submit"]';

    constructor(private page: Page) {
        this.page = page;
    }

    public usernameLoc(): Locator {
        return this.page.locator(this.usernameSel);

    }

    public passwordLoc(): Locator {
        return this.page.locator(this.passwordSel);
    }

    public clickOnLoginBtn(): Locator {
        return this.page.locator(this.loginBtnsel);
    }
}