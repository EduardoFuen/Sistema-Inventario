// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST, HEADER } from 'config';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// types
import { SupplierStateProps, Supplier } from 'types/supplier';

// initial state
const initialState: SupplierStateProps = {
  error: null,
  supplierList: [],
};

// ==============================||  SUPPLIER  REDUCER ||============================== //

const slice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET SUPPLIERS
    getSupplierSuccess(state, action) {
      state.supplierList = action.payload;
    },
    // ADD SUPPLIER
    addSupplierSuccess(state, action) {
      state.supplierList.push(action.payload);
    },
    // UPDATE SUPPLIER
    updateSupplierSuccess(state, action) {
      const index = state.supplierList.findIndex((item) => (item.ID === action.payload?.ID) || (item.sk === action.payload?.sk));
      if (index !== -1) {
        state.supplierList[index] = action.payload;
      }
    },
    //ADD EXCEL SUPPLIER
    excelSuccess(state, action) {
      state.supplierList = [...state.supplierList, ...action.payload];
    },
  }
});
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getSupplierList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/supplier`, HEADER);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getSupplierSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getSupplierSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function createSupplier(data: Supplier) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/supplier`, { ...data }, { ...HEADER });
      dispatch(slice.actions.addSupplierSuccess(response.data));
    } catch (error: any) {
      // Log detallado para diagnóstico
      console.error('Error al crear proveedor:', error?.response?.data || error?.message);
      console.error('Status:', error?.response?.status);
      console.error('Detalle:', JSON.stringify(error?.response?.data, null, 2));
      dispatch(slice.actions.hasError(error?.response?.data?.message || error?.message));
    }
  };
}

export function editSupplier(sk: string | number, data: any, originalId?: string | number) {
  return async () => {
    try {
      const numericId = originalId !== undefined ? Number(originalId) : Number(sk);

      const payload = {
        sk: String(sk),
        ID: numericId,
        BusinessName: data.BusinessName || '',
        NameContact: data.Vendedor || data.NameContact || '',
        PhoneContact: String(data.PhoneContact || ''),
        EmailContact: data.EmailContact || '',
        Nit: data.Nit || '',
        Rif: data.Rif || '',
        PaymenTerm: data.PaymenTerm || '',
        DaysPayment: data.DaysPayment || '',
        Contribuyente: data.Contribuyente || '',
        Zona: data.Zona || '',
        ZonaDes: data.ZonaDes || '',
        DesT: data.DesT || '',
        LeadTimeBog: Number(data.LeadTimeBog) || 0,
        LeadTimeBaq: Number(data.LeadTimeBaq) || 0,
        Discount: Number(data.Discount) || 0,
        Cupo: Number(data.Cupo) || 0,
        Status: Boolean(data.Status),
      };

      console.log('Edit payload (PUT):', JSON.stringify(payload, null, 2));
      const response = await axios.put(`${HOST}/supplier`, payload, { ...HEADER });
      console.log('Edit response:', JSON.stringify(response.data, null, 2));
      
      dispatch(getSupplierList());
    } catch (error: any) {
      console.error('Error al editar proveedor:', error?.response?.data || error?.message);
      console.error('Status:', error?.response?.status);
      console.error('Detalle:', JSON.stringify(error?.response?.data, null, 2));
      dispatch(slice.actions.hasError(error?.response?.data?.message || error?.message));
    }
  };
}

export function deleteSupplier(id: number) {
  return async () => {
    try {
      const response = await axios.delete(`${HOST}/supplier`, { ...HEADER, data: { ID: id } });
      if (response) {
        dispatch(getSupplierList());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Proveedor delete successfully.',
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
      const response = await axios.delete(`${HOST}/supplier`, { ...HEADER, data: { ID: id } });
      if (response) {
        dispatch(getSupplierList());
        dispatch(
          openSnackbar({
            open: true,
            message: 'Proveedor delete successfully.',
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

export function addExcel(data: Supplier[]) {
  return async () => {
    try {
      const response = await axios.post(`${HOST}/supplier`, data, { ...HEADER });
      dispatch(slice.actions.excelSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Importado Proveedores successfully',
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
