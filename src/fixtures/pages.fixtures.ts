import { test as base, expect } from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";

export interface IPages {
    loginPage: LoginPage;
    homePage: HomePage;
    productsListPage: ProductsListPage;
    addNewProductPage: AddNewProductPage;
};

export const test = base.extend<IPages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    productsListPage: async ({ page }, use) => {
        await use(new ProductsListPage(page));
    },
    addNewProductPage: async ({page}, use) => {
        await use(new AddNewProductPage(page));
    }
});

export { expect };