// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST, HEADER } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { DefaultRootStateProps, Provider } from 'types/provider';

const initialState: DefaultRootStateProps['product'] = {
  error: null,
  providers: [],
  provider: null,
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
      state.providers = Rows;
      state.page = page;
      state.totalRows = totalRows;
      state.totalPages = totalPages;
      state.isLoading = false;
    },
    // GET ID PRODUCT
    getProductIDSuccess(state, action) {
      state.provider = action.payload;
    },
    // GET SKU PRODUCT
    getProductSKUSuccess(state, action) {
      state.providers = [...state.providers, ...action.payload];
    },
    // ADD PRODUCT
    addProductSuccess(state, action) {
      state.providers.push(action.payload);
    },
    // EDIT PRODUCT
    editProductsSuccess(state, action) {
      const { id, data } = action.payload;
      const index = state.providers.findIndex((item) => item.idProvider === id);
      state.providers[index] = data;
    },
    // ADD EXCEL PRODUCT
    excelSuccess(state, action) {
      state.providers = [...state.providers, ...action.payload];
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProducts(page: number = 1, value: string = '', type: string = '') {
  return async () => {
    try {
      dispatch(slice.actions.loading());
      let queryParams: string = '';
      queryParams = `limit=30&page=${page}`;
      if (value !== '' && type === '') {
        queryParams += `&Name=${value?.trim()}`;
      }
      if (type === 'Sku') {
        queryParams += `&Sku=${value?.trim()}`;
      }
      if (type === 'Price') {
        queryParams += `&Price=${value?.trim()}`;
      }

      const response = await axios.get(`${HOST}/product/provider?${queryParams}`);

      if (response.data instanceof Object) {
        const { Rows, totalRows, totalPages, page }: any = response.data;
        dispatch(
          slice.actions.getProductsSuccess({
            totalRows,
            totalPages,
            page,
            Rows: Rows && Rows.length > 0 ? Rows : response.data || []
          })
        );
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
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
      const response = await axios.get(`${HOST}/product?ID=${id}`, HEADER);
      dispatch(slice.actions.getProductIDSuccess(response.data));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProductSKU(sku: string) {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/product?Skus=${sku}`, HEADER);
      dispatch(slice.actions.getProductSKUSuccess(response?.data));
      return response?.data;
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addProduct(data: Provider) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/product/provider`, { ...data }, { ...HEADER });
      await dispatch(getProducts());
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
      //window.location.href = `/product-list`;
    } catch (error: any) {
      console.log('errpr')
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editProduct(id: number, data: Provider) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/provider`, { ID: id.toString(), ...data }, { ...HEADER });
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
      const response = await axios.delete(`${HOST}/product/provider`, { ...HEADER, data: { IdProvider: id } });
      if (response) {
        dispatch(getProducts());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Proveedor eliminado...',
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
export function addExcel(data: Provider[]) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/product`, data, { ...HEADER });
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
