// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
// import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { CategoryOneStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: CategoryOneStateProps = {
  error: null,
  categoryListOne: []
};

const slice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET PACKS
    getMakerSuccess(state, action) {
      state.categoryListOne = action.payload;
    },

    // ADD PACK
    addCategorySuccess(state, action) {
      state.categoryListOne.push(action.payload);
    },
    addCategory2Success(state, action) {
      state.categoryListOne.push(action.payload);
    },
    addCategory3Success(state, action) {
      state.categoryListOne.push(action.payload);
    },
    UpdateMakerSuccess(state, action) {
      /*      const { name, data } = action.payload;
      const index = state.makerList.findIndex((item) => item.name === name);
      state.makerList[index] = data; */
    },
    DeleteMakerSuccess(state, action) {
      /*    const { name } = action.payload;
      const index = state.makerList.findIndex((item) => item.name === name);
      state.makerList.splice(index, 1); */
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addCategory(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addCategorySuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addCategory2(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addCategory2Success(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addCategory3(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addCategory3Success(data));
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
export function getCategoryList() {
  return async () => {
    try {
      localStorage.getItem('mantis-ts-category');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
