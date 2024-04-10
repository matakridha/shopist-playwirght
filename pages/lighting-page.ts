import {Page ,Locator, expect} from '@playwright/test';
import { HomePage } from './home-page';

export class LightingPage{
    readonly page:Page;
    readonly c02:Locator;
    readonly c03:Locator;
    readonly c05:Locator;
    readonly btnPurchse:Locator;
    
    constructor(page:Page){
        this.page = page;
        this.c02 = page.locator('div.product-card-container:has-text("Chrome Arc Lamp")');
        this.c03 = page.locator('div.product-card-container:has-text("Geometric Cage Hanging Lamp")');
        this.c05 = page.locator('div.product-card-container:has-text("Matte Grey Floor Lamp")');
        this.btnPurchse = page.locator('div.purchase-button');
    }

    async oneSofa(){
        const homePage = new HomePage(this.page);
        await this.c02.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/lighting/product/29');
        await this.page.waitForTimeout(2000);

        await this.btnPurchse.click();
        await this.page.waitForSelector('a.cart');
        const cartCount = await this.page.textContent('a.cart');
        await expect(cartCount).toContain('Cart (1)');
    }

    async mulitSofas(){
        await this.c02.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/lighting/product/29');
        await this.page.waitForTimeout(2000);
        await this.btnPurchse.click();
        await this.page.goto('https://shopist.io/department/bedding');
        await this.c03.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/lighting/product/30');
        await this.page.waitForTimeout(2000);
        await this.btnPurchse.click();
        await this.page.goto('https://shopist.io/department/bedding');
        await this.c05.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/lighting/product/32');
        await this.page.waitForTimeout(2000);
        await this.btnPurchse.click();

        await this.page.waitForSelector('a.cart');
        const cartCount = await this.page.textContent('a.cart');
        await expect(cartCount).toContain('Cart (3)');
    }
}