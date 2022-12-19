/**
 * Inventory is an object with a required id property of type string | number | undefined, an optional
 * date property of type string, an optional sku property of type string, an optional ean property of
 * type string, a required nameProduct property of type string, an optional initialInvCosto property of
 * type number, an optional initialInvUnd property of type number, an optional purchaseInvCosto
 * property of type number, an optional purchaseInvUnd property of type number, an optional
 * availableInvCosto property of type number, an optional availableInvUnd property of type number, an
 * optional salesInvCost
 * @property {string | number | undefined} id - The id of the inventory.
 * @property {string} date - The date of the inventory.
 * @property {string} sku - The SKU of the product.
 * @property {string} ean - The EAN code of the product.
 * @property {string} nameProduct - The name of the product.
 * @property {number} initialInvCosto - initial inventory cost
 * @property {number} initialInvUnd - initial inventory units
 * @property {number} purchaseInvCosto - The total cost of the purchase inventory.
 * @property {number} purchaseInvUnd - The number of units purchased during the period.
 * @property {number} availableInvCosto - The cost of the available inventory.
 * @property {number} availableInvUnd - The number of units available for sale.
 * @property {number} salesInvCosto - The total cost of the sales.
 * @property {number} salesInvUnd - Sales Inventory Units
 * @property {number} endInvCosto - The total cost of the inventory at the end of the period.
 * @property {number} endInvUnd - The ending inventory units.
 */
export type Inventory = {
  id: string | number | undefined;
  date?: string;
  sku?: string;
  ean?: string;
  nameProduct: string;
  initialInvCosto?: number;
  initialInvUnd?: number;
  purchaseInvCosto?: number;
  purchaseInvUnd?: number;
  availableInvCosto?: number;
  availableInvUnd?: number;
  salesInvCosto?: number;
  salesInvUnd?: number;
  endInvCosto?: number;
  endInvUnd?: number;
};

export interface InventoryStateProps {
  listInventory: Inventory[];
  error: object | string | null;
}
