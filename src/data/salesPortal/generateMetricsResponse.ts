import { ICustomersMetrics, IMetricsResponse, IOrdersMetrics, IProductsMetrics } from "api/apiClients/typesApi";
import { faker } from "@faker-js/faker";

export function generateMetricsResponse(params?: Partial<Partial<{
    Metrics?: Partial<{
      orders?: Partial<IOrdersMetrics>;
      customers?: Partial<ICustomersMetrics>;
      products?: Partial<IProductsMetrics>;
    }>;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;
  }>>): IMetricsResponse {
    return {
        Metrics: {
            'customers': {
                totalNewCustomers: faker.number.int({ min: 0, max: 100 }),
                topCustomers: [],
                customerGrowth: [],
                ...params?.Metrics?.customers
            },
            'orders': {
                totalRevenue: faker.number.int({ min: 0, max: 100 }),
                totalOrders: faker.number.int({ min: 0, max: 100 }),
                averageOrderValue: faker.number.int({ min: 0, max: 100 }),
                totalCanceledOrders: faker.number.int({ min: 0, max: 100 }),
                recentOrders: [], 
                ordersCountPerDay: [], 
                ...params?.Metrics?.orders
            },
            'products': {
                topProducts: []
            },
        },  
        'ErrorMessage': null,
        'IsSuccess': true,
    }
}