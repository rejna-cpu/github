const axios= require ('axios');
import {expect} from '@playwright/test';

let apiUrl

async function authenticateUser (username,password,{request}){
    const apiUrl = await getApiBaseUrl();
    const header={
        'content-Type': 'application/json',

    };
    const requestBody={
        email:username,
        password:password,
    };
    const response = await request.post ('${apiUrl}/users/login',{
        data:requestBody,
        headers,
    });
    expect (response.status()).toBe(200);
    const responseBody = await response.json();
    const token = responseBody.token;
    return token;
}
async function getApiBaseUrl() {
     apiUrl = process.env.API_BASE_URL;
    if (!apiUrl){
        apiUrl='https://thinking-tester-contact-list.herokuapp.com';
    }
    return apiUrl;
}
async function createEntity(userData, accessToken, module, {request}) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': ' Bearer ' + accessToken,
    }
    };
    const response = await request.post (apiUrl + module, {
       headers,
       data: JSON.stringify(userData), 
    });
     const responseBody = await response.json();
     const statusCode= response.status();
     expect (statusCode).toBe(201);
     if (responseBody && responseBody._id) {
         return responseBody._id;
         }
     else{
        return null;
     }
     async function deleteEntity(accessToken, module, {request}) {
        const apiUrl = await getApiBaseUrl();
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ' Bearer ' + accessToken,
        }
        const response = await request.delete(apiUrl + module, {
            headers,
        });
        expect(response.status()).toBe(200);
    }
    async function validateEntity(accessToken, module, status, {request}) {
        const apiUrl = await getApiBaseUrl();
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ' Bearer ' + accessToken,
        }
        const response = await request.get(apiUrl + module, {
            headers,
        });
        expect(response.status()).toBe(status);
    }
    async function getEntity(accessToken, module, status, {request}) {
        const apiUrl = await getApiBaseUrl();
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ' Bearer ' + accessToken,
            
        };
        const response = await request.get(apiUrl + module, {
            headers,
        });
        const statusCode = response.status();
        expect(statusCode).toBe (parseInt(status));
        const responseBody = await response.json();
        if (responseBody && responseBody[0]._id) {
            return responseBody[0]._id;
        }else {
            return null;
        }
    }
