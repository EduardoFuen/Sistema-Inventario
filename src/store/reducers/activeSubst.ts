// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from '../../config';
import { dispatch } from '../index';

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
      const { name, data } = action.payload;
      const index = state.todoListSubs.findIndex((item) => item.ID === name);
      state.todoListSubs[index] = data;
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
      const response = await axios.get(`${HOST}/bodegas`);
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
      const response = await axios.post(`${HOST}/bodegas`, { ...data });
      dispatch(slice.actions.addSubsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editSubs(id: number, data: any) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/bodegas`, { ID: id, ...data });
      dispatch(slice.actions.updateSubsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteSubs(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/bodegas`, { data: { ID: id } });
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
      dispatch(slice.actions.excelSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
