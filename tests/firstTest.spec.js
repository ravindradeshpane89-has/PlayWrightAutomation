const{test,expect,only} = require('@playwright/test');
test.describe.configure({mode:'parallel'})

test('@web FirstPlaywrightTestWithBrowserContext' , async({browser})=>
{
const context= await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginPagePractise");
console.log(await page.title());
await page.locator("[id='username']").type("ravindra");
await page.locator("#password").type("Learning@830$3mK2");
await page.locator("#signInBtn").click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toHaveText("Incorrect username/password.");
await page.locator("[id='username']").fill("");
await page.locator("[id='username']").fill("rahulshettyacademy");
await page.locator("#signInBtn").click();
console.log(await page.locator(".card-title a").nth(0).textContent());

});




test('FirstPlaywrightWithDefaultContext' , async({page})=>
{
await page.goto("https://google.com");
console.log(await page.title());
await expect(page).toHaveTitle("Google");
});

test('GetTextOfMultipleWebElements' , async({page})=>
{
await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
const firstName = page.locator("#firstName");
const lastName = page.locator("#lastName");
const email = page.locator("#userEmail");
const phoneNo = page.locator("#userMobile");
const occupation = page.locator("[formcontrolname ='occupation']");
const genderMale = page.locator("[value ='Male']");
const password = page.locator("#userPassword");
const confirmPassword = page.locator("#confirmPassword");
const chkBox = page.locator("input[formcontrolname='required']");
const loginBtn = page.locator("#login");
const loginBtnAfterReg = page.locator("button:has-text('Login')");
const itemsName = page.locator(".container .row b");

await firstName.type("Ravindra");
await lastName.type("Deshpande");
await email.type("Rav.desh@resp.com");
await phoneNo.type("9621217876");
await occupation.selectOption("Engineer");
await genderMale.click();
await password.type("Learning1@3");
await confirmPassword.type("Learning1@3");
await chkBox.click();
await loginBtn.click();
await expect(page.locator("h1:has-text('Account Created Successfully')")).toHaveText("Account Created Successfully");
await loginBtnAfterReg.click();
await email.type("Rav.desh@resp.com");
await password.type("Learning1@3");
await loginBtn.click();
//await page.waitForLoadState('networkidle');
await itemsName.first().waitFor();
//console.log(await itemsName.first());
console.log(await itemsName.allTextContents());

//console.log(await page.title());
//await expect(page).toHaveTitle("Google");
});

test('TitleCheck' , async({page})=>
{
await page.goto("https://google.com");
console.log(await page.title());
await expect(page).toHaveTitle("Google");
});

test('UserControls' , async({page})=>
{
    //to validate if checkbox is selected
await page.goto("https://rahulshettyacademy.com/loginPagePractise");
const docLink = page.locator("[href*='documents-request']");
await page.locator(".checkmark").nth(1).click();
await page.locator("button:has-text('Okay')").click();
await expect(await page.locator(".checkmark").nth(1)).toBeChecked();

//to validate if checkbox is unselected.
await page.locator(".checkmark").nth(0).click();
expect(await page.locator(".checkmark").nth(1).isChecked()).toBeFalsy();

//to validate if document link on page is blinking

await expect(docLink).toHaveAttribute('class','blinkingText');










//console.log(await page.title());
//await expect(page).toHaveTitle("Google");
});

test('handlingChildWindow' , async({browser})=>
{
const context= await browser.newContext();
const page = await context.newPage();
const docLink = page.locator("[href*='documents-request']");
const username = page.locator("[id='username']");
await page.goto("https://rahulshettyacademy.com/loginPagePractise");

const [newPage] = await Promise.all([context.waitForEvent('page'), docLink.click(),]);
const text = await newPage.locator(".red").textContent();
const domain = text.split("@")[1].split(" ")[0];
console.log(domain);
await username.type(domain);

console.log(await username.inputValue());

});




