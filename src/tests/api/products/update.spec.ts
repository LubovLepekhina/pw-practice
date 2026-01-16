import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { TAGS } from "data/tags";
import { IProduct } from "data/types/product.types";
import { getDifferentEnumValue } from "utils/enum.utils";
import { MANUFACTURERS } from "data/products/manufacturers";
import { RESPONSE_ERRORS } from "data/errors";
import { updateProductInvalidData, updateProductValidData } from "data/products/updateProduct.data";

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

  test.describe("[Update Positive]", () => {
    test(
      "Should update product with valid data for all fields",
      { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApiService, productsApi }) => {
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        const updatedProductData = generateProductData();
        const updatedProductResponse = await productsApi.update(id, updatedProductData, token);

        validateResponse(updatedProductResponse, {
          status: STATUS_CODES.OK,
          schema: createProductSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        const updatedProduct = updatedProductResponse.body.Product;
        expect(_.omit(updatedProduct, ["_id", "createdOn"])).toEqual(updatedProductData);
        expect(id).toBe(updatedProduct._id);
      },
    );

    const fieldsForUpdate: (keyof IProduct)[] = ["name", "amount", "manufacturer", "price", "notes"];
    for (const field of fieldsForUpdate) {
      test(
        `Should update product with field ${field}`,
        { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] },
        async ({ productsApiService, productsApi }) => {
          const { _id, ...originalData } = await productsApiService.create(token);
          id = _id;

          let newValue;
          if (field === "manufacturer") {
            newValue = getDifferentEnumValue(MANUFACTURERS, originalData.manufacturer);
          } else {
            newValue = generateProductData()[field];
          }
          const newProductData = { ...originalData, [field]: newValue };

          const updatedProduct = await productsApi.update(id, newProductData, token);

          validateResponse(updatedProduct, {
            status: STATUS_CODES.OK,
            schema: createProductSchema,
            IsSuccess: true,
            ErrorMessage: null,
          });
          const expectedProduct = updatedProduct.body.Product;
          expect(_.omit(expectedProduct, ["_id"])).toEqual(newProductData);
        },
      );
    }
  });

  test.describe("[Update Negative]", () => {
    test(
      "Should not update product without autorization token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApi, productsApiService }) => {
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        const newProductData = generateProductData();
        const updatedProduct = await productsApi.update(id, newProductData, "");

        validateResponse(updatedProduct, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.UNAUTHORIZED,
        });
      },
    );

    test(
      "Should not update product with invalid token",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApi, productsApiService }) => {
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        const newProductData = generateProductData();
        const updatedProduct = await productsApi.update(id, newProductData, token + "1");

        validateResponse(updatedProduct, {
          status: STATUS_CODES.UNAUTHORIZED,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.INVALID_TOKEN,
        });
      },
    );

    test(
      "Should not update product with empty request body",
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      async ({ productsApi, productsApiService }) => {
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        const updatedProduct = await productsApi.update(id, {} as unknown as IProduct, token);

        validateResponse(updatedProduct, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.BAD_REQUEST,
        });
      },
    );
  });

  test.describe("[Update Positive] [Field Validation]", () => {
    for (const { title, checkingValue } of updateProductValidData) {
      test(title, { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] }, async ({ productsApi, productsApiService }) => {
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        const newProductData = generateProductData(checkingValue);
        const updatedProduct = await productsApi.update(id, newProductData, token);

        validateResponse(updatedProduct, {
          status: STATUS_CODES.OK,
          schema: createProductSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
        const expectedProduct = updatedProduct.body.Product;
        expect(_.omit(expectedProduct, ["_id", "createdOn"])).toEqual(newProductData);
      });
    }
  });

  test.describe("[Update Negative] [Field Validation]", () => {
    for (const { title, checkingValue } of updateProductInvalidData) {
      test(title, { tag: [TAGS.API, TAGS.REGRESSION, TAGS.PRODUCTS] }, async ({ productsApi, productsApiService }) => {
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        const newProductData = generateProductData(checkingValue);
        const updatedProduct = await productsApi.update(id, newProductData, token);

        validateResponse(updatedProduct, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.BAD_REQUEST,
        });
      });
    }
  });
});
