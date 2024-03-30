import {Page,Locator, expect} from '@playwright/test';
import { HomePage } from './home-page';

export class ChairsPage {
    readonly page:Page;
    readonly c01:Locator;
    readonly c03:Locator;
    readonly c08:Locator;
    readonly btnPurchse:Locator;
    
    constructor(page:Page){
        this.page = page;
        this.c01 = page.locator('div.product-card-container:has-text("Wicker Chair")');
        this.c03 = page.locator('div.product-card-container:has-text("Wooden Stools")');
        this.c08 = page.locator('div.product-card-container:has-text("Plastic White Chair")');
        this.btnPurchse = page.locator('div.purchase-button');
    }

    async oneChair(){
        const homePage = new HomePage(this.page);
        await this.c03.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/chairs/product/3');
        await this.page.waitForTimeout(2000);
        /*screenshoot verif
        const visualPlp = await this.page.screenshot();
        await expect(visualPlp).toMatchSnapshot('../verifUI/pdp-chair-03.png')
        */
        await this.btnPurchse.click();
        
        await this.page.waitForSelector('a.cart');
        const cartCount = await this.page.textContent('a.cart');
        await expect(cartCount).toContain('Cart (1)');
    }

    async mulitChair(){
        await this.c01.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/chairs/product/1');
        await this.page.waitForTimeout(2000);
        await this.btnPurchse.click();
        await this.page.goto('https://shopist.io/department/chairs');
        await this.c03.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/chairs/product/3');
        await this.page.waitForTimeout(2000);
        await this.btnPurchse.click();
        await this.page.goto('https://shopist.io/department/chairs');
        await this.c08.click();
        await expect(this.page).toHaveURL('https://shopist.io/department/chairs/product/8');
        await this.page.waitForTimeout(2000);
        await this.btnPurchse.click();

        await this.page.waitForSelector('a.cart');
        const cartCount = await this.page.textContent('a.cart');
        await expect(cartCount).toContain('Cart (3)');
    }
}