// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST, HEADER } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { DefaultRootStateProps, Store } from 'types/store';

const initialState: DefaultRootStateProps['product'] = {
  error: null,
  stores: [],
  store: null,
   cambios: [],
  cambio: null,
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
      state.stores = Rows;
      state.page = page;
      state.totalRows = totalRows;
      state.totalPages = totalPages;
      state.isLoading = false;
    },
     getDolarSuccess(state, action) {
      const { Rows, totalRows, totalPages, page } = action.payload;
      state.cambios = Rows;
      state.page = page;
      state.totalRows = totalRows;
      state.totalPages = totalPages;
      state.isLoading = false;
    },
     getProviderSuccess(state, action) {
      const { Rows, totalRows, totalPages, page } = action.payload;
      state.providers = Rows;
      state.page = page;
      state.totalRows = totalRows;
      state.totalPages = totalPages;
      state.isLoading = false;
    },
    // GET ID PRODUCT
    getProductIDSuccess(state, action) {
      state.store = action.payload;
    },
    // GET SKU PRODUCT
    getProductSKUSuccess(state, action) {
      state.stores = [...state.stores, ...action.payload];
    },
    // ADD PRODUCT
    addProductSuccess(state, action) {
      state.stores.push(action.payload);
    },
    // EDIT PRODUCT
    editProductsSuccess(state, action) {
      const { id, data } = action.payload;
      const index = state.stores.findIndex((item) => item.ID === id);
      state.stores[index] = data;
    },
    // ADD EXCEL PRODUCT
    excelSuccess(state, action) {
      state.stores = [...state.stores, ...action.payload];
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

      const response = await axios.get(`${HOST}/product/store?${queryParams}`);

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

export function getDolar(page: number = 1, value: string = '', type: string = '') {
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

      const response = await axios.get(`${HOST}/product/dolar?${queryParams}`);

      if (response.data instanceof Object) {
        const { Rows, totalRows, totalPages, page }: any = response.data;
        dispatch(
          slice.actions.getDolarSuccess({
            totalRows,
            totalPages,
            page,
            Rows: Rows && Rows.length > 0 ? Rows : response.data || []
          })
        );
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getDolarSuccess([]));
        dispatch(slice.actions.hasError(error));
      }
      dispatch(slice.actions.loadingIs());
    }
  };
}

export function getProductsEntry(page: number = 1, value: string = '', type: string = '') {
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

      const response = await axios.get(`${HOST}/product/store/entry?${queryParams}`);

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

export function getProductsExit(page: number = 1, value: string = '', type: string = '') {
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

      const response = await axios.get(`${HOST}/product/store/exit?${queryParams}`);

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

export function getProducts2(page: number = 1, value: string = '', type: string = '') {
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
          slice.actions.getProviderSuccess({
            totalRows,
            totalPages,
            page,
            Rows: Rows && Rows.length > 0 ? Rows : response.data || []
          })
        );
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getProviderSuccess([]));
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
export function addProduct(data: Store) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/product/store`, { ...data }, { ...HEADER });
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
export function editProduct(id: number, data: Store) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/product/store`, { ID: id.toString(), ...data }, { ...HEADER });
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

export function editCambios(id: number, data: Store) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/product/cambios`, { ID: id.toString(), ...data }, { ...HEADER });
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
      const response = await axios.delete(`${HOST}/product/store`, { ...HEADER, data: { ID: id } });
      if (response) {
        dispatch(getProducts());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Item Eliminado',
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
export function addExcel(data: Store[]) {
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
