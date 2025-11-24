import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { expect, test } from "fixtures/business.fixture";

test.describe("[Sales Portal] [Product Deletion]", async () => {
  test("should create a new product and delete it from the product list", async ({
    loginPage,
    homePage,
    productsListPage,
    addNewProductPage,
  }) => {
    await loginPage.open();
    await expect(loginPage.title).toBeVisible();
    await loginPage.fillCredentials(credentials);
    await loginPage.clickLoginButton();
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();

    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();

    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_CREATED);
    await productsListPage.closeNotification();
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    await productsListPage.clickDelete(productData.name);
    await productsListPage.deleteModal.waitForOpened();
    await productsListPage.deleteModal.clickDelete();
    await productsListPage.waitForOpened();

    await expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_DELETED);
    await expect(productsListPage.tableRowByName(productData.name)).toHaveCount(0);
  });

  test("Delete", async ({
    loginUIService,
    productsListUIService,
    homeUIService,
    productsApiService,
    productsListPage,
    productsApi,
  }) => {
    const token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    await homeUIService.openModule("Products");
    await productsListUIService.deleteProduct(createdProduct.name);
    const deleted = await productsApi.getById(createdProduct._id, token);
    expect(deleted.status).toBe(STATUS_CODES.NOT_FOUND);
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
    await expect(productsListPage.tableRowByName(createdProduct.name)).not.toBeVisible();

    /*
        login => get token
        create product via api
        go to products list page
        open delete modal
        delete product
        verify deleted
        */
  });
});
