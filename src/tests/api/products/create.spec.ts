import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { IProduct } from "data/types/product.types";
import { TAGS } from "data/tags";
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

  test.describe("[Create Positive]", () => {
    test(
      "Should create product with valid data",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApi }) => {
        const productData = generateProductData();
        const createdProduct = await productsApi.create(productData, token);
        validateResponse(createdProduct, {
          status: STATUS_CODES.CREATED,
          schema: createProductSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        id = createdProduct.body.Product._id;

        const actualProductData = createdProduct.body.Product;
        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
      },
    );
  });

  test.describe("[Create Negative]", () => {
    test(
      "Should not create product with invalid data",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApi }) => {
        const productData = generateProductData();
        const createdProduct = await productsApi.create({ ...productData, name: 123 } as unknown as IProduct, token);
        validateResponse(createdProduct, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.BAD_REQUEST,
        });
      },
    );

    test(
      "Should not create duplicate product",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApi }) => {
        const productData = generateProductData();
        const createdProduct = await productsApi.create(productData, token);
        id = createdProduct.body.Product._id;
        validateResponse(createdProduct, {
          status: STATUS_CODES.CREATED,
          schema: createProductSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        const sameProduct = await productsApi.create(productData, token);
        validateResponse(sameProduct, {
          status: STATUS_CODES.CONFLICT,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.CONFLICT(productData.name),
        });
      },
    );

    test(
      "Should not create product without autorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApi }) => {
        const productData = generateProductData();
        const createdProduct = await productsApi.create(productData, "");

        validateResponse(createdProduct, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.UNAUTHORIZED,
        });
      },
    );

    test(
      "Should not create product with invalid token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApi }) => {
        const productData = generateProductData();
        const createdProduct = await productsApi.create(productData, token + "1");

        validateResponse(createdProduct, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.INVALID_TOKEN,
        });
      },
    );
  });
});
