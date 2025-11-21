import { expect, Page } from "@playwright/test";
import { ICustomer, ICustomerInTable } from "data/types/customer.types";
import _ from "lodash";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";

export class CustomersListUIService {
    customerListPage: CustomersListPage;
    addNewCustomerPage: AddNewCustomerPage;

    constructor(private page: Page) {
        this.customerListPage = new CustomersListPage(page);
        this.addNewCustomerPage = new AddNewCustomerPage(page);
    }

    async openAddNewCustomerPage() {
        this.customerListPage.clickAddNewCustomerButton();
        this.addNewCustomerPage.waitForOpened();
    }

    async assertCustomerInTable(customersEmail: string, { visible }: { visible: boolean }) {
    await expect(this.customerListPage.tableRowByEmail(customersEmail)).toBeVisible({ visible });
    }

    async assertCustomerInTableToGenerated(actual: ICustomerInTable, expected: ICustomer) {
        expect(_.omit(actual, 'createdOn')).toEqual(_.pick(expected, ['email', 'name', 'country']))
    }
}