import { expect, Page } from "@playwright/test";
import { IProduct, IProductDetails, IProductInTable } from "data/types/product.types";
import _ from "lodash";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { EditProductPage } from "ui/pages/products/editProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { convertToFullDateAndTime } from "utils/date.utils";
import { logStep } from "utils/report/logStep.utils";

export class ProductsListUIService {
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  editProductPage: EditProductPage;

  constructor(private page: Page) {
    this.productsListPage = new ProductsListPage(page);
    this.addNewProductPage = new AddNewProductPage(page);
    this.editProductPage = new EditProductPage(page);
  }

  @logStep("Open Add New Product Page")
  async openAddNewProductPage() {
    await this.productsListPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }

  @logStep("Open Details Modal by product name")
  async openDetailsModal(productName: string) {
    await this.productsListPage.detailsButton(productName).click();
    await this.productsListPage.detailsModal.waitForOpened();
  }

  @logStep("Open Edit Modal by product name")
  async openEditModal(productName: string) {
    await this.productsListPage.editButton(productName).click();
    await this.editProductPage.waitForOpened();
  }

  @logStep("Open Delete Modal by product name")
  async openDeleteModal(productName: string) {
    await this.productsListPage.clickAction(productName, "delete");
    await this.productsListPage.deleteModal.waitForOpened();
  }

  @logStep("Delete product from Products List")
  async deleteProduct(productName: string) {
    await this.productsListPage.clickAction(productName, "delete");
    await this.productsListPage.deleteModal.waitForOpened();
    await this.productsListPage.deleteModal.clickDelete();
    await this.productsListPage.deleteModal.waitForClosed();
  }

  @logStep("Search on Product List Page")
  async search(text: string) {
    await this.productsListPage.fillSearchInput(text);
    await this.productsListPage.clickSearch();
    await this.productsListPage.waitForOpened();
  }

  @logStep("Open Products List Page")
  async open() {
    await this.productsListPage.open("products");
    await this.productsListPage.waitForOpened();
  }

  @logStep("Assert Details Modal data matches created via API data")
  async assertDetailsData(actual: IProductDetails, expected: IProductDetails) {
    expect(actual).toEqual({
      ..._.omit(expected, ["_id"]),
      createdOn: convertToFullDateAndTime(expected.createdOn),
    });
  }

  @logStep("Assert product table data matches created via UI data")
  async assertTableProductDataToGenerated(actual: IProductInTable, expected: IProduct) {
    expect(_.omit(actual, ["createdOn"])).toEqual(_.pick(expected, ["name", "price", "manufacturer", "category"]));
  }

  @logStep("Assert Modal Details Product data matches created via UI data")
  async assertDetailsDataToGenerated(actual: IProductDetails, expected: IProduct) {
    expect(_.omit(actual, ["createdOn"])).toEqual(expected);
  }

  @logStep("Assert product row visibility in table")
  async assertProductInTable(productName: string, { visible }: { visible: boolean }) {
    await expect(this.productsListPage.tableRowByName(productName)).toBeVisible({ visible });
  }
}
