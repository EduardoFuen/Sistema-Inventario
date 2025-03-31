// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'axios';
import { HOST, HEADER } from 'config';
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
import { PurchaseStateProps, Article, Purchase } from 'types/purchase';

// initial state
const initialState: PurchaseStateProps = {
  error: null,
  detailsPurchase: [],
  listPurchase: [],
  detailsReption: [],
  order: {},
  isLoading: false,
  page: 0,
  totalRows: 0,
  totalPages: 0
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
      const { Rows, totalRows, totalPages, page } = action.payload;
      state.listPurchase = Rows;
      state.page = page;
      state.totalRows = totalRows;
      state.totalPages = totalPages;
      state.isLoading = false;
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
      state.isLoading = false;
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
export function getPurchaseList(page: number = 1) {
  return async () => {
    try {
      dispatch(slice.actions.loading());
      const response = await axios.get(`${HOST}/purchase`, HEADER);
      if (response.data instanceof Object) {
        //const { Rows, totalRows, totalPages, page }: any = response.data;

        if(response.data.length > 0){
          console.log("compra100")
          console.log(response.data.length)
          let rowsNew: any = response.data
          .map((item: any) => ({
            ...item,
            NumberOrder: `DrAgua-${item.sk}`,
            BusinessName: item?.BusinessName,
            CreatedAt: format(new Date(item?.CreatedAt), DATEFORMAT)
          }))
          .sort((a: any, b: any) => a.sk - b.sk);

        if (rowsNew.length > 0) {
          let dataPurchase: any = {
            Rows: rowsNew,
            // totalRows,
            // totalPages,
            page
          };
          dispatch(slice.actions.getPurchaseSuccess(dataPurchase));
          dispatch(slice.actions.hasError(null));
        }
        }else{
          console.log("compra122")
          console.log(response.data.length)
          let rowsNew: any = []
          .map((item: any) => ({
            ...item,
            NumberOrder: `0`,
            BusinessName: 0,
            CreatedAt: 0
          }))
          .sort((a: any, b: any) => a.sk - b.sk);

        if (rowsNew) {
          let dataPurchase: any = {
            Rows: rowsNew,
            // totalRows,
            // totalPages,
            page
          };
          console.log("137")
          console.log(dataPurchase)
          dispatch(slice.actions.getPurchaseSuccess(dataPurchase));
          dispatch(slice.actions.hasError(null));
        }
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
export function addPurchase(data: Purchase) {
  return async () => {
    try {
      dispatch(slice.actions.loading());
      await dispatch(getPurchaseList());
      const Newdata = {
        ...data,
        Discount: data?.Discount || 0,
        DiscountEarliyPay: data?.DiscountEarliyPay || 0,
        Articles: Articles(data?.Articles)
      };

      const response = await axios.post(`${HOST}/purchase`, { ...Newdata }, { ...HEADER });
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
      dispatch(slice.actions.addPurchaseSuccess(response.data));
      //window.location.href = `/purchase/view/${response.data.sk}`;
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getIDPurchase(id: number) {
  return async () => {
    dispatch(slice.actions.loading());
    try {
      await Promise.all([
        dispatch(resetViewReception()),
        dispatch(resetOrder()),
        dispatch(resetItemsPurchase()),
        dispatch(getSupplierList()),
        dispatch(getWarehouseList())
      ]);

      const response = await axios.get(`${HOST}/purchase/byid?ID=${id}`, HEADER);
      if (response.data) {
        console.log(response.data)
        let Articles: Article[] = TransformsArticles(response.data?.Articles, response.data?.Products);
        await dispatch(addItemsPurchase(Articles));
        dispatch(
          slice.actions.getIDPurchaseSuccess({
            ...response.data,
            Articles
          })
        );
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editPurchase(id: number, data: Purchase) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/purchase`, { ...data, ID: id }, { ...HEADER });
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

      const response = await axios.delete(`${HOST}/purchase`, { ...HEADER, data: { ID: id } });
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
export function addItemsPurchase(data: Article[]) {
  return async () => {
    try {
      let products = data.filter((item: Article) => item.isSelected === true).map((option: Article) => option);
      dispatch(slice.actions.addDetailsPurchaseSuccess(products));
    } catch (error) {
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

      dispatch(
        slice.actions.editDetailsPurchaseSuccess({
          ...order,
          ...summaryOrder,
          Articles: data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function updateSummaryPurchase(discount: number) {
  return async () => {
    try {
      let {
        purchase: { order }
      } = store.getState();

      let summaryOrder = summary(order?.Articles, discount);
      dispatch(
        slice.actions.getIDPurchaseSuccess({
          ...order,
          ...summaryOrder,
          Discount: discount
        })
      );
    } catch (error) {
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
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function resetItemsPurchase() {
  return async () => {
    try {
      dispatch(slice.actions.loading());
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
