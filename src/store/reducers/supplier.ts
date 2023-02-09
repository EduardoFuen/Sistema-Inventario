// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST, HEADER } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { SupplierStateProps } from 'types/supplier';

// initial state
const initialState: SupplierStateProps = {
  error: null,
  supplierList: []
};

// ==============================||  SUPPLIER  REDUCER ||============================== //

const slice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET SUPPLIERS
    getSupplierSuccess(state, action) {
      state.supplierList = action.payload;
    },
    // ADD SUPPLIER
    addSupplierSuccess(state, action) {
      state.supplierList.push(action.payload);
    },
    // UPDATE SUPPLIER
    updateSupplierSuccess(state, action) {
      const index = state.supplierList.findIndex((item) => item.ID === action.payload?.ID);
      state.supplierList[index] = action.payload;
    },
    //ADD EXCEL SUPPLIER
    excelSuccess(state, action) {
      state.supplierList = [...state.supplierList, ...action.payload];
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getSupplierList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/supplier`, HEADER);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getSupplierSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getSupplierSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createSupplier(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/supplier`, { ...data }, { ...HEADER });
      dispatch(slice.actions.addSupplierSuccess(response.data));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editSupplier(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/supplier`, { ID: id, ...data }, { ...HEADER });
      dispatch(slice.actions.updateSupplierSuccess(response.data));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteSupplier(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/supplier`, { ...HEADER, data: { ID: id } });
      if (response) {
        dispatch(getSupplierList());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Proveedor delete successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/supplier`, data, { ...HEADER });
      dispatch(slice.actions.excelSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Importado Proveedores successfully',
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
