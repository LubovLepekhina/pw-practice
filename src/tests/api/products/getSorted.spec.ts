import { test, expect } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { TAGS } from "data/tags";
import { RESPONSE_ERRORS } from "data/errors";
import { getAllProductsSchema } from "data/schemas/products/getAll.schema";
import { ProductsSortField } from "data/types/product.types";

test.describe("[API] [Products] [Get Sorted]", () => {
  test.describe("[Search]", () => {
    let id = "";
    let token = "";

    test.beforeEach(async ({ loginApiService }) => {
      token = await loginApiService.loginAsAdmin();
    });
    test.afterEach(async ({ productsApiService }) => {
      if (id) await productsApiService.delete(token, id);
      id = "";
    });

    test(
      "Should return products when searching by name",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);
        id = product._id;

        const response = await productsApi.getSorted(token, { search: product.name });

        validateResponse(response, {
          status: STATUS_CODES.OK,
          schema: getAllProductsSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
        const { limit, search, manufacturer, total, page, sorting } = response.body;
        const found = response.body.Products.find((el) => el._id === product._id);
        expect.soft(found, `Created product should be in response`).toBeTruthy();
        expect.soft(limit, `Limit should be ${limit}`).toBe(10);
        expect.soft(search).toBe(product.name);
        expect.soft(manufacturer).toEqual([]);
        expect.soft(page).toBe(1);
        expect.soft(sorting).toEqual({ sortField: "createdOn", sortOrder: "desc" });
        expect.soft(total).toBeGreaterThanOrEqual(1);
      },
    );

    test(
      "Should return products when searching by price",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);
        id = product._id;

        const response = await productsApi.getSorted(token, { search: product.price.toString() });

        validateResponse(response, {
          status: STATUS_CODES.OK,
          schema: getAllProductsSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
        const { limit, search, manufacturer, total, page, sorting } = response.body;
        const found = response.body.Products.find((el) => el._id === product._id);
        expect.soft(found, `Created product should be in response`).toBeTruthy();
        expect.soft(limit, `Limit should be ${limit}`).toBe(10);
        expect.soft(search).toBe(product.price.toString());
        expect.soft(manufacturer).toEqual([]);
        expect.soft(page).toBe(1);
        expect.soft(sorting).toEqual({ sortField: "createdOn", sortOrder: "desc" });
        expect.soft(total).toBeGreaterThanOrEqual(1);
      },
    );

    test(
      "Should return products when searching by manufacturer",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);
        id = product._id;

        const response = await productsApi.getSorted(token, { search: product.manufacturer });

        validateResponse(response, {
          status: STATUS_CODES.OK,
          schema: getAllProductsSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
        const { limit, search, manufacturer, total, page, sorting } = response.body;
        const found = response.body.Products.find((el) => el._id === product._id);
        expect.soft(found, `Created product should be in response`).toBeTruthy();
        expect.soft(limit, `Limit should be ${limit}`).toBe(10);
        expect.soft(search).toBe(product.manufacturer);
        expect.soft(manufacturer).toEqual([]);
        expect.soft(page).toBe(1);
        expect.soft(sorting).toEqual({ sortField: "createdOn", sortOrder: "desc" });
        expect.soft(total).toBeGreaterThanOrEqual(1);
      },
    );

    test(
      "Should not return products without autorization token",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);
        id = product._id;

        const response = await productsApi.getSorted("", { search: product.name });

        validateResponse(response, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.UNAUTHORIZED,
        });
      },
    );

    test(
      "Should not return products with invalid token",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);
        id = product._id;

        const response = await productsApi.getSorted(token + "t", { search: product.manufacturer });

        validateResponse(response, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.INVALID_TOKEN,
        });
      },
    );

    test(
      "Should return empty product list when searching for a non-existing product",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);
        id = product._id;

        const response = await productsApi.getSorted(token, { search: "non-existing product" });

        validateResponse(response, {
          status: STATUS_CODES.OK,
          schema: getAllProductsSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
        expect(response.body.Products.length).toBe(0);
        expect(response.body.total).toBe(0);
      },
    );
  });

  test.describe("[Sorting]", () => {
    const ids: string[] = [];
    let token = "";

    test.beforeEach(async ({ loginApiService }) => {
      token = await loginApiService.loginAsAdmin();
    });
    test.afterEach(async ({ productsApiService }) => {
      if (ids.length) {
        for (const id of ids) {
          await productsApiService.delete(token, id);
        }
        ids.length = 0;
      }
    });

    test(
      "Should return products sorted by createdOn in ascending order",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi, page }) => {
        const product1 = await productsApiService.create(token);
        await page.waitForTimeout(1000);
        const product2 = await productsApiService.create(token);

        ids.push(product1._id, product2._id);
        const response = await productsApi.getSorted(token, { sortField: "createdOn", sortOrder: "asc" });
        const allProducts = await productsApi.getAll(token);

        validateResponse(response, {
          status: STATUS_CODES.OK,
          schema: getAllProductsSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        const actualProducts = response.body.Products;

        const sorted = allProducts.body.Products.toSorted((a, b) => {
          const dateA = new Date(a.createdOn);
          const dateB = new Date(b.createdOn);

          return dateA.getTime() - dateB.getTime();
        }).slice(0, 10);

        actualProducts.forEach((actual, index) => {
          expect.soft(actual).toEqual(sorted[index]);
        });

        const { limit, search, manufacturer, total, page: pageParam, sorting } = response.body;
        expect.soft(limit, `Limit should be ${limit}`).toBe(10);
        expect.soft(search).toBe("");
        expect.soft(manufacturer).toEqual([]);
        expect.soft(pageParam).toBe(1);
        expect.soft(sorting).toEqual({ sortField: "createdOn", sortOrder: "asc" });
        expect.soft(total).toBeGreaterThanOrEqual(2);
      },
    );

    test(
      "Should return products sorted by createdOn in descending order",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi, page }) => {
        const product1 = await productsApiService.create(token);
        await page.waitForTimeout(1000);
        const product2 = await productsApiService.create(token);

        ids.push(product1._id, product2._id);
        const response = await productsApi.getSorted(token, { sortField: "createdOn", sortOrder: "desc" });
        const allProducts = await productsApi.getAll(token);

        validateResponse(response, {
          status: STATUS_CODES.OK,
          schema: getAllProductsSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        const actualProducts = response.body.Products;

        const sorted = allProducts.body.Products.toSorted((a, b) => {
          const dateA = new Date(a.createdOn);
          const dateB = new Date(b.createdOn);

          return dateB.getTime() - dateA.getTime();
        }).slice(0, 10);

        actualProducts.forEach((actual, index) => {
          expect.soft(actual).toEqual(sorted[index]);
        });

        const { limit, search, manufacturer, total, page: pageParam, sorting } = response.body;
        expect.soft(limit, `Limit should be ${limit}`).toBe(10);
        expect.soft(search).toBe("");
        expect.soft(manufacturer).toEqual([]);
        expect.soft(pageParam).toBe(1);
        expect.soft(sorting).toEqual({ sortField: "createdOn", sortOrder: "desc" });
        expect.soft(total).toBeGreaterThanOrEqual(2);
      },
    );

    test(
      "Should return products sorted by manufacturer in descending order",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi, page }) => {
        const product1 = await productsApiService.create(token);
        await page.waitForTimeout(1000);
        const product2 = await productsApiService.create(token);

        ids.push(product1._id, product2._id);
        const response = await productsApi.getSorted(token, { sortField: "manufacturer", sortOrder: "desc" });
        const allProducts = await productsApi.getAll(token);

        validateResponse(response, {
          status: STATUS_CODES.OK,
          schema: getAllProductsSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        const actualProducts = response.body.Products;

        const sorted = allProducts.body.Products.toSorted((a, b) => {
          const dateA = new Date(a.createdOn);
          const dateB = new Date(b.createdOn);

          return b.manufacturer.localeCompare(a.manufacturer) || dateB.getTime() - dateA.getTime();
        }).slice(0, 10);

        actualProducts.forEach((actual, index) => {
          expect.soft(actual).toEqual(sorted[index]);
        });

        const { limit, search, manufacturer, total, page: pageParam, sorting } = response.body;
        expect.soft(limit, `Limit should be ${limit}`).toBe(10);
        expect.soft(search).toBe("");
        expect.soft(manufacturer).toEqual([]);
        expect.soft(pageParam).toBe(1);
        expect.soft(sorting).toEqual({ sortField: "manufacturer", sortOrder: "desc" });
        expect.soft(total).toBeGreaterThanOrEqual(2);
      },
    );

    test(
      "Should return 400 when sorting by unsupported field",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi, page }) => {
        const product1 = await productsApiService.create(token);
        await page.waitForTimeout(1000);
        const product2 = await productsApiService.create(token);

        ids.push(product1._id, product2._id);

        const response = await productsApi.getSorted(token, {
          sortField: "amount" as unknown as ProductsSortField,
          sortOrder: "desc",
        });

        validateResponse(response, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: null,
        });
      },
    );
  });
});
