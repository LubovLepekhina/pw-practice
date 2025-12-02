import { IApiClient, IRequestOptions } from "api/apiClients/typesApi";
import { apiConfig } from "config/apiConfig";
import { ICustomer, ICustomerResponse, ICustomersSortedResponse, IGetCustomersParams } from "data/types/customer.types";
import { convertRequestParams } from "utils/queryParams.utils";
import { logStep } from "utils/report/logStep.utils";

export class CustomersApi {
  constructor(private apiClient: IApiClient) {}

  @logStep("POST /api/customers")
  async create(customer: ICustomer, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl!,
      url: apiConfig.endpoints.customers,
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: customer,
    };

    return await this.apiClient.send<ICustomerResponse>(options);
  }

  @logStep("GET /api/customers/params")
  async getWithFilters(token: string, params?: Partial<IGetCustomersParams>) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl!,
      url: apiConfig.endpoints.customers + (params ? convertRequestParams(params) : ""),
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await this.apiClient.send<ICustomersSortedResponse>(options);
  }

  @logStep("GET /api/customers/all")
  async getAll(token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl!,
      url: apiConfig.endpoints.customersAll,
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await this.apiClient.send<ICustomerResponse>(options);
  }

  @logStep("GET /api/customers/{id}/")
  async getById(id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl!,
      url: apiConfig.endpoints.customerById(id),
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await this.apiClient.send<ICustomerResponse>(options);
  }

  @logStep("PUT /api/customers/{id}/")
  async update(_id: string, newCustomer: ICustomer, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl!,
      url: apiConfig.endpoints.customerById(_id),
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: newCustomer,
    };

    return await this.apiClient.send<ICustomerResponse>(options);
  }

  @logStep("DELETE /api/customers/{id}")
  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl!,
      url: apiConfig.endpoints.customerById(id),
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await this.apiClient.send<null>(options);
  }
}
