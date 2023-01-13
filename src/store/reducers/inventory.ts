// third-party
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HOST } from 'config';

// project imports
import { dispatch } from '../index';

// types
import { InventoryStateProps } from 'types/inventory';

// ==============================||  INVENTORY  ||============================== //

const initialState: InventoryStateProps = {
  error: null,
  listInventory: [],
  isLoading: false
};

const slice = createSlice({
  name: 'inventory',
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
    // GET PURCHASES
    getInventorySuccess(state, action) {
      state.listInventory = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getInventoryList(id: number = 21) {
  return async () => {
    try {
      dispatch(slice.actions.loading());

      const response = await axios.get(`${HOST}/invetory?WarehouseID=${id}`);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getInventorySuccess(response.data));
        dispatch(slice.actions.loadingIs());
      }
    } catch (error: any) {
      dispatch(slice.actions.loadingIs());

      dispatch(slice.actions.hasError(error));
    }
  };
}
