import { test, expect } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { TAGS } from "data/tags";
import { ObjectId } from "bson";
import { RESPONSE_ERRORS } from "data/errors";
import { createCustomerSchema } from "data/schemas/customers/create.schema";

test.describe("[API] [Customers]", () => {
  let id = "";
  let token = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(id, token);
    id = "";
  });

  test.describe("[Get by Id Positive]", () => {
    test(
      "Should get customer by valid id",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);
        id = customer._id;

        const getCustomerResponse = await customersApi.getById(id, token);

        validateResponse(getCustomerResponse, {
          status: STATUS_CODES.OK,
          schema: createCustomerSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
        expect(getCustomerResponse.body.Customer).toEqual(customer);
      },
    );
  });

  test.describe("[Get by Id Negative]", () => {
    test(
      "Should return 404 for non-existing customer id",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi }) => {
        const id = new ObjectId().toHexString();

        const getCustomerResponse = await customersApi.getById(id, token);

        validateResponse(getCustomerResponse, {
          status: STATUS_CODES.NOT_FOUND,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.CUSTOMER_NOT_FOUND(id),
        });
      },
    );

    test(
      "Should not get customer by valid id without authorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);
        id = customer._id;

        const getCustomerResponse = await customersApi.getById(id, "");

        validateResponse(getCustomerResponse, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.UNAUTHORIZED,
        });
      },
    );

    test(
      "Should not get customer by valid id with invalid authorization token",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);
        id = customer._id;

        const getCustomerResponse = await customersApi.getById(id, token + "3");

        validateResponse(getCustomerResponse, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.INVALID_TOKEN,
        });
      },
    );
  });
});
