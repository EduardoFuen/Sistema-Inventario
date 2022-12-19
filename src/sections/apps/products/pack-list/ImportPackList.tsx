import { useState } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addExcel } from 'store/reducers/pack';
import ImportToFile from 'components/ImportToFile';
import { filter } from 'lodash';
import getStatus from 'utils/getStatus';

// types
import { Packs } from 'types/products';

// ==============================|| PACK IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const ImportPack = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const onSubmit = async () => {
    try {
      const newData = data;
      filter((item: Packs) => item.ID !== '').map((item: Packs) => ({
        Name: item?.Name?.toString(),
        Status: item?.Status ? getStatus(item?.Status) : false,
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

export default ImportPack;
