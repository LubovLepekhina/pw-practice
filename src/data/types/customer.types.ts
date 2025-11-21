import { COUNTRIES } from "data/salesPortal/customers/countries";
import { ICreatedOn, ID } from "./product.types";
import { IResponseFields } from "api/apiClients/typesApi";

export interface ICustomer {
    email: string;
    name: string;
    country: COUNTRIES;
    city: string;
    street: string;
    house: number;
    flat: number;
    phone: string;
    notes?: string;
}

export interface ICustomerFromResponse extends Required<ICustomer>, ICreatedOn, ID {}

export interface ICustomerResponse extends IResponseFields {
    Customer: ICustomerFromResponse
}

export interface ICustomerInTable extends Pick<ICustomer, 'email' | 'name' | 'country'>, ICreatedOn {}