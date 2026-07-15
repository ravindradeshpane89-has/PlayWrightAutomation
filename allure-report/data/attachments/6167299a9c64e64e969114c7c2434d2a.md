# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: endToEndTestUsingPageObjects.spec.js >> @web clientLogin
- Location: tests\endToEndTestUsingPageObjects.spec.js:6:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('.col-text')
Expected: "6a54780285b8849b49e3cd16"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.col-text')

```

```yaml
- navigation:
  - link "Automation Automation Practice":
    - /url: ""
    - heading "Automation" [level=3]
    - paragraph: Automation Practice
  - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire":
    - /url: https://techsmarthire.com/
  - list:
    - listitem:
      - button " HOME"
    - listitem
    - listitem:
      - button " ORDERS"
    - listitem:
      - button " Cart"
    - listitem:
      - button "Sign Out"
- heading "Your Orders" [level=1]
- table:
  - rowgroup:
    - row "Order Id Product Image Name Price Ordered Date View Delete":
      - columnheader "Order Id"
      - columnheader "Product Image"
      - columnheader "Name"
      - columnheader "Price"
      - columnheader "Ordered Date"
      - columnheader "View"
      - columnheader "Delete"
  - rowgroup:
    - row "6a54780285b8849b49e3cd16 ZARA COAT 3 $ 11500 Mon Jul 13 View Delete":
      - rowheader "6a54780285b8849b49e3cd16"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Mon Jul 13"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6a5476ba85b8849b49e3ca75 ZARA COAT 3 $ 11500 Mon Jul 13 View Delete":
      - rowheader "6a5476ba85b8849b49e3ca75"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Mon Jul 13"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6a54700485b8849b49e3bac4 ZARA COAT 3 $ 11500 Mon Jul 13 View Delete":
      - rowheader "6a54700485b8849b49e3bac4"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Mon Jul 13"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6a546fe585b8849b49e3ba9b ZARA COAT 3 $ 11500 Mon Jul 13 View Delete":
      - rowheader "6a546fe585b8849b49e3ba9b"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Mon Jul 13"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6a546e9b85b8849b49e3b82f ZARA COAT 3 $ 11500 Mon Jul 13 View Delete":
      - rowheader "6a546e9b85b8849b49e3b82f"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Mon Jul 13"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6a546e8f85b8849b49e3b801 ZARA COAT 3 $ 11500 Mon Jul 13 View Delete":
      - rowheader "6a546e8f85b8849b49e3b801"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Mon Jul 13"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6a546e7485b8849b49e3b7bd ZARA COAT 3 $ 11500 Mon Jul 13 View Delete":
      - rowheader "6a546e7485b8849b49e3b7bd"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Mon Jul 13"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
