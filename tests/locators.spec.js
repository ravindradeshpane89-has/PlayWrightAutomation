const{test,expect,only} = require('@playwright/test');
const { text } = require('@playwright/test');

test('locator validations' , async({page})=>
{
await page.goto("https://rahulshettyacademy.com/angularpractice");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Female");
//await page.getByLabel("Name").fill("Ravi");
await page.getByPlaceholder("Password").fill("learning");
await page.getByRole("button", {name: 'Submit'}).click();
await expect(page.getByText(" The Form has been submitted successfully!")).toBeVisible();
await page.getByRole("link", {name: 'Shop'}).click();
await page.waitForLoadState("networkidle");

//locator chaining

await page.locator("app-card").filter({hasText:'Samsung Note 8'}).getByRole("button").click();


});