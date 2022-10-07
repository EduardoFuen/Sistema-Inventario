// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from '../../config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { WarehouseStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: WarehouseStateProps = {
  error: null,
  warehouseList: []
};

const wareHouse = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET PACKS
    getWarehouseSuccess(state, action) {
      state.warehouseList = action.payload;
    },
    excelSuccess(state, action) {
      state.warehouseList = [...state.warehouseList, ...action.payload];
    },
    // ADD PACK
    addWarehouseSuccess(state, action) {
      state.warehouseList.push(action.payload);
    },
    updateWarehouseSuccess(state, action) {
      const index = state.warehouseList.findIndex((item) => item?.ID === action.payload?.ID);
      state.warehouseList[index] = action.payload;
    }
  }
});

// Reducer
export default wareHouse.reducer;

// ----------------------------------------------------------------------
export function getWarehouseList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/bodegas`);
      if (response.data instanceof Array) {
        dispatch(wareHouse.actions.getWarehouseSuccess(response.data));
      }
    } catch (error) {
      dispatch(wareHouse.actions.hasError(error));
    }
  };
}

export function addWarehouse(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/bodegas`, { ...data });
      dispatch(wareHouse.actions.addWarehouseSuccess(response.data));
    } catch (error) {
      dispatch(wareHouse.actions.hasError(error));
    }
  };
}

export function editWarehouse(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/bodegas`, { ID: id, ...data });
      dispatch(wareHouse.actions.updateWarehouseSuccess(response.data));
    } catch (error) {
      dispatch(wareHouse.actions.hasError(error));
    }
  };
}

export function deleteWarehouse(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/bodegas`, { data: { ID: id } });
      if (response) {
        dispatch(getWarehouseList());
      }
    } catch (error) {
      dispatch(wareHouse.actions.hasError(error));
    }
  };
}

export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/bodegas`, data);
      dispatch(wareHouse.actions.excelSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Importación successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error) {
      dispatch(wareHouse.actions.hasError(error));
    }
  };
}
