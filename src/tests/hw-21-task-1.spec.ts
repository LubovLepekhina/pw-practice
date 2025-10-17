// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

import test, { expect } from "@playwright/test";
import { invaliTestData } from '../data/register-data';

test.describe('[demo-login-form] Registration', () => {
    const url = 'https://anatoly-karpovich.github.io/demo-login-form/';

    for (const {title, credentials, errorMessage} of invaliTestData) {
        test(title, async ({page}) => {
            await page.goto(url);
            const registerButton = page.locator('#registerOnLogin');
            await expect(registerButton).toBeVisible();
            await registerButton.click();
            const registerFormTitle = page.locator('#registerForm');
            await expect(registerFormTitle).toBeVisible();
            await page.locator('#userNameOnRegister').fill(credentials.username);
            await page.locator('#passwordOnRegister').fill(credentials.password);
            await page.locator('#register').click();
            const errorMessageLocator = page.locator('#errorMessageOnRegister');

            await expect(errorMessageLocator).toHaveText(errorMessage!);
        })
    }
})