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
  Customer: ICustomerFromResponse;
}

export interface ICustomerInTable extends Pick<ICustomer, "email" | "name" | "country">, ICreatedOn {}

export type SortOrder = "asc" | "desc";
export interface ICustomersSortedResponse extends ICustomerResponse {
  total: number;
  page: number;
  limit: number;
  search: string;
  country: string[];
  sorting: {
    sortField: CustomersSortField;
    sortOrder: SortOrder;
  };
}

export type CustomersSortField = "email" | "name" | "country" | "createdOn";

export interface IGetCustomersParams {
  search: string;
  country: COUNTRIES[];
  sortField: CustomersSortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}
