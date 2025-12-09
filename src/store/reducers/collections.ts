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
import { CollectionStateProps, Article, Collection } from 'types/collection';

// initial state
const initialState: CollectionStateProps = {
  error: null,
  detailsCollection: [],
  listCollection: [],
  detailsReption: [],
  order: {},
  isLoading: false,
  page: 0,
  totalRows: 0,
  totalPages: 0
};

// ==============================||  Collection  REDUCER ||============================== //

const slice = createSlice({
  name: 'collection',
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
    // GET CollectionS
    getCollectionSuccess(state, action) {
      const { Rows, totalRows, totalPages, page } = action.payload;
      state.listCollection = Rows;
      state.page = page;
      state.totalRows = totalRows;
      state.totalPages = totalPages;
      state.isLoading = false;
      state.error = null;
    },
    // GET ID Collection
    getIDCollectionSuccess(state, action) {
      state.order = action.payload;
      state.isLoading = false;
    },
    // ADD Collection
    addCollectionSuccess(state, action) {
      state.listCollection.push(action.payload);
      state.isLoading = false;
    },
    // ADD DETAILS Collection
    addDetailsCollectionSuccess(state, action) {
      state.detailsCollection = [...state.detailsCollection, ...action.payload];
    },
    // UPDATE DETAILS Collection
    editDetailsCollectionSuccess(state, action) {
      state.detailsCollection = action.payload?.Articles;
      state.order = action.payload;
    },
    // RESET DETAILS Collection
    resetDetailsCollectionSuccess(state) {
      state.detailsCollection = [];
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
export function getCollectionList(page: number = 1) {
  return async () => {
    try {
      dispatch(slice.actions.loading());
      const response = await axios.get(`${HOST}/collection`, HEADER);
      if (response.data instanceof Object) {
        //const { Rows, totalRows, totalPages, page }: any = response.data;

        if(response.data.length > 0){
          console.log("cobranza100")
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
          let dataCollection: any = {
            Rows: rowsNew,
            // totalRows,
            // totalPages,
            page
          };
          dispatch(slice.actions.getCollectionSuccess(dataCollection));
          dispatch(slice.actions.hasError(null));
        }
        }else{
          console.log("cobranza122")
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
          let dataCollection: any = {
            Rows: rowsNew,
            // totalRows,
            // totalPages,
            page
          };
          console.log("137")
          console.log(dataCollection)
          dispatch(slice.actions.getCollectionSuccess(dataCollection));
          dispatch(slice.actions.hasError(null));
        }
        }

      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getCollectionSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTotalCollectionList(page: number = 1) {
  return async () => {
    try {
      dispatch(slice.actions.loading());
      const response = await axios.get(`${HOST}/collectionTotals`, HEADER);
      if (response.data instanceof Object) {
        //const { Rows, totalRows, totalPages, page }: any = response.data;

        if(response.data.length > 0){
          console.log("cobranza100")
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
          let dataCollection: any = {
            Rows: rowsNew,
            // totalRows,
            // totalPages,
            page
          };
          dispatch(slice.actions.getCollectionSuccess(dataCollection));
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
          let dataCollection: any = {
            Rows: rowsNew,
            // totalRows,
            // totalPages,
            page
          };
          console.log("137")
          console.log(dataCollection)
          dispatch(slice.actions.getCollectionSuccess(dataCollection));
          dispatch(slice.actions.hasError(null));
        }
        }

      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getCollectionSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addCollection(data: Collection) {
  return async () => {
    try {
      dispatch(slice.actions.loading());
      await dispatch(getCollectionList());
      const Newdata = {
        ...data,
        Discount: data?.Discount || 0,
        DiscountEarliyPay: data?.DiscountEarliyPay || 0,
        Articles: Articles(data?.Articles)
      };

      const response = await axios.post(`${HOST}/collection`, { ...Newdata }, { ...HEADER });
      dispatch(
        openSnackbar({
          open: true,
          message: 'Orden Creada Exitosamente.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(slice.actions.addCollectionSuccess(response.data));
      //window.location.href = `/Collection/view/${response.data.sk}`;
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getIDCollection(id: number) {
  return async () => {
    dispatch(slice.actions.loading());
    try {
      await Promise.all([
        dispatch(resetViewReception()),
        dispatch(resetOrder()),
        dispatch(resetItemsCollection()),
        dispatch(getSupplierList()),
        dispatch(getWarehouseList())
      ]);

      const response = await axios.get(`${HOST}/collection/byid?ID=${id}`, HEADER);
      if (response.data) {
        console.log(response.data)
        let Articles: Article[] = TransformsArticles(response.data?.Articles, response.data?.Products);
        await dispatch(addItemsCollection(Articles));
        dispatch(
          slice.actions.getIDCollectionSuccess({
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

export function editCollection(id: number, data: Collection) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/collection`, { ...data, ID: id }, { ...HEADER });
      if (response) {
        dispatch(getCollectionList());
        dispatch(getIDCollection(id));

        if (data?.Status === 0) {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Orden Actualizada Exitosamente.',
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
              message: 'Orden Enviada Exitosamente.',
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

export function deleteCollection(id: number) {
  return async () => {
    try {

      const response = await axios.delete(`${HOST}/collection`, { ...HEADER, data: { ID: id } });
      if (response) {
        dispatch(getCollectionList());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Orden Cancelada Exitosamente.',
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
export function addItemsCollection(data: Article[]) {
  return async () => {
    try {
      let products = data.filter((item: Article) => item.isSelected === true).map((option: Article) => option);
      dispatch(slice.actions.addDetailsCollectionSuccess(products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function editItemsCollection(data: Article) {
  return async () => {
    try {
      let {
        collection: { order }
      } = store.getState();

      let summaryOrder = summary(data, parseFloat(order?.Discount));

      dispatch(
        slice.actions.editDetailsCollectionSuccess({
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
export function updateSummaryCollection(discount: number) {
  return async () => {
    try {
      let {
        collection: { order }
      } = store.getState();

      let summaryOrder = summary(order?.Articles, discount);
      dispatch(
        slice.actions.getIDCollectionSuccess({
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
export function deleteItemsCollection(id: number) {
  return async () => {
    try {
      let {
        collection: { order, detailsCollection }
      } = store.getState();

      let items: any = detailsCollection.filter((item: Article) => item.ID !== id);

      let summaryOrder = summary(items, parseFloat(order?.Discount));
      let newData: any = {
        ...order,
        ...summaryOrder,
        Articles: items
      };

      dispatch(slice.actions.editDetailsCollectionSuccess(newData));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function resetItemsCollection() {
  return async () => {
    try {
      dispatch(slice.actions.loading());
      dispatch(slice.actions.resetDetailsCollectionSuccess());
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