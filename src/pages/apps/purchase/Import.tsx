import { useState } from 'react';

// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addItemsPurchase } from 'store/reducers/purcharse';
import { useDispatch, useSelector } from 'store';
import ImportToFile from 'components/ImportToFile';
import { SearchNameToArray } from 'utils/findName';

// ==============================|| PURCHASE PRODUCT IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const Import = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const { products } = useSelector((state) => state.product);

  const onSubmit = () => {
    try {
      const newData = data?.map((item: any) => {
        let TotalDiscountNegotiated = Number((100 - item?.DiscountNegotiated) / 100);
        let SubTotal = item?.Quantity * item?.BasePrice * TotalDiscountNegotiated || 0;
        let Tax = Number.parseFloat(item?.Tax) || 0;
        let Total = SubTotal + (item?.Quantity * item?.BasePrice * Tax) / 100 || 0;

        return {
          ProductID: SearchNameToArray(products, item?.Sku || item?.Ean || item?.Name)?.ID || 0,
          Sku: item?.Sku,
          Ean: item?.Ean,
          ID: SearchNameToArray(products, item?.Sku || item?.Ean || item?.Name)?.ID || 0,
          Name: SearchNameToArray(products, item?.Sku || item?.Ean || item?.Name)?.Name || '',
          isSelected: true,
          Count: Number(item?.Quantity || 0),
          BasePrice: Number.parseFloat(item?.BasePrice) || 0,
          DiscountNegotiated: Number.parseFloat(item?.DiscountNegotiated) || 0,
          DiscountAdditional: Number.parseFloat(item?.DiscountAdditional) || 0,
          Bonus: Number(item?.Bonus) || 0,
          SubTotal,
          Tax,
          Total
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
