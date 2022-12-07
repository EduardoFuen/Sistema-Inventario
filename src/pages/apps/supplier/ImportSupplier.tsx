import { useState } from 'react';
import { useDispatch } from 'react-redux';
// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addExcel } from 'store/reducers/supplier';

import ImportToFile from 'components/ImportToFile';

// ==============================|| SUPPLIER IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const ImporSupplier = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const onSubmit = async () => {
    try {
      const newData = data?.map((item: any) => ({
        EmailContact: item?.EmailContact?.toString(),
        Nit: item?.Nit?.toString(),
        BusinessName: item?.BusinessName,
        PhoneContact: item?.PhoneContact?.toString(),
        Status: Boolean(item?.Status),
        PaymenTerm: item?.PaymenTerm?.toString(),
        leadTimeBaq: Number(item?.leadTimeBaq),
        LeadTimeBog: Number(item?.LeadTimeBog),
        Discount: Number(item?.Discount) || 0,
        DaysPayment: item?.DaysPayment?.toString(),
        Cupo: Number(item?.Cupo) || 0,
        NameContact: item?.NameContact?.toString(),
        ID: item?.ID || 0
      }));
      await dispatch(addExcel(newData));
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
