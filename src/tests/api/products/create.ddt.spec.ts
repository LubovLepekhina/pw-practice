import { createProductInvalidData, createProductValidData } from "data/products/createProduct.data";
import { generateProductData } from "data/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { test } from "fixtures/api.fixture";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [Products]", () => {
  test.describe("[Create Positive]", () => {
    let id = "";
    let token = "";

    test.beforeAll(async ({ loginApiService }) => {
      token = await loginApiService.loginAsAdmin();
    });
    test.afterEach(async ({ productsApiService }) => {
      if (id) await productsApiService.delete(token, id);
      id = "";
    });

    for (const { title, checkingValue } of createProductValidData) {
      test(title, { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] }, async ({ productsApi }) => {
        const productData = generateProductData(checkingValue);
        const createdProduct = await productsApi.create(productData, token);
        validateResponse(createdProduct, {
          status: STATUS_CODES.CREATED,
          IsSuccess: true,
          ErrorMessage: null,
          schema: createProductSchema,
        });
        id = createdProduct.body.Product._id;
      });
    }
  });

  test.describe("[Create Negative]", () => {
    let token = "";

    test.beforeAll(async ({ loginApiService }) => {
      token = await loginApiService.loginAsAdmin();
    });

    for (const { title, checkingValue } of createProductInvalidData) {
      test(title, { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] }, async ({ productsApi }) => {
        const productData = generateProductData(checkingValue);
        const createdProduct = await productsApi.create(productData, token);
        validateResponse(createdProduct, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: "Incorrect request body",
        });
      });
    }
  });
});
