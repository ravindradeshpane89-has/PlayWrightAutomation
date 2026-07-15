import { test, Locator, Page } from '@playwright/test';
export class OrderSuccessfulPage {
    orderSuccessfulMsg: Locator;
    orderId: Locator;
    orderHistoryPageLink: Locator;

    constructor(page: Page) {

        this.orderSuccessfulMsg = page.locator("h1:has-text(' Thankyou for the order. ')");
        this.orderId = page.locator("td.em-spacer-1 label").nth(1);
        this.orderHistoryPageLink = page.locator("td.em-spacer-1 label").nth(0);
    }

    async getOrderSuccessfulMsg() {

        return this.orderSuccessfulMsg;
    }

    async getOrderIdText() {

        return await this.orderId.textContent();
    }

    async navigateToOrderHistoryPage() {
        await this.orderHistoryPageLink.click();

    }

}