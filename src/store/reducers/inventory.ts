// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';

// types
import { InventoryStateProps } from 'types/product-type';

// ----------------------------------------------------------------------

const initialState: InventoryStateProps = {
  error: null,
  listInventory: []
};

const slice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET PURCHASES
    getInventorySuccess(state, action) {
      state.listInventory = action.payload;
    },

    // ADD PURCHASE
    addDetailsInventorySuccess(state, action) {},
    deleteDetailsInventorySuccess(state, action) {},
    resetDetailsInventorySuccess(state) {},
    addInventorySuccess(state, action) {
      const products = JSON.parse(window.localStorage.getItem('farmu-productsDetails')!);
      const resumen = products.reduce(
        (acc: any = {}, item: any) => {
          const itemTotal = parseFloat((item.price * item.qty).toFixed(2));
          const itemTotalTax = parseFloat(item.iva || 0);
          acc.subtotal = parseFloat((acc.subtotal + itemTotal).toFixed(2));
          acc.tax = parseFloat((acc.tax + itemTotalTax).toFixed(2));
          acc.total = parseFloat((acc.total + itemTotal + itemTotalTax).toFixed(2));
          return acc;
        },
        {
          subtotal: 0,
          tax: 0,
          total: 0
        }
      );

      const data = {
        ...action.payload,
        ...resumen,
        products
      };
      state.listInventory.push(data);
    },
    updateInventorySuccess(state, action) {},
    deleteInventorySuccess(state, action) {}
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addItemsInventory(data: any) {
  return async () => {
    try {
      let products = data.filter((item: any) => item.isSelected === true).map((option: any) => option.values);
      dispatch(slice.actions.addDetailsInventorySuccess(products));
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.addDetailsInventorySuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteItemsInventory(name: string) {
  return async () => {
    try {
      dispatch(slice.actions.deleteDetailsInventorySuccess({ name }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function resetItemsInventory() {
  return async () => {
    try {
      dispatch(slice.actions.resetDetailsInventorySuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addInventory(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addInventorySuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editInventory(name: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.updateInventorySuccess({
          name,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteInventory(nc: string) {
  return async () => {
    try {
      dispatch(
        slice.actions.deleteInventorySuccess({
          nc
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getInventoryList() {
  return async () => {
    try {
      localStorage.getItem('mantis-ts-pack');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
