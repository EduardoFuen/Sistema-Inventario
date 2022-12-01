// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'axios';
import { HOST } from 'config';
import { dispatch } from '../index';

// types
import { ReceptionStateProps } from 'types/reception';

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
      const response = await axios.get(`${HOST}/recepcion`);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getAllReceptionSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getByArticleId(id: number) {
  return async () => {
    dispatch(slice.actions.hasReset());
    try {
      const response = await axios.get(`${HOST}/recepcion?ArticleID=${id}`);
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
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createRecepctionArticles(data: any) {
  return async () => {
    try {
      let newData: any = data.map((item: any) => ({
        ArticleID: item.ID,
        Missing: 0,
        Refund: 0,
        Reason: 0,
        Count: 0,
        Batch: '',
        Date: new Date()
      }));
      const response = await axios.post(`${HOST}/recepcion`, newData);
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function UpdateRecepctionArticles(data: any, id: number) {
  return async () => {
    try {
      let newData: any = data?.Articles.map((item: any) => ({
        Reason: Number(data?.Reason),
        Refund: Number(data?.Refund),
        Missing: Number(data?.Missing),
        Batch: item.Batch,
        Count: Number(item?.CountItemReception),
        ID: item?.ID || 0,
        Date: item.Date,
        ArticleID: id
      }));

      const response = await axios.post(`${HOST}/recepcion`, newData);
      if (response.data && id) {
        dispatch(getAllReception());
        await dispatch(getByArticleId(id));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteItemsRecepction(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/recepcion`, { data: { ID: id } });
      if (response.data) {
        await dispatch(getByArticleId(id));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetViewReception() {
  return async () => {
    try {
      dispatch(slice.actions.hasReset());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
