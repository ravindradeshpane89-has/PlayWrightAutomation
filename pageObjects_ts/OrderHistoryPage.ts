import { test, Locator, Page } from '@playwright/test';
export class OrderHistoryPage {
    orderDetails: Locator;
    orderIds: Locator;
    viewButton: Locator;

    constructor(page: Page) {

        this.orderDetails = page.locator("table tbody tr");
        this.orderIds = this.orderDetails.locator("th");
        this.viewButton = this.orderDetails.locator("button:has-text('View')");
    }

    async getOrderAndNavigateToOrderSummaryPage(exactOrderId: string) {

        const countOfOrders: number = await this.orderIds.count();
        console.log(countOfOrders);
        for (let i = 0; i < countOfOrders; i++) {

            if (await this.orderIds.nth(i).textContent() === exactOrderId) {
                await this.viewButton.nth(i).click();
                break;
            }
        }

    }
}