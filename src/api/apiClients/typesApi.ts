import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ICreatedOn, ID, IProduct } from "data/types/product.types";

export interface IApiClient {
  send<T extends object | null>(options: IRequestOptions): Promise<IResponse<T>>;
}

export interface IResponseFields {
  IsSuccess: boolean;
  ErrorMessage: string | null;
}

export interface IRequestOptions {
  baseURL: string;
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: object;
  headers?: Record<string, string>;
}

export interface IResponse<T extends object | null> {
  status: number;
  headers: Record<string, string>;
  body: T;
}

export interface ILoginResponse extends IResponseFields {
  User: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    roles: string[];
    createdOn: string;
  };
}

export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}

export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}

export type SortOrder = "asc" | "desc";

export interface IProductsSortedResponse extends IProductsResponse {
  total: number;
  page: number;
  limit: number;
  search: string;
  manufacturer: string[];
  sorting: {
    sortField: ProductsSortField;
    sortOrder: SortOrder;
  };
}

export type ProductsSortField = "createdOn" | "manufacturer" | "price" | "name";

export interface IGetProductsParams {
  manufacturer: MANUFACTURERS[];
  search: string;
  sortField: ProductsSortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}
