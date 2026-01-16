import { test, expect } from "fixtures/api.fixture";
import { getProductSchema } from "data/schemas/products/get.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { TAGS } from "data/tags";
import { ObjectId } from "bson";
import { RESPONSE_ERRORS } from "data/errors";

test.describe("[API] [Products]", () => {
  let id = "";
  let token = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test.describe("[Get by Id Positive]", () => {
    test(
      "Should get product by valid id",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);
        id = product._id;

        const getProductResponse = await productsApi.getById(id, token);

        validateResponse(getProductResponse, {
          status: STATUS_CODES.OK,
          schema: getProductSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
        expect(getProductResponse.body.Product).toEqual(product);
      },
    );
  });

  test.describe("[Get by Id Negative]", () => {
    test(
      "Should return 404 for non-existing product id",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApi }) => {
        const id = new ObjectId().toHexString();

        const getProductResponse = await productsApi.getById(id, token);

        validateResponse(getProductResponse, {
          status: STATUS_CODES.NOT_FOUND,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.PRODUCT_NOT_FOUND(id),
        });
      },
    );

    test(
      "Should not get product by valid id without authorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);
        id = product._id;

        const getProductResponse = await productsApi.getById(id, "");

        validateResponse(getProductResponse, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.UNAUTHORIZED,
        });
      },
    );

    test(
      "Should not get product by valid id with invalid authorization token",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.create(token);
        id = product._id;

        const getProductResponse = await productsApi.getById(id, token + "3");

        validateResponse(getProductResponse, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.INVALID_TOKEN,
        });
      },
    );
  });
});
