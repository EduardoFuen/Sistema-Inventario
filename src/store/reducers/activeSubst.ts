// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from '../../config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { SubstancesStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: SubstancesStateProps = {
  error: null,
  todoListSubs: []
};

const slice = createSlice({
  name: 'substances',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET PACKS
    getSubsSuccess(state, action) {
      state.todoListSubs = action.payload;
    },

    // ADD PACK
    addSubsSuccess(state, action) {
      state.todoListSubs.push(action.payload);
    },
    updateSubsSuccess(state, action) {
      const index = state.todoListSubs.findIndex((item) => item.ID === action.payload?.ID);
      state.todoListSubs[index] = action.payload;
    },
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
      const response = await axios.get(`${HOST}/sustancias`);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getSubsSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addSubs(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/sustancias`, { ...data });
      dispatch(slice.actions.addSubsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editSubs(id: number, data: any) {
  return async () => {
    dispatch(slice.actions.hasError(''));
    try {
      const response = await axios.put(`${HOST}/sustancias`, { ID: id, ...data });
      dispatch(slice.actions.updateSubsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteSubs(id: number) {
  return async () => {
    dispatch(slice.actions.hasError(''));
    try {
      const response = await axios.delete(`${HOST}/sustancias`, { data: { ID: id } });
      if (response) {
        dispatch(getSubsList());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addExcel(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/tipodeproducto`, data);
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
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
