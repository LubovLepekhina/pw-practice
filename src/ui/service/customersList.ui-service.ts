import { expect, Page } from "@playwright/test";
import { ICustomer, ICustomerInTable } from "data/types/customer.types";
import _ from "lodash";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { logStep } from "utils/report/logStep.utils";

export class CustomersListUIService {
  customerListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;

  constructor(private page: Page) {
    this.customerListPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  @logStep("Open Add New Customer Page")
  async openAddNewCustomerPage() {
    this.customerListPage.clickAddNewCustomerButton();
    this.addNewCustomerPage.waitForOpened();
  }

  @logStep("Open Customers List Page")
  async open() {
    await this.customerListPage.open("customers");
    await this.customerListPage.waitForOpened();
  }

  @logStep("Assert customer row visibility in table")
  async assertCustomerInTable(customersEmail: string, { visible }: { visible: boolean }) {
    await expect(this.customerListPage.tableRowByEmail(customersEmail)).toBeVisible({ visible });
  }

  @logStep("Assert customer table data matches generated data")
  async assertCustomerInTableToGenerated(actual: ICustomerInTable, expected: ICustomer) {
    expect(_.omit(actual, "createdOn")).toEqual(_.pick(expected, ["email", "name", "country"]));
  }
}
