import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { SofasPage } from '../pages/sofas-page';
import { CartPage } from '../pages/cart-page';

const URL = 'https://shopist.io';

test.describe('Suite of Positive',() => {
    test.beforeEach(async ({page}) => {
        test.setTimeout(120000);
        await page.goto(URL);
    })
    
    test ('Checkout One Sofa', async ({page}) => {
        const homePage = new HomePage(page);
        const sofasPage = new SofasPage(page);
        const cartPage = new CartPage(page);

        await homePage.gotoChair();
        await sofasPage.oneSofa();
    //verify price in cart
        await homePage.btnCart.click();
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

        await homePage.gotoChair();
    //add multiple chair
        await sofasPage.mulitSofas();
        await homePage.btnCart.click();
    //verify total price
        await cartPage.verifySummary();
    //checkout
        await cartPage.checkout();
    })
})