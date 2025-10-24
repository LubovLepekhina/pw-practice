import test, { expect } from "@playwright/test"
// Создайте ОДИН смоук тест со следующими шагами:

// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте, что пользователь успешно зарегистрирован

test.describe('[demo-registration-form]', () => {
    type Hobby = 'Travelling' | 'Movies' | 'Sports' | 'Gaming' | 'Dancing';
    interface INewUserData {
        firstName: string,
        lastName: string,
        address: string,
        email: string,
        phone: string,
        country: 'US' | 'Canada' | 'UK',
        gender: 'male' | 'female',
        hobbies: Hobby[],
        language: string,
        skills: 'JavaScript' | 'Python' | 'Java' | 'C++' | 'Ruby',
        dateOfBirth: {
            year: string,
            month: string,
            day: string
        },
        password: string
    }
    const newUserData: INewUserData = {
        'firstName': 'Lucy',
        'lastName': 'Smit',
        'address': 'London',
        'email': 'lucy@test.com',
        'phone': '3333333',
        'country': 'UK',
        'gender': 'female',
        'hobbies': ['Travelling', 'Movies'],
        'language': 'English',
        'skills': 'JavaScript',
        'dateOfBirth': {
            'year': '1991',
            'month': 'October',
            'day': '2'
        },
        'password': 'Lucy123'
    };

    test.beforeEach(async ({page}) => {
        const url = 'https://anatoly-karpovich.github.io/demo-registration-form/';

        await page.goto(url);
    })

    test('should register successfully with valid data', async ({page}) => {
        const {firstName, lastName, address, email, phone, country, gender, hobbies, language, skills, dateOfBirth, password} = newUserData;

        const firstNameInput = page.locator('#firstName');
        const lastNameInput = page.locator('#lastName');
        const addressTextArea = page.locator('#address');
        const emailInput = page.locator('#email');
        const phoneInput = page.locator('#phone');
        const countryDropdown = page.locator('#country');
        const maleRadioButton = page.locator(`input[value=${gender}]`);
        const languageInput = page.locator('#language');
        const skillsDropdown = page.locator('#skills');
        const yearDropdown = page.locator('#year');
        const monthDropdown = page.locator('#month');
        const dayDropdown = page.locator('#day');
        const passwordInput = page.locator('#password');
        const passwordConfirmInput = page.locator('#password-confirm');
        const submitButton = page.locator('button[type="submit"]');

        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await addressTextArea.fill(address);
        await emailInput.fill(email);
        await phoneInput.fill(phone);
        await countryDropdown.selectOption(country);
        await maleRadioButton.check();

        for (let hobby of hobbies) {
            const hobbyForCheck = page.locator(`input[type="checkbox"][value="${hobby}"]`);
            await hobbyForCheck.check({ force: true });
        }

        await languageInput.fill(language);
        await skillsDropdown.selectOption(skills);
        await yearDropdown.selectOption(dateOfBirth.year);
        await monthDropdown.selectOption(dateOfBirth.month);
        await dayDropdown.selectOption(dateOfBirth.day);
        await passwordInput.fill(password);
        await passwordConfirmInput.fill(password);
        await submitButton.click();

        await expect(page.locator('h2')).toHaveText('Registration Details');
        await expect(page.locator('#fullName')).toHaveText(`${firstName} ${lastName}`);
        await expect(page.locator('#address')).toHaveText(address);
        await expect(page.locator('#email')).toHaveText(email);
        await expect(page.locator('#phone')).toHaveText(phone);
        await expect(page.locator('#country')).toHaveText(country);
        await expect(page.locator('#gender')).toHaveText(gender);
        await expect(page.locator('#language')).toHaveText(language);
        await expect(page.locator('#skills')).toHaveText(skills);
        await expect(page.locator('#hobbies')).toHaveText(hobbies.join(', '));
        await expect(page.locator('#dateOfBirth')).toHaveText(`${dateOfBirth.day} ${dateOfBirth.month} ${dateOfBirth.year}`);
    })
})