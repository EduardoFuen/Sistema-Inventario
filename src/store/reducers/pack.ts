// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from '../../config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { PackStateProps } from 'types/product-type';

// ----------------------------------------------------------------------

const initialState: PackStateProps = {
  error: null,
  packList: []
};

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
    updatePackSuccess(state, action) {
      const index = state.packList.findIndex((item) => item?.ID === action.payload?.ID);
      state.packList[index] = action.payload;
    },
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
      const response = await axios.get(`${HOST}/packs`);
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

export function addPack(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/packs`, { ...data });
      dispatch(slice.actions.addPackSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editPack(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/packs`, { ID: id, ...data });
      dispatch(slice.actions.updatePackSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deletePack(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/packs`, { data: { ID: id } });
      if (response) {
        dispatch(getPackList());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Envase deleted successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/packs`, data);
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
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
