import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { LightingPage } from '../pages/lighting-page';
import { CartPage } from '../pages/cart-page';


test.describe('Suite of Positive',() => {
    test.beforeEach(async ({page}) => {
        test.setTimeout(120000);
        await page.goto(global.BASE_URL);
    })
    
    test ('Checkout One Lighting', async ({page}) => {
        const homePage = new HomePage(page);
        const lightingPage = new LightingPage(page);
        const cartPage = new CartPage(page);

        await homePage.gotoLighting();
        await lightingPage.oneSofa();
    //verify price in cart
        await homePage.topMenu.btnCart.click();
        await cartPage.verifySummary();
    //add qty and verify
        await cartPage.itemPlus();
        await cartPage.verifySummary();
    //checkout
        await cartPage.checkout();
    })
    
    test ('Checkout Mulit Lighting', async ({page}) => {
        const homePage = new HomePage(page);
        const lightingPage = new LightingPage(page);
        const cartPage = new CartPage(page);

        await homePage.gotoLighting();
    //add multiple chair
        await lightingPage.mulitSofas();
        await homePage.topMenu.btnCart.click();
    //verify total price
        await cartPage.verifySummary();
    //checkout
        await cartPage.checkout();
    })
})