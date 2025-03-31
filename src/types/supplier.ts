/**
 * Supplier is a type that has a bunch of optional properties, all of which are strings, numbers, or
 * booleans.
 * @property {string | number | undefined} ID - The ID of the supplier.
 * @property {string} NameContact - The name of the contact person.
 * @property {number} PhoneContact - number;
 * @property {string} BusinessName - The name of the business.
 * @property {string} EmailContact - string;
 * @property {string} Nit - The supplier's tax ID number.
 * @property {string} PaymenTerm - Payment term
 * @property {number} LeadTimeBog - Lead time Bogota
 * @property {number} LeadTimeBaq - Lead time in days to receive the product in the warehouse.
 * @property {number} Discount - number;
 * @property {string} DaysPayment - "30"
 * @property {number} Cupo - Credit limit
 * @property {boolean} Status - boolean
 */

export type Supplier = {
  ID?: string | number | undefined;
  sk?: string | number | undefined;
  NameContact?: string;
  PhoneContact?: number;
  BusinessName?: string;
  EmailContact?: string;
  Nit?: string;
  Rif?: string;
  PaymenTerm?: string;
  LeadTimeBog?: number;
  LeadTimeBaq?: number;
  Discount?: number;
  DaysPayment?: string;
  Cupo?: number;
  Status?: boolean;
};

/* Defining the state of the component. */
export interface SupplierStateProps {
  supplierList: Supplier[];
  error: object | string | null;
}
