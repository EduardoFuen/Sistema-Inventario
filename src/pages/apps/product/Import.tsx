import { useState } from 'react';
// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addExcel } from 'store/reducers/product';

import ImportToFile from 'components/ImportToFile';
import { useDispatch, useSelector } from 'store';
import { SearchNameToArray } from 'utils/findName';
import { ConvertToArray } from 'utils/convertStringToArray';

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
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { todoListSubs } = useSelector((state) => state.substances);
  const { products } = useSelector((state) => state.product);

  const onSubmit = () => {
    try {
      const newData = data.map((item: any) => {
        return {
          Name: item?.Name,
          Sku: item?.Sku.toString(),
          Ean: item?.Ean.toString(),
          MakerID: SearchNameToArray(makerList, item?.Maker)?.ID.toString() || '',
          TrademarkID: SearchNameToArray(tradeMarkList, item?.Trademark)?.ID.toString() || '',
          TypesProductID: SearchNameToArray(typeProductList, item?.Type_Product)?.ID.toString() || '',
          Variation: item?.Variation?.toString(),
          CategoryOneID: SearchNameToArray(categoryListOne, item?.CategoryOne)?.ID.toString() || '',
          CategoryTwoID: SearchNameToArray(categoryListTwo, item?.CategoryTwo)?.ID.toString() || '',
          CategoryThreeID: SearchNameToArray(categoryListThree, item?.CategoryThree)?.ID.toString() || '',
          PackID: SearchNameToArray(packList, item?.Pack)?.ID.toString() || '',
          Quantity: item?.Quantity?.toString(),
          MakerUnit: item?.MakerUnit?.toString(),
          Weight: item?.Weight?.toString(),
          Width: item?.Width?.toString(),
          Height: item?.Height?.toString(),
          Depth: item?.Depth?.toString(),
          Wrapper: item?.PackInfo,
          WrapperUnit: item?.WrapperUnit,
          Keywords: item?.Keywords,
          SubstancesIDS: ConvertToArray(item?.Substance, todoListSubs) || '',
          WarehouseIDS: ConvertToArray(item?.Warehouse, warehouseList) || '',
          SubstitutesIDS: ConvertToArray(item?.Substitutes, products) || '',
          Status: item?.Status,
          iva: item?.Tax?.toString(),
          Taxed: item?.IsTaxed
        };
      });

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
