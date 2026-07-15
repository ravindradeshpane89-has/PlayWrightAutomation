import {LoginPage} from '../pageObjects/LoginPage';
import {DashboardPage} from '../pageObjects/DashboardPage';
import {CheckoutPage} from '../pageObjects/CheckoutPage';
import {OrderSuccessfulPage} from '../pageObjects/OrderSuccessfulPage';
import {OrderHistoryPage} from '../pageObjects/OrderHistoryPage';
import {OrderSummaryPage} from '../pageObjects/OrderSummaryPage';
import {Page} from '@playwright/test';

export class POManager {
    loginPage:LoginPage;
    dashboardPage:DashboardPage;
    orderSuccessfulPage:OrderSuccessfulPage;
    checkoutPage:CheckoutPage;
    orderHistoryPage:OrderHistoryPage;
    orderSummaryPage:OrderSummaryPage;
    page:Page;




    constructor(page: Page) {

        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.orderSuccessfulPage = new OrderSuccessfulPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
        this.orderSummaryPage = new OrderSummaryPage(page);
        this.page=page;

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