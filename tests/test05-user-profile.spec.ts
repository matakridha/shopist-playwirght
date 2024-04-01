import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { profilePage } from '../pages/profile-page';

const URL = 'https://shopist.io';

test.describe.only('Profile page smoke',() => {
    test.beforeEach(async ({page}) => {
        const homePage = new HomePage(page);
        test.setTimeout(120000);
        await page.goto(URL);
        await homePage.gotoProfile();
    })
    
    test ('Positive - Edit with valid credential', async ({page}) =>{
        const ProfilePage = new profilePage(page);
        await ProfilePage.editProfile();
    })
})