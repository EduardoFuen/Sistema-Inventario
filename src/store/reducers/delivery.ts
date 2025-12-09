// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST, HEADER } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types

import { Delivery, DeliveryStateProps } from 'types/delivery';

// initial state
const initialState: DeliveryStateProps = {
  error: null,
  deliveryList: [],
};

// ==============================||  SUPPLIER  REDUCER ||============================== //

const slice = createSlice({
  name: 'Delivery',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET SUPPLIERS
    getDeliverySucces(state, action) {
      state.deliveryList = action.payload;
    },
    // ADD SUPPLIER
    addDeliverysucces(state, action) {
      state.deliveryList.push(action.payload);
    },
    // UPDATE SUPPLIER
    updateDeliverySucces(state, action) {
      const index = state.deliveryList.findIndex((item) => item.ID === action.payload?.ID);
      state.deliveryList[index] = action.payload;
    },
    //ADD EXCEL SUPPLIER
    excelSuccess(state, action) {
      state.deliveryList = [...state.deliveryList, ...action.payload];
    },
  }
});
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getDeliveryList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/delivery`, HEADER);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getDeliverySucces(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getDeliverySucces([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function createDelivery(data: Delivery) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/delivery`, { ...data }, { ...HEADER });
      dispatch(slice.actions.addDeliverysucces(response.data));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editDelivery(id: number, data: Delivery) {
  return async () => {
    try {
      const response = await axios.put(`${HOST}/delivery`, { ID: id, ...data }, { ...HEADER });
      dispatch(slice.actions.updateDeliverySucces(response.data));
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteDelivery(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/delivery`, { ...HEADER, data: { ID: id } });
      if (response) {
        dispatch(getDeliveryList());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Delivery eliminado satisfactoriamente.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteUser(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/delivery`, { ...HEADER, data: { ID: id } });
      if (response) {
        dispatch(getDeliveryList());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Delivery eliminado satisfactoriamente.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addExcel(data: Delivery[]) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/delivery`, data, { ...HEADER });
      dispatch(slice.actions.excelSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Delivery Importado satisfactoriamente',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
