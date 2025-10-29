import { credentials } from 'config/env';
import { NOTIFICATIONS } from 'data/salesPortal/notifications';
import { generateProductData } from 'data/salesPortal/products/generateProductData';
import { test, expect } from 'fixtures/pages.fixtures';

test.describe('[Sales Portal] [Product Deletion]', async () => {

    test.beforeEach(async ({ loginPage, homePage }) => {
        await loginPage.open();
        await expect(loginPage.title).toBeVisible();
        await loginPage.fillCredentials(credentials);
        await loginPage.clickLoginButton();
        await homePage.waitForOpened();
    })

    test('should create a new product and delete it from the product list', async ({ homePage, productsListPage, addNewProductPage }) => {
        await homePage.clickOnViewModule("Products");
        await productsListPage.waitForOpened();
        await productsListPage.clickAddNewProduct();

        await addNewProductPage.waitForOpened();
        const productData = generateProductData();
        await addNewProductPage.fillForm(productData);
        await addNewProductPage.clickSave();

        await productsListPage.waitForOpened();
        await expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_CREATED.trim());
        await productsListPage.closeNotification();
        await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

        await productsListPage.clickDelete(productData.name);
        await productsListPage.deleteModal.waitForOpened();
        await productsListPage.deleteModal.clickDelete();
        await productsListPage.waitForOpened();

        await expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_DELETED.trim());
        await expect(productsListPage.tableRowByName(productData.name)).toHaveCount(0);

    })
    
})