// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import test, { expect } from "@playwright/test";

test.describe('[Heroku App][Dynamic Controls]', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/');
    })

    test('should handle dynamic controls correctly', async ({page}) => {
        const dynamicControlLink = page.getByRole('link', {name: 'Dynamic Controls'});
        const removeButton = page.getByRole('button', {name: 'Remove'});
        const mainHeading = page.locator('div.example h4:first-child');
        const subHeading = page.locator('div.example p');
        const checkbox = page.locator('input[type="checkbox"]');
        const addButton = page.getByRole('button', {name: 'Add'});
        const message = page.locator('p#message');

        await dynamicControlLink.click();
        await removeButton.waitFor({state: 'visible'});

        await expect(mainHeading).toHaveText('Dynamic Controls');
        await expect(subHeading).toHaveText('This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.');
        
        await checkbox.check();
        await removeButton.click();
        await checkbox.waitFor({state: 'hidden'});
        
        await expect(addButton).toBeVisible();
        await expect(message).toHaveText("It's gone!");

        await addButton.click();
        await checkbox.waitFor({state: 'visible'});
        
        await expect(message).toHaveText("It's back!");
    })
})