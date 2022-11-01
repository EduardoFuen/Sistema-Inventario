// Supplier
export type Supplier = {
  ID?: string | number | undefined;
  NameContact?: string;
  PhoneContact?: number;
  BusinessName?: string;
  EmailContact?: string;
  Nit?: string;
  PaymenTerm?: string;
  LeadTimeBog?: number;
  LeadTimeBaq?: number;
  Discount?: number;
  DaysPayment?: string;
  Cupo?: number;
  Status?: boolean;
};

export interface SupplierStateProps {
  supplierList: Supplier[];
  error: object | string | null;
}
