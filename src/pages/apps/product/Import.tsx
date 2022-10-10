import { useState } from 'react';
import { useDispatch } from 'react-redux';
// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addExcel } from 'store/reducers/product';

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
      const newData = data.map((item: any) => ({
        Name: item?.Name,
        Sku: item?.Sku,
        Ean: item?.Ean,
        Maker: item?.Maker,
        Trademark: item?.Trademark,
        TypeProduct: item?.TypeProduct,
        Variation: item?.Variation,
        CategoryOne: item?.CategoryOne,
        CategoryTwo: item?.CategoryTwo,
        CategoryThree: item?.CategoryThree,
        Pack: item?.Wrapper,
        Quantity: item?.Quantity,
        MakerUnit: item?.MakerUnit,
        Weight: item?.Weight,
        Width: item?.Width,
        PackInfo: item?.PackInfo,
        Height: item?.Height,
        WrapperUnit: item?.WrapperUnit,
        Depth: item?.Depth,
        Substances: item?.Substances,
        Keywords: item?.Keywords,
        Substitutes: item?.Substitutes,
        Warehouse: item?.Warehouse,
        UrlImage: item?.UrlImage,
        Status: item?.Status,
        Tax: item?.Tax,
        IsTaxed: item?.IsTaxed
      }));
      dispatch(addExcel(newData));
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
