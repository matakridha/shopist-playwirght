import {Page ,Locator, expect} from '@playwright/test';
import { HomePage } from './home-page';

export class BeddingPage{
    readonly page:Page;
    readonly c01:Locator;
    readonly c03:Locator;
    readonly btnPurchse:Locator;
    
    constructor(page:Page){
        this.page = page;
        this.c01 = page.locator('div.product-card-container:has-text("White Linen Duvet Cover")');
        this.c03 = page.locator('div.product-card-container:has-text("Patterned Grey Comforter")');
        this.btnPurchse = page.locator('div.purchase-button');
    }

    async oneSofa(){
        const homePage = new HomePage(this.page);
        await this.c01.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/bedding/product/1');
        await this.page.waitForTimeout(2000);

        await this.btnPurchse.click();
        await this.page.waitForSelector('a.cart');
        const cartCount = await this.page.textContent('a.cart');
        await expect(cartCount).toContain('Cart (1)');
    }

    async mulitSofas(){
        await this.c01.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/bedding/product/1');
        await this.page.waitForTimeout(2000);
        await this.btnPurchse.click();
        await this.page.goto('https://shopist.io/department/bedding');
        await this.c03.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/bedding/product/3');
        await this.page.waitForTimeout(2000);
        await this.btnPurchse.click();

        await this.page.waitForSelector('a.cart');
        const cartCount = await this.page.textContent('a.cart');
        await expect(cartCount).toContain('Cart (2)');
    }
}