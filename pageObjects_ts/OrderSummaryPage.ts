import { test, Locator, Page } from '@playwright/test';
class OrderSummaryPage{
    id:Locator;

    constructor(page:Page){

        this.id = page.locator(".col-text");
    }

    async getId(){
        return this.id;
    }
}