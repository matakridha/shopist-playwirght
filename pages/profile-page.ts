import {Page,Locator, expect} from '@playwright/test';
import { HomePage } from './home-page';

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
        this.inputLast = page.locator('input[id=address1]');
        this.inputLast = page.locator('input[id=addressCity]');
        this.inputLast = page.locator('input[type=search]');
        this.inputLast = page.locator('input[id=addressZipcode]');
        this.inputLast = page.locator('input[id=phone]');
        this.inputLast = page.locator('button[data-v-375d6de9].button.big.inverted');
        this.inputLast = page.locator('button[data-v-375d6de9].button.big:has-text("Cancel")');
        this.inputLast = page.locator('input[data-v-597d9883][type="file"]');
    }

    async
}