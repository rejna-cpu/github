const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
    constructor(page){
        this.page= page;
        this.usernameInput='#email'; //css selector
        this.passwordInput='//input[@placeholder="Password"]';
        this.loginButton='//button[@id="submit"]';
        this.logOutButton='//button[@id="logOut"]';
        this.loginValidation ='//*[contains(text(), "Click on any contact to view the Contact Details")]';
        this.alertMessage='//span[@id="error"]';
    }
    async login(username , password){ //parameter accept
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }
    //to check if it is valid or not
    async verifyValidLogin(){ 
        const loginValidation = await this.page.locator(this.loginValidation);
        await this.page.waitForTimeout(2000);
        expect(this.logOut).toBeVisible;
        await expect(loginValidation).toHaveText('Click on any contact to view the Contact Details');
    }
    async verifyInvalidLogin(){
        const InvalidLogin = await this.page.locator(this.alertMessage); 
        await expect(InvalidLogin).toHaveText('Incorrect username or password');
    }
}