// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from '../../config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { TrademarkStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: TrademarkStateProps = {
  error: null,
  tradeMarkList: []
};

const tradeMark = createSlice({
  name: 'trademaker',
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
    excelSuccess(state, action) {
      state.tradeMarkList = [...state.tradeMarkList, ...action.payload];
    },
    // ADD PACK
    addTrademarkSuccess(state, action) {
      state.tradeMarkList.push(action.payload);
    },
    updateTrademarkSuccess(state, action) {
      const index = state.tradeMarkList.findIndex((item) => item?.ID === action.payload?.ID);
      state.tradeMarkList[index] = action.payload;
    }
  }
});

// Reducer
export default tradeMark.reducer;

// ----------------------------------------------------------------------
export function getTrademarkList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/trademark`);
      if (response.data instanceof Array) {
        dispatch(tradeMark.actions.getTrademarkSuccess(response.data));
      }
    } catch (error) {
      dispatch(tradeMark.actions.hasError(error));
    }
  };
}

export function addTrademark(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/trademark`, { ...data });
      dispatch(tradeMark.actions.addTrademarkSuccess(response.data));
    } catch (error) {
      dispatch(tradeMark.actions.hasError(error));
    }
  };
}
export function editTrademark(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/trademark`, { ID: id, ...data });
      dispatch(tradeMark.actions.updateTrademarkSuccess(response.data));
    } catch (error) {
      dispatch(tradeMark.actions.hasError(error));
    }
  };
}
export function deleteTrademark(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/trademark`, { data: { ID: id } });
      if (response) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Trademark deleted successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        dispatch(getTrademarkList());
      }
    } catch (error) {
      dispatch(tradeMark.actions.hasError(error));
    }
  };
}
export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/trademark`, data);
      dispatch(tradeMark.actions.excelSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'TradeMark add successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error) {
      dispatch(tradeMark.actions.hasError(error));
    }
  };
}
