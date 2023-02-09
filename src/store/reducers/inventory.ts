// third-party
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HOST, HEADER } from 'config';

// project imports
import { dispatch } from '../index';

// types
import { InventoryStateProps } from 'types/inventory';

// ==============================||  INVENTORY  ||============================== //

const initialState: InventoryStateProps = {
  error: null,
  listInventory: [],
  isLoading: false,
  page: 0,
  totalRows: 0,
  totalPages: 0
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
      const { Rows, totalRows, totalPages, page } = action.payload;
      state.listInventory = Rows;
      state.page = page;
      state.totalRows = totalRows;
      state.totalPages = totalPages;
      state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

interface Props {
  WarehouseID?: number;
  limit?: number;
  page?: number;
  Sku?: string;
  From?: string;
  To?: string;
}

export function getInventoryList({ WarehouseID = 20, page = 1, Sku = '', From = '', To = '' }: Props) {
  return async () => {
    try {
      dispatch(slice.actions.loading());
      let queryParams: string = '';
      queryParams = `Page=${page}&`;
      if (WarehouseID) {
        queryParams += `WarehouseID=${WarehouseID}&`;
      }
      if (Sku !== '' && Sku.length <= 9) {
        queryParams += `Sku=${Sku?.trim()}&`;
      }

      if (From !== '' && To !== '') {
        queryParams += `From=${From}&To=${To}&`;
      }

      const response = await axios.get(`${HOST}/inventory?${queryParams}`, HEADER);
      if (response.data instanceof Object) {
        const { Rows, totalRows, totalPages, page }: any = response.data;
        dispatch(
          slice.actions.getInventorySuccess({
            totalRows,
            totalPages,
            page,
            Rows
          })
        );
      }
    } catch (error: any) {
      dispatch(slice.actions.loadingIs());

      dispatch(slice.actions.hasError(error));
    }
  };
}
