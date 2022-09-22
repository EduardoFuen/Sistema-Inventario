import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Grid,
  DialogContent,
  DialogActions,
  DialogTitle,
  Stack,
  InputLabel,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
  Divider
} from '@mui/material';

import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { useDispatch } from 'store';
// import { useSelector, useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';

// ==============================|| SELECT PRODUCT - LIST VIEW ||============================== //

export interface PropsSelect {
  onCancel: () => void;
}

const AddSelectProduct = ({ onCancel }: PropsSelect) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [inputList, setInputList] = useState([{ qty: '', lot: '', dateExpiration: '' }]);
  const [value, setValue] = useState<Date | null>();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  // handle input change
  const handleInputChange = (e: any, index: number) => {
    const list = [...inputList];
    if (e.target) {
      const { name, value } = e.target;
      if (name === 'qty') {
        list[index]['qty'] = value;
      }
      if (name === 'lot') {
        list[index]['lot'] = value;
      }

      setInputList(list);
    } else {
      list[index]['dateExpiration'] = e;
    }
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { qty: '', lot: '', dateExpiration: '' }]);
  };

  return (
    <ScrollX>
      <Grid container alignItems="center">
        <Grid item xs={4} alignSelf="center">
          <DialogTitle>Recepción de productos</DialogTitle>
        </Grid>
      </Grid>
      <MainCard content={false}>
        <DialogContent sx={{ p: 2.5 }}>
          <Grid container direction="row" spacing={2}>
            <Stack direction="row" justifyContent="end" spacing={2} alignItems="end" sx={{ p: 3 }}>
              <Grid item xs={4}>
                <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Faltantes</InputLabel>
                <TextField
                  sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                  type="number"
                  placeholder="Ingresar Cantidad Faltantes"
                  fullWidth
                  name="cantidad"
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Devolución</InputLabel>
                <TextField
                  sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                  type="number"
                  placeholder="Ingresar Cantidad Devolución"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Motivo Devolución</InputLabel>
                <TextField
                  placeholder="Seleccionar Tipo Producto"
                  /*    {...getFieldProps('type_product')}
                        error={Boolean(touched.type_product && errors.type_product)}
                        helperText={touched.type_product && errors.type_product} */
                  fullWidth
                  select
                >
                  <MenuItem value="Mal Estado">Mal Estado</MenuItem>
                  <MenuItem value="Fecha Corta">Fecha Corta</MenuItem>
                  <MenuItem value="Excedente">Excedente</MenuItem>
                </TextField>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <MainCard>
              <Stack direction="row" justifyContent="end" spacing={2} alignItems="end" sx={{ p: 1 }}>
                <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAddClick}>
                  Agregar
                </Button>
                <Divider />
              </Stack>
              {inputList.map((x, i) => {
                return (
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    key={i}
                    style={{
                      marginTop: 10
                    }}
                  >
                    <Grid item xs={3}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Cantidad</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        type="number"
                        placeholder="Ingresar Cantidad"
                        fullWidth
                        name="qty"
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Lote</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        onChange={(e) => handleInputChange(e, i)}
                        type="number"
                        placeholder="Ingresar Lote"
                        fullWidth
                        name="lot"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Vencimiento</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label=""
                          /*  name="dateExpiration" */
                          inputFormat="MM/dd/yyyy"
                          /*    {...getFieldProps('date')} */
                          value={value}
                          onChange={(value: any) => {
                            handleChange(value);
                            handleInputChange(value, i);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        {/*  {touched.date && errors.date && (
                          <FormHelperText error id="personal-supplier-helper">
                            {errors.date}
                          </FormHelperText>
                        )} */}
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2} alignItems="end" alignSelf="center">
                      <Tooltip title="Delete">
                        <IconButton
                          disabled={inputList.length === 0}
                          color="secondary"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            handleRemoveClick(i);
                          }}
                        >
                          <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                );
              })}
            </MainCard>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Grid container justifyContent="end" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="end">
                <Button color="error" onClick={onCancel}>
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    onCancel();
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'Transferencia ok',
                        variant: 'alert',
                        alert: {
                          color: 'success'
                        },
                        close: false
                      })
                    );
                  }}
                >
                  Confirmar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </MainCard>
    </ScrollX>
  );
};

export default AddSelectProduct;
