import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export interface ICreatedOn {
  createdOn: string
}

export interface ID {
  _id: string
}

export interface IProductInTable extends Pick<IProduct, 'name' | 'price' | 'manufacturer'>, ICreatedOn {}

export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}