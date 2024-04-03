import {Page,Locator, expect} from '@playwright/test';
import { HomePage } from './home-page';

import * as faker from 'faker';

export class profilePage{
    readonly page:Page;
    readonly editForm: {
        [key:string]: Locator;
    }

    constructor(page: Page){
        this.page = page;

        this.editForm = {
            txtEditProfile : page.locator('//h1[text()="Edit your profile"]'),
            btnEdit : page.locator('a.button[href="/profile-edit"]'),
            inputFirst : page.locator('input[id=firstname]'),
            inputLast : page.locator('input[id=lastname]'),
            inputAddress1 : page.locator('input[id=address1]'),
            inputAddressCity : page.locator('input[id=addressCity]'),
            search : page.locator('input[type=search]'),
            inputZip : page.locator('input[id=addressZipcode]'),
            inputPhone : page.locator('input[id=phone]'),
            btnSave : page.locator('button[data-v-375d6de9].button.big.inverted'),
            btnCancel : page.locator('button[data-v-375d6de9].button.big:has-text("Cancel")'),
            inputUpload : page.locator('input[data-v-597d9883][type="file"]'),
            txtSuccess : page.locator('div.success.banner'),
        };

    }

    async editProfile(){
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const address1 = faker.address.streetAddress();
        const addressCity = faker.address.city();
        const zip = faker.address.zipCode();
        const phoneNo = faker.phone.phoneNumber();

        this.editForm.btnEdit.click();
        
        this.editForm.inputFirst.type(firstName);
        this.editForm.inputLast.type(lastName);
        this.editForm.inputAddress1.type(address1);
        this.editForm.inputAddressCity.type(addressCity);
        this.editForm.inputZip.type(zip);
        this.editForm.inputZip.type(phoneNo);

        this.editForm.btnSave.click();
    }

    async injectJpg(){
        const file = await this.editForm.inputUpload;
        const filePath = 'path';
    //inject file
        this.editForm.btnEdit.click();
        await file.setInputFiles(filePath);

        this.editForm.btnSave.click();
    }

    async verifySuccess(){
        const bannerText = await this.editForm.txtSuccess.innerText();
        expect(bannerText).toContain('Profile successfully saved.');
    }
}