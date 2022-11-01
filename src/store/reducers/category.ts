// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST } from '../../config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { CategoryOneStateProps } from 'types/product-type';

// ----------------------------------------------------------------------

const initialState: CategoryOneStateProps = {
  error: null,
  categoryListOne: [],
  categoryListTwo: [],
  categoryListThree: []
};

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
    getCategoryTwoSuccess(state, action) {
      state.categoryListTwo = action.payload;
    },
    getCategoryThreeSuccess(state, action) {
      state.categoryListThree = action.payload;
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
    updateCategorySuccess(state, action) {
      const { type, id, data } = action.payload;
      switch (type) {
        case 'CategoryOne': {
          let index: number = state.categoryListOne.findIndex((item) => item.ID === id);
          state.categoryListOne[index] = data;
          break;
        }
        case 'CategoryTwo': {
          let index: number = state.categoryListTwo.findIndex((item) => item.ID === id);
          state.categoryListTwo[index] = data;
          break;
        }
        default:
          let index: number = state.categoryListThree.findIndex((item) => item.ID === id);
          state.categoryListThree[index] = data;
      }
    },
    deleteCategorySuccess(state, action) {
      const { row } = action.payload;
      if (row.categoryOne) {
        const index = state.categoryListOne.findIndex((item) => item.ID === row.categoryOne);
        state.categoryListOne.splice(index, 1);
      }
      if (row.categoryTwo) {
        const index = state.categoryListTwo.findIndex((item) => item.ID === row.categoryTwo);
        state.categoryListTwo.splice(index, 1);
      }
      if (row.categoryThree) {
        const index = state.categoryListThree.findIndex((item) => item.ID === row.categoryThree);
        state.categoryListThree.splice(index, 1);
      }
    },
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
      const response = await axios.get(`${HOST}/categorias/one`);
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
      const response = await axios.get(`${HOST}/categorias/two`);
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
      const response = await axios.get(`${HOST}/categorias/three`);
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
      const response = await axios.post(`${HOST}/categorias/one`, { ...data });
      dispatch(slice.actions.addCategorySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addCategory2(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/categorias/two`, { ...data });
      dispatch(slice.actions.addCategory2Success(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addCategory3(data: any) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/categorias/three`, { ...data });
      dispatch(slice.actions.addCategory3Success(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editCategory(type: string, id: number, data: any) {
  return async () => {
    try {
      switch (type) {
        case 'CategoryOne': {
          const response = await axios.put(`${HOST}/categorias/one`, { ID: id, ...data });
          dispatch(
            slice.actions.updateCategorySuccess({
              type,
              id,
              data: response.data
            })
          );
          break;
        }
        case 'CategoryTwo': {
          const response = await axios.put(`${HOST}/categorias/two`, { ID: id, ...data });
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
          const response = await axios.put(`${HOST}/categorias/three`, { ID: id, ...data });
          dispatch(
            slice.actions.updateCategorySuccess({
              type,
              id,
              data: response.data
            })
          );
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteCategory(id: number, type: string) {
  return async () => {
    try {
      switch (type) {
        case 'CategoryOne': {
          const response = await axios.delete(`${HOST}/categorias/one`, { data: { ID: id } });
          if (response) {
            dispatch(getCategoryListOne());
          }
          break;
        }
        case 'CategoryTwo': {
          const response = await axios.delete(`${HOST}/categorias/two`, { data: { ID: id } });
          if (response) {
            dispatch(getCategoryListTwo());
          }
          break;
        }
        default:
          const response = await axios.delete(`${HOST}/categorias/three`, { data: { ID: id } });
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
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addExcel(data: any, index: number) {
  return async () => {
    try {
      switch (index) {
        case 0: {
          const response = await axios.post(`${HOST}/categorias/one`, data);
          dispatch(
            slice.actions.excelSuccess({
              index,
              data: response.data
            })
          );
          break;
        }
        case 1: {
          const response = await axios.post(`${HOST}/categorias/two`, data);
          dispatch(
            slice.actions.excelSuccess({
              index,
              data: response.data
            })
          );
          break;
        }
        default:
          const response = await axios.post(`${HOST}/categorias/three`, data);
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
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
