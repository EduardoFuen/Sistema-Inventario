// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { WarehouseStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: WarehouseStateProps = {
  error: null,
  warehouseList: []
};

const slice = createSlice({
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

    // ADD PACK
    addWarehouseSuccess(state, action) {
      state.warehouseList.push(action.payload);
    },
    UpdateWarehouseSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.warehouseList.findIndex((item) => item.name === name);
      state.warehouseList[index] = data;
    },
    DeleteWarehouseSuccess(state, action) {
      const { name } = action.payload;
      const index = state.warehouseList.findIndex((item) => item.name === name);
      state.warehouseList.splice(index, 1);
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addWarehouse(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addWarehouseSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editWarehouse(name: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.UpdateWarehouseSuccess({
          name,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteWarehouse(name: string) {
  return async () => {
    try {
      dispatch(
        slice.actions.DeleteWarehouseSuccess({
          name
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getWarehouseList() {
  return async () => {
    try {
      const response = await axios.get('/api/warehouse/list');
      dispatch(slice.actions.getWarehouseSuccess(response.data.warehouse));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
