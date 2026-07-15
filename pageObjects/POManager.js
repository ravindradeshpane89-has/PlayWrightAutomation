const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const { CheckoutPage } = require('../pageObjects/CheckoutPage');
const { OrderSuccessfulPage } = require('../pageObjects/OrderSuccessfulPage');
const { OrderHistoryPage } = require('../pageObjects/OrderHistoryPage');
const { OrderSummaryPage } = require('../pageObjects/OrderSummaryPage');

class POManager {

    constructor(page) {

        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.orderSuccessfulPage = new OrderSuccessfulPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
        this.orderSummaryPage = new OrderSummaryPage(page);

    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getOrderSuccessfulPage() {
        return this.orderSuccessfulPage;
    }

    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }
    getOrderSummaryPage() {
        return this.orderSummaryPage;
    }
    getCheckoutPage(){

    return this.checkoutPage;
    }



}
module.exports = {POManager};