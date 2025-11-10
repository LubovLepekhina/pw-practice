// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) 
// со следующими шагами:
//   - Залогиниться
//   - Создать продукт и проверить 201й статус
//   - Получить все продукты
//   - создать и проверить схему
//   - проверить статус
//   - проверить, что в массиве тела респонса есть созданный продукт
//   - Проверить поля IsSuccess и ErrorMessage

import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { getAllProductsSchema } from "data/schemas/products/getAllProducts.schema";
import { STATUS_CODES } from "data/statusCodes";
import { IProductFromResponse } from "data/types/product.types";
import { validateJsonSchema } from "utils/validateSchema.utils";

const { baseUrl, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
    let id = "";
    let token = "";

    test.beforeEach(async ({ request }) => {
        const loginResponse = await request.post(`${baseUrl}${endpoints.login}`, {
            headers: {
                'content-type': 'application/json',
            },
            data: credentials
        });
        token = loginResponse.headers()['authorization']!;

        expect(loginResponse.status()).toBe(STATUS_CODES.OK);
        expect(token).toBeTruthy();
    })

    test.afterEach(async ({ request }) => {
        const deleteResponse = await request.delete(`${baseUrl}${endpoints.productById(id)}`, {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        expect(deleteResponse.status()).toBe(STATUS_CODES.DELETED);
    })

    test("Get all products", async ({ request }) => {

        //create product
        const product = generateProductData();
        const createResponse = await request.post(`${baseUrl}${endpoints.products}`, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: product
        })
        const createResponseBody = await createResponse.json();
        id = createResponseBody.Product._id;
        expect(createResponse.status()).toBe(STATUS_CODES.CREATED);

        //get all products
        const allProductsResponse = await request.get(`${baseUrl}${endpoints.productsAll}`, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        const body = await allProductsResponse.json();
        const arrOfProducts: IProductFromResponse[] = body.Products;
        const found = arrOfProducts.some(obj => obj.name === product.name && obj._id === id);
      
        //assertions
        validateJsonSchema(body, getAllProductsSchema);
        expect.soft(allProductsResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(found).toBe(true);
        expect.soft(body.IsSuccess).toBe(true);
        expect.soft(body.ErrorMessage).toBe(null);
    })
})