// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { TradeMakerStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: TradeMakerStateProps = {
  error: null,
  tradeMakerList: []
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
    getTradeMakerSuccess(state, action) {
      state.tradeMakerList = action.payload;
    },

    // ADD PACK
    addTradeMakerSuccess(state, action) {
      state.tradeMakerList.push(action.payload);
    },
    UpdateTradeMakerSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.tradeMakerList.findIndex((item) => item.name === name);
      state.tradeMakerList[index] = data;
    },
    DeleteTradeMakerSuccess(state, action) {
      const { name } = action.payload;
      const index = state.tradeMakerList.findIndex((item) => item.name === name);
      state.tradeMakerList.splice(index, 1);
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addTradeMaker(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addTradeMakerSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editTradeMaker(name: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.UpdateTradeMakerSuccess({
          name,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteTradeMaker(name: string) {
  return async () => {
    try {
      dispatch(
        slice.actions.DeleteTradeMakerSuccess({
          name
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getTradeMakerList() {
  return async () => {
    try {
      const response = await axios.get('/api/trademaker/list');
      dispatch(slice.actions.getTradeMakerSuccess(response.data.trademaker));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
