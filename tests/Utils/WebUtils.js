class WebUtils{

    constructor(email,password){

    this.email =email;
    this.password =password;
    }



async loginAndGoToEvents(page){

    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").type(this.email);
    await page.getByLabel("password").type(this.password);
    await page.locator("#login-btn").click();
    await page.waitForLoadState('networkidle');
    await page.getByRole("link", { name: 'Events' }).first().click();
    //await page.getByRole("link",{name:'Browse Events →'}).waitFor();

}

}
module.exports = {WebUtils};