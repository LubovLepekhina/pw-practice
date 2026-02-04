import { test, expect } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { RESPONSE_ERRORS } from "data/errors";
import { getAllCustomersSchema } from "data/schemas/customers/getAll.schema";
import { ICustomerFromResponse } from "data/types/customer.types";

test.describe("[API] [Customers]", () => {
  let id = "";
  let token = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(id, token);
  });

  test.describe("[Get All Positive]", () => {
    test(
      "Should get list of all customers with valid authorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);

        id = customer._id;

        const allCustomersResponse = await customersApi.getAll(token);

        validateResponse(allCustomersResponse, {
          status: STATUS_CODES.OK,
          schema: getAllCustomersSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
        const arrOfCustomers: ICustomerFromResponse[] = allCustomersResponse.body.Customers;
        const found = arrOfCustomers.some((obj) => obj.name === customer.name && obj._id === id);
        expect.soft(found).toBe(true);
      },
    );
  });

  test.describe("[Get All Negative]", () => {
    test(
      "Should not get list of all customers without authorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);

        id = customer._id;

        const allCustomersResponse = await customersApi.getAll("");

        validateResponse(allCustomersResponse, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.UNAUTHORIZED,
        });
      },
    );

    test(
      "Should not get list of all customers with invalid token",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);

        id = customer._id;

        const allCustomersResponse = await customersApi.getAll(token + "o");

        validateResponse(allCustomersResponse, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.INVALID_TOKEN,
        });
      },
    );
  });
});
