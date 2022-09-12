// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
// import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { SupplierStateProps } from 'types/e-commerce';

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

    // GET PACKS
    getSupplierSuccess(state, action) {
      state.supplierList = action.payload;
    },

    // ADD PACK
    addSupplierSuccess(state, action) {
      state.supplierList.push(action.payload);
    },
    UpdateSupplierSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.supplierList.findIndex((item) => item.businessName === name);
      state.supplierList[index] = data;
    },
    DeleteSupplierSuccess(state, action) {
      const { name } = action.payload;
      const index = state.supplierList.findIndex((item) => item.businessName === name);
      state.supplierList.splice(index, 1);
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function createSupplier(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addSupplierSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editSupplier(name: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.UpdateSupplierSuccess({
          name,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteSupplier(name: string) {
  return async () => {
    try {
      dispatch(
        slice.actions.DeleteSupplierSuccess({
          name
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getSupplierList() {
  return async () => {
    try {
      localStorage.getItem('mantis-ts-supplier');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
