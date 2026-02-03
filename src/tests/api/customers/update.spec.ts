import { COUNTRIES } from "data/customers/countries";
import {
  allFields,
  invalidDataForFieldsValidation,
  invalidDataTypeForApi,
  validDataForFieldsValidation,
} from "data/customers/createUpdateCustomer.data";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { RESPONSE_ERRORS } from "data/errors";
import { ERROR_MESSAGES, NOTIFICATIONS } from "data/notifications";
import { createCustomerSchema } from "data/schemas/customers/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { ICustomer } from "data/types/customer.types";
import { expect, test } from "fixtures/api.fixture";
import _ from "lodash";
import { getDifferentEnumValue } from "utils/enum.utils";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [Sales Portal] [Customers]", () => {
  let token = "";
  const ids: string[] = [];

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ customersApiService }) => {
    if (ids.length) {
      for (const id of ids) {
        await customersApiService.delete(id, token);
      }
    }
    ids.length = 0;
  });

  test.describe("[Update Positive]", () => {
    test(
      "Should update customer with valid data for all fields",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const { _id } = await customersApiService.create(token);
        ids.push(_id);
        const newCustomerData = generateCustomerData();
        const updatedCustomer = await customersApi.update(_id, newCustomerData, token);
        validateResponse(updatedCustomer, {
          status: STATUS_CODES.OK,
          schema: createCustomerSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        const actualProductData = updatedCustomer.body.Customer;
        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(newCustomerData);
      },
    );

    test(
      "Should update customer with valid data with minimal required fields",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const { _id, ...originalData } = await customersApiService.create(token);
        ids.push(_id);
        const newCustomerData = generateCustomerData();
        const newCustomerDataTheSameNotes = { ...newCustomerData, notes: originalData.notes };
        const updatedCustomer = await customersApi.update(_id, newCustomerDataTheSameNotes, token);
        validateResponse(updatedCustomer, {
          status: STATUS_CODES.OK,
          schema: createCustomerSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        const actualProductData = updatedCustomer.body.Customer;
        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(newCustomerDataTheSameNotes);
      },
    );

    for (const field of allFields) {
      test(
        `Should update customer with field ${field}`,
        { tag: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS] },
        async ({ customersApi, customersApiService }) => {
          const { _id, ...originalData } = await customersApiService.create(token);
          ids.push(_id);
          let newValue;
          if (field === "country") {
            newValue = getDifferentEnumValue(COUNTRIES, originalData.country);
          } else {
            newValue = generateCustomerData()[field];
          }
          const newCustomerData = { ...originalData, [field]: newValue };
          const updatedCustomer = await customersApi.update(_id, newCustomerData, token);
          validateResponse(updatedCustomer, {
            status: STATUS_CODES.OK,
            schema: createCustomerSchema,
            IsSuccess: true,
            ErrorMessage: null,
          });

          const actualProductData = updatedCustomer.body.Customer;
          expect(_.omit(actualProductData, ["_id"])).toEqual(newCustomerData);
        },
      );
    }
  });

  test.describe("[Update Negative]", () => {
    test(
      "Should not update customer without authorization token",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const { _id } = await customersApiService.create(token);
        ids.push(_id);
        const newCustomerData = generateCustomerData();
        const updatedCustomer = await customersApi.update(_id, newCustomerData, "");
        validateResponse(updatedCustomer, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: ERROR_MESSAGES.UNAUTHORIZED,
        });
      },
    );

    test(
      "Should not update customer with invalid token",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const { _id } = await customersApiService.create(token);
        ids.push(_id);
        const newCustomerData = generateCustomerData();
        const updatedCustomer = await customersApi.update(_id, newCustomerData, token + "1");
        validateResponse(updatedCustomer, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: ERROR_MESSAGES.INVALID_TOKEN,
        });
      },
    );

    test(
      "Should not update customer with empty request body",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const { _id } = await customersApiService.create(token);
        ids.push(_id);
        const updatedCustomer = await customersApi.update(_id, {} as unknown as ICustomer, token);
        validateResponse(updatedCustomer, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: NOTIFICATIONS.CREATED_FAIL_INCORRET_REQUEST_BODY,
        });
      },
    );

    test(
      "Should not update customer with an email that already exists",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS] },
      async ({ customersApi, customersApiService }) => {
        const customer1 = await customersApiService.create(token);
        ids.push(customer1._id);
        const existsEmail = customer1.email;
        const customer2 = await customersApiService.create(token);
        const newCustomerData = generateCustomerData({ email: existsEmail });
        ids.push(customer2._id);
        const updatedCustomer = await customersApi.update(customer2._id, newCustomerData, token);
        validateResponse(updatedCustomer, {
          status: STATUS_CODES.CONFLICT,
          IsSuccess: false,
          ErrorMessage: ERROR_MESSAGES.CONFLICT(existsEmail),
        });
      },
    );

    for (const { title, testCustomerData, tags } of invalidDataTypeForApi) {
      test(`Update ${title}`, { tag: tags }, async ({ customersApi, customersApiService }) => {
        const { _id } = await customersApiService.create(token);
        ids.push(_id);
        const updatedCustomer = await customersApi.update(_id, testCustomerData, token);
        validateResponse(updatedCustomer, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: NOTIFICATIONS.CREATED_FAIL_INCORRET_REQUEST_BODY,
        });
      });
    }
  });

  test.describe("[Update Positive] [Field Validation]", () => {
    for (const { title, testCustomerData, tags } of validDataForFieldsValidation) {
      test(`Should update ${title}`, { tag: tags }, async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);
        ids.push(customer._id);

        const updatedCustomer = await customersApi.update(customer._id, testCustomerData, token);

        validateResponse(updatedCustomer, {
          status: STATUS_CODES.OK,
          schema: createCustomerSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        const actualProductData = updatedCustomer.body.Customer;
        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(testCustomerData);
      });
    }
  });

  test.describe("[Update Negative] [Field Validation]", () => {
    for (const { title, testCustomerData, tags } of invalidDataForFieldsValidation) {
      test(`Should not update ${title}`, { tag: tags }, async ({ customersApi, customersApiService }) => {
        const customer = await customersApiService.create(token);
        ids.push(customer._id);

        const updatedCustomer = await customersApi.update(customer._id, testCustomerData, token);

        validateResponse(updatedCustomer, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.BAD_REQUEST,
        });
      });
    }
  });
});
