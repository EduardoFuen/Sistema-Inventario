// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { SubstancesStateProps } from 'types/products';

// initial state
const initialState: SubstancesStateProps = {
  error: null,
  todoListSubs: []
};

// ==============================||  ACTIVE SUBSTANCES REDUCER  ||============================== //

const slice = createSlice({
  name: 'substances',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET SUBSTANCES
    getSubsSuccess(state, action) {
      state.todoListSubs = action.payload;
    },
    // ADD SUBSTANCES
    addSubsSuccess(state, action) {
      state.todoListSubs.push(action.payload);
    },
    // UPDATE SUBSTANCES
    updateSubsSuccess(state, action) {
      const index = state.todoListSubs.findIndex((item) => item.ID === action.payload?.ID);
      state.todoListSubs[index] = action.payload;
    },
    // ADD EXCEL SUBSTANCES
    excelSuccess(state, action) {
      state.todoListSubs = [...state.todoListSubs, ...action.payload];
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getSubsList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/subtance`);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getSubsSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getSubsSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addSubs(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/subtance`, { ...data });
      dispatch(slice.actions.addSubsSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Add successfully.',
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

export function editSubs(id: number, data: any) {
  return async () => {
    dispatch(slice.actions.hasError(''));
    try {
      const response = await axios.put(`${HOST}/subtance`, { ID: id, ...data });
      dispatch(slice.actions.updateSubsSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Update successfully.',
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
export function deleteSubs(id: number) {
  return async () => {
    dispatch(slice.actions.hasError(''));
    try {
      const response = await axios.delete(`${HOST}/subtance`, { data: { ID: id } });
      if (response) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Deleted successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        dispatch(getSubsList());
      }
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/subtance`, data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Importado Sustancias successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(slice.actions.excelSuccess(response.data));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
