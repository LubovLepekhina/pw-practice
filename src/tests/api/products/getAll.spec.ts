import { test, expect } from "fixtures/api.fixture";
import { getAllProductsSchema } from "data/schemas/products/getAll.schema";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { IProductFromResponse } from "data/types/product.types";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { RESPONSE_ERRORS } from "data/errors";

test.describe("[API] [Products]", () => {
  let id = "";
  let token = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test.describe("[Get All Positive]", () => {
    test(
      "Should get list of all products with valid authorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);

        id = product._id;

        const allProductsResponse = await productsApi.getAll(token);

        validateResponse(allProductsResponse, {
          status: STATUS_CODES.OK,
          schema: getAllProductsSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
        const arrOfProducts: IProductFromResponse[] = allProductsResponse.body.Products;
        const found = arrOfProducts.some((obj) => obj.name === product.name && obj._id === id);
        expect.soft(found).toBe(true);
      },
    );
  });

  test.describe("[Get All Negative]", () => {
    test(
      "Should not get list of all products without authorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);

        id = product._id;

        const allProductsResponse = await productsApi.getAll("");

        validateResponse(allProductsResponse, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.UNAUTHORIZED,
        });
      },
    );

    test(
      "Should not get list of all products with invalid token",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);

        id = product._id;

        const allProductsResponse = await productsApi.getAll(token + "r");

        validateResponse(allProductsResponse, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.INVALID_TOKEN,
        });
      },
    );
  });
});
