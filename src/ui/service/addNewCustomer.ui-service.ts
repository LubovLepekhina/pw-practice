import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { STATUS_CODES } from "data/statusCodes";
import { ICustomer, ICustomerResponse } from "data/types/customer.types";
import _ from "lodash";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";

export class AddNewCustomertUIService {
    customerListPage: CustomersListPage;
    addNewCustomerPage: AddNewCustomerPage;

    constructor(private page: Page) {
        this.customerListPage = new CustomersListPage(page);
        this.addNewCustomerPage = new AddNewCustomerPage(page);
    }

    async create(customerData?: Partial<ICustomer>) {
        const data = generateCustomerData(customerData);
        await this.addNewCustomerPage.fillForm(data);

        const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse, any>(
            apiConfig.endpoints.customers,
            this.addNewCustomerPage.clickSaveNewCustomer.bind(this.addNewCustomerPage)
        )
        expect(response.status).toBe(STATUS_CODES.CREATED);
        expect(_.omit(response.body.Customer, '_id', 'createdOn')).toEqual(data);

        await this.customerListPage.waitForOpened();
        return response.body.Customer;
    }
}