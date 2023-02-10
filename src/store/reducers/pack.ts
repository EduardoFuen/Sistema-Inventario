// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST, HEADER } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { PackStateProps, Pack } from 'types/products';

// initial state
const initialState: PackStateProps = {
  error: null,
  packList: []
};

// ==============================||  PACKS  REDUCER ||============================== //

const slice = createSlice({
  name: 'pack',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET PACKS
    getPackSuccess(state, action) {
      state.packList = action.payload;
    },
    // ADD PACK
    addPackSuccess(state, action) {
      state.packList.push(action.payload);
    },
    // UPDATE PACK
    updatePackSuccess(state, action) {
      const index = state.packList.findIndex((item) => item?.ID === action.payload?.ID);
      state.packList[index] = action.payload;
    },
    // ADD EXCEL PACK
    excelSuccess(state, action) {
      state.packList = [...state.packList, ...action.payload];
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getPackList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/pack`, HEADER);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getPackSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getPackSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addPack(data: Pack) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/pack`, { ...data }, { ...HEADER });
      dispatch(slice.actions.addPackSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Envase add successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editPack(id: number, data: Pack) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/pack`, { ID: id, ...data }, { ...HEADER });
      dispatch(slice.actions.updatePackSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Envase update successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deletePack(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/pack`, { ...HEADER, data: { ID: id } });
      if (response) {
        dispatch(getPackList());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Envase Deleted successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addExcel(data: Pack[]) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/pack`, data, HEADER);
      dispatch(slice.actions.excelSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Envase Importados successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
