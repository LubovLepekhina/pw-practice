import { ICustomerInTable } from "data/types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";
import { COUNTRIES } from "data/salesPortal/customers/countries";

export class CustomersListPage extends SalesPortalPage {
    readonly title = this.page.locator('#title h2');
    readonly addCustomerButton = this.page.locator('[name="add-button"]');
    readonly table = this.page.locator('#table-customers');
    readonly tableRow = this.table.locator('tbody tr');
    readonly tableRowByEmail = (email: string) => this.tableRow.filter({hasText: email});
    readonly cellsInRow = (email: string) => this.tableRowByEmail(email).locator('td');

    readonly uniqueElement = this.title;

    async clickAddNewCustomerButton() {
        await this.addCustomerButton.click();
    }

    async getRowData(customersEmail: string): Promise<ICustomerInTable> {
        const [email, name, country, createdOn] = await this.cellsInRow(customersEmail).allInnerTexts();
        return {
            email: email!,
            name: name!,
            country: country! as COUNTRIES,
            createdOn: createdOn!

        }
    }
}