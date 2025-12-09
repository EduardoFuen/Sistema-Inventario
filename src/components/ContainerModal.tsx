import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ImportToFile from 'components/ImportToFile';

// ==============================|| CONTAINER MODAL IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
  setData: any;
  onSubmit: () => void;
  data: any;
  Submitting: boolean;
  isLoading: boolean;
}

const ContainerModalImport = ({ onCancel, onSubmit, setData, data, Submitting, isLoading }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DialogTitle>Importar Archivo</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2.5 }}>
        <Grid container spacing={3}>
          {!isLoading && isLoading !== null && (
            <Grid
              item
              xs={12}
              md={12}
              justifyContent="center"
              alignItems="center"
              style={{
                textAlign: 'center',
                zIndex: 2
              }}
            >
              <CircularProgress color="success" size={100} />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={12}
            style={{
              display: (isLoading === null && 'block') || (isLoading ? 'block' : 'none')
            }}
          >
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
              <Button type="submit" variant="contained" onClick={onSubmit} disabled={data.length < 0 || Submitting}>
                Confirmar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogActions>
    </LocalizationProvider>
  );
};
ContainerModalImport.defaultProps = {
  Submitting: false,
  isLoading: null
};

export default ContainerModalImport;
