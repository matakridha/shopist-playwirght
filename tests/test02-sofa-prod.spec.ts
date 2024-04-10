import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { SofasPage } from '../pages/sofas-page';
import { CartPage } from '../pages/cart-page';


test.describe('Suite of Positive',() => {
    test.beforeEach(async ({page}) => {
        test.setTimeout(120000);
        await page.goto(global.BASE_URL);
    })
    
    test ('Checkout One Sofa', async ({page}) => {
        const homePage = new HomePage(page);
        const sofasPage = new SofasPage(page);
        const cartPage = new CartPage(page);

        await homePage.gotoSofa();
        await sofasPage.oneSofa();
    //verify price in cart
        await homePage.topMenu.btnCart.click();
        await cartPage.verifySummary();
    //add qty and verify
        await cartPage.itemPlus();
        await cartPage.verifySummary();
    //checkout
        await cartPage.checkout();
    })
    
    test ('Checkout Mulit Chair', async ({page}) => {
        const homePage = new HomePage(page);
        const sofasPage = new SofasPage(page);
        const cartPage = new CartPage(page);

        await homePage.gotoSofa();
    //add multiple chair
        await sofasPage.mulitSofas();
        await homePage.topMenu.btnCart.click();
    //verify total price
        await cartPage.verifySummary();
    //checkout
        await cartPage.checkout();
    })
})