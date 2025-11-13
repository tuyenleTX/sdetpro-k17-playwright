import { ElementHandle, Page } from "@playwright/test";
import { TIMEOUT } from "../../../constants/timeout";

export default class LoginPageMethod01 {
    private usernameSel: string = '#username';
    private passwordSel: string = '#password';
    private loginBtnsel: string = 'button[type="submit"]';

    constructor(private page: Page) {
        this.page = page;
    }

    public async fillLoginForm(loginCred: { username: string, password: string }): Promise<void> {
        await this.inputUsername(loginCred.username);
        await this.inputPassword(loginCred.password);
        await this.clickOnLoginBtn();
    }

    public async inputUsername(username: string): Promise<void> {
        //await this.page.locator(this.usernameSel).fill(username);
        const usernameLoc: ElementHandle = await this.page.waitForSelector(this.usernameSel, TIMEOUT.SECOND_3);
        await usernameLoc.fill(username);
    }

    public async inputPassword(password: string): Promise<void> {
        await this.page.locator(this.passwordSel).fill(password);
    }

    public async clickOnLoginBtn(): Promise<void> {
        await this.page.locator(this.loginBtnsel).click();
    }
}