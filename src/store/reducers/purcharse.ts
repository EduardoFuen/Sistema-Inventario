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
  name: 'purchase',
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
    },
    resetDetailsPurchaseSuccess(state) {
      state.detailsPurchase = [];
    },
    addPurchaseSuccess(state, action) {
      /* let iva: number;
       let total: number;
       */
      const subtotal: number = action.payload.products.reduce((next: any, item: any) => {
        const { price } = item;
        return next + price;
      }, {});

      const cart = action.payload.products.reduce(
        (acc = {}, item = {}) => {
          console.log(item);
          // const itemTotal = parseFloat((item.price * item.qty).toFixed(2));
          // const itemTotalTax = parseFloat((itemTotal * taxRate).toFixed(2));

          // We'll modify acc here...
          return acc;
          // return (acc.subtotal = itemTotal);
        },
        {
          subtotal: 0,
          tax: 0,
          total: 0
        }
      );

      console.log(cart);
      console.log(subtotal);

      let data = {
        ...action.payload
      };
      console.log(data);
      // state.detailsPurchase = [];
      // state.listPurchase.push(action.payload);
    },
    updatePurchaseSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.listPurchase.findIndex((item) => item.nc === name);
      state.listPurchase[index] = data;
    },
    deletePurchaseSuccess(state, action) {
      const { nc } = action.payload;
      const index = state.listPurchase.findIndex((item) => item.nc === nc);
      state.listPurchase.splice(index, 1);
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
