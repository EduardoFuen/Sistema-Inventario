// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST, HEADER } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { TrademarkStateProps, Trademark } from 'types/products';

// initial state
const initialState: TrademarkStateProps = {
  error: null,
  tradeMarkList: []
};

// ==============================||  TRADEMARK REDUCER ||============================== //

const tradeMark = createSlice({
  name: 'trademark',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET PACKS
    getTrademarkSuccess(state, action) {
      state.tradeMarkList = action.payload;
    },
    // ADD TRADEMARK
    addTrademarkSuccess(state, action) {
      state.tradeMarkList.push(action.payload);
    },
    // UPDATE TRADEMARK
    updateTrademarkSuccess(state, action) {
      const index = state.tradeMarkList.findIndex((item) => item?.ID === action.payload?.ID);
      state.tradeMarkList[index] = action.payload;
    },
    // ADD EXCEL TRADEMARK
    excelSuccess(state, action) {
      state.tradeMarkList = [...state.tradeMarkList, ...action.payload];
    }
  }
});

// Reducer
export default tradeMark.reducer;

// ----------------------------------------------------------------------
export function getTrademarkList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/trademark`, HEADER);
      if (response.data instanceof Array) {
        dispatch(tradeMark.actions.getTrademarkSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(tradeMark.actions.getTrademarkSuccess([]));
      }
      dispatch(tradeMark.actions.hasError(error));
    }
  };
}

export function addTrademark(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/trademark`, { ...data }, { ...HEADER });
      dispatch(tradeMark.actions.addTrademarkSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Trademark Add successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      dispatch(tradeMark.actions.hasError(error));
    }
  };
}
export function editTrademark(id: number, data: Trademark) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/trademark`, { ID: id, ...data }, { ...HEADER });
      dispatch(
        openSnackbar({
          open: true,
          message: 'Trademark Update successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(tradeMark.actions.updateTrademarkSuccess(response.data));
    } catch (error: any) {
      dispatch(tradeMark.actions.hasError(error));
    }
  };
}
export function deleteTrademark(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/trademark`, { ...HEADER, data: { ID: id } });
      if (response) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Trademark Deleted successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        dispatch(getTrademarkList());
      }
    } catch (error: any) {
      dispatch(tradeMark.actions.hasError(error));
    }
  };
}
export function addExcel(data: Trademark[]) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/trademark`, data, { ...HEADER });
      dispatch(tradeMark.actions.excelSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'TradeMark Importados successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      dispatch(tradeMark.actions.hasError(error));
    }
  };
}
