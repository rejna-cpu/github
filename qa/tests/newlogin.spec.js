import { test } from '@playwright/test';
import { LoginPage } from '../pageobject/login.po';

test.beforeEach(async ({ page }) => {
    await page.goto('/'); // calls base URL
});

test.describe('Valid login tests', () => {
    test('Login using valid username and password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login("maharjanrejina05@gmail.com", "test@123");
        await login.verifyValidLogin();
    });
});

test.describe('Invalid login tests', () => {
    test('Login using completely invalid username and password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login("maharjanrejina05bcdffghn@gmail.com", "abc123");
        await login.verifyInvalidLogin();
    });

    test('Login using another invalid username and password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login("invalid@email.com", "wrongpassword");
        await login.verifyInvalidLogin();
    });

    test('Login using valid username and invalid password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login("maharjanrejina05@gmail.com", "wrongpassword");
        await login.verifyInvalidLogin(); // This was missing before
    });
});
