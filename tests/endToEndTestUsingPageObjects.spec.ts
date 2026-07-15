import {test,expect} from '@playwright/test';
//import { text } from '@playwright/test';
import {POManager} from '../pageObjects_ts/POManager';
const dataset = JSON.parse(JSON.stringify(require('../tests/Utils/endToEndTestUsingPO_testData.json')));
import {customtest} from '../tests/Utils_ts/test-base';

test('@web clientLogin' , async({page})=>
{
const url ="https://rahulshettyacademy.com/client/#/auth/login";
const poManager = new POManager(page);
const loginPage = poManager.getLoginPage();
await loginPage.goToLoginPage(url);
await loginPage.login(dataset.inputEmail,dataset.password);

// validate if product is added to cart.
const dashboardPage= poManager.getDashboardPage();
await dashboardPage.searchProductAndAddToCart(dataset.requiredProduct);

const addedProduct = await dashboardPage.navigateToCart();
await expect(addedProduct).toHaveText(dataset.requiredProduct);

// checkout
await dashboardPage.navigateToCheckout();
const checkoutPage = poManager.getCheckoutPage();
await checkoutPage.enterPersonInfo("4542 9931 9292 2296","12","30","Ravindra D","324");

//apply coupon and place the order

const couponMsgText = await checkoutPage.getCouponApplyMsgElement();
await expect(couponMsgText).toBeVisible();

//validate if email is correctly populated
const emailText = await checkoutPage.getEmail();

await expect (emailText).toHaveText(dataset.inputEmail);

//select country and place order
checkoutPage.placeOrder("India");

// validate if order placed successfully
const orderSuccessfulPage = poManager.getOrderSuccessfulPage();
const orderSuccessfulMsg = await orderSuccessfulPage.getOrderSuccessfulMsg();
await expect(orderSuccessfulMsg).toBeVisible();

//print order id on console

const orderIdText = await orderSuccessfulPage.getOrderIdText();
const exactOrderId= await orderIdText.split("|")[1].trim();
console.log(exactOrderId);

// validate orderId displayed on order history page.

await orderSuccessfulPage.navigateToOrderHistoryPage();
const orderHistoryPage = poManager.getOrderHistoryPage();
await orderHistoryPage.getOrderAndNavigateToOrderSummaryPage(exactOrderId);

// validate order id on order summary page

const orderSummaryPage = poManager.getOrderSummaryPage();
const id = await orderSummaryPage.getId();
await expect(id).toHaveText(exactOrderId);
});

customtest('clientLoginUsingFixure' , async({page,testForOrder})=>
{
const url ="https://rahulshettyacademy.com/client/#/auth/login";
const poManager = new POManager(page);
const loginPage = poManager.getLoginPage();
await loginPage.goToLoginPage(url);
await loginPage.login(testForOrder.inputEmail,testForOrder.password);

// validate if product is added to cart.
const dashboardPage= poManager.getDashboardPage();
await dashboardPage.searchProductAndAddToCart(testForOrder.requiredProduct);

const addedProduct = await dashboardPage.navigateToCart();
await expect(addedProduct).toHaveText(testForOrder.requiredProduct);

// checkout
await dashboardPage.navigateToCheckout();
const checkoutPage = poManager.getCheckoutPage();
await checkoutPage.enterPersonInfo("4542 9931 9292 2296","12","30","Ravindra D","324");

//apply coupon and place the order

const couponMsgText = await checkoutPage.getCouponApplyMsgElement();
await expect(couponMsgText).toBeVisible();

//validate if email is correctly populated
const emailText = await checkoutPage.getEmail();

await expect (emailText).toHaveText(testForOrder.inputEmail);

//select country and place order
checkoutPage.placeOrder("India");

// validate if order placed successfully
const orderSuccessfulPage = poManager.getOrderSuccessfulPage();
const orderSuccessfulMsg = await orderSuccessfulPage.getOrderSuccessfulMsg();
await expect(orderSuccessfulMsg).toBeVisible();

//print order id on console

const orderIdText = await orderSuccessfulPage.getOrderIdText();
const exactOrderId= await orderIdText.split("|")[1].trim();
console.log(exactOrderId);

// validate orderId displayed on order history page.

await orderSuccessfulPage.navigateToOrderHistoryPage();
const orderHistoryPage = poManager.getOrderHistoryPage();
await orderHistoryPage.getOrderAndNavigateToOrderSummaryPage(exactOrderId);

// validate order id on order summary page

const orderSummaryPage = poManager.getOrderSummaryPage();
const id = await orderSummaryPage.getId();
await expect(id).toHaveText(exactOrderId);
});