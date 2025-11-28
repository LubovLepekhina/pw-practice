import { IProductDetails } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { logStep } from "utils/report/logStep.utils";

export class ProductDetailsModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator("#details-modal-container");

  readonly title = this.uniqueElement.locator("h5");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly editButton = this.uniqueElement.locator("button.btn-primary");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

  readonly productValue = this.uniqueElement.locator("p");

  @logStep("Click Close Button on Product's Details Modal")
  async clickClose() {
    await this.closeButton.click();
  }

  @logStep("Click Cancel Button on Product's Details Modal")
  async clickCancel() {
    await this.cancelButton.click();
  }

  @logStep("Click Edit Product Button on Product's Details Modal")
  async clickEdit() {
    await this.editButton.click();
  }

  @logStep("Get product data from Details Modal")
  async getData(): Promise<IProductDetails> {
    const [name, amount, price, manufacturer, createdOn, notes] = await this.productValue.allInnerTexts();

    return {
      name: name!,
      amount: +amount!,
      price: +price!,
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
      notes: notes === "-" ? "" : notes!,
    };
  }
}
