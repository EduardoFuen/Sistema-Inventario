// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST, CATEGORY, HEADER } from 'config';

import { dispatch } from '../index';
import { openSnackbar } from './snackbar';
import { numberAletters } from 'utils/numberAletters';
// types
import { CategoryOneStateProps, CategoryOne, CategoryTwo, CategoryThree } from 'types/products';

// initial state
const initialState: CategoryOneStateProps = {
  error: null,
  categoryListOne: [],
  categoryListTwo: [],
  categoryListThree: []
};

// ==============================||  CATEGORY  REDUCER ||============================== //

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET CATEGORY ONE
    getCategoryOneSuccess(state, action) {
      state.categoryListOne = action.payload;
    },
    // GET CATEGORY TWO
    getCategoryTwoSuccess(state, action) {
      state.categoryListTwo = action.payload;
    },
    // GET CATEGORY THREE
    getCategoryThreeSuccess(state, action) {
      state.categoryListThree = action.payload;
    },
    // ADD CATEGORY ONE
    addCategoryOneSuccess(state, action) {
      state.categoryListOne.push(action.payload);
    },
    // ADD CATEGORY TWO
    addCategoryTwoSuccess(state, action) {
      state.categoryListTwo.push(action.payload);
    },
    // ADD CATEGORY THREE
    addCategoryThreeSuccess(state, action) {
      state.categoryListThree.push(action.payload);
    },
    // UPDATE CATEGORIES
    updateCategorySuccess(state, action) {
      const { index, id, data } = action.payload;
      switch (index) {
        case CATEGORY.CategoryOne:
          state.categoryListOne = state.categoryListOne.map((item) => (item.ID === id ? data : item));
          break;
        case CATEGORY.CategoryTwo:
          state.categoryListTwo = state.categoryListTwo.map((item) => (item.ID === id ? data : item));
          break;
        default:
          state.categoryListThree = state.categoryListThree.map((item) => (item.ID === id ? data : item));
      }
    },
    // ADD EXCEL CATEGORIES
    excelSuccess(state, action) {
      const { index, data } = action.payload;
      switch (index) {
        case CATEGORY.CategoryOne:
          state.categoryListOne = [...state.categoryListOne, ...data];
          break;
        case CATEGORY.CategoryTwo:
          state.categoryListTwo = [...state.categoryListTwo, ...data];
          break;
        default:
          state.categoryListThree = [...state.categoryListThree, ...data];
          break;
      }
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCategoryListOne() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/categoryone`, HEADER);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getCategoryOneSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getCategoryOneSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCategoryListTwo() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/categorytwo`, HEADER);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getCategoryTwoSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getCategoryTwoSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getCategoryListThree() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/categorythree`, HEADER);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getCategoryThreeSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getCategoryThreeSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addCategoryOne(data: CategoryOne) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/categoryone`, { ...data }, { ...HEADER });
      dispatch(slice.actions.addCategoryOneSuccess(response.data));
      dispatch(Alert());
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addCategoryTwo(data: CategoryTwo) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/categorytwo`, { ...data }, { ...HEADER });
      dispatch(slice.actions.addCategoryTwoSuccess(response.data));
      dispatch(Alert());
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addCategoryThree(data: CategoryThree) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/categorythree`, { ...data }, { ...HEADER });
      dispatch(slice.actions.addCategoryThreeSuccess(response.data));
      dispatch(Alert());
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editCategory(index: number, id: number, data: CategoryOne | CategoryTwo | CategoryThree) {
  return async () => {
    try {
      if (!numberAletters(index)) return;
      const response = await axios.put(`${HOST}/category${numberAletters(index)}`, { ID: id, ...data }, { ...HEADER });
      dispatch(
        slice.actions.updateCategorySuccess({
          index,
          id,
          data: response.data
        })
      );
      dispatch(
        openSnackbar({
          open: true,
          message: 'Categoria Update successfully.',
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

export function deleteCategory(id: number, index: number) {
  return async () => {
    try {
      if (!numberAletters(index)) return;
      const response = await axios.delete(`${HOST}/category${numberAletters(index)}`, { ...HEADER, data: { ID: id } });
      switch (index) {
        case CATEGORY.CategoryOne: {
          if (response) {
            dispatch(getCategoryListOne());
          }
          break;
        }
        case CATEGORY.CategoryTwo: {
          if (response) {
            dispatch(getCategoryListTwo());
          }
          break;
        }
        case CATEGORY.CategoryThree: {
          if (response) {
            dispatch(getCategoryListThree());
          }
          break;
        }
      }
      dispatch(
        openSnackbar({
          open: true,
          message: 'Categoria deleted successfully.',
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
export function addExcel(data: CategoryOne[] | CategoryTwo[] | CategoryThree[], index: number) {
  return async () => {
    try {
      if (!numberAletters(index)) return;
      const response = await axios.post(`${HOST}/category${numberAletters(index)}`, data, { ...HEADER });
      dispatch(
        slice.actions.excelSuccess({
          index,
          data: response.data
        })
      );
      dispatch(
        openSnackbar({
          open: true,
          message: 'Categorias Importadas successfully.',
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
export function Alert() {
  return async () => {
    dispatch(
      openSnackbar({
        open: true,
        message: 'Categoria Add successfully.',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
  };
}
