import { IResponseFields } from "./core.types";

export interface IOrdersMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: any[];
  ordersCountPerDay: any[];
}

export interface IDateItem {
  year: number;
  month: number;
  day: number;
}

export interface ICustomerGrowthItem {
  date: IDateItem;
  count: number;
}

export interface ICustomersMetrics {
  totalNewCustomers: number;
  topCustomers: any[];
  customerGrowth: ICustomerGrowthItem[];
}

export interface IProductsMetrics {
  topProducts: any[];
}

export interface IMetrics {
  orders: IOrdersMetrics;
  customers: ICustomersMetrics;
  products: IProductsMetrics;
}

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

//for function generateMetricsResponse()
export interface IMetricsPartial {
  orders?: Partial<IOrdersMetrics>;
  customers?: Partial<ICustomersMetrics>;
  products?: Partial<IProductsMetrics>;
}
