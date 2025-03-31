// product
export type Product = {
  ID?: string | number | undefined;
  Name?: string;
  Price?: number;
  Sku?: string;
};

export interface ProductStateProps {
  products: Product[];
  product: Product | null;
  error: object | string | null | any;
  page: number | undefined;
  totalRows?: number | undefined;
  totalPages?: number | undefined;
  isLoading?: boolean;
}

export interface DefaultRootStateProps {
  product: ProductStateProps;
}

// Pack
export type Pack = {
  ID?: string | number | undefined;
  Name?: string;
  Status?: boolean;
};

export interface PackStateProps {
  packList: Pack[];
  error: object | string | null;
}

// Warehouse
export type Warehouse = {
  ID?: string | number | undefined;
  Name?: string;
  Department?: string;
  City?: string;
  Location: string;
  Status?: boolean;
};

export interface WarehouseStateProps {
  warehouseList: Warehouse[];
  error: object | string | null;
}

// Maker
export type Maker = {
  ID?: string | number | undefined;
  Name?: string;
  Status?: boolean;
};

export interface MakerStateProps {
  makerList: Maker[];
  error: object | string | null;
}

// Trademark
export type Trademark = {
  ID?: string | number | undefined;
  Name?: string;
  MakerID?: number;
  Status?: boolean;
};

export interface TrademarkStateProps {
  tradeMarkList: Trademark[];
  error: object | string | null;
}

// CategoryOne
export type CategoryOne = {
  ID?: string | number | undefined;
  Name?: string;
  Status?: boolean;
};

// CategoryTwo
export type CategoryTwo = {
  ID?: string | number | undefined;
  Name?: string;
  CategoryOneID?: number;
  Status?: boolean;
};

// CategoryThree
export type CategoryThree = {
  ID?: string | number | undefined;
  Name?: string;
  CategoryOneID?: number;
  CategoryTwoID?: number;
  Status?: boolean;
};

// Categories
export interface CategoryOneStateProps {
  categoryListOne: CategoryOne[];
  categoryListTwo: CategoryTwo[];
  categoryListThree: CategoryThree[];
  error: object | string | null;
}

// Type product
export type TypeProduct = {
  ID?: string | number | undefined;
  Name?: string;
  Status?: boolean;
};

export interface TypeProductStateProps {
  typeProductList: TypeProduct[];
  error: object | string | null;
}

// Active Substances
export type Substances = {
  ID?: string | number | undefined;
  Name?: string;
  Status?: boolean;
};

export interface SubstancesStateProps {
  todoListSubs: Substances[];
  error: object | string | null;
}