- text: "* If orders Will be more than 7 your last order will get deleted"
- button "Go Back to Shop"
- button "Go Back to Cart"
```

# Test source

```ts
  1   | const{test,expect,only} = require('@playwright/test');
  2   | const { text } = require('@playwright/test');
  3   | const {POManager} = require('../pageObjects/POManager');
  4   | const dataset = JSON.parse(JSON.stringify(require('../tests/Utils/endToEndTestUsingPO_testData.json')));
  5   | const {customtest} = require('../tests/Utils/test-base');
  6   | test('@web clientLogin' , async({page})=>
  7   | {
  8   | const url ="https://rahulshettyacademy.com/client/#/auth/login";
  9   | const poManager = new POManager(page);
  10  | const loginPage = poManager.getLoginPage();
  11  | await loginPage.goToLoginPage(url);
  12  | await loginPage.login(dataset.inputEmail,dataset.password);
  13  | 
  14  | // validate if product is added to cart.
  15  | const dashboardPage= poManager.getDashboardPage();
  16  | await dashboardPage.searchProductAndAddToCart(dataset.requiredProduct);
  17  | 
  18  | const addedProduct = await dashboardPage.navigateToCart();
  19  | await expect(addedProduct).toHaveText(dataset.requiredProduct);
  20  | 
  21  | // checkout
  22  | await dashboardPage.navigateToCheckout();
  23  | const checkoutPage = poManager.getCheckoutPage();
  24  | await checkoutPage.enterPersonInfo("4542 9931 9292 2296","12","30","Ravindra D","324");
  25  | 
  26  | //apply coupon and place the order
  27  | 
  28  | const couponMsgText = await checkoutPage.getCouponApplyMsgElement();
  29  | await expect(couponMsgText).toBeVisible();
  30  | 
  31  | //validate if email is correctly populated
  32  | const emailText = await checkoutPage.getEmail();
  33  | 
  34  | await expect (emailText).toHaveText(dataset.inputEmail);
  35  | 
  36  | //select country and place order
  37  | checkoutPage.placeOrder("India");
  38  | 
  39  | // validate if order placed successfully
  40  | const orderSuccessfulPage = poManager.getOrderSuccessfulPage();
  41  | const orderSuccessfulMsg = await orderSuccessfulPage.getOrderSuccessfulMsg();
  42  | await expect(orderSuccessfulMsg).toBeVisible();
  43  | 
  44  | //print order id on console
  45  | 
  46  | const orderIdText = await orderSuccessfulPage.getOrderIdText();
  47  | const exactOrderId= await orderIdText.split("|")[1].trim();
  48  | console.log(exactOrderId);
  49  | 
  50  | // validate orderId displayed on order history page.
  51  | 
  52  | await orderSuccessfulPage.navigateToOrderHistoryPage();
  53  | const orderHistoryPage = poManager.getOrderHistoryPage();
  54  | await orderHistoryPage.getOrderAndNavigateToOrderSummaryPage(exactOrderId);
  55  | 
  56  | // validate order id on order summary page
  57  | 
  58  | const orderSummaryPage = poManager.getOrderSummaryPage();
  59  | const id = await orderSummaryPage.getId();
> 60  | await expect(id).toHaveText(exactOrderId);
      |                  ^ Error: expect(locator).toHaveText(expected) failed
  61  | });
  62  | 
  63  | customtest('clientLoginUsingFixure' , async({page,testForOrder})=>
  64  | {
  65  | const url ="https://rahulshettyacademy.com/client/#/auth/login";
  66  | const poManager = new POManager(page);
  67  | const loginPage = poManager.getLoginPage();
  68  | await loginPage.goToLoginPage(url);
  69  | await loginPage.login(testForOrder.inputEmail,testForOrder.password);
  70  | 
  71  | // validate if product is added to cart.
  72  | const dashboardPage= poManager.getDashboardPage();
  73  | await dashboardPage.searchProductAndAddToCart(testForOrder.requiredProduct);
  74  | 
  75  | const addedProduct = await dashboardPage.navigateToCart();
  76  | await expect(addedProduct).toHaveText(testForOrder.requiredProduct);
  77  | 
  78  | // checkout
  79  | await dashboardPage.navigateToCheckout();
  80  | const checkoutPage = poManager.getCheckoutPage();
  81  | await checkoutPage.enterPersonInfo("4542 9931 9292 2296","12","30","Ravindra D","324");
  82  | 
  83  | //apply coupon and place the order
  84  | 
  85  | const couponMsgText = await checkoutPage.getCouponApplyMsgElement();
  86  | await expect(couponMsgText).toBeVisible();
  87  | 
  88  | //validate if email is correctly populated
  89  | const emailText = await checkoutPage.getEmail();
  90  | 
  91  | await expect (emailText).toHaveText(testForOrder.inputEmail);
  92  | 
  93  | //select country and place order
  94  | checkoutPage.placeOrder("India");
  95  | 
  96  | // validate if order placed successfully
  97  | const orderSuccessfulPage = poManager.getOrderSuccessfulPage();
  98  | const orderSuccessfulMsg = await orderSuccessfulPage.getOrderSuccessfulMsg();
  99  | await expect(orderSuccessfulMsg).toBeVisible();
  100 | 
  101 | //print order id on console
  102 | 
  103 | const orderIdText = await orderSuccessfulPage.getOrderIdText();
  104 | const exactOrderId= await orderIdText.split("|")[1].trim();
  105 | console.log(exactOrderId);
  106 | 
  107 | // validate orderId displayed on order history page.
  108 | 
  109 | await orderSuccessfulPage.navigateToOrderHistoryPage();
  110 | const orderHistoryPage = poManager.getOrderHistoryPage();
  111 | await orderHistoryPage.getOrderAndNavigateToOrderSummaryPage(exactOrderId);
  112 | 
  113 | // validate order id on order summary page
  114 | 
  115 | const orderSummaryPage = poManager.getOrderSummaryPage();
  116 | const id = await orderSummaryPage.getId();
  117 | await expect(id).toHaveText(exactOrderId);
  118 | });
```