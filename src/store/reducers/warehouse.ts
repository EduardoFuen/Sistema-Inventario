// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { WarehouseStateProps } from 'types/products';

// initial state
const initialState: WarehouseStateProps = {
  error: null,
  warehouseList: []
};

// ==============================||  WAREHOUSE REDUCER  ||============================== //

const wareHouse = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET WAREHOUSE
    getWarehouseSuccess(state, action) {
      state.warehouseList = action.payload;
    },
    // ADD WAREHOUSE
    addWarehouseSuccess(state, action) {
      state.warehouseList.push(action.payload);
    },
    // UPDATE WAREHOUSE
    updateWarehouseSuccess(state, action) {
      const index = state.warehouseList.findIndex((item) => item?.ID === action.payload?.ID);
      state.warehouseList[index] = action.payload;
    },
    // ADD EXCEL WAREHOUSE
    excelSuccess(state, action) {
      state.warehouseList = [...state.warehouseList, ...action.payload];
    }
  }
});

// Reducer
export default wareHouse.reducer;

// ----------------------------------------------------------------------
export function getWarehouseList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/warehouse`);
      if (response.data instanceof Array) {
        dispatch(wareHouse.actions.getWarehouseSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(wareHouse.actions.getWarehouseSuccess([]));
      }
      dispatch(wareHouse.actions.hasError(error));
    }
  };
}

export function addWarehouse(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/warehouse`, { ...data });
      dispatch(wareHouse.actions.addWarehouseSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Bodega update successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      dispatch(wareHouse.actions.hasError(error));
    }
  };
}

export function editWarehouse(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/warehouse`, { ID: id, ...data });
      dispatch(wareHouse.actions.updateWarehouseSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Bodega add successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      dispatch(wareHouse.actions.hasError(error));
    }
  };
}

export function deleteWarehouse(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/warehouse`, { data: { ID: id } });
      if (response) {
        dispatch(getWarehouseList());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Bodega deleted successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
    } catch (error: any) {
      dispatch(wareHouse.actions.hasError(error));
    }
  };
}

export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/warehouse`, data);
      dispatch(wareHouse.actions.excelSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Importación de bodega successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      dispatch(wareHouse.actions.hasError(error));
    }
  };
}
