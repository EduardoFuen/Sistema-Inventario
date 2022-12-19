/**
 * A Purchase is an object with optional properties ID, SupplierID, WarehouseID, Notes, Discount,
 * DiscountEarliyPay, SubTotal, DiscountGlobal, SubtotalWithDiscount, Total, Tax, Status, Articles, and
 * detailsReption.
 * @property {string | number | undefined} ID - The ID of the purchase.
 * @property {number} SupplierID - The ID of the supplier.
 * @property {number} WarehouseID - The ID of the warehouse where the purchase will be stored.
 * @property {string} Notes - The notes of the purchase.
 * @property {number} Discount - The discount applied to the purchase.
 * @property {number} DiscountEarliyPay - Discount for early payment
 * @property {number} SubTotal - The total amount of the purchase before taxes and discounts.
 * @property {number} DiscountGlobal - The discount that is applied to the entire purchase.
 * @property {number} SubtotalWithDiscount - The subtotal of the purchase, minus the discount.
 * @property {number} Total - The total amount of the purchase.
 * @property {number} Tax - The tax amount
 * @property {number} Status - 0 = Draft, 1 = Active, 2 = Canceled, 3 = Completed
 * @property {any} Articles - This is an array of objects that contain the following properties:
 * @property {any} detailsReption - This is the data that is returned from the server.
 */

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
