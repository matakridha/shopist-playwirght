import {Page,Locator, expect} from '@playwright/test';
import { timeStamp } from 'console';

export class HomePage {
    readonly page:Page;
    readonly txtTitle:Locator;

    //topmenu
    readonly btnChairs:Locator;
    readonly btnSofas:Locator;
    readonly btnBedding:Locator;
    readonly btnLighting:Locator;
    readonly btnCart:Locator;

    constructor (page:Page){
        this.page = page;
        this.txtTitle = page.locator('//div[@class="jumbotron-box"]/div[text()="Your Guestroom Furniture on a Budget"]');
        //topmenu
        this.btnChairs = page.locator('a.chairs');
        this.btnSofas = page.locator('a.sofas');
        this.btnBedding = page.locator('a.bedding');
        this.btnLighting = page.locator('a.lighting');
        this.btnCart = page.locator('a.cart');
    }

    async allMenuPage(){
        const buttonToCheck = ['chairs', 'sofas', 'bedding', 'lighting']
        const expectURL = {
            'chairs':'https://shopist.io/department/chairs',
            'sofas':'https://shopist.io/department/sofas',
            'bedding':'https://shopist.io/department/bedding',
            'lighting':'https://shopist.io/department/lighting'
        }

        for (const buttonName of buttonToCheck) {
            await this.page.goto('https://shopist.io');
            await this.page.click(`a.${buttonName}`);
            await this.page.waitForNavigation();
            //verify
            const expectedURL = expectURL[buttonName];
            await expect(this.page).toHaveURL(expectedURL);
        }
    }

    async gotoChair(){
        await this.btnChairs.click();
    }

    async verify(){
        await this.txtTitle.isVisible();
    }
}