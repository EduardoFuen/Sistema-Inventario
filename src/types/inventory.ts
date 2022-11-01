// Inventory
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
