// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from '../../config';
import { dispatch } from '../index';

// types
import { MakerStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: MakerStateProps = {
  error: null,
  makerList: []
};

const maker = createSlice({
  name: 'maker',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET PACKS
    getMakerSuccess(state, action) {
      state.makerList = action.payload;
    },

    // ADD PACK
    addMakerSuccess(state, action) {
      state.makerList.push(action.payload);
    },
    addMakerexcelSuccess(state, action) {
      state.makerList = [...state.makerList, ...action.payload];
    },
    updateMakerSuccess(state, action) {
      const index = state.makerList.findIndex((item) => item.ID === action.payload?.ID);
      state.makerList[index] = action.payload;
    }
  }
});

// Reducer
export default maker.reducer;

// ----------------------------------------------------------------------
export function getMakerList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/maker`);
      dispatch(maker.actions.getMakerSuccess(response.data));
    } catch (error) {
      dispatch(maker.actions.hasError(error));
    }
  };
}

export function addMaker(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/maker`, { ...data });
      dispatch(maker.actions.addMakerSuccess(response.data));
    } catch (error) {
      dispatch(maker.actions.hasError(error));
    }
  };
}
export function editMaker(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/maker`, { ID: id, ...data });
      dispatch(maker.actions.updateMakerSuccess(response.data));
    } catch (error) {
      dispatch(maker.actions.hasError(error));
    }
  };
}

export function deleteMaker(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/maker`, { data: { ID: id } });
      if (response) {
        dispatch(getMakerList());
      }
    } catch (error) {
      dispatch(maker.actions.hasError(error));
    }
  };
}
export function addMakerExcel(data: any) {
  return async () => {
    try {
      dispatch(maker.actions.addMakerexcelSuccess(data));
    } catch (error) {
      dispatch(maker.actions.hasError(error));
    }
  };
}
