import {Page ,Locator, expect} from '@playwright/test';
import { HomePage } from './home-page';

export class SofasPage{
    readonly page:Page;
    readonly c01:Locator;
    readonly c09:Locator;
    readonly btnPurchse:Locator;
    
    constructor(page:Page){
        this.page = page;
        this.c01 = page.locator('div.product-card-container:has-text("Grey Tufted Couch")');
        this.c09 = page.locator('div.product-card-container:has-text("Black Velvet Sectional")');
        this.btnPurchse = page.locator('div.purchase-button');
    }

    async oneSofa(){
        const homePage = new HomePage(this.page);
        await this.c01.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/chairs/product/1');
        await this.page.waitForTimeout(2000);

        await this.btnPurchse.click();
        await this.page.waitForSelector('a.cart');
        const cartCount = await this.page.textContent('a.cart');
        await expect(cartCount).toContain('Cart (1)');
    }

    async mulitSofas(){
        await this.c01.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/chairs/product/1');
        await this.page.waitForTimeout(2000);
        await this.btnPurchse.click();
        await this.page.goto('https://shopist.io/department/chairs');
        await this.c09.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/chairs/product/9');
        await this.page.waitForTimeout(2000);
        await this.btnPurchse.click();

        await this.page.waitForSelector('a.cart');
        const cartCount = await this.page.textContent('a.cart');
        await expect(cartCount).toContain('Cart (2)');
    }
}