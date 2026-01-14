import { test } from "fixtures/pages.fixtures";

test("Check page", async ({ orderListPage }) => {
  await orderListPage.open("orders");
  await orderListPage.waitForOpened();
  const row = await orderListPage.getOrderData("694301b84a5e11aeb6bc50d7");
  console.log(row);

  const table = await orderListPage.getTableData();
  console.log(table);
});
