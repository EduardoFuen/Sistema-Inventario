// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
// import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { TrademarkStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: TrademarkStateProps = {
  error: null,
  tradeMarkList: []
};

const slice = createSlice({
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
    ExcelSuccess(state, action) {
      state.tradeMarkList = [...state.tradeMarkList, ...action.payload];
    },
    // ADD PACK
    addTrademarkSuccess(state, action) {
      state.tradeMarkList.push(action.payload);
    },
    UpdateTrademarkSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.tradeMarkList.findIndex((item) => item.name === name);
      state.tradeMarkList[index] = data;
    },
    DeleteTrademarkSuccess(state, action) {
      const { name } = action.payload;
      const index = state.tradeMarkList.findIndex((item) => item.name === name);
      state.tradeMarkList.splice(index, 1);
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addTrademark(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addTrademarkSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addExcel(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.ExcelSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editTrademark(name: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.UpdateTrademarkSuccess({
          name,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteTrademark(name: string) {
  return async () => {
    try {
      dispatch(
        slice.actions.DeleteTrademarkSuccess({
          name
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getTrademarkList() {
  return async () => {
    try {
      localStorage.getItem('mantis-ts-trademaker');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
