class LoginPage {


    constructor(page) {
        this.page =page;
        this.loginBtn = page.locator("#login");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

async goToLoginPage(url){

    await this.page.goto(url);
}

    async login(username, password) {
        await this.username.type(username);
        await this.password.type(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');


    }
}
module.exports = {LoginPage};