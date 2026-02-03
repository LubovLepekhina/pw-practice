import { test } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { RESPONSE_ERRORS } from "data/errors";
import { ObjectId } from "bson";

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

  test.describe("[Delete Positive]", () => {
    test(
      "Should delete product with valid id and valid authorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        const deleteResponse = await productsApi.delete(id, token);

        validateResponse(deleteResponse, {
          status: STATUS_CODES.DELETED,
        });

        const getResponse = await productsApi.getById(id, token);
        validateResponse(getResponse, {
          status: STATUS_CODES.NOT_FOUND,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.PRODUCT_NOT_FOUND(id),
        });
        id = "";
      },
    );
  });

  test.describe("[Delete Negative]", () => {
    test(
      "Should not delete product without authorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        const deleteResponse = await productsApi.delete(id, "");

        validateResponse(deleteResponse, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.UNAUTHORIZED,
        });
      },
    );

    test(
      "Should not delete product with invalid authorization token",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        const deleteResponse = await productsApi.delete(id, token + "a");

        validateResponse(deleteResponse, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.INVALID_TOKEN,
        });
      },
    );

    test(
      "Should return 404 for empty product id",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApi }) => {
        const deleteResponse = await productsApi.delete("", token);

        validateResponse(deleteResponse, {
          status: STATUS_CODES.NOT_FOUND,
        });
      },
    );

    test(
      "Should return 404 for non-existing product id",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApi }) => {
        const id = new ObjectId().toHexString();
        const deleteResponse = await productsApi.delete(id, token);

        validateResponse(deleteResponse, {
          status: STATUS_CODES.NOT_FOUND,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.PRODUCT_NOT_FOUND(id),
        });
      },
    );

    test(
      "Should return 404 when attempting to delete an already deleted product",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        const deleteResponse = await productsApi.delete(id, token);

        validateResponse(deleteResponse, {
          status: STATUS_CODES.DELETED,
        });

        const secondDelete = await productsApi.delete(id, token);
        validateResponse(secondDelete, {
          status: STATUS_CODES.NOT_FOUND,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.PRODUCT_NOT_FOUND(id),
        });
        id = "";
      },
    );
  });
});
