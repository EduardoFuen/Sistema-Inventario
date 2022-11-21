// Active Purchase
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
  Articles?: any;
  detailsReption?: any;
};

export interface PurchaseStateProps {
  detailsPurchase: any[];
  listPurchase: Purchase[];
  detailsReption: any[];
  order: any;
  isLoading: boolean;
  error: object | string | null;
}
