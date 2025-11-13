import test from '@playwright/test';
import { SLUGS } from '../constants/slugs';
import LoginPageMethod01 from './models/pages/LoginPageMethod01';

const LOGIN_CRED = {
    username: "tomesmith",
    password: "SuperSecretPassword!"
};

test('Test POM - Method 01', async({page}) => {
    await page.goto(SLUGS.LOGIN);
    const loginPage = new LoginPageMethod01(page);
    await loginPage.inputUsername(LOGIN_CRED.username);
    await loginPage.inputPassword(LOGIN_CRED.password);
    await loginPage.clickOnLoginBtn();
})

test('Test POM - Method 01 custom', async({page}) => {
    await page.goto(SLUGS.LOGIN);
    const loginPage = new LoginPageMethod01(page);
    await loginPage.fillLoginForm(LOGIN_CRED);
    
})