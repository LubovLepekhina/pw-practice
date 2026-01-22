import { ICustomer, ICustomerTestCase } from "data/types/customer.types";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { TAGS } from "data/tags";
import { faker } from "@faker-js/faker";

export const invalidDataTypeForApi: ICustomerTestCase[] = [
  {
    title: "customer with invalid email data type",
    testCustomerData: { ...generateCustomerData(), email: 52342342 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with invalid name data type",
    testCustomerData: { ...generateCustomerData(), name: 123123123 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with invalid country data type",
    testCustomerData: { ...generateCustomerData(), country: 890890890 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with invalid city data type",
    testCustomerData: { ...generateCustomerData(), city: 123132 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with invalid street data type",
    testCustomerData: { ...generateCustomerData(), street: 123132 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with invalid house data type",
    testCustomerData: { ...generateCustomerData(), house: "house" } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with invalid flat data type",
    testCustomerData: { ...generateCustomerData(), flat: "flat" } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with invalid phone data type",
    testCustomerData: { ...generateCustomerData(), phone: 6787678786876 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with invalid notes data type",
    testCustomerData: { ...generateCustomerData(), notes: 123345567 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
];

export const validDataForFieldsValidation: ICustomerTestCase[] = [
  {
    title: "customer with name of 1 alphabetical characters",
    testCustomerData: { ...generateCustomerData(), name: faker.string.alpha({ length: 1 }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with name of 40 alphabetical characters",
    testCustomerData: { ...generateCustomerData(), name: faker.string.alpha({ length: 40 }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with name containing a single space between words",
    testCustomerData: {
      ...generateCustomerData(),
      name: faker.string.alpha({ length: 3 }) + " " + faker.string.alpha({ length: 5 }),
    },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with name of uppercase alphabetical characters",
    testCustomerData: { ...generateCustomerData(), name: faker.string.alpha({ length: 10, casing: "upper" }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with email of uppercase characters",
    testCustomerData: { ...generateCustomerData(), email: faker.internet.email().toUpperCase() },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with city of 1 alphabetical characters",
    testCustomerData: { ...generateCustomerData(), city: faker.string.alpha({ length: 1 }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with city of 20 alphabetical characters",
    testCustomerData: { ...generateCustomerData(), city: faker.string.alpha({ length: 20 }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with city containing a single space between words",
    testCustomerData: {
      ...generateCustomerData(),
      city: faker.string.alpha({ length: 3 }) + " " + faker.string.alpha({ length: 5 }),
    },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with city of uppercase characters",
    testCustomerData: { ...generateCustomerData(), city: faker.location.city().toUpperCase() },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with street of 1 alphanumerical characters",
    testCustomerData: { ...generateCustomerData(), street: faker.string.alphanumeric({ length: 1 }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with street of 40 alphanumerical characters",
    testCustomerData: { ...generateCustomerData(), street: faker.string.alphanumeric({ length: 40 }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with street containing a single space between words",
    testCustomerData: {
      ...generateCustomerData(),
      street: faker.string.alpha({ length: 3 }) + " " + faker.string.alpha({ length: 5 }),
    },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with street of uppercase alphabetical characters",
    testCustomerData: { ...generateCustomerData(), street: faker.location.street().toUpperCase() },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with minimum allowed house number - 1",
    testCustomerData: { ...generateCustomerData(), house: 1 },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with maximum allowed house number - 999",
    testCustomerData: { ...generateCustomerData(), house: 999 },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with minimum allowed flat number - 1",
    testCustomerData: { ...generateCustomerData(), flat: 1 },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with maximum allowed flat number - 9999",
    testCustomerData: { ...generateCustomerData(), flat: 9999 },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with minimum allowed length of phone number - 10 (after +)",
    testCustomerData: { ...generateCustomerData(), phone: "+1234567890" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with maximum allowed length of phone number - 20 (after +)",
    testCustomerData: { ...generateCustomerData(), phone: "+12345678901234567890" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with empty notes",
    testCustomerData: { ...generateCustomerData(), notes: "" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with notes of 250 characters",
    testCustomerData: { ...generateCustomerData(), notes: faker.string.alphanumeric({ length: 250 }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with notes containing special characters",
    testCustomerData: { ...generateCustomerData(), notes: faker.string.alphanumeric({ length: 100 }) + "+_-#$%@&*^!" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
];

export const invalidDataForFieldsValidation: ICustomerTestCase[] = [
  {
    title: "customer with name of 41 alphabetical characters",
    testCustomerData: { ...generateCustomerData(), name: faker.string.alpha({ length: 41 }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with multiple spaces between words in name",
    testCustomerData: {
      ...generateCustomerData(),
      name: faker.string.alpha({ length: 3 }) + "  " + faker.string.alpha({ length: 7 }),
    },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with whitespace-only name",
    testCustomerData: { ...generateCustomerData(), name: "   " },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with name with special characters",
    testCustomerData: { ...generateCustomerData(), name: faker.string.alpha({ length: 7 }) + "+_-#$%@&*^!" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with name with numbers",
    testCustomerData: { ...generateCustomerData(), name: faker.string.alpha({ length: 7 }) + "3" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with city of 21 alphabetic characters",
    testCustomerData: { ...generateCustomerData(), city: faker.string.alpha({ length: 21 }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with city with numbers",
    testCustomerData: { ...generateCustomerData(), city: faker.string.alpha({ length: 3 }) + "6" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with city with special characters",
    testCustomerData: { ...generateCustomerData(), city: faker.string.alpha({ length: 5 }) + "+_-#$%@&*^!" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with whitespace-only city",
    testCustomerData: { ...generateCustomerData(), city: "   " },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with multiple spaces between words in city",
    testCustomerData: {
      ...generateCustomerData(),
      city: faker.string.alpha({ length: 3 }) + "  " + faker.string.alpha({ length: 7 }),
    },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with street of 41 alphanumerical characters",
    testCustomerData: { ...generateCustomerData(), street: faker.string.alphanumeric({ length: 41 }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with street with special characters",
    testCustomerData: { ...generateCustomerData(), street: faker.string.alphanumeric({ length: 5 }) + "+_-#$%@&*^!" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with whitespace-only street",
    testCustomerData: { ...generateCustomerData(), street: "   " },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with multiple spaces between words in street",
    testCustomerData: {
      ...generateCustomerData(),
      street: faker.string.alpha({ length: 3 }) + "  " + faker.string.alpha({ length: 7 }),
    },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with house number - 0",
    testCustomerData: { ...generateCustomerData(), house: 0 },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with house number - 1000",
    testCustomerData: { ...generateCustomerData(), house: 1000 },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with house number with alphabetic characters",
    testCustomerData: { ...generateCustomerData(), house: faker.string.alpha({ length: 3 }) } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with house number < 0",
    testCustomerData: { ...generateCustomerData(), house: -90 },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with flat number - 0",
    testCustomerData: { ...generateCustomerData(), flat: 0 },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with flat number - 10000",
    testCustomerData: { ...generateCustomerData(), flat: 10000 },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with flat number with alphabetic characters",
    testCustomerData: { ...generateCustomerData(), flat: faker.string.alpha({ length: 3 }) } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with flat number < 0",
    testCustomerData: { ...generateCustomerData(), flat: -101 },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with phone number length < 10 digits after +",
    testCustomerData: { ...generateCustomerData(), phone: "+123456789" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with phone number length > 20 digits after +",
    testCustomerData: { ...generateCustomerData(), phone: "+123456789012345678901" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with phone number without + at the beginning",
    testCustomerData: { ...generateCustomerData(), phone: "123456789012" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with phone number with -",
    testCustomerData: { ...generateCustomerData(), phone: "-123456789012" },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with notes containing < symbol",
    testCustomerData: {
      ...generateCustomerData(),
      notes: `${faker.string.alphanumeric({ length: 25 })} < ${faker.string.alphanumeric({ length: 130 })}`,
    },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with notes containing > symbol",
    testCustomerData: {
      ...generateCustomerData(),
      notes: `${faker.string.alphanumeric({ length: 25 })} > ${faker.string.alphanumeric({ length: 130 })}`,
    },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
  {
    title: "customer with with notes of 251 characters",
    testCustomerData: { ...generateCustomerData(), notes: faker.string.alphanumeric({ length: 251 }) },
    tags: [TAGS.API, TAGS.REGRESSION, TAGS.CUSTOMERS],
  },
];
