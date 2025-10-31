import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { STATUS_CODES } from "data/statusCodes";
import { validateJsonSchema } from "utils/validateSchema.utils";
import { loginSchema } from "data/schemas/auth/login.schema";

// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

const { baseUrl, endpoints } = apiConfig;

test.describe("[API] [Sales Portal]", () => {

    test("Login with valid credentials", async ({ request }) => {
        const response = await request.post(`${baseUrl}${endpoints.login}`, {
            headers: {
                'content-type': 'application/json',
            },
            data: credentials
        });
        const body = await response.json();
        const token = response.headers()['authorization'];

        expect(response.status()).toBe(STATUS_CODES.OK);
        expect(token).toBeTruthy();
        console.log(body);
        validateJsonSchema(body, loginSchema);
    })
});