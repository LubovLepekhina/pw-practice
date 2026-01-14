import {
  test as base,
  expect,
  // Page
} from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { OrderListPage } from "ui/pages/orders/orderList.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { EditProductPage } from "ui/pages/products/editProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { AddNewCustomertUIService } from "ui/service/addNewCustomer.ui-service";
import { AddNewProductUIService } from "ui/service/addNewProduct.ui-service";
import { CustomersListUIService } from "ui/service/customersList.ui-service";
import { HomeUIService } from "ui/service/home.ui-service";
import { LoginUIService } from "ui/service/login.ui-service";
import { ProductsListUIService } from "ui/service/productsList.ui-service";

export interface IPages {
  //pages
  loginPage: LoginPage;
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  editProductPage: EditProductPage;
  addNewCustomerPage: AddNewCustomerPage;
  customersListPage: CustomersListPage;
  orderListPage: OrderListPage;

  //ui-services
  homeUIService: HomeUIService;
  productsListUIService: ProductsListUIService;
  addNewProductUIService: AddNewProductUIService;
  loginUIService: LoginUIService;
  customersListUIService: CustomersListUIService;
  addNewCustomerUIService: AddNewCustomertUIService;
}

export const test = base.extend<IPages>({
  //pages
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },

  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },

  editProductPage: async ({ page }, use) => {
    await use(new EditProductPage(page));
  },

  addNewCustomerPage: async ({ page }, use) => {
    await use(new AddNewCustomerPage(page));
  },

  customersListPage: async ({ page }, use) => {
    await use(new CustomersListPage(page));
  },

  orderListPage: async ({ page }, use) => {
    await use(new OrderListPage(page));
  },

  //ui-services
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },

  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },

  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },

  loginUIService: async ({ page }, use) => {
    await use(new LoginUIService(page));
  },

  customersListUIService: async ({ page }, use) => {
    await use(new CustomersListUIService(page));
  },

  addNewCustomerUIService: async ({ page }, use) => {
    await use(new AddNewCustomertUIService(page));
  },
});

// export class Pages {
//   public homePage: HomePage;
//   public productsListPage: ProductsListPage;
//   public addNewProductPage: AddNewProductPage;

//   constructor(page: Page) {
//     this.homePage = new HomePage(page);
//     this.productsListPage = new ProductsListPage(page);
//     this.addNewProductPage = new AddNewProductPage(page);
//   }
// }

// interface IPages {
//   pages: Pages;
// }

// const test = base.extend<IPages>({
//   pages: async ({ page }, use) => {
//     await use(new Pages(page));
//   },
// });

export { expect };
