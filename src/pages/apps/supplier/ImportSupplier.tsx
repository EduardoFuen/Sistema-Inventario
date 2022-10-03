import { useState } from 'react';
import { useDispatch } from 'react-redux';
// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { openSnackbar } from 'store/reducers/snackbar';
import { addExcel } from 'store/reducers/supplier';

import ImportToFile from 'components/ImportToFile';

// ==============================|| SUPPLIER IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const ImporSupplier = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const onSubmit = () => {
    try {
      const newData = data.map((item: any) => ({
        EmailContact: item?.email,
        Nit: item?.nit,
        BusinessName: item?.businessName,
        PhoneContact: item?.phone,
        Status: item?.status,
        LeadTimeBog: item?.leadTimeBog,
        LeadTimeBaq: item?.paymenTerm,
        leadTimeBaq: item?.leadTimeBaq,
        Discount: item?.discount,
        DaysPayment: item?.daysPayment,
        Cupo: item?.cupo,
        NameContact: item?.name
      }));
      dispatch(addExcel(newData));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Proveedor add successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );

      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DialogTitle>Importar Registro</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2.5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <ImportToFile setData={setData} />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Grid container justifyContent="right" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button color="error" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" onClick={onSubmit} disabled={data.length < 0}>
                Confirmar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogActions>
    </LocalizationProvider>
  );
};

export default ImporSupplier;
