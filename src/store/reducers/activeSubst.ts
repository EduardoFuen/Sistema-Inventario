// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
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
    excelSuccess(state, action) {
      state.todoListSubs = [...state.todoListSubs, ...action.payload];
    },
    updateSubsSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.todoListSubs.findIndex((item) => item.name === name);
      state.todoListSubs[index] = data;
    },
    deleteSubsSuccess(state, action) {
      const { name } = action.payload;
      const index = state.todoListSubs.findIndex((item) => item.name === name);
      state.todoListSubs.splice(index, 1);
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addSubs(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addSubsSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editSubs(name: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.updateSubsSuccess({
          name,
          data
        })
      );
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
export function deleteSubs(name: string) {
  return async () => {
    try {
      dispatch(
        slice.actions.deleteSubsSuccess({
          name
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getSubsList() {
  return async () => {
    try {
      localStorage.getItem('mantis-ts-substances');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
