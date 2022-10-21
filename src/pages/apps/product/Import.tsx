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
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { todoListSubs } = useSelector((state) => state.substances);

  const onSubmit = () => {
    try {
      const newData = data.map((item: any) => {
        let warehouseIDS: any = [];
        let SubstanceIDS: any = [];

        const warehouseArray: any = item?.Warehouse?.split(',');
        if (warehouseArray.length > 0) {
          warehouseArray.map((item: string) => warehouseIDS.push(searchName(warehouseList, item)?.ID?.toString()));
        }

        const substanceArray: any = item?.Substance?.split(',');
        if (substanceArray.length > 0) {
          substanceArray.map((item: string) => SubstanceIDS.push(searchName(todoListSubs, item)?.ID?.toString()));
        }

        return {
          Name: item?.Name,
          Sku: item?.Sku.toString(),
          Ean: item?.Ean.toString(),
          MakerID: searchName(makerList, item?.Maker)?.ID.toString() || '',
          TrademarkID: searchName(tradeMarkList, item?.Trademark)?.ID.toString() || '',
          TypesProductID: searchName(typeProductList, item?.Type_Product)?.ID.toString() || '',
          Variation: item?.Variation?.toString(),
          CategoryOneID: searchName(categoryListOne, item?.CategoryOne)?.ID.toString() || '',
          CategoryTwoID: searchName(categoryListTwo, item?.CategoryTwo)?.ID.toString() || '',
          CategoryThreeID: searchName(categoryListThree, item?.CategoryThree)?.ID.toString() || '',
          PackID: searchName(packList, item?.Pack)?.ID.toString() || '',
          Quantity: item?.Quantity?.toString(),
          MakerUnit: item?.MakerUnit?.toString(),
          Weight: item?.Weight?.toString(),
          Width: item?.Width?.toString(),
          Height: item?.Height?.toString(),
          Depth: item?.Depth?.toString(),
          Wrapper: item?.PackInfo,
          WrapperUnit: item?.WrapperUnit,
          Keywords: item?.Keywords,
          SubstancesIDS: SubstanceIDS?.toString() || '',
          WarehouseIDS: warehouseIDS?.toString() || '',
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
