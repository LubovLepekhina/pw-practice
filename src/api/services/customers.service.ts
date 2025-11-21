import { CustomersApi } from "api/api/customers.api";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";

export class CustomersApiService {
  constructor(private customersApi: CustomersApi) {}

  async delete(token: string, id: string) {
    const response = await this.customersApi.delete(id, token);
    validateResponse(response, {
      status: STATUS_CODES.DELETED,
    });
  }
}