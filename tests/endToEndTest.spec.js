const{test,expect,only} = require('@playwright/test');
const { text } = require('@playwright/test');

test('clientLogin' , async({page})=>
{
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
const itemsName = page.locator(".container .row b");
const products = page.locator(".card-body");
const requiredProduct ="ZARA COAT 3";
const inputEmail ="Rav.desh@resp.com";
const passwd = "Learning1@3";
const loginBtn = page.locator("#login");
const email = page.locator("#userEmail");
const password = page.locator("#userPassword");
const cartBtn =page.locator("[routerlink*='cart']");
const cartProduct =page.locator("div.infoWrap");
await email.type(inputEmail);
await password.type(passwd);
await loginBtn.click();
await page.waitForLoadState('networkidle');
await itemsName.last().waitFor();

// add-to-cart based on product supplied

const count =await products.count();

for(let i =0;i<count;i++){

    if(await products.nth(i).locator("b").textContent() === requiredProduct){
     await products.nth(i).locator('button:has-text(" Add To Cart")').click();
     break;

    }
}

// validate if product is added to cart.
await cartBtn.click();
await page.waitForLoadState("networkidle");
const addedProduct = await cartProduct.locator("h3");
await expect(addedProduct).toHaveText(requiredProduct);

// delete the product from cart
//await cartProduct.locator("i").click();
//await page.pause();

// checkout

await page.locator("button:has-text('Checkout')").click();
const personalInfoSection =page.locator(".form__cc");
await personalInfoSection.waitFor();

//apply coupon and place the order

const creditCardNumber = page.locator(".input").nth(0);
const expiryDate = page.locator(".input").nth(1);
const expiryYear = page.locator(".input").nth(2);
const cvv = page.locator(".input").nth(3);
const nameOnCard =page.locator(".input").nth(4);
const applyCoupon =page.locator(".input").nth(5);
const applyCouponBtn =page.locator("button:has-text('Apply Coupon ')");
const emailText = page.locator(".user__name label");
const selectCountry =page.locator("[placeholder ='Select Country']");
const countryList = page.locator("section.ta-results");
const couponApplyMsg = page.locator("p:has-text('* Coupon Applied')");
const placeOrderBtn = page.locator("a:has-text('Place Order ')");

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
await countryList.waitFor();
const options = countryList.locator("button");
const CountryListCount = await options.count();
for (let i =0;i<CountryListCount;i++){

    if(await options.nth(i).textContent() === " India"){

      await options.nth(i).click();
      break;     
    }
}

await placeOrderBtn.click();

// validate if order placed successfully

const orderSuccessfulMsg = page.locator("h1:has-text(' Thankyou for the order. ')");

await expect(orderSuccessfulMsg).toBeVisible();

//print order id on console

const orderIdText =await page.locator("td.em-spacer-1 label").nth(1).textContent();
const exactOrderId= orderIdText.split("|")[1].trim();
console.log(exactOrderId);

// validate orderId displayed on order history page.
const orderHistoryPageLink = page.locator("td.em-spacer-1 label").nth(0);

await orderHistoryPageLink.click();
const orderDetails = page.locator("table tbody tr");
const orderIds = orderDetails.locator("th");
const countOfOrders = await orderIds.count();
const viewButton = orderDetails.locator("button:has-text('View')");
for(let i =0;i<countOfOrders;i++){

    await expect(orderIds.nth(i)).toHaveText(exactOrderId);
    await viewButton.nth(i).click();
    break;

}

// validate order id on order summary page

const id = page.locator(".col-text");
await expect(id).toHaveText(exactOrderId);
});