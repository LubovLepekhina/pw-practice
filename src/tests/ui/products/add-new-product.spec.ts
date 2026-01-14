import { test, expect } from "fixtures";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/notifications";
import { generateProductData } from "data/products/generateProductData";
import _ from "lodash";
// import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
// import { IProduct } from "data/types/product.types";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products]", async () => {
  let id = "";
  let token = "";

  test.skip(
    "OLD: should create a new product and verify it appears at the top of the products list",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);
      const productsListPage = new ProductsListPage(page);
      const addNewProductPage = new AddNewProductPage(page);

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
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
      await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

      const productFromTable = await productsListPage.getProductData(productData.name);
      const actualProductData = _.omit(productFromTable, ["createdOn"]);
      const expectedProductData = _.omit(productData, ["amount", "notes"]);
      expect(actualProductData).toEqual(expectedProductData);
      await expect(productsListPage.firstRow).toContainText(productData.name);
    },
  );

  test(
    "Add new product with services",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ addNewProductUIService, productsListPage }) => {
      // token = await loginUIService.loginAsAdmin(); - не нужно, так как логин через setup project
      await addNewProductUIService.open();
      const createdProduct = await addNewProductUIService.create();
      id = createdProduct._id;
      token = await productsListPage.getAuthToken();
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
      await expect(productsListPage.tableRowByName(createdProduct.name)).toBeVisible();
    },
  );

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test.skip("Add new product OLD", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    // const spinner = page.locator(".spinner-border");
    // const toastMessage = page.locator(".toast-body");

    //login page
    const emailInput = page.locator("#emailinput");
    const passwordInput = page.locator("#passwordinput");
    const loginButton = page.locator("button[type='submit']");

    //home page
    // const welcomeText = page.locator(".welcome-text");
    // const productsButton = page.locator("#products-from-home");

    //products list
    // const productsPageTitle = page.locator("h2.fw-bold");
    // const addNewProductButton = page.locator('[name="add-button"]');
    // const productInTable = (productName: string) => page.locator(`//table/tbody/tr[./td[text()="${productName}"]]`);

    //add new product page
    // const addNewProductPageTitle = page.locator("h2.page-title-text");
    // const nameInput = page.locator("#inputName");
    // const manufacturerSelect = page.locator("#inputManufacturer");
    // const priceInput = page.locator("#inputPrice");
    // const amountInput = page.locator("#inputAmount");
    // const notesInput = page.locator("#textareaNotes");
    // const saveNewProductButton = page.locator("#save-new-product");

    // await page.goto(salesPortalUrl); //fix
    await homePage.open();
    await expect(emailInput).toBeVisible();
    await emailInput.fill(credentials.username);
    await passwordInput.fill(credentials.password);
    await loginButton.click();

    await homePage.waitForOpened();
    // await expect(welcomeText).toBeVisible();
    // await expect(spinner).toHaveCount(0);

    // await productsButton.click();
    await homePage.clickOnViewModule("Products");
    // await expect(productsPageTitle).toHaveText("Products List ");
    // await expect(spinner).toHaveCount(0);
    await productsListPage.waitForOpened();

    // await addNewProductButton.click();
    await productsListPage.clickAddNewProduct();
    // await expect(addNewProductPageTitle).toHaveText("Add New Product ");
    // await expect(spinner).toHaveCount(0);
    await addNewProductPage.waitForOpened();
    // await nameInput.fill(productData.name);
    // await manufacturerSelect.selectOption(productData.manufacturer);
    // await priceInput.fill(productData.price.toString());
    // await amountInput.fill(productData.amount.toString());
    // await notesInput.fill(productData.notes!);
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    // await saveNewProductButton.click();
    await addNewProductPage.clickSave();

    // await expect(productsPageTitle).toHaveText("Products List ");
    // await expect(spinner).toHaveCount(0);
    await productsListPage.waitForOpened();

    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  });
});
