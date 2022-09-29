// product shop list
export type Products = {
  id: string | number | undefined;
  image: string;
  name: string;
  trademark: string;
  offer?: string;
  description?: string;
  categoryOne?: string;
  categoryThree?: string;
  categoryTwo?: string;
  about?: string;
  quantity?: number;
  rating?: number;
  discount?: number;
  salePrice?: number;
  price?: number;
  gender?: string;
  lot?: string;
  dateExpiration?: string;
  qtyrequested?: number;
  categories?: string[];
  colors?: string[];
  maker?: number;
  date?: number;
  created: Date;
  isStock?: boolean;
  status?: boolean;
  is_taxed?: boolean;
  tax: number;
  sku?: string;
  ean?: string;
  new?: number;
  variation: string;
  pack: string;
  type_product: string;
  makerUnit: string;
  weight: string;
  width: string;
  packInfo: string;
  height: string;
  packUnit: string;
  depth: string;
  warehouse: string;
  substances: string;
  keywords: string;
  substitutes: string;
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

// product shop filter - sort options
export type SortOptionsProps = {
  value: string;
  label: string;
};

// product shop filter - colors options
export type ColorsOptionsProps = {
  label: string;
  value: string;
  bg: string;
};

export type PaymentOptionsProps = {
  id: number;
  value: string;
  title: string;
  caption: string;
  image?: string;
  size: {
    width: number;
    height: number;
  };
};

export interface ProductStateProps {
  products: Products[];
  product: Products | null;
  relatedProducts: Products[];
  reviews: Reviews[];
  addresses: Address[];
  error: object | string | null;
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
  id: string | number | undefined;
  name: string;
  status: boolean;
  qty: number;
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
  id: string | number | undefined;
  name: string;
  department: string;
  city: string;
  location: string;
  status: boolean;
};

export interface WarehouseStateProps {
  warehouseList: Warehouses[];
  error: object | string | null;
}

// Maker
export type Maker = {
  id: string | number | undefined;
  name: string;
  status: boolean;
};

export interface MakerStateProps {
  makerList: Maker[];
  error: object | string | null;
}

// Trademark
export type Trademark = {
  id: string | number | undefined;
  name: string;
  maker: string;
  status: boolean;
};

export interface TrademarkStateProps {
  tradeMarkList: Trademark[];
  error: object | string | null;
}

// Category
export type categoryOne = {
  id: string | number | undefined;
  categoryOne: string;
  status: boolean;
};
export type categoryTwo = {
  id: string | number | undefined;
  categoryTwo: string;
  categoryOne: string;
  status: boolean;
};

export type categoryThree = {
  id: string | number | undefined;
  categoryThree: string;
  categoryTwo: string;
  categoryOne: string;
  status: boolean;
};
export interface CategoryOneStateProps {
  categoryListOne: categoryOne[];
  categoryListTwo: categoryTwo[];
  categoryListThree: categoryThree[];
  error: object | string | null;
}

// Supplier
export type supplier = {
  id: string | number | undefined;
  email: string;
  nit: string;
  location: string;
  businessName: string;
  phone: string;
  status: boolean;
};
export interface SupplierStateProps {
  supplierList: supplier[];
  error: object | string | null;
}

// Type product
export type typeProduct = {
  id: string | number | undefined;
  name: string;
  status: boolean;
};

export interface TypeProductStateProps {
  typeProductList: typeProduct[];
  error: object | string | null;
}

// Active substances
export type substances = {
  id: string | number | undefined;
  name: string;
  status: boolean;
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
