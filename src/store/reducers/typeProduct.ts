// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
// import axios from 'utils/axios';
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
    ExcelSuccess(state, action) {
      state.typeProductList = [...state.typeProductList, ...action.payload];
    },
    updateTypeProductSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.typeProductList.findIndex((item) => item.name === name);
      state.typeProductList[index] = data;
    },
    deleteTypeProductSuccess(state, action) {
      const { name } = action.payload;
      const index = state.typeProductList.findIndex((item) => item.name === name);
      state.typeProductList.splice(index, 1);
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addTypeProduct(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addTypeProductSuccess(data));
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
export function editTypeProduct(name: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.updateTypeProductSuccess({
          name,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteTypeProduct(name: string) {
  return async () => {
    try {
      dispatch(
        slice.actions.deleteTypeProductSuccess({
          name
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getTypeProductList() {
  return async () => {
    try {
      localStorage.getItem('mantis-ts-typeProduct');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
