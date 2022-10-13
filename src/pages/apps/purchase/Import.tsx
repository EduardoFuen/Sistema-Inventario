import { useState } from 'react';
import { useDispatch } from 'react-redux';
// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addItemsPurchase } from 'store/reducers/purcharse';

import ImportToFile from 'components/ImportToFile';

// ==============================|| PRODUCT IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const Import = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const onSubmit = () => {
    try {
      const newData = data.map((item: any) => {
        let SubTotal = item?.Quantity * item?.Price * ((100 - item?.NegotiatedDiscount) / 100) || 0;
        return {
          Name: item?.Name,
          ID: item?.ID,
          Sku: item?.Sku,
          Ean: item?.Ean,
          isSelected: true,
          Qty: item?.Quantity,
          Price: item?.Price,
          Tax: item?.IVA,
          NegotiatedDiscount: item?.NegotiatedDiscount,
          AdditionalDiscount: item?.AdditionalDiscount,
          Bonus: item?.Bonus,
          SubTotal,
          Total: SubTotal + (item?.Quantity * item?.Price * item?.IVA) / 100
        };
      });
      let detailsPurchase = newData.filter((element: any, index: number) => {
        return newData.indexOf(element) === index;
      });
      dispatch(addItemsPurchase(detailsPurchase));
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

export default Import;
