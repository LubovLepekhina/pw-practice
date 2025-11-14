import { test, expect } from "fixtures/business.fixture";
import { generateMetricsResponse } from "data/salesPortal/generateMetricsResponse";
import { convertNumberToFormat } from "utils/convertNumbers.utils";


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

test.describe('[Integration] [Sales Portal] [Home] [Metrics]', () => {
    test('Check Orders This Year metric', async ({ loginAsAdmin, homePage, mock}) => {
        const totalOrders = 50;
        const expectedResponse = generateMetricsResponse({Metrics: {orders: {totalOrders}}});
        await mock.homePageMetrics(expectedResponse);
        await loginAsAdmin();

        expect(homePage.orderThisYearMetric).toHaveText(totalOrders.toString());
    })

    test('Check New Customers metric', async ({ loginAsAdmin, homePage, mock}) => {
        const newCustomers = 150;
        const expectedResponse = generateMetricsResponse({Metrics: {customers: {totalNewCustomers: newCustomers}}});
        await mock.homePageMetrics(expectedResponse);
        await loginAsAdmin();

        expect(homePage.newCustomerMetric).toHaveText(newCustomers.toString());
    })

    test('Check Canceled Orders metric', async ({ loginAsAdmin, homePage, mock}) => {
        const canceledOrders = 17;
        const expectedResponse = generateMetricsResponse({Metrics: {orders: {totalCanceledOrders: canceledOrders}}});
        await mock.homePageMetrics(expectedResponse);
        await loginAsAdmin();

        expect(homePage.canceledOrdersMetric).toHaveText(canceledOrders.toString());
    })

    test('Check Total Revenue metric', async ({ loginAsAdmin, homePage, mock}) => {
        const totalRevenue = 165000;
        const expectedResponse = generateMetricsResponse({Metrics: {orders: {totalRevenue: totalRevenue}}});
        await mock.homePageMetrics(expectedResponse);
        await loginAsAdmin();
        const formattedTotalRevenueMetric = '$' + convertNumberToFormat(totalRevenue, '0.0a');

        expect(homePage.totalRevenueMetric).toHaveText(formattedTotalRevenueMetric);
    })

    test('Check Avg Order Value metric', async ({ loginAsAdmin, homePage, mock}) => {
        const avgOrderValue = 180;
        const expectedResponse = generateMetricsResponse({Metrics: {orders: {averageOrderValue: avgOrderValue}}});
        await mock.homePageMetrics(expectedResponse);
        await loginAsAdmin();
        const formattedAvgOrderValue = '$' + convertNumberToFormat(avgOrderValue, '0.0a');

        expect(homePage.avgOrdersValue).toHaveText(formattedAvgOrderValue);
    })
})