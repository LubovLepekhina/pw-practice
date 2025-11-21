import { IApiClient, IRequestOptions } from "api/apiClients/typesApi";
import { apiConfig } from "config/apiConfig";

export class CustomersApi {
    constructor(private apiClient: IApiClient) {}
    
    async delete(_id: string, token: string) {
    const options: IRequestOptions = {
        baseURL: apiConfig.baseUrl!,
        url: apiConfig.endpoints.customerById(_id),
        method: "delete",
        headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    };

    return await this.apiClient.send<null>(options);
    }
}