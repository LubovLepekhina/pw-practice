// Разработать тест со следующими шагами:
//   - открыть https://anatoly-karpovich.github.io/demo-login-form/
//   - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
//   - Залогиниться с данными что вы вставили в localStorage
//   - Завалидировать успешный логин

//   Рекоммендации:
//   - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating

import test, { expect } from "@playwright/test";

test.describe('[demo-login-form]', () => {
    interface IUser {
        name: string,
        password: string
    }

    test.beforeEach(async ({page}) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
    })

    test('Login with data from localStorage', async ({page}) => {
        const user: IUser = {
            name: 'test@gmail.com',
            password: 'SecretPw123!@#'
        }

        const userNameInput = page.locator('#userName');
        const passwordInput = page.locator('#password');
        const submitButton = page.locator('#submit');
        const notificationSuccessLogin = page.locator('#successMessage');

        await page.evaluate(user => {
            localStorage.setItem(user.name, JSON.stringify(user));
        }, user)
        await userNameInput.fill(user.name);
        await passwordInput.fill(user.password);
        await submitButton.click();

        await expect(notificationSuccessLogin).toHaveText(`Hello, ${user.name}!`);
    })
})