import { test, expect } from "fixtures/business.fixture";
import { generateMetricsResponse } from "data/generateMetricsResponse";
import { convertNumberToFormat } from "utils/convertNumbers.utils";
import { TAGS } from "data/tags";

// Создайте 3 интеграционных теста для проверки следующих метрик на странице Home:
// 1. Orders This Year
// 2. New Customers
// 3. Canceled Orders

// Для реализации подмокивайте респонс эндпоинта metrics

//   - Orders This Year: Metrics.orders.totalOrders
//   - New Customers: Metrics.customers.totalNewCustomers
//   - Canceled Orders: Metrics.orders.totalCanceledOrders

// Остальной объект оставьте как есть сейчас в респонсе, замените просто на ваши данные в метриках нужных

// Добавьте в Task 1 еще 2 теста, на проверку следующих метрик:
// 1. Total Revenue
// 2. Avg Order Value

// Для пребразования цифр в формат как на юайке - используйте библиотеку numeral, формат - "0.0a"
// https://www.npmjs.com/package/numeral

test.describe("[Integration] [Sales Portal] [Home] [Metrics]", () => {
  test(
    "Check Orders This Year metric",
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ homePage, homeUIService, mock }) => {
      const totalOrders = 50;
      const expectedResponse = generateMetricsResponse({ orders: { totalOrders } });
      await mock.homePageMetrics({
        Metrics: expectedResponse,
        IsSuccess: true,
        ErrorMessage: null,
      });
      await homeUIService.open();

      expect(homePage.orderThisYearMetric).toHaveText(totalOrders.toString());
    },
  );

  test("Check New Customers metric", { tag: [TAGS.UI, TAGS.REGRESSION] }, async ({ homePage, homeUIService, mock }) => {
    const newCustomers = 150;
    const expectedResponse = generateMetricsResponse({ customers: { totalNewCustomers: newCustomers } });
    await mock.homePageMetrics({
      Metrics: expectedResponse,
      IsSuccess: true,
      ErrorMessage: null,
    });
    await homeUIService.open();

    expect(homePage.newCustomerMetric).toHaveText(newCustomers.toString());
  });

  test(
    "Check Canceled Orders metric",
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ homeUIService, homePage, mock }) => {
      const canceledOrders = 17;
      const expectedResponse = generateMetricsResponse({ orders: { totalCanceledOrders: canceledOrders } });
      await mock.homePageMetrics({
        Metrics: expectedResponse,
        IsSuccess: true,
        ErrorMessage: null,
      });
      await homeUIService.open();

      expect(homePage.canceledOrdersMetric).toHaveText(canceledOrders.toString());
    },
  );

  test("Check Total Revenue metric", { tag: [TAGS.UI, TAGS.REGRESSION] }, async ({ homeUIService, homePage, mock }) => {
    const totalRevenue = 165000;
    const expectedResponse = generateMetricsResponse({ orders: { totalRevenue: totalRevenue } });
    await mock.homePageMetrics({
      Metrics: expectedResponse,
      IsSuccess: true,
      ErrorMessage: null,
    });
    await homeUIService.open();
    const formattedTotalRevenueMetric = "$" + convertNumberToFormat(totalRevenue, "0.0a");

    expect(homePage.totalRevenueMetric).toHaveText(formattedTotalRevenueMetric);
  });

  test(
    "Check Avg Order Value metric",
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ homeUIService, homePage, mock }) => {
      const avgOrderValue = 180;
      const expectedResponse = generateMetricsResponse({ orders: { averageOrderValue: avgOrderValue } });
      await mock.homePageMetrics({
        Metrics: expectedResponse,
        IsSuccess: true,
        ErrorMessage: null,
      });
      await homeUIService.open();
      const formattedAvgOrderValue = "$" + convertNumberToFormat(avgOrderValue, "0.0a");

      expect(homePage.avgOrdersValue).toHaveText(formattedAvgOrderValue);
    },
  );
});
