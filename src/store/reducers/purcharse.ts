// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'axios';
import { HOST } from 'config';
import { dispatch, store } from '../index';
import summary from 'utils/calculation';
import { openSnackbar } from './snackbar';
import { getSupplierList } from './supplier';
import { getWarehouseList } from './warehouse';
import { getProducts } from './product';
import { resetViewReception } from './reception';

// types
import { PurchaseStateProps } from 'types/purchase';
import { Products } from 'types/products';

// initial state
const initialState: PurchaseStateProps = {
  error: null,
  detailsPurchase: [],
  listPurchase: [],
  detailsReption: [],
  order: {},
  isLoading: false
};

// ==============================||  PURCHASE  REDUCER ||============================== //

const slice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    // LOADER
    loading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    // GET PURCHASES
    getPurchaseSuccess(state, action) {
      state.listPurchase = action.payload;
      state.error = null;
    },
    // GET ID PURCHASE
    getIDPurchaseSuccess(state, action) {
      state.order = action.payload;
      state.isLoading = false;
    },
    // ADD PURCHASE
    addPurchaseSuccess(state, action) {
      state.listPurchase.push(action.payload);
    },
    // ADD DETAILS PURCHASE
    addDetailsPurchaseSuccess(state, action) {
      state.detailsPurchase = [...state.detailsPurchase, ...action.payload];
    },
    // UPDATE DETAILS PURCHASE
    editDetailsPurchaseSuccess(state, action) {
      state.detailsPurchase = action.payload;
    },

    // DELETE DETAILS PURCHASE
    deleteDetailsPurchaseSuccess(state, action) {
      const { id } = action.payload;
      const index = state.detailsPurchase.findIndex((item) => item.ID === id);
      state.detailsPurchase.splice(index, 1);
    },
    // RESET DETAILS PURCHASE
    resetDetailsPurchaseSuccess(state) {
      state.detailsPurchase = [];
    },
    // RESET DETAILS ORDER
    resetOrderSuccess(state) {
      state.order = {};
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getPurchaseList() {
  return async () => {
    try {
      await dispatch(getProducts());
      const response = await axios.get(`${HOST}/compras`);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getPurchaseSuccess(response.data));
        dispatch(slice.actions.hasError(null));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getPurchaseSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addPurchase(data: any) {
  return async () => {
    try {
      await dispatch(getPurchaseList());
      let summaryOrder = summary(data.Articles, data?.Discount);
      const Newdata = {
        ...data,
        ...summaryOrder,
        Discount: parseFloat(data?.Discount) || 0,
        DiscountEarliyPay: parseFloat(data?.DiscountEarliyPay) || 0,
        Articles: data?.Articles.map((item: any) => ({
          ProductID: item?.ProductID,
          Count: Number(item?.Count) || 0,
          BasePrice: parseFloat(item?.BasePrice) || 0,
          Tax: Number(item?.Tax) || 0,
          Discount: parseFloat(item?.DiscountNegotiated) || 0,
          DiscountAdditional: parseFloat(item?.DiscountAdditional) || 0,
          Bonus: Number(item?.Bonus) || 0,
          SubTotal: Number(item?.SubTotal) || 0,
          Total: Number(item?.Total) || 0
        }))
      };
      const response = await axios.post(`${HOST}/compras`, { ...Newdata });
      dispatch(
        openSnackbar({
          open: true,
          message: 'Orden Creada successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      await dispatch(slice.actions.addPurchaseSuccess(response.data));
      window.location.href = `/purchase/view/${response.data.ID}`;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getIDPurchase(id: number) {
  return async () => {
    dispatch(slice.actions.loading());
    dispatch(resetViewReception());
    dispatch(resetOrder());
    try {
      dispatch(resetItemsPurchase());
      await dispatch(getSupplierList());
      await dispatch(getWarehouseList());

      const response = await axios.get(`${HOST}/compras?ID=${id}`);
      if (response.data) {
        let Articles: any;
        let dataNew: any;
        Articles = response.data?.Articles?.map((item: Products | any) => {
          return {
            ...item,
            ID: item?.ID,
            ArticleID: item?.ID,
            Name: response.data?.Products.find((e: any) => e.ID === item.ProductID)?.Name,
            Sku: response.data?.Products.find((e: any) => e.ID === item.ProductID)?.Sku,
            Ean: response.data?.Products.find((e: any) => e.ID === item.ProductID)?.Ean,
            DiscountNegotiated: item?.Discount,
            isSelected: true
          };
        });

        dataNew = {
          ...response.data,
          Articles
        };
        await dispatch(addItemsPurchase(Articles));
        dispatch(slice.actions.getIDPurchaseSuccess(dataNew));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editPurchase(id: number, data: any) {
  return async () => {
    try {
      const response: any = await axios.put(`${HOST}/compras`, { ...data, ID: id });
      if (response) {
        dispatch(getPurchaseList());
        dispatch(getIDPurchase(id));

        if (data?.Status === 0) {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Orden Actualizada successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Orden Enviada successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        }
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deletePurchase(id: number) {
  return async () => {
    try {
      await dispatch(getIDPurchase(id));
      let {
        purchase: { order }
      } = store.getState();
      const response = await axios.put(`${HOST}/compras`, { ID: id, ...order, status: 2 });
      if (response) {
        dispatch(getPurchaseList());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Orden Cancelada successfully.',
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
        dispatch(slice.actions.hasError(null));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addItemsPurchase(data: any) {
  return async () => {
    try {
      let products = data.filter((item: any) => item.isSelected === true).map((option: any) => option);
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
export function deleteItemsPurchase(id: number) {
  return async () => {
    try {
      dispatch(slice.actions.deleteDetailsPurchaseSuccess({ id }));
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
export function resetOrder() {
  return async () => {
    try {
      dispatch(slice.actions.resetOrderSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
