import { test, expect } from "fixtures";
import { NOTIFICATIONS } from "data/notifications";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products]", () => {
  test(
    "Table parsing",
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ productsListPage, productsListUIService, addNewProductUIService }) => {
      await productsListUIService.open();
      await addNewProductUIService.open();
      const created = await addNewProductUIService.create();
      await productsListUIService.assertProductInTable(created.name, { visible: true });
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);

      await expect.soft(productsListPage.nameCell(created.name)).toHaveText(created.name);
      await expect.soft(productsListPage.priceCell(created.name)).toHaveText(`$${created.price.toString()}`);
      await expect.soft(productsListPage.manufacturerCell(created.name)).toHaveText(created.manufacturer);

      const productFromTable = await productsListPage.getProductData(created.name);
      console.log(productFromTable);
      console.log(created);
      productsListUIService.assertTableProductDataToGenerated(productFromTable, created);
    },
  );
});
