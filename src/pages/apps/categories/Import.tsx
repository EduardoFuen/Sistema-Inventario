import { useState } from 'react';
import { useDispatch } from 'react-redux';
// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addExcel } from 'store/reducers/category';

import ImportToFile from 'components/ImportToFile';

// ==============================|| PACK IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
  value: number;
}

const ImportPack = ({ onCancel, value }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const onSubmit = () => {
    try {
      let newData: any;

      switch (value) {
        case 0:
          newData = data.map((item: any) => ({
            Name: item?.Name,
            Status: item?.Status
          }));
          break;
        case 1:
          newData = data.map((item: any) => ({
            Name: item?.Name,
            CategoryOneID: item?.category1,
            Status: item?.Status
          }));
          break;

        default:
          newData = data.map((item: any) => ({
            Name: item?.Name,
            CategoryOneID: item?.CategoryOneID,
            CategoryTwoID: item?.CategoryTwoID,
            Status: item?.status
          }));
          break;
      }

      dispatch(addExcel(newData, value));
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

export default ImportPack;
