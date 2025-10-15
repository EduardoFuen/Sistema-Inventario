import { Supplier } from './supplier';
export type DefaultArticle = {
  Sku?: string;
  Quantity?: number;
  BasePrice?: number;
  Tax?: number;
  DiscountNegotiated?: number;
  DiscountAdditional?: number;
  Bonus?: number;
};

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
  sk?: string;
};

export type Collection = {
  BusinessName: any;
  DaysPayment: string | number | undefined;
  ID?: string | number | undefined;
  SupplierID?: number;
  Supplier?: Supplier;
  Warehouse?: object;
  WarehouseID?: number;
  Notes?: string;
  Discount?: string | number | undefined;
  DiscountEarliyPay?: number;
  SubTotal?: number;
  DiscountGlobal?: number;
  SubtotalWithDiscount?: number;
  CreatedAt?: string;
  Total?: number;
  Tax?: number;
  Status?: number;
  Articles?: Article[];
  detailsReption?: any;
};

/* A type definition for the state of the component. */
export interface CollectionStateProps {
  detailsCollection: any[];
  listCollection: Collection[];
  detailsReption: any[];
  order: any;
  isLoading: boolean;
  error: object | string | null;
  page: number | undefined;
  totalRows?: number | undefined;
  totalPages?: number | undefined;
}