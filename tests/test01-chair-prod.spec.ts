import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { ChairsPage } from '../pages/chairs-page';
import { CartPage } from '../pages/cart-page';


test.describe('Suite of Positive',() => {
    test.beforeEach(async ({page}) => {
        test.setTimeout(120000);
        await page.goto(global.BASE_URL);
    })
    test ('Verify Menu Pages', async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.verify();
        await homePage.allMenuPage();
    })
    test ('Checkout One Chair', async ({page}) => {
        const homePage = new HomePage(page);
        const chairsPage = new ChairsPage(page);
        const cartPage = new CartPage(page);

        await homePage.gotoChair();
        await chairsPage.oneChair();
    //verify price in cart
        await homePage.topMenu.btnCart.click();
        await cartPage.verifySummary();
    //checkout
        await cartPage.checkout();
    })
    test ('Checkout Mulit Chair', async ({page}) => {
        const homePage = new HomePage(page);
        const chairsPage = new ChairsPage(page);
        const cartPage = new CartPage(page);

        await homePage.gotoChair();
    //add multiple chair
        await chairsPage.mulitChair();
        await homePage.topMenu.btnCart.click();
    //verify total price
        await cartPage.verifySummary();
    //checkout
        await cartPage.checkout();
    })

})

    

