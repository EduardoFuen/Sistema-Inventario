// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { TypeProductStateProps } from 'types/products';

// initial state
const initialState: TypeProductStateProps = {
  error: null,
  typeProductList: []
};

// ==============================||  TYPE PRODUCT REDUCER  ||============================== //

const slice = createSlice({
  name: 'typeProduct',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET TYPE PRODUCT
    getTypeProductSuccess(state, action) {
      state.typeProductList = action.payload;
    },
    // ADD TYPE PRODUCT
    addTypeProductSuccess(state, action) {
      state.typeProductList.push(action.payload);
    },
    // UPDATE TYPE PRODUCT
    updateTypeProductSuccess(state, action) {
      const index = state.typeProductList.findIndex((item) => item.ID === action.payload?.ID);
      state.typeProductList[index] = action.payload;
    },
    // ADD EXCEL TYPE PRODUCT
    excelSuccess(state, action) {
      state.typeProductList = [...state.typeProductList, ...action.payload];
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getTypeProductList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/typeproduct`);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getTypeProductSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getTypeProductSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addTypeProduct(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/typeproduct`, { ...data });
      dispatch(slice.actions.addTypeProductSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Tipo de Producto Add successfully.',
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
export function editTypeProduct(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/typeproduct`, { ID: id, ...data });
      dispatch(slice.actions.updateTypeProductSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Tipo de Producto Update successfully.',
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

export function deleteTypeProduct(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/typeproduct`, { data: { ID: id } });
      if (response) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Tipo de Producto Deleted successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        dispatch(getTypeProductList());
      }
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/typeproduct`, data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Tipo de Producto Importado.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(slice.actions.excelSuccess(response.data));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
