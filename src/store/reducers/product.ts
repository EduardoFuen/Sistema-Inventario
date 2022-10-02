// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { Address, DefaultRootStateProps, ProductsFilter } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['product'] = {
  error: null,
  products: [],
  product: null,
  relatedProducts: [],
  reviews: [],
  addresses: []
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.products = action.payload;
    },
    // ADD PRODUCTS
    addProductSuccess(state, action) {
      state.products.push(action.payload);
    },
    ExcelSuccess(state, action) {
      state.products = [...state.products, ...action.payload];
    },
    // EDIT PRODUCTS
    editProductsSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.products.findIndex((item) => item.name === name);
      state.products[index] = data;
    },
    // DELETE PRODUCTS
    deleteProductSuccess(state, action) {
      const { name } = action.payload;
      const index = state.products.findIndex((item) => item.name === name);
      state.products.splice(index, 1);
    },
    // FILTER PRODUCTS
    filterProductsSuccess(state, action) {
      state.product = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.product = action.payload;
    },

    // GET RELATED PRODUCTS
    getRelatedProductsSuccess(state, action) {
      state.relatedProducts = action.payload;
    },

    // GET PRODUCT REVIEWS
    getProductReviewsSuccess(state, action) {
      state.reviews = action.payload;
    },

    // GET ADDRESSES
    getAddressesSuccess(state, action) {
      state.addresses = action.payload;
    },

    // ADD ADDRESS
    addAddressSuccess(state, action) {
      state.addresses = action.payload;
    },

    // EDIT ADDRESS
    editAddressSuccess(state, action) {
      state.addresses = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProducts() {
  return async () => {
    try {
      /*         const response = await axios.get('/api/products/list');
      dispatch(slice.actions.getProductsSuccess(response.data.products)); */
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addProduct(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addProductSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addExcel(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.ExcelSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editProduct(name: any, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.editProductsSuccess({
          name,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteProduct(name: string) {
  return async () => {
    try {
      dispatch(
        slice.actions.deleteProductSuccess({
          name
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function filterProducts(filter: ProductsFilter) {
  return async () => {
    try {
      const response = await axios.post('/api/products/filter', { filter });
      dispatch(slice.actions.filterProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProduct(id: string | undefined) {
  return async () => {
    try {
      const response = await axios.post('/api/product/details', { id });
      dispatch(slice.actions.getProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRelatedProducts(id: string | undefined) {
  return async () => {
    try {
      const response = await axios.post('/api/product/related', { id });
      dispatch(slice.actions.getRelatedProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductReviews() {
  return async () => {
    try {
      const response = await axios.get('/api/review/list');
      dispatch(slice.actions.getProductReviewsSuccess(response.data.productReviews));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAddresses() {
  return async () => {
    try {
      const response = await axios.get('/api/address/list');
      dispatch(slice.actions.getAddressesSuccess(response.data.address));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addAddress(address: Address) {
  return async () => {
    try {
      const response = await axios.post('/api/address/new', address);
      dispatch(slice.actions.addAddressSuccess(response.data.address));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editAddress(address: Address) {
  return async () => {
    try {
      const response = await axios.post('/api/address/edit', address);
      dispatch(slice.actions.editAddressSuccess(response.data.address));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
