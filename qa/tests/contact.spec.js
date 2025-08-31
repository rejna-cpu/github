import { test } from '@playwright/test';
import { LoginPage } from '../pageobject/login.po';
import { ContactPage } from '../pageobject/contact.po';
import { access } from 'fs';
const testData = require('../fixtures/loginFixture.json');
const contactTestData = require('../fixtures/contactFixture.json');
const{authenticateUser,createEntity} = require('../helper.spec.js');

test.beforeEach(async({page}) => {
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login(testData.validUser.username, testData.validUser.password);
    await login.verifyValidLogin();
})
test.describe('Contact testcases', () =>{
    test('Contact Add test', async ({ page, request}) => {
        const contact = new ContactPage(page);
        await contact.contactAdd(contactTestData.contact.firstName, contactTestData.contact.lastName);
        await contact.viewContact();
        await contact.validateContactCreated(contactTestData.contact.firstName, contactTestData.contact.lastName);
        accessToken = await authenticationUser(testData.validUser,userName, testData.validUser.password,{request}

        );
        const id = await getEntity(accessToken, '/contacts', '200', {request});
        await deleteEntity(accessToken,'/contacts/$(id)',{request});
        await validateEntity(accessToken,'/contacts/$(id)','484', {request});
    })
    test('Contact Edit test', async ({ page, request}) => {
        const Data = {
          "firstName": "Rejina",
          "lastName": "Maharjan",
          "birthdate": "2004-03-17",
          "email": "maharjanrejina05@gmail.com",
          "phone": "9860439199",
          "street1": "samakhushi",
          "city": "kathmandu",
          "postalCode": "44600",
          "country": "Nepal",
              };
        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser.username, testData.validUser.password,{request})
        await createEntity(Data, accessToken, '/contacts', {request});
        page.reload();
        await contact.viewContact();
        await contact.contactEdit(contactTestData.contactEdit.firstName);
        await contact.validateContactCreated(contactTestData.contactEdit.firstName, contactTestData.contact.lastName,contact);
    })
    test.only ('contact Delete test ',async ({page, request})=>{
        const Data = {
          "firstName": "Rejina",
          "lastName": "Maharjan",
          "birthdate": "2004-03-17",
          "email": "maharjanrejina05@gmail.com",
          "phone": "9860439199",
          "street1": "samakhushi",
          "city": "kathmandu",
          "postalCode": "44600",
          "country": "Nepal",
        };
        const contact= new ContactPage(page);
        accessToken= await authenticateUser(testData.validUser.userName,testData.validUser.password,{request});
        await createEntity(Data, accessToken,'/contacts',{request});
        page.reload();
        await contact.viewContact();
        const id = await getEntity(accessToken,'/contacts', '200',{request});
        await contact.contactDelete();
        await validateEntity(accessToken,'/contacts/${id}','484',{request})      
    });
    })

