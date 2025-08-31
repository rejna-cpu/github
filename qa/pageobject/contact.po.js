const{ expect } = require('@playwright/test');
exports.ContactPage = class ContactPage {
    constructor(page){
        this.page=page
        this.addContact='//button[@id="addContact"]';
        this.firstName='#firstName';
        this.lastName='#lastName';
        this.birthdate='#birthdate';
        this. page = "#page";
        this.email = '// input [@id="email"]';
        this. phone = '//input [@id="phone"]';
        this. address = '// input [@placeholder="Address 1"]';
        this. city = '//input [@placeholder="City"]';
        this. state = '//input [@placeholder="State or Province"]';
        this. postal = '//input[@placeholder="Postal Code"]';
        this.country = '//input[@placeholder="Country"]';
        this.save = '//button[@id="submit"]';
        this.savedFirstName = '//div[@class="contact-name"]/span[1]';
        this.savedLastName = '//div[@class="contact-name"]/span[2]';
        this.savedEmail = '//div[@class="contact-email"]';
        this.savedPhone = '//div[@class="contact-phone"]';
        this.savedAddress = '//div[@class="contact-address"]';
        this.savedCity = '//div[@class="contact-city"]';
        this.savedPostal='//span[@id="PostalCode"]';
        this.savedCountry = '//div[@class="contact-country"]';
        this.viewCreatedContact = '//div[@class="contact-name"]';
        this.editContact = '//button[@id="editContact"]';
        this.deleteContact = '//button[@id="deleteContact"]';

    }
async addNewContact(firstName, lastName, email, phone, address, city, state, postal,country) {
    await this.page.locator(this.addContact).click();
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phone).fill(phone);
    await this.page.locator(this.address).fill(address);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.state).fill(state);
    await this.page.locator(this.postal).fill(postal);
    await this.page.locator(this.country).fill(country);
    await this.page.locator(this.editContact).click();
}
async validateContactDetails(firstName, lastName, email, phone, address, city, postal, country) {
    const firstNameValidation=await this.page.locator(this.savedFirstName);
    const lastNameValidation=await this.page.locator(this.savedLastName);
    const emailValidation=await this.page.locator(this.savedEmail);
    const phoneValidation=await this.page.locator(this.savedPhone);
    const addressValidation=await this.page.locator(this.savedAddress);
    const cityValidation=await this.page.locator(this.savedCity);
    const postalValidation=await this.page.locator(this.savedPostal);
    const countryValidation=await this.page.locator(this.savedCountry);

    await expect(firstNameValidation).toHaveText(fName);
    await expect(lastNameValidation).toHaveText(lName);
    await expect(emailValidation).toHaveText(email);
    await expect(phoneValidation).toHaveText(phone);
    await expect(addressValidation).toHaveText(address);
    await expect(cityValidation).toHaveText(city);
    await expect(postalValidation).toHaveText(postal);
    await expect(countryValidation).toHaveText(country);
}
async viewContact() {
    await this.page.locator(this.viewCreatedContact).click();
}
async contactEdit (firstName){
    await this.page.locator (this.editContact).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.firstName).clear();
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.save).click();
}
async contactDelete (){
    await this.page.validForTimeout(200);
    this.page.once('dialog',async dialog=>{
        console.log ('Dialog message:$(dialog.message()}');
        await dialog.accept();
    });
    await this.page.locator(this.deleteContact).click();
}
}