import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { BeddingPage } from '../pages/bedding-page';
import { CartPage } from '../pages/cart-page';


test.describe('Suite of Positive',() => {
    test.beforeEach(async ({page}) => {
        test.setTimeout(120000);
        await page.goto(global.BASE_URL);
    })
    
    test ('Checkout One Bedding', async ({page}) => {
        const homePage = new HomePage(page);
        const beddingPage = new BeddingPage(page);
        const cartPage = new CartPage(page);

        await homePage.gotoBedding();
        await beddingPage.oneSofa();
    //verify price in cart
        await homePage.topMenu.btnCart.click();
        await cartPage.verifySummary();
    //add qty and verify
        await cartPage.itemPlus();
        await cartPage.verifySummary();
    //checkout
        await cartPage.checkout();
    })
    
    test ('Checkout Mulit Beds', async ({page}) => {
        const homePage = new HomePage(page);
        const beddingPage = new BeddingPage(page);
        const cartPage = new CartPage(page);

        await homePage.gotoBedding();
    //add multiple chair
        await beddingPage.mulitSofas();
        await homePage.topMenu.btnCart.click();
    //verify total price
        await cartPage.verifySummary();
    //checkout
        await cartPage.checkout();
    })
})