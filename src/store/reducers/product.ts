// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';
import { getTrademarkList } from './trademark';
import { getTypeProductList } from './typeProduct';

// types
import { DefaultRootStateProps } from 'types/products';

const initialState: DefaultRootStateProps['product'] = {
  error: null,
  products: [],
  product: null,
  page: 0,
  totalRows: 0,
  totalPages: 0,
  isLoading: false
};

// ==============================||  PRODUCT  REDUCER ||============================== //

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    //LOADER
    loading(state) {
      state.isLoading = true;
    },
    loadingIs(state) {
      state.isLoading = false;
    },
    // GET PRODUCTS
    getProductsSuccess(state, action) {
      const { Rows, totalRows, totalPages, page } = action.payload;
      state.products = Rows;
      state.page = page;
      state.totalRows = totalRows;
      state.totalPages = totalPages;
      state.isLoading = false;
    },
    // GET ID PRODUCT
    getProductIDSuccess(state, action) {
      state.product = action.payload;
    },
    // GET SKU PRODUCT
    getProductSKUSuccess(state, action) {
      state.products = [...state.products, ...action.payload];
    },
    // ADD PRODUCT
    addProductSuccess(state, action) {
      state.products.push(action.payload);
    },
    // EDIT PRODUCT
    editProductsSuccess(state, action) {
      const { id, data } = action.payload;
      const index = state.products.findIndex((item) => item.ID === id);
      state.products[index] = data;
    },
    // ADD EXCEL PRODUCT
    excelSuccess(state, action) {
      state.products = [...state.products, ...action.payload];
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProducts(limit: number = 30, page: number = 1, sku = '') {
  return async () => {
    try {
      dispatch(slice.actions.loading());
      let queryParams: string = '';
      queryParams = `limit=${limit}&page=${page}`;
      if (sku !== '') {
        if (sku.length <= 9) {
          queryParams = `Sku=${sku?.trim()}`;
        }
        if (sku.length >= 9) {
          queryParams = `Name=${sku?.trim()}`;
        }
      }
      const response = await axios.get(`${HOST}/product?${queryParams}`);

      if (response.data instanceof Object) {
        const { Rows, totalRows, totalPages, page }: any = response.data;
        dispatch(getTrademarkList());
        dispatch(getTypeProductList());
        dispatch(
          slice.actions.getProductsSuccess({
            totalRows,
            totalPages,
            page,
            Rows
          })
        );
      }
    } catch (error: any) {
      if (!sku && error?.response?.status === 404) {
        dispatch(slice.actions.getProductsSuccess([]));
        dispatch(slice.actions.hasError(error));
      }
      dispatch(slice.actions.loadingIs());
    }
  };
}
export function getProductID(id: number) {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/product?ID=${id}`);
      dispatch(slice.actions.getProductIDSuccess(response.data));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProductSKU(sku: string) {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/product?Skus=${sku}`);
      dispatch(slice.actions.getProductSKUSuccess(response?.data?.Rows));
      return response?.data?.Rows;
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addProduct(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/product`, { ...data });
      await dispatch(getProducts());
      await dispatch(slice.actions.addProductSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Producto Add successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      window.location.href = `/product-list`;
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editProduct(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/product`, { ID: id.toString(), ...data });
      dispatch(
        slice.actions.editProductsSuccess({
          id,
          data: response.data
        })
      );
      dispatch(
        openSnackbar({
          open: true,
          message: 'Update successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(getProducts());
      dispatch(slice.actions.hasError(null));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteProduct(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/product`, { data: { ID: id } });
      if (response) {
        dispatch(getProducts());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Producto Delete successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        dispatch(slice.actions.hasError(null));
      }
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/product`, data);
      dispatch(slice.actions.excelSuccess(response.data));
      dispatch(getProducts());
      dispatch(
        openSnackbar({
          open: true,
          message: 'Importación de productos successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
