import { faker } from "@faker-js/faker";
import { IProduct } from "data/types/product.types";

export const createProductValidData: { title: string; checkingValue: Partial<IProduct> }[] = [
  {
    title: "Create product with name of 3 alphanumerical characters",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 3 }),
    },
  },
  {
    title: "Create product with name of 40 alphanumerical characters",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 40 }),
    },
  },
  {
    title: "Create product with name containing a single space between words",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 3 }) + " " + faker.string.alphanumeric({ length: 5 }),
    },
  },
  {
    title: "Create product with minimum allowed price - 1",
    checkingValue: {
      price: 1,
    },
  },
  {
    title: "Create product with maximum allowed price - 99999",
    checkingValue: {
      price: 99999,
    },
  },
  {
    title: "Create product with minimum allowed amount - 0",
    checkingValue: {
      amount: 0,
    },
  },
  {
    title: "Create product with maximum allowed amount - 999",
    checkingValue: {
      amount: 999,
    },
  },
  {
    title: "Create product with empty notes",
    checkingValue: {
      notes: "",
    },
  },
  {
    title: "Create product with notes of 250 characters",
    checkingValue: {
      notes: faker.string.alphanumeric({ length: 250 }),
    },
  },
  {
    title: "Create product with notes containing special characters",
    checkingValue: {
      notes: faker.string.alphanumeric({ length: 100 }) + "+_-#$%@&*^!",
    },
  },
];

export const createProductInvalidData: { title: string; checkingValue: Partial<IProduct> }[] = [
  {
    title: "Should not create product without name",
    checkingValue: {
      name: undefined,
    },
  },
  {
    title: "Should not create product with empty name",
    checkingValue: {
      name: "",
    },
  },
  {
    title: "Should not create product with whitespace-only name",
    checkingValue: {
      name: "   ",
    },
  },
  {
    title: "Should not create product with name of 2 alphanumerical characters",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 2 }),
    },
  },
  {
    title: "Should not create product with name of 41 alphanumerical characters",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 41 }),
    },
  },
  {
    title: "Should not create product with multiple spaces between words in name",
    checkingValue: {
      name: `${faker.string.alphanumeric({ length: 3 })} and ${faker.string.alphanumeric({ length: 13 })}`,
    },
  },
  {
    title: "Should not create product with name with special characters",
    checkingValue: {
      name: faker.string.alphanumeric({ length: 10 }) + "@#$%",
    },
  },
  {
    title: "Should not create product without manufacturer",
    checkingValue: {
      manufacturer: undefined,
    },
  },
  {
    title: "Should not create product without price",
    checkingValue: {
      price: undefined,
    },
  },
  {
    title: "Should not create product without amount",
    checkingValue: {
      amount: undefined,
    },
  },
  {
    title: "Should not create product with price = 0",
    checkingValue: {
      price: 0,
    },
  },
  {
    title: "Should not create product with price < 0",
    checkingValue: {
      price: -100,
    },
  },
  {
    title: "Should not create product with price = 100000",
    checkingValue: {
      price: 100000,
    },
  },
  {
    title: "Should not create product with amount < 0",
    checkingValue: {
      amount: -10,
    },
  },
  {
    title: "Should not create product with amount = 1000",
    checkingValue: {
      amount: 1000,
    },
  },
  {
    title: "Should not create product with notes containing < symbol",
    checkingValue: {
      notes: `${faker.string.alphanumeric({ length: 25 })} < ${faker.string.alphanumeric({ length: 130 })}`,
    },
  },
  {
    title: "Should not create product with notes containing > symbol",
    checkingValue: {
      notes: `${faker.string.alphanumeric({ length: 25 })} > ${faker.string.alphanumeric({ length: 130 })}`,
    },
  },
  {
    title: "Should not create product with invalid data types: string in price field",
    checkingValue: {
      price: "1000" as unknown as number,
    },
  },
  {
    title: "Should not create product with invalid data types: string in amount field",
    checkingValue: {
      amount: "256" as unknown as number,
    },
  },
];
