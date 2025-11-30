// Реализовать е2е тест со следующими шагами:
//   - залогиниться - через loginUI service
//   - Создать продукт через API
//   - Перейти на страницу Edit Product
//   - Заполнить поля валидными данными - через UI
//   - Сохранить продукт
//   - Проверить продукт в таблице
//   - Открыть модалку деталей продукта
//   - Проверить данные в модалке

//   За собой удаляем продукт через апи, разумеется:)

import { generateProductData } from "data/salesPortal/products/generateProductData";
import { TAGS } from "data/tags";
import { test } from "fixtures";

test.describe("[Sales Portal] [Products] E2E Update", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test(
    "Update product with services",
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ productsApiService, productsListUIService, editProductPage, productsListPage }) => {
      token = await productsListPage.getAuthToken();
      const createdProduct = await productsApiService.create(token);
      id = createdProduct._id;

      await productsListUIService.open();
      await productsListUIService.openEditModal(createdProduct.name);

      const updatedProduct = generateProductData({ name: createdProduct.name + "changed" });
      await editProductPage.fillForm(updatedProduct);
      await editProductPage.clickSaveChanges();
      await productsListPage.waitForOpened();

      productsListUIService.assertProductInTable(updatedProduct.name, { visible: true });
      const actualProductData = await productsListPage.getProductData(updatedProduct.name);
      productsListUIService.assertTableProductDataToGenerated(actualProductData, updatedProduct);

      await productsListUIService.openDetailsModal(updatedProduct.name);
      const productInModal = await productsListPage.detailsModal.getData();
      productsListUIService.assertDetailsDataToGenerated(productInModal, updatedProduct);
    },
  );
});
