// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST, CATEGORY } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { CategoryOneStateProps } from 'types/products';

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
      const { type, id, data } = action.payload;
      switch (type) {
        case CATEGORY.CategoryOne: {
          let index: number = state.categoryListOne.findIndex((item) => item.ID === id);
          state.categoryListOne[index] = data;
          break;
        }
        case CATEGORY.CategoryTwo: {
          let index: number = state.categoryListTwo.findIndex((item) => item.ID === id);
          state.categoryListTwo[index] = data;
          break;
        }
        default:
          let index: number = state.categoryListThree.findIndex((item) => item.ID === id);
          state.categoryListThree[index] = data;
      }
    },
    // ADD EXCEL CATEGORIES
    excelSuccess(state, action) {
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
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCategoryListOne() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/categoryone`);
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
      const response = await axios.get(`${HOST}/categorytwo`);
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
      const response = await axios.get(`${HOST}/categorythree`);
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
export function addCategoryOne(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/categoryone`, { ...data });
      dispatch(slice.actions.addCategoryOneSuccess(response.data));
      dispatch(Alert());
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addCategoryTwo(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/categorytwo`, { ...data });
      dispatch(slice.actions.addCategoryTwoSuccess(response.data));
      dispatch(Alert());
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addCategoryThree(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/categorythree`, { ...data });
      dispatch(slice.actions.addCategoryThreeSuccess(response.data));
      dispatch(Alert());
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editCategory(type: string, id: number, data: any) {
  return async () => {
    try {
      switch (type) {
        case CATEGORY.CategoryOne: {
          const response = await axios.put(`${HOST}/categoryone`, { ID: id, ...data });
          dispatch(
            slice.actions.updateCategorySuccess({
              type,
              id,
              data: response.data
            })
          );
          break;
        }
        case CATEGORY.CategoryTwo: {
          const response = await axios.put(`${HOST}/categorytwo`, { ID: id, ...data });
          dispatch(
            slice.actions.updateCategorySuccess({
              type,
              id,
              data: response.data
            })
          );
          break;
        }
        default:
          const response = await axios.put(`${HOST}/categorythree`, { ID: id, ...data });
          dispatch(
            slice.actions.updateCategorySuccess({
              type,
              id,
              data: response.data
            })
          );
      }
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
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteCategory(id: number, type: string) {
  return async () => {
    try {
      switch (type) {
        case CATEGORY.CategoryOne: {
          const response = await axios.delete(`${HOST}/categoryone`, { data: { ID: id } });
          if (response) {
            dispatch(getCategoryListOne());
          }
          break;
        }
        case CATEGORY.CategoryTwo: {
          const response = await axios.delete(`${HOST}/categorytwo`, { data: { ID: id } });
          if (response) {
            dispatch(getCategoryListTwo());
          }
          break;
        }
        default:
          const response = await axios.delete(`${HOST}/categorythree`, { data: { ID: id } });
          if (response) {
            dispatch(getCategoryListThree());
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
export function addExcel(data: any, index: number) {
  return async () => {
    try {
      switch (index) {
        case 0: {
          const response = await axios.post(`${HOST}/categoryone`, data);
          dispatch(
            slice.actions.excelSuccess({
              index,
              data: response.data
            })
          );
          break;
        }
        case 1: {
          const response = await axios.post(`${HOST}/categorytwo`, data);
          dispatch(
            slice.actions.excelSuccess({
              index,
              data: response.data
            })
          );
          break;
        }
        default:
          const response = await axios.post(`${HOST}/categorythree`, data);
          dispatch(
            slice.actions.excelSuccess({
              index,
              data: response.data
            })
          );
      }
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
    } catch (error: any) {
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
