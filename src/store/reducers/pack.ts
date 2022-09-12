// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { PackStateProps } from 'types/e-commerce';

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
    UpdatePackSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.packList.findIndex((item) => item.name === name);
      state.packList[index] = data;
    },
    DeletePackSuccess(state, action) {
      const { name } = action.payload;
      const index = state.packList.findIndex((item) => item.name === name);
      state.packList.splice(index, 1);
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addPack(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addPackSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editPack(name: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.UpdatePackSuccess({
          name,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deletePack(name: string) {
  return async () => {
    try {
      dispatch(
        slice.actions.DeletePackSuccess({
          name
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getPackList() {
  return async () => {
    try {
      const response = await axios.get('/api/packList/list');
      dispatch(slice.actions.getPackSuccess(response.data.packList));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
