import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { profilePage } from '../pages/profile-page';


test.describe.only('Positive - Profile page smoke',() => {
    test.beforeEach(async ({page}) => {
        const homePage = new HomePage(page);
        test.setTimeout(120000);
        await page.goto(global.BASE_URL);
        await homePage.gotoProfile();
    })
    
    test ('Edit with valid credential', async ({page}) =>{
        const ProfilePage = new profilePage(page);
        await ProfilePage.editProfile();
        await ProfilePage.verifySuccess();

        await ProfilePage.injectJpg();
        await ProfilePage.verifySuccess();
    })
})

test.describe.only('Negative - Profile page smoke',() => {

})