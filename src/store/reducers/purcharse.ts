// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
// import axios from 'utils/axios';
import { dispatch } from '../index';
import summary from 'utils/calculation';

// types
import { PurchaseStateProps } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: PurchaseStateProps = {
  error: null,
  detailsPurchase: [],
  listPurchase: [],
  detailsReption: []
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

      const product = JSON.parse(window.localStorage.getItem('farmu-productsDetails')!);
      const idx = product?.findIndex((item: any) => item.name === name);
      product.splice(idx, 1);
      window.localStorage.setItem('farmu-productsDetails', JSON.stringify(product));
    },
    updateDetailsPurchaseSuccess(state, action) {
      const { data } = action.payload;
      /*    const index = state.detailsPurchase.findIndex((item) => item.name === id); */
      state.detailsPurchase = data;
    },
    resetDetailsPurchaseSuccess(state) {
      state.detailsPurchase = [];
      window.localStorage.setItem('farmu-productsDetails', JSON.stringify(state.detailsPurchase));
    },
    editDetailsPurchaseSuccess(state, action) {
      state.detailsPurchase = action.payload;
    },
    addPurchaseSuccess(state, action) {
      let summaryOrder = summary(action.payload?.products, action.payload?.discountOrder);
      const data = {
        ...action.payload,
        ...summaryOrder
      };
      state.detailsPurchase = [];
      state.listPurchase.push(data);
      window.localStorage.setItem('farmu-productsDetails', JSON.stringify(state.detailsPurchase));
    },
    updatePurchaseSuccess(state, action) {
      const { name, data } = action.payload;
      const index = state.listPurchase.findIndex((item) => item.nc === name);
      let summaryOrder = summary(data?.products, data?.discountOrder);
      state.listPurchase[index] = { ...data, ...summaryOrder };
    },
    deletePurchaseSuccess(state, action) {
      const { nc } = action.payload;
      const index = state.listPurchase.findIndex((item) => item.nc === nc);
      state.listPurchase[index] = {
        ...state.listPurchase[index],
        nc,
        status: 'Cancelled'
      };
    },
    sendPurchaseSuccess(state, action) {
      const { nc, data } = action.payload;
      const index = state.listPurchase.findIndex((item) => item.nc === nc);
      let summaryOrder = summary(data?.products, data?.discountOrder);
      state.listPurchase[index] = { ...data, ...summaryOrder };
      const NewData = {
        ...data,
        ...state.listPurchase[index],
        ...summaryOrder,
        nc
      };
      state.listPurchase[index] = NewData;
    },
    addReceptionSuccess(state, action) {
      const index = state.listPurchase.findIndex((item) => item.nc === action.payload.nc);
      state.listPurchase[index] = {
        ...action.payload
      };
      state.detailsReption = action.payload.products;
    },
    confirmationReceptionSuccess(state, action) {
      const { nc, data } = action.payload;
      const index = state.listPurchase.findIndex((item) => item.nc === nc);
      // let summaryOrder = summary(data?.products, data?.discountOrder);
      state.listPurchase[index] = data;
      // state.detailsReption = action.payload;
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
export function editItemsPurchase(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.editDetailsPurchaseSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function updateItemsPurchase(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.updateDetailsPurchaseSuccess({ data }));
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

export function editPurchase(name: string | undefined, data: any) {
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

export function sendPurchase(nc: any, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.sendPurchaseSuccess({
          nc,
          data
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
export function addReception(data: any) {
  return async () => {
    try {
      dispatch(slice.actions.addReceptionSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function confirmationReception(nc: any, data: any) {
  return async () => {
    try {
      dispatch(slice.actions.confirmationReceptionSuccess({ nc, data }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
