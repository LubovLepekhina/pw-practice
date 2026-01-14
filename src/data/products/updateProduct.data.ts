import { faker } from "@faker-js/faker";
import { IProduct } from "data/types/product.types";

export const updateProductValidData: { title: string; checkingValue: Partial<IProduct> }[] = [
  {
    title: "Update product with name of 3 alphanumerical characters",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 3 }),
    },
  },
  {
    title: "Update product with name of 40 alphanumerical characters",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 40 }),
    },
  },
  {
    title: "Update product with name containing a single space between words",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 3 }) + " " + faker.string.alphanumeric({ length: 5 }),
    },
  },
  {
    title: "Update product with minimum allowed price - 1",
    checkingValue: {
      price: 1,
    },
  },
  {
    title: "Update product with maximum allowed price - 99999",
    checkingValue: {
      price: 99999,
    },
  },
  {
    title: "Update product with minimum allowed amount - 0",
    checkingValue: {
      amount: 0,
    },
  },
  {
    title: "Update product with maximum allowed amount - 999",
    checkingValue: {
      amount: 999,
    },
  },
  {
    title: "Update product with empty notes",
    checkingValue: {
      notes: "",
    },
  },
  {
    title: "Update product with notes of 250 characters",
    checkingValue: {
      notes: faker.string.alphanumeric({ length: 250 }),
    },
  },
  {
    title: "Update product with notes containing special characters",
    checkingValue: {
      notes: faker.string.alphanumeric({ length: 100 }) + "+_-#$%@&*^!",
    },
  },
];

export const updateProductInvalidData: { title: string; checkingValue: Partial<IProduct> }[] = [
  {
    title: "Should not update product without name",
    checkingValue: {
      name: undefined,
    },
  },
  {
    title: "Should not update product with empty name",
    checkingValue: {
      name: "",
    },
  },
  {
    title: "Should not update product with whitespace-only name",
    checkingValue: {
      name: "   ",
    },
  },
  {
    title: "Should not update product with name of 2 alphanumerical characters",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 2 }),
    },
  },
  {
    title: "Should not update product with name of 41 alphanumerical characters",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 41 }),
    },
  },
  {
    title: "Should not update product with multiple spaces between words in name",
    checkingValue: {
      name: `${faker.string.alphanumeric({ length: 3 })} and ${faker.string.alphanumeric({ length: 13 })}`,
    },
  },
  {
    title: "Should not update product with name with special characters",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 10 }) + "@#$%",
    },
  },
  {
    title: "Should not update product without manufacturer",
    checkingValue: {
      manufacturer: undefined,
    },
  },
  {
    title: "Should not update product without price",
    checkingValue: {
      price: undefined,
    },
  },
  {
    title: "Should not update product without amount",
    checkingValue: {
      amount: undefined,
    },
  },
  {
    title: "Should not update product with price = 0",
    checkingValue: {
      price: 0,
    },
  },
  {
    title: "Should not update product with price < 0",
    checkingValue: {
      price: -100,
    },
  },
  {
    title: "Should not update product with price = 100000",
    checkingValue: {
      price: 100000,
    },
  },
  {
    title: "Should not update product with amount < 0",
    checkingValue: {
      amount: -10,
    },
  },
  {
    title: "Should not update product with amount = 1000",
    checkingValue: {
      amount: 1000,
    },
  },
  {
    title: "Should not update product with notes containing < symbol",
    checkingValue: {
      notes: `${faker.string.alphanumeric({ length: 25 })} < ${faker.string.alphanumeric({ length: 130 })}`,
    },
  },
  {
    title: "Should not update product with notes containing > symbol",
    checkingValue: {
      notes: `${faker.string.alphanumeric({ length: 25 })} > ${faker.string.alphanumeric({ length: 130 })}`,
    },
  },
  {
    title: "Should not update product with invalid data types: string in price field",
    checkingValue: {
      price: "1000" as unknown as number,
    },
  },
  {
    title: "Should not update product with invalid data types: string in amount field",
    checkingValue: {
      amount: "256" as unknown as number,
    },
  },
];
