// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from '../../config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { SupplierStateProps } from 'types/supplier';

// ----------------------------------------------------------------------

const initialState: SupplierStateProps = {
  error: null,
  supplierList: []
};

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
    excelSuccess(state, action) {
      state.supplierList = [...state.supplierList, ...action.payload];
    },
    // ADD SUPPLIER
    addSupplierSuccess(state, action) {
      state.supplierList.push(action.payload);
    },
    updateSupplierSuccess(state, action) {
      const index = state.supplierList.findIndex((item) => item.ID === action.payload?.ID);
      state.supplierList[index] = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getSupplierList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/proveedores`);
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
      const response = await axios.post(`${HOST}/proveedores`, { ...data });
      dispatch(slice.actions.addSupplierSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editSupplier(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/proveedores`, { ID: id, ...data });
      dispatch(slice.actions.updateSupplierSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteSupplier(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/proveedores`, { data: { ID: id } });
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
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/proveedores`, data);
      dispatch(slice.actions.excelSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Importado successfully',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
