import { test, expect } from '@playwright/test';
const testData =require('../../fixtures/loginFixture.json');

test('has title', async ({ page }) => {
    await page.goto('https://www.facebook.com/');
    await page.locator("//input[@name='email']").fill(xcvbn);
    await page.waitForTimeout(1000);
    await page.locator("//input[@name='pass']").fill('password123');
    await page.locator("//button[@name='login']").click();
    await page.waitForTimeout(2000);
    await page.locator("//a[text()='Create new account']").click();
    await page.waitForTimeout(2000);
    

    
});