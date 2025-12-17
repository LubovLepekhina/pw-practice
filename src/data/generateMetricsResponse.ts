import { IMetrics, IMetricsPartial } from "api/apiClients/typesApi";
import { faker } from "@faker-js/faker";

export function generateMetricsResponse(params?: IMetricsPartial): IMetrics {
  return {
    customers: {
      totalNewCustomers: faker.number.int({ min: 0, max: 100 }),
      topCustomers: [],
      customerGrowth: [],
      ...params?.customers,
    },
    orders: {
      totalRevenue: faker.number.int({ min: 0, max: 100 }),
      totalOrders: faker.number.int({ min: 0, max: 100 }),
      averageOrderValue: faker.number.int({ min: 0, max: 100 }),
      totalCanceledOrders: faker.number.int({ min: 0, max: 100 }),
      recentOrders: [],
      ordersCountPerDay: [],
      ...params?.orders,
    },
    products: {
      topProducts: [],
    },
  };
}
