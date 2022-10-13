// product shop list
export type Products = {
  ID: string | number | undefined;
  Name: string;
  Trademark: string;
  CategoryOne?: string;
  CategoryThree?: string;
  CategoryTwo?: string;
  Quantity?: number;
  Discount?: number;
  Price?: number;
  Maker?: any;
  Status?: boolean;
  IsTaxed?: boolean;
  Tax: number;
  Sku?: string;
  Ean?: string;
  Variation: string;
  Pack?: any;
  TypeProduct: string;
  MakerUnit: string;
  Weight: string;
  Width: string;
  PackInfo: string;
  Height: string;
  PackUnit: string;
  Depth: string;
  Warehouses: string;
  Substance: string;
  Keywords: string;
  Substitutes: string;
  HandlesBog: string;
  HandlesBaq: string;
  UrlImage: string;
  Wrapper: string;
  WrapperUnit: string;
  TrademarkID: number;
  TypesProductID: number;
  CategoryOneID: number;
  CategoryThreeID: number;
  CategoryTwoID: number;
  PackID: number;
  Iva: number;
  Taxed: boolean;
};

// checkout-cart billing address
export type Address = {
  id?: string | number | undefined;
  name: string;
  destination: string;
  building: string;
  street: string;
  city: string;
  state: string;
  country: string;
  post: string | number;
  phone: string | number;
  isDefault: boolean;
};

// product reviews list
export type Reviews = {
  id: string | number | undefined;
  rating: number;
  review: string;
  date: Date | string;
  profile: {
    avatar: string;
    name: string;
    status: boolean;
  };
};

// product shop filter
export type ProductsFilter = {
  length?: number;
  search: string;
  sort: string;
  gender: string[];
  categories: string[];
  colors: string[];
  price: string;
  rating: number;
};

export interface ProductStateProps {
  products: Products[];
  product: Products | null;
  relatedProducts: Products[];
  reviews: Reviews[];
  addresses: Address[];
  error: object | string | null | any;
}

export interface DefaultRootStateProps {
  product: ProductStateProps;
}

export interface TabsProps {
  children?: React.ReactElement | React.ReactNode | string;
  value: string | number;
  index: number;
}

// Pack
export type Packs = {
  ID: string | number | undefined;
  Name: string;
  Status: boolean;
};

export interface PackStateProps {
  packList: Packs[];
  error: object | string | null;
}

// country

export type Country = {
  id: string | number | undefined;
  department: string;
  cities: any;
};

// Warehouse
export type Warehouses = {
  ID: string | number | undefined;
  Name: string;
  Department: string;
  City: string;
  Location: string;
  Status: boolean;
};

export interface WarehouseStateProps {
  warehouseList: Warehouses[];
  error: object | string | null;
}

// Maker
export type Maker = {
  ID: string | number | undefined;
  name: string;
  status: boolean;
};

export interface MakerStateProps {
  makerList: Maker[];
  error: object | string | null;
}

// Trademark
export type Trademark = {
  ID: string | number | undefined;
  Name: string;
  MakerID: number;
  Status: boolean;
};

export interface TrademarkStateProps {
  tradeMarkList: Trademark[];
  error: object | string | null;
}

// Category
export type categoryOne = {
  ID: string | number | undefined;
  Name: string;
  Status: boolean;
};
export type categoryTwo = {
  ID: string | number | undefined;
  Name: string;
  CategoryOneID: string;
  status: boolean;
};

export type categoryThree = {
  ID: string | number | undefined;
  Name: string;
  CategoryOneID: number;
  CategoryTwoID: number;
  Status: boolean;
};
export interface CategoryOneStateProps {
  categoryListOne: categoryOne[];
  categoryListTwo: categoryTwo[];
  categoryListThree: categoryThree[];
  error: object | string | null;
}

// Supplier
export type supplier = {
  ID: string | number | undefined;
  Email: string;
  Nit: string;
  Location: string;
  BusinessName: string;
  Phone: string;
  Status: boolean;
};
export interface SupplierStateProps {
  supplierList: supplier[];
  error: object | string | null;
}

// Type product
export type typeProduct = {
  ID: string | number | undefined;
  Name: string;
  Status: boolean;
};

export interface TypeProductStateProps {
  typeProductList: typeProduct[];
  error: object | string | null;
}

// Active substances
export type substances = {
  ID: string | number | undefined;
  Name: string;
  Status: boolean;
};

export interface SubstancesStateProps {
  todoListSubs: substances[];
  error: object | string | null;
}

// Active purchase
export type purchase = {
  id: string | number | undefined;
  nc: string | number | undefined;
  supplier?: any;
  date?: string;
  dateP?: string;
  note?: string;
  warehouses?: string;
  discountOrder?: number;
  subtotal: number;
  iva: number;
  total: number;
  status: string;
  products: any;
  reception: any;
  detailsReption: any;
  orderStatus: string;
};

export interface PurchaseStateProps {
  detailsPurchase: any[];
  listPurchase: purchase[];
  detailsReption: any[];
  error: object | string | null;
}

// Active purchase
export type inventory = {
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
  listInventory: inventory[];
  error: object | string | null;
}
