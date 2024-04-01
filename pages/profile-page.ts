import {Page,Locator, expect} from '@playwright/test';
import { HomePage } from './home-page';

import * as faker from 'faker';

export class profilePage{
    readonly page:Page;
    readonly txtEditProfile: Locator;
    readonly btnEdit: Locator;
    readonly inputFirst: Locator;
    readonly inputLast: Locator;
    readonly inputAddress1: Locator;
    readonly inputAddress2: Locator;
    readonly inputAddressCity: Locator;
    readonly search: Locator;
    readonly inputZip: Locator;
    readonly inputPhone: Locator;
    readonly btnSave: Locator;
    readonly btnCancel: Locator;
    readonly inputUpload: Locator;

    constructor(page: Page){
        this.page = page;
        this.txtEditProfile = page.locator('//h1[text()="Edit your profile"]');
        this.btnEdit = page.locator('a.button[href="/profile-edit"]');
        this.inputFirst = page.locator('input[id=firstname]');
        this.inputLast = page.locator('input[id=lastname]');
        this.inputAddress1 = page.locator('input[id=address1]');
        this.inputAddressCity = page.locator('input[id=addressCity]');
        this.search = page.locator('input[type=search]');
        this.inputZip = page.locator('input[id=addressZipcode]');
        this.inputPhone = page.locator('input[id=phone]');
        this.btnSave = page.locator('button[data-v-375d6de9].button.big.inverted');
        this.btnCancel = page.locator('button[data-v-375d6de9].button.big:has-text("Cancel")');
        this.inputUpload = page.locator('input[data-v-597d9883][type="file"]');
    }

    async editProfile(){
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const address1 = faker.address.streetAddress();
        const addressCity = faker.address.city();
        const zip = faker.address.zipCode();
        const phoneNo = faker.phone.phoneNumber();

        this.btnEdit.click();
        
        this.inputFirst.type(firstName);
        this.inputLast.type(lastName);
        this.inputAddress1.type(address1);
        this.inputAddressCity.type(addressCity);
        this.inputZip.type(zip);
        this.inputZip.type(phoneNo);

        this.btnSave.click();
    }
}