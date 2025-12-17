import { generateCustomerData } from "data/customers/generateCustomerData";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { expect, test } from "fixtures/api.fixture";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [Sales Portal] [Customers]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(id, token);
  });

  test(
    "Create Customer",
    { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ loginApiService, customersApi }) => {
      token = await loginApiService.loginAsAdmin();
      const customerData = generateCustomerData();
      const createdCustomer = await customersApi.create(customerData, token);
      validateResponse(createdCustomer, {
        status: STATUS_CODES.CREATED,

        IsSuccess: true,
        ErrorMessage: null,
      });

      id = createdCustomer.body.Customer._id;

      const actualProductData = createdCustomer.body.Customer;
      expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(customerData);
    },
  );
});
