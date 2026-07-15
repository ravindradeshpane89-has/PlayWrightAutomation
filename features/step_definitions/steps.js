const { When, Then, Given } = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');
const {POManager} = require('../../pageObjects/POManager');
const playwright = require('@playwright/test');

let exactOrderId;

Given('user logged into ecommerce applocation with {string} and {string}', {timeout:100*1000},async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
const url ="https://rahulshettyacademy.com/client/#/auth/login";

const loginPage = this.poManager.getLoginPage();
await loginPage.goToLoginPage(url);
await loginPage.login(username,password);
});

When('user add product {string} to cart',async function (product) {
  this.dashboardPage= this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAndAddToCart(product);
});

Then('product {string} is displayed on cart page', async function (requiredProduct) {
  const addedProduct = await this.dashboardPage.navigateToCart();
  await expect(addedProduct).toHaveText(requiredProduct);
});

When('user enter valid details along with email {string} and places the order', async function (inputEmail) {
  await this.dashboardPage.navigateToCheckout();
const checkoutPage = this.poManager.getCheckoutPage();
await checkoutPage.enterPersonInfo("4542 9931 9292 2296","12","30","126","Ravindra D","rahulshettyacademy");
const couponMsgText = await checkoutPage.getCouponApplyMsgElement();
await expect(couponMsgText).toBeVisible();

//validate if email is correctly populated
const emailText = await checkoutPage.getEmail();

await expect (emailText).toHaveText(inputEmail);

//select country and place order
checkoutPage.placeOrder("India");

});

Then('order details should be displayed on order successful page', async function () {
  this.orderSuccessfulPage = this.poManager.getOrderSuccessfulPage();
  const orderSuccessfulMsg = await this.orderSuccessfulPage.getOrderSuccessfulMsg();
  await expect(orderSuccessfulMsg).toBeVisible();
  
  //print order id on console
  
  const orderIdText = await this.orderSuccessfulPage.getOrderIdText();
  exactOrderId= await orderIdText.split("|")[1].trim();
  console.log(exactOrderId);
});

Then('order details should be displayed on order history page', async function (){

    await this.orderSuccessfulPage.navigateToOrderHistoryPage();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.getOrderAndNavigateToOrderSummaryPage(exactOrderId);
    
    // validate order id on order summary page
    
    const orderSummaryPage = this.poManager.getOrderSummaryPage();
    const id = await orderSummaryPage.getId();
    await expect(id).toHaveText(exactOrderId);
})

Given('user logged into Ecommerce2 app with {string} and {string}', {timeout:10*1000},async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
await this.page.goto("https://rahulshettyacademy.com/loginPagePractise");
console.log(await this.page.title());
await this.page.locator("[id='username']").type(username);
await this.page.locator("#password").type(password);
await this.page.locator("#signInBtn").click();
});

Then('error message should get displayed', async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block']").textContent());
await expect(this.page.locator("[style*='block']")).toHaveText("Incorrect username/password.");
});