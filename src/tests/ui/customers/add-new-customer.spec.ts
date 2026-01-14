// Реализовать E2E тест по созданию покупателя (модуль Customers)
// по аналогии c Products с шагами
//   - залогиниться
//   - Перейти на страницу Customers List
//   - Перейти на страницу Add New Customer
//   - Заполнить поля валидными данными
//   - Сохранить покупателя
//   - Проверить наличие покупателя в таблице
// - Удалить покупателя через API

//   Требования найдете в валидационных сообщениях на фронте:)
// Уникальное поле - Email

import { generateCustomerData } from "data/customers/generateCustomerData";
import { NOTIFICATIONS } from "data/notifications";
import { TAGS } from "data/tags";
import { expect, test } from "fixtures";

test.describe("[Sales Portal] [Customers]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(id, token);
    id = "";
  });

  test(
    "Add new customer with services",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ customersListUIService, addNewCustomerUIService, customersListPage }) => {
      await customersListUIService.open(); //сразу переходим на стр customers
      await customersListUIService.openAddNewCustomerPage(); //нажали кнопку AddNewCustomer, дождались, пока откроется стр AddNewCustomer

      const newCustomer = generateCustomerData(); //сгенер кастомера
      const createdCustomer = await addNewCustomerUIService.create(newCustomer); //создали кастомера и проверили, что ответ с апи совпадает со сгенеренным кастомером, дождались пока откроется стр Customer List
      id = createdCustomer._id;
      token = await customersListPage.getAuthToken(); //достаем токен из куки контекста браузера

      expect(customersListPage.toastMessage).toHaveText(NOTIFICATIONS.CUSTOMER_CREATED);
      customersListUIService.assertCustomerInTable(newCustomer.email, { visible: true }); //проверили, что кастомер есть в таблице

      const data = await customersListPage.getRowData(newCustomer.email); //получили все данные из строки
      customersListUIService.assertCustomerInTableToGenerated(data, createdCustomer); //сравнили данные из таблицы со сгенеренными
    },
  );
});
