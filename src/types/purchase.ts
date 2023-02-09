export type Article = {
  ID?: string | number | undefined;
  ProductID?: number;
  Count?: number;
  BasePrice?: string;
  Bonus?: number;
  Discount?: number;
  DiscountAdditional?: number;
  SubTotal?: number;
  Total?: number;
  Tax?: number;
  isSelected?: boolean;
  Name?: string;
  Sku?: string;
  Ean?: string;
};

export type Purchase = {
  ID?: string | number | undefined;
  SupplierID?: number;
  WarehouseID?: number;
  Notes?: string;
  Discount?: number;
  DiscountEarliyPay?: number;
  SubTotal?: number;
  DiscountGlobal?: number;
  SubtotalWithDiscount?: number;
  Total?: number;
  Tax?: number;
  Status?: number;
  Articles?: Article[];
  detailsReption?: any;
};

/* A type definition for the state of the component. */
export interface PurchaseStateProps {
  detailsPurchase: any[];
  listPurchase: Purchase[];
  detailsReption: any[];
  order: any;
  isLoading: boolean;
  error: object | string | null;
  page: number | undefined;
  totalRows?: number | undefined;
  totalPages?: number | undefined;
}
