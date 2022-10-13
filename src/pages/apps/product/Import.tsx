import { useState } from 'react';
// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addExcel } from 'store/reducers/product';

import ImportToFile from 'components/ImportToFile';
import { useDispatch, useSelector } from 'store';
import { searchName } from 'utils/findName';
// ==============================|| PRODUCT IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const Import = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const { makerList } = useSelector((state) => state.maker);
  const { tradeMarkList } = useSelector((state) => state.trademaker);
  const { packList } = useSelector((state) => state.pack);
  const { typeProductList } = useSelector((state) => state.typeProduct);
  const { categoryListThree, categoryListOne, categoryListTwo } = useSelector((state) => state.category);

  const onSubmit = () => {
    try {
      const newData = data.map((item: any) => ({
        Name: item?.Name,
        Sku: item?.Sku.toString(),
        Ean: item?.Ean.toString(),
        MakerID: searchName(makerList, item?.Maker)?.ID.toString() || '0',
        TrademarkID: searchName(tradeMarkList, item?.Trademark)?.ID.toString() || '0',
        TypesProductID: searchName(typeProductList, item?.Type_Product)?.ID.toString() || '0',
        Variation: item?.Variation.toString(),
        CategoryOneID: searchName(categoryListOne, item?.CategoryOne)?.ID.toString() || '0',
        CategoryTwoID: searchName(categoryListTwo, item?.CategoryTwo)?.ID.toString() || '0',
        CategoryThreeID: searchName(categoryListThree, item?.CategoryThree)?.ID.toString() || '0',
        PackID: searchName(packList, item?.Pack)?.ID.toString() || '0',
        Quantity: item?.Quantity.toString(),
        MakerUnit: item?.MakerUnit.toString(),
        Weight: item?.Weight.toString(),
        Width: item?.Width.toString(),
        Height: item?.Height.toString(),
        Depth: item?.Depth.toString(),
        PackInfo: item?.PackInfo,

        WrapperUnit: item?.WrapperUnit,
        Keywords: item?.Keywords,
        Warehouse: item?.Warehouse,
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
