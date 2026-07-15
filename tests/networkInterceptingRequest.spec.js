const{test,expect,only,request} = require('@playwright/test');
const { text } = require('@playwright/test');

test('network Request Intercept' , async({page})=>
{

await page.goto("https://rahulshettyacademy.com/client/");
const loginBtn = page.getByRole("button",{name: 'Login'});
const email = page.getByPlaceholder("email@example.com");
const password = page.getByPlaceholder("enter your passsword");
await email.type("Rav.desh@resp.com");
await password.type("Learning1@3");
await loginBtn.click();
await page.waitForLoadState('networkidle');
await page.locator('button:has-text("ORDERS")').click(); 

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",

route=>{

    route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a4de40c85b8849b49d488b5"});
});

await page.locator('button:has-text("View")').first().click();
await page.pause();
});

test('network Request Abort' , async({page})=>
{

await page.goto("https://rahulshettyacademy.com/loginPagePractise/");
await page.locator("#username").type("rahulshettyacademy");
await page.locator("#password").type("Learning@830$3mK2");
await page.locator("#signInBtn").click();

await page.route("**/*.jpg",route=>route.abort());
await page.pause();

});