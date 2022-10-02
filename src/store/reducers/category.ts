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
  categoryListOne: [],
  categoryListTwo: [],
  categoryListThree: []
};

const slice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // ADD CATEGORY ONE
    addCategorySuccess(state, action) {
      state.categoryListOne.push(action.payload);
    },
    addCategory2Success(state, action) {
      state.categoryListTwo.push(action.payload);
    },
    addCategory3Success(state, action) {
      state.categoryListThree.push(action.payload);
    },
    ExcelSuccess(state, action) {
      const { index, data } = action.payload;
      switch (index) {
        case 0:
          state.categoryListOne = [...state.categoryListOne, ...data];
          break;
        case 1:
          state.categoryListTwo = [...state.categoryListTwo, ...data];
          break;
        default:
          state.categoryListThree = [...state.categoryListThree, ...data];
          break;
      }
      /* state.packList = [...state.packList, ...action.payload]; */
    },
    updateCategorySuccess(state, action) {
      const { type, id, data } = action.payload;
      switch (type) {
        case 'CategoryOne': {
          let index2: number = state.categoryListThree.findIndex((item) => item.categoryOne === id);
          state.categoryListThree[index2] = {
            ...state.categoryListThree[index2],
            categoryOne: data.categoryOne
          };
          let indexOne: number = state.categoryListOne.findIndex((item) => item.categoryOne === id);
          state.categoryListOne[indexOne] = data;
          break;
        }
        case 'CategoryTwo': {
          let index2: number = state.categoryListThree.findIndex((item) => item.categoryTwo === id);
          state.categoryListThree[index2] = {
            ...state.categoryListThree[index2],
            categoryTwo: data.categoryTwo
          };
          let index: number = state.categoryListTwo.findIndex((item) => item.categoryTwo === id);
          state.categoryListTwo[index] = data;
          break;
        }
        default:
          let index: number = state.categoryListThree.findIndex((item) => item.categoryThree === id);
          state.categoryListThree[index] = data;
      }
    },
    deleteCategorySuccess(state, action) {
      const { row } = action.payload;
      if (row.categoryOne) {
        const index = state.categoryListOne.findIndex((item) => item.categoryOne === row.categoryOne);
        state.categoryListOne.splice(index, 1);
      }
      if (row.categoryTwo) {
        const index = state.categoryListTwo.findIndex((item) => item.categoryTwo === row.categoryTwo);
        state.categoryListTwo.splice(index, 1);
      }
      if (row.categoryThree) {
        const index = state.categoryListThree.findIndex((item) => item.categoryThree === row.categoryThree);
        state.categoryListThree.splice(index, 1);
      }
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
export function addExcel(data: any, index: number) {
  return async () => {
    try {
      dispatch(
        slice.actions.ExcelSuccess({
          index,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editCategory(type: string, id: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.updateCategorySuccess({
          type,
          id,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteCategory(row: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.deleteCategorySuccess({
          row
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
