import {Page ,Locator, expect} from '@playwright/test';

export class CartPage{
    readonly page:Page;
    readonly btnCheckout:Locator;
    readonly txtTitle:Locator;
    readonly btnPlus:Locator;
    readonly btnMin:Locator;

    constructor(page:Page){
        this.page = page;
        this.btnCheckout = page.locator('div.checkout');
        this.txtTitle = page.locator('dov.checkout-title');
        this.btnPlus = page.locator('div.operator > div:innerText("+")');
        this.btnMin = page.locator('div.operator > div:innerText("-")');
    }

    async verifySummary(){
        await this.page.waitForSelector('.summary');

        // Function to extract value from line element
        const extractValueFromLine = async (label) => {
            const lineElement = await this.page.$(`.lines .line:has-text("${label}") div:nth-child(2)`);
            const valueText = await lineElement?.textContent();
            return valueText ? parseFloat(valueText.replace('$', '')) : null;
        };

        const orderValue = await extractValueFromLine('Order value');
        const tax = await extractValueFromLine('Tax');
        const shipping = await extractValueFromLine('Shipping');
        const totalActualElement = await this.page.$('.line-total div:nth-child(2)');
        const totalActualText = await totalActualElement?.textContent();
        const totalActual = totalActualText ? parseFloat(totalActualText) : null;   

        let totalExpected: number | null = null;
        if (orderValue !== null && tax !== null && shipping !== null) totalExpected = orderValue + tax + shipping;
        
        console.log('Order Value:', orderValue);
        console.log('Tax:', tax);
        console.log('Shipping:', shipping);
        console.log('Total Expected:', totalExpected);
        console.log('Total Actual:', totalActual);

        if (totalActual === totalExpected) console.log('Total is valid');
        else throw new Error('Total price is wrong');
    }

    async itemPlus(){
        await this.btnPlus.click();
    }

    async checkout(){
        await this.btnCheckout.click();
        await this.page.waitForTimeout(8000);
        await this.txtTitle.isVisible();
    }
}