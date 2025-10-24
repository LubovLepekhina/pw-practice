// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

// Сайт: https://the-internet.herokuapp.com/tables

import test, { expect, Page } from "@playwright/test";

async function getTableRow(page: Page, email: string): Promise<Record<string, string>> {
    const table = page.locator('#table2');
    const headerRow = table.locator('thead th');
    const arrayOfHeaderText: string[] = await headerRow.allTextContents();
    arrayOfHeaderText.pop();

    const tableRows = table.locator('tbody > tr');

    const foundRow = tableRows.filter({hasText: email});
    await expect(foundRow).toHaveCount(1);

    const cells = foundRow.locator('td');
    const arrayOfCellsText: string[] = await cells.allTextContents();
    arrayOfCellsText.pop();

    expect(arrayOfHeaderText.length).toBe(arrayOfCellsText.length);
    const result = arrayOfHeaderText.reduce<Record<string, string>>((result, curr, i) => {
        result[curr] = arrayOfCellsText[i] ?? '';
        return result;
    }, {});
    return result;
}

test.describe('work with tables', () => {
    interface ITableRow {
        "Last Name": string,
        "First Name": string,
        Email: string,
        Due: string,
        "Web Site": string,
    }
    const allEmails: string[] = ['jsmith@gmail.com', 'fbach@yahoo.com', 'jdoe@hotmail.com', 'tconway@earthlink.net'];
    const expectedTable: ITableRow[] = [
        {
            "Last Name": "Smith",
            "First Name": "John",
            Email: "jsmith@gmail.com",
            Due: "$50.00",
            "Web Site": "http://www.jsmith.com",
        },
        {
            "Last Name": "Bach",
            "First Name": "Frank",
            Email: "fbach@yahoo.com",
            Due: "$51.00",
            "Web Site": "http://www.frank.com",
        },
        {
            "Last Name": "Doe",
            "First Name": "Jason",
            Email: "jdoe@hotmail.com",
            Due: "$100.00",
            "Web Site": "http://www.jdoe.com",
        },
        {
            "Last Name": "Conway",
            "First Name": "Tim",
            Email: "tconway@earthlink.net",
            Due: "$50.00",
            "Web Site": "http://www.timconway.com",
        },
    ];

    for (let i = 0; i < allEmails.length; i++) {
        test(`get table row by its email: ${allEmails[i]}`, async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/tables');
            const result = await getTableRow(page, allEmails[i]!);
            expect(expectedTable[i]).toEqual(result);
        })
    }
})
