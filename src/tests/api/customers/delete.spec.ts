import { ObjectId } from "bson";
import { RESPONSE_ERRORS } from "data/errors";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { test } from "fixtures";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [Customers]", () => {
  let token = "";
  let id = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(id, token);
    id = "";
  });

  test.describe("[Delete Positive]", () => {
    test(
      "Should delete customer with valid id and valid authorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);
        id = customer._id;

        const deleteCustomer = await customersApi.delete(id, token);

        validateResponse(deleteCustomer, {
          status: STATUS_CODES.DELETED,
        });

        const getCustomer = await customersApi.getById(id, token);
        validateResponse(getCustomer, {
          status: STATUS_CODES.NOT_FOUND,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.CUSTOMER_NOT_FOUND(id),
        });
        id = "";
      },
    );
  });

  test.describe("[Delete Negative]", () => {
    test(
      "Should not delete customer without authorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);
        id = customer._id;

        const deleteCustomer = await customersApi.delete(id, "");

        validateResponse(deleteCustomer, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.UNAUTHORIZED,
        });
      },
    );

    test(
      "Should not delete customer with invalid authorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);
        id = customer._id;

        const deleteCustomer = await customersApi.delete(id, token + "i");

        validateResponse(deleteCustomer, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.INVALID_TOKEN,
        });
      },
    );

    test(
      "Should return 404 for empty product id",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi }) => {
        const deleteCustomer = await customersApi.delete("", token);

        validateResponse(deleteCustomer, {
          status: STATUS_CODES.NOT_FOUND,
        });
      },
    );

    test(
      "Should return 404 for non-existing customer id",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi }) => {
        const id = new ObjectId().toHexString();
        const deleteResponse = await customersApi.delete(id, token);

        validateResponse(deleteResponse, {
          status: STATUS_CODES.NOT_FOUND,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.CUSTOMER_NOT_FOUND(id),
        });
      },
    );

    test(
      "Should return 404 when attempting to delete an already deleted customer",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);
        id = customer._id;

        const deleteResponse = await customersApi.delete(id, token);

        validateResponse(deleteResponse, {
          status: STATUS_CODES.DELETED,
        });

        const secondDelete = await customersApi.delete(id, token);

        validateResponse(secondDelete, {
          status: STATUS_CODES.NOT_FOUND,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.CUSTOMER_NOT_FOUND(id),
        });
        id = "";
      },
    );
  });
});
