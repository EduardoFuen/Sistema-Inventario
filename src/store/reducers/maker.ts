// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { MakerStateProps } from 'types/products';

// ==============================||  MAKER  ||============================== //

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
    // UPDATE PACK
    updateMakerSuccess(state, action) {
      const index = state.makerList.findIndex((item) => item.ID === action.payload?.ID);
      state.makerList[index] = action.payload;
    },
    // ADD EXCEL PACK
    addMakerExcelSuccess(state, action) {
      state.makerList = [...state.makerList, ...action.payload];
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
      if (response.data instanceof Array) {
        dispatch(maker.actions.getMakerSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(maker.actions.getMakerSuccess([]));
      }
      dispatch(maker.actions.hasError(error));
    }
  };
}

export function addMaker(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/maker`, { ...data });
      dispatch(maker.actions.addMakerSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Maker add successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
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
      dispatch(
        openSnackbar({
          open: true,
          message: 'Maker update successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
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
        dispatch(
          openSnackbar({
            open: true,
            message: 'Maker Delete successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
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
      const response = await axios.post(`${HOST}/maker`, data);
      dispatch(maker.actions.addMakerExcelSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Maker Importados successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error) {
      dispatch(maker.actions.hasError(error));
    }
  };
}
