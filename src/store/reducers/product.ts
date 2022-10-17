// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'axios';
import { HOST } from '../../config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { DefaultRootStateProps } from 'types/product-type';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['product'] = {
  error: null,
  products: [],
  product: null
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
    // EDIT PRODUCTS
    editProductsSuccess(state, action) {
      const { id, data } = action.payload;
      const index = state.products.findIndex((item) => item.ID === id);
      state.products[index] = data;
    },
    // DELETE PRODUCTS
    deleteProductSuccess(state, action) {
      const { name } = action.payload;
      const index = state.products.findIndex((item) => item.ID === name);
      state.products.splice(index, 1);
    },
    excelSuccess(state, action) {
      state.products = [...state.products, ...action.payload];
    },
    // FILTER PRODUCTS
    filterProductsSuccess(state, action) {
      state.product = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.product = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProducts() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/productos`);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getProductsSuccess(response.data));
        dispatch(slice.actions.hasError(null));
      }
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addProduct(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/productos`, { ...data });
      dispatch(slice.actions.addProductSuccess(response.data));
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
      dispatch(getProducts());
      dispatch(slice.actions.hasError(null));
      window.location.replace('/product-list');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editProduct(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/productos`, { ID: id.toString(), ...data });
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
      window.location.replace('/product-list');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteProduct(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/productos`, { data: { ID: id.toString() } });
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
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/productos`, data);
      dispatch(slice.actions.excelSuccess(response.data));
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
      dispatch(slice.actions.hasError(null));
      dispatch(getProducts());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
