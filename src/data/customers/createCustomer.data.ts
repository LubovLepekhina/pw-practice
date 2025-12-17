import { ICustomer } from "data/types/customer.types";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { TAGS } from "data/tags";

export const invalidDataTypeForApi = [
  {
    title: "Create customer with invalid email data type",
    testCustomerField: { ...generateCustomerData(), email: 52342342 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION],
  },
  {
    title: "Create customer with invalid name data type",
    testCustomerField: { ...generateCustomerData(), name: 123123123 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION],
  },
  {
    title: "Create customer with invalid country data type",
    testCustomerField: { ...generateCustomerData(), country: 890890890 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION],
  },
  {
    title: "Create customer with invalid city data type",
    testCustomerField: { ...generateCustomerData(), city: 123132 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION],
  },
  {
    title: "Create customer with invalid street data type",
    testCustomerField: { ...generateCustomerData(), street: 123132 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION],
  },
  {
    title: "Create customer with invalid house data type",
    testCustomerField: { ...generateCustomerData(), house: "house" } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION],
  },
  {
    title: "Create customer with invalid flat data type",
    testCustomerField: { ...generateCustomerData(), flat: "flat" } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION],
  },
  {
    title: "Create customer with invalid phone data type",
    testCustomerField: { ...generateCustomerData(), phone: 6787678786876 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION],
  },
  {
    title: "Create customer with invalid notes data type",
    testCustomerField: { ...generateCustomerData(), notes: 123345567 } as unknown as ICustomer,
    tags: [TAGS.API, TAGS.REGRESSION],
  },
];

// _id: { type: "string" },
// email: { type: "string" },
// name: { type: "string" },
// country: {
//     type: "string",
//     enum: Object.values(COUNTRIES),
// },
// city: { type: "string" },
// street: { type: "string" },
// house: { type: "number" },
// flat: { type: "number" },
// phone: { type: "string" },
// createdOn: { type: "string" },
// notes: { type: "string" },
