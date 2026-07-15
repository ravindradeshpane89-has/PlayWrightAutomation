import { test, Locator, Page } from '@playwright/test';

export class LoginPage {

    loginBtn: Locator;
    username: Locator;
    password: Locator;
    page: Page;


    constructor(page: Page) {
        this.page = page;
        this.loginBtn = page.locator("#login");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goToLoginPage(url: string) {

        await this.page.goto(url);
    }

    async login(username: string, password: string) {
        await this.username.type(username);
        await this.password.type(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');


    }
}