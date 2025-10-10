import test, { expect } from "@playwright/test";
/***
 *   Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

  Требования:
    Страница регистрации:
      Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
      Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
    Страница логина:
      Username: обязательное
      Password: обязательное
 */

interface ICredentials {
    username: string,
    password: string
}

enum NOTIFICATIONS {
    REGISTER_SUCCESS = 'Successfully registered! Please, click Back to return on login page',
    USERNAME_IS_REQUIRED = 'Username is required',
    PASSWORD_IS_REQUIRED = 'Password is required'
}

test.describe('[demo-login-form]', () => {

    const validCredentials: ICredentials = {
        'username': 'Lucy',
        'password': 'Password123'
    };

    test.beforeEach(async ({page}) => {
        const url = 'https://anatoly-karpovich.github.io/demo-login-form/';
        const registerButton = page.locator('#registerOnLogin');

        await page.goto(url);
        await registerButton.click();
    })
    test('should register successfully with valid username and password', async ({page}) => {

        const userNameInputRegister = page.locator('#userNameOnRegister');
        const passwordInputRegister = page.locator('#passwordOnRegister');
        const registerSubmitButton = page.locator('#register');
        const notification = page.locator('#errorMessageOnRegister');
        const backButton = page.locator('#backOnRegister');
        const userNameInputLogin = page.locator('#userName');
        const passwordInputLogin = page.locator('#password');
        const loginSubmitButton = page.locator('#submit');
        const notificationSuccessLogin = page.locator('#successMessage'); 

        await userNameInputRegister.fill(validCredentials.username);
        await passwordInputRegister.fill(validCredentials.password);
        await registerSubmitButton.click();

        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);

        await backButton.click();
        await userNameInputLogin.fill(validCredentials.username);
        await passwordInputLogin.fill(validCredentials.password);
        await loginSubmitButton.click();

        await expect(notificationSuccessLogin).toHaveText(`Hello, ${validCredentials.username}!`);
    })

    test('should not register with empty username', async ({page}) => {
        const passwordInputRegister = page.locator('#passwordOnRegister');
        const registerSubmitButton = page.locator('#register');        
        const notification = page.locator('#errorMessageOnRegister');

        await passwordInputRegister.fill(validCredentials.password);
        await registerSubmitButton.click();

        await expect(notification).toHaveText(NOTIFICATIONS.USERNAME_IS_REQUIRED);
    })

    test('should not register with empty password', async ({page}) => {
        const userNameInputRegister = page.locator('#userNameOnRegister');
        const registerSubmitButton = page.locator('#register');
        const notification = page.locator('#errorMessageOnRegister');

        await userNameInputRegister.fill(validCredentials.username);
        await registerSubmitButton.click();

        await expect(notification).toHaveText(NOTIFICATIONS.PASSWORD_IS_REQUIRED);
    })
})