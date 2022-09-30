// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
// import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { MakerStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: MakerStateProps = {
  error: null,
  makerList: []
};

const slice = createSlice({
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
    addMakerExcelSuccess(state, action) {
      state.makerList = [...state.makerList, ...action.payload];
    },
    UpdateMakerSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.makerList.findIndex((item) => item.name === name);
      state.makerList[index] = data;
    },
    DeleteMakerSuccess(state, action) {
      const { name } = action.payload;
      const index = state.makerList.findIndex((item) => item.name === name);
      state.makerList.splice(index, 1);
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addMaker(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addMakerSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addMakerExcel(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addMakerExcelSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editMaker(name: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.UpdateMakerSuccess({
          name,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteMaker(name: string) {
  return async () => {
    try {
      dispatch(
        slice.actions.DeleteMakerSuccess({
          name
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getMakerList() {
  return async () => {
    try {
      localStorage.getItem('mantis-ts-maker');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
