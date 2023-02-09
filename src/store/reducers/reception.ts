// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'axios';
import { HOST, HEADER } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { ReceptionStateProps, reception } from 'types/reception';

// initial state
const initialState: ReceptionStateProps = {
  error: null,
  reception: {},
  isLoading: false,
  receptionAll: []
};

// ==============================||  RECEPCION  REDUCER ||============================== //

const slice = createSlice({
  name: 'reception',
  initialState,
  reducers: {
    // loader
    loading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    hasReset(state) {
      state.reception = {};
      state.error = null;
      state.isLoading = false;
    },
    // GET ID ARTICLE
    getIDArticleSuccess(state, action) {
      state.reception = action.payload;
      state.isLoading = false;
    },
    // GET ALL RECEPTION
    getAllReceptionSuccess(state, action) {
      state.receptionAll = action.payload;
      state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getAllReception() {
  return async () => {
    dispatch(slice.actions.hasReset());
    try {
      const response = await axios.get(`${HOST}/reception`, HEADER);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getAllReceptionSuccess(response.data));
      }
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getByArticleId(id: number) {
  return async () => {
    dispatch(slice.actions.hasReset());
    try {
      const response = await axios.get(`${HOST}/reception?ArticleID=${id}`, HEADER);
      let data: any = response.data.map((item: any) => ({
        ...item,
        CountItemReception: item?.Count
      }));

      const TotalItemsCountReception = data.reduce((accumulator: any, obj: any) => accumulator + obj.CountItemReception, 0);

      let dataResponse: any = {
        Missing: data[0].Missing,
        Refund: data[0].Refund,
        Reason: data[0].Reason,
        Articles: data,
        TotalItemsCountReception,
        ArticleID: id
      };

      dispatch(slice.actions.getIDArticleSuccess(dataResponse));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function AddRecepctionArticles(data: any, id: number) {
  return async () => {
    try {
      let newData: any = await Promise.all(
        data?.Articles.filter((item: reception) => !item.ID).map(async (item: reception) => ({
          Reason: Number(data?.Reason),
          Refund: Number(data?.Refund),
          Missing: Number(data?.Missing),
          Batch: item.Batch,
          Count: Number(item?.Count),
          Date: item.Date,
          ArticleID: id
        }))
      );
      const response = await axios.post(`${HOST}/reception`, newData, { ...HEADER });
      if (response.data.length > 0) {
        dispatch(getAllReception());
        await dispatch(getByArticleId(id));
      }
    } catch (error: any) {
      if (
        error?.response?.data?.Error?.trim() ===
          'ProductoId() Bodega(Barranquilla): error:hubo un error en la peticion seguramente este ProductId no corresponde a la bodega' ||
        error?.response?.data?.Error?.trim() ===
          'ProductoId(CJS9UM8V) Bodega(Bogotá): error:hubo un error en la peticion seguramente este ProductId no corresponde a la bodega'
      ) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'El producto a ingresa a Shopify le falta handlea o ID´S',
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      }
      dispatch(slice.actions.hasError(error?.response?.data));
    }
  };
}

export function deleteItemsRecepction(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/reception`, { ...HEADER, data: { ID: id } });
      if (response) {
        dispatch(getAllReception());
        await dispatch(getByArticleId(id));
      }
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetViewReception() {
  return async () => {
    try {
      dispatch(slice.actions.hasReset());
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
