// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
// import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { PurchaseStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: PurchaseStateProps = {
  error: null,
  detailsPurchase: [],
  listPurchase: []
};

const slice = createSlice({
  name: 'reception',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET PURCHASES
    getPurchaseSuccess(state, action) {
      state.listPurchase = action.payload;
    },

    // ADD PURCHASE
    addDetailsPurchaseSuccess(state, action) {
      state.detailsPurchase = [...state.detailsPurchase, ...action.payload];
    },
    deleteDetailsPurchaseSuccess(state, action) {
      const { name } = action.payload;
      const index = state.detailsPurchase.findIndex((item) => item.name === name);
      state.detailsPurchase.splice(index, 1);
      const product = JSON.parse(window.localStorage.getItem('farmu-productsDetails')!);
      const idx = product?.findIndex((item: any) => item.name === name);
      product.splice(idx, 1);
      window.localStorage.setItem('farmu-productsDetails', JSON.stringify(product));
    },
    resetDetailsPurchaseSuccess(state) {
      state.detailsPurchase = [];
      window.localStorage.setItem('farmu-productsDetails', JSON.stringify(state.detailsPurchase));
    },
    addPurchaseSuccess(state, action) {
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
      state.detailsPurchase = [];
      state.listPurchase.push(data);
      window.localStorage.setItem('farmu-productsDetails', JSON.stringify(state.detailsPurchase));
    },
    updatePurchaseSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.listPurchase.findIndex((item) => item.nc === name);
      state.listPurchase[index] = data;
    },
    deletePurchaseSuccess(state, action) {
      const { nc } = action.payload;
      const index = state.listPurchase.findIndex((item) => item.nc === nc);
      // state.listPurchase.splice(index, 1);
      state.listPurchase[index].status = 'Cancelled';
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addItemsPurchase(data: any) {
  return async () => {
    try {
      let products = data.filter((item: any) => item.isSelected === true).map((option: any) => option.values);
      dispatch(slice.actions.addDetailsPurchaseSuccess(products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteItemsPurchase(name: string) {
  return async () => {
    try {
      dispatch(slice.actions.deleteDetailsPurchaseSuccess({ name }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function resetItemsPurchase() {
  return async () => {
    try {
      dispatch(slice.actions.resetDetailsPurchaseSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addPurchase(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addPurchaseSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editPurchase(name: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.updatePurchaseSuccess({
          name,
          data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deletePurchase(nc: string) {
  return async () => {
    try {
      dispatch(
        slice.actions.deletePurchaseSuccess({
          nc
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getPurchaseList() {
  return async () => {
    try {
      localStorage.getItem('mantis-ts-pack');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
