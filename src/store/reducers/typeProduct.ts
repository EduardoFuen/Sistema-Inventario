// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from '../../config';
import { dispatch } from '../index';

// types
import { TypeProductStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: TypeProductStateProps = {
  error: null,
  typeProductList: []
};

const slice = createSlice({
  name: 'typeProduct',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET PACKS
    getTypeProductSuccess(state, action) {
      state.typeProductList = action.payload;
    },

    // ADD PACK
    addTypeProductSuccess(state, action) {
      state.typeProductList.push(action.payload);
    },
    excelSuccess(state, action) {
      state.typeProductList = [...state.typeProductList, ...action.payload];
    },
    updateTypeProductSuccess(state, action) {
      const index = state.typeProductList.findIndex((item) => item.ID === action.payload?.ID);
      state.typeProductList[index] = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getTypeProductList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/bodegas`);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getTypeProductSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addTypeProduct(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/bodegas`, { ...data });
      dispatch(slice.actions.addTypeProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editTypeProduct(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/bodegas`, { ID: id, ...data });
      dispatch(slice.actions.updateTypeProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteTypeProduct(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/bodegas`, { data: { ID: id } });
      if (response) {
        dispatch(getTypeProductList());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/bodegas`, data);
      dispatch(slice.actions.excelSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
