// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'axios';
import { HOST } from 'config';
import { dispatch, store } from '../index';
import summary from 'utils/calculation';
import { Articles, TransformsArticles } from 'utils/transformsArticles';
import { openSnackbar } from './snackbar';
import { getSupplierList } from './supplier';
import { getWarehouseList } from './warehouse';
import { resetViewReception } from './reception';
import { DATEFORMAT } from 'config';
import { format } from 'date-fns';

// types
import { PurchaseStateProps } from 'types/purchase';
import { Article } from 'types/purchase';

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
      state.detailsPurchase = action.payload?.Articles;
      state.order = action.payload;
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
      const response = await axios.get(`${HOST}/purchase`);
      if (response.data instanceof Array) {
        let responseData: any = response.data.map((item: any) => {
          return {
            ...item,
            NumberOrder: `Farmu-${item.ID}`,
            BusinessName: item?.Supplier?.BusinessName,
            Warehouse: item?.Warehouse?.Name,
            CreatedAt: format(new Date(item?.CreatedAt), DATEFORMAT)
          };
        });
        if (responseData.length > 0) {
          dispatch(slice.actions.getPurchaseSuccess(responseData));
          dispatch(slice.actions.hasError(null));
        }
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

      let summaryOrder = summary(Articles(data?.Articles), parseFloat(data?.Discount));

      const Newdata = {
        ...data,
        ...summaryOrder,
        Discount: parseFloat(data?.Discount) || 0,
        DiscountEarliyPay: parseFloat(data?.DiscountEarliyPay) || 0,
        Articles: Articles(data?.Articles)
      };

      const response = await axios.post(`${HOST}/purchase`, { ...Newdata });
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
    } catch (error: any) {
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

      const response = await axios.get(`${HOST}/purchase?ID=${id}`);
      if (response.data) {
        let Articles: Article[] = TransformsArticles(response.data?.Articles, response.data?.Products);
        let dataNew: any = {
          ...response.data,
          Articles
        };
        await dispatch(addItemsPurchase(Articles));
        dispatch(slice.actions.getIDPurchaseSuccess(dataNew));
      }
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editPurchase(id: number, data: any) {
  return async () => {
    try {
      const response: any = await axios.put(`${HOST}/purchase`, { ...data, ID: id });
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
    } catch (error: any) {
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
      const response = await axios.put(`${HOST}/purchase`, { ID: id, ...order, status: 2 });
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
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addItemsPurchase(data: any) {
  return async () => {
    try {
      let products = data.filter((item: Article) => item.isSelected === true).map((option: Article) => option);
      dispatch(slice.actions.addDetailsPurchaseSuccess(products));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editItemsPurchase(data: Article) {
  return async () => {
    try {
      let {
        purchase: { order }
      } = store.getState();

      let summaryOrder = summary(data, parseFloat(order?.Discount));
      let newData: any = {
        ...order,
        ...summaryOrder,
        Articles: data
      };
      dispatch(slice.actions.editDetailsPurchaseSuccess(newData));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteItemsPurchase(id: number) {
  return async () => {
    try {
      let {
        purchase: { order, detailsPurchase }
      } = store.getState();

      let items: any = detailsPurchase.filter((item: Article) => item.ID !== id);

      let summaryOrder = summary(items, parseFloat(order?.Discount));
      let newData: any = {
        ...order,
        ...summaryOrder,
        Articles: items
      };

      dispatch(slice.actions.editDetailsPurchaseSuccess(newData));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function resetItemsPurchase() {
  return async () => {
    try {
      dispatch(slice.actions.resetDetailsPurchaseSuccess());
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function resetOrder() {
  return async () => {
    try {
      dispatch(slice.actions.resetOrderSuccess());
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
