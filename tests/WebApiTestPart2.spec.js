const{test,expect,only} = require('@playwright/test');
const { text } = require('@playwright/test');
let webContext;
const inputEmail ="Rav.desh@resp.com";

test.beforeAll(async ({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/client/");
const loginBtn = page.getByRole("button",{name: 'Login'});
const itemsName = page.locator(".container .row b");
const email = page.getByPlaceholder("email@example.com");
const password = page.getByPlaceholder("enter your passsword");
await email.type(inputEmail);
await password.type("Learning1@3");
await loginBtn.click();
await page.waitForLoadState('networkidle');
await itemsName.last().waitFor();
await context.storageState({path:'state.json'});
webContext = await browser.newContext({storageState:'state.json'});

})

test('clientLogin' , async()=>
{
const page = await webContext.newPage();
await page.goto("https://rahulshettyacademy.com/client/");
const products = page.locator(".card-body");
const requiredProduct ="ZARA COAT 3";

// add-to-cart based on product supplied

await products.filter({hasText:'ZARA COAT 3'}).getByRole("button",{name:' Add To Cart'}).click();

// validate if product is added to cart.
await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();
await page.waitForLoadState("networkidle");
await expect(page.getByText(requiredProduct)).toBeVisible();

// delete the product from cart
//await cartProduct.locator("i").click();
//await page.pause();

// checkout

await page.getByRole("button",{name:'Checkout'}).click();
const personalInfoSection =page.locator(".form__cc");
await personalInfoSection.waitFor();

//apply coupon and place the order

const creditCardNumber = page.locator(".input").nth(0);
const expiryDate = page.locator(".input").nth(1);
const expiryYear = page.locator(".input").nth(2);
const cvv = page.locator(".input").nth(3);
const nameOnCard =page.locator(".input").nth(4);
const applyCoupon =page.locator(".input").nth(5);
const applyCouponBtn =page.getByRole("button",{name:'Apply Coupon'});
const emailText = page.locator(".user__name label");
const selectCountry =page.locator("[placeholder ='Select Country']");
const couponApplyMsg = page.getByText("* Coupon Applied");
const placeOrderBtn = page.getByText("Place Order ");

await creditCardNumber.fill(" ");
await creditCardNumber.type("4642 9931 9292 2294");
await expiryDate.selectOption("10");
await expiryYear.selectOption("30");
await cvv.type("126");
await nameOnCard.type("Ravindra");
await applyCoupon.type("rahulshettyacademy");
await applyCouponBtn.click();
await expect(couponApplyMsg).toBeVisible();

//validate if email is correctly populated

await expect (emailText).toHaveText(inputEmail);

//select country and place order

await selectCountry.pressSequentially("Ind");
//await countryList.waitFor();
await page.getByRole("button",{name:'India'}).nth(1).click();

await placeOrderBtn.click();

// validate if order placed successfully

const orderSuccessfulMsg = page.getByText(" Thankyou for the order. ");

await expect(orderSuccessfulMsg).toBeVisible();

//print order id on console

const orderIdText =await page.locator("td.em-spacer-1 label").nth(1).textContent();
const exactOrderId= orderIdText.split("|")[1].trim();
console.log(exactOrderId);

// validate orderId displayed on order history page.
const orderHistoryPageLink = page.getByText(" Orders History Page ");

await orderHistoryPageLink.click();

await page.locator("tbody tr").filter({hasText:exactOrderId}).getByRole("button",{name:'View'}).click();

// validate order id on order summary page

const id = page.locator(".col-text");
await expect(id).toHaveText(exactOrderId);
});