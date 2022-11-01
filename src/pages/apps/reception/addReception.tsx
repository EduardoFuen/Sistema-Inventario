import { useState, useMemo, useEffect } from 'react';

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

// third-party
import { useFormik, Form, FormikProvider } from 'formik';

import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { addReception } from 'store/reducers/purcharse';
import { Products } from 'types/product-type';
// assets
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';

// types
import { Purchase } from 'types/purchase';

// ==============================|| ADD RECEPTION ||============================== //

export interface PropsSelect {
  onCancel: () => void;
  reception: any;
  product: Products;
}

const AddReceptionLot = ({ onCancel, reception, product }: PropsSelect) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { detailsReption } = useSelector((state) => state.purchase);
  const { listPurchase } = useSelector((state) => state.purchase);
  const dataNew: any = useMemo(() => detailsReption, [detailsReption]);

  const [inputList, setInputList] = useState([{ qtyrequested: '', lot: '', dateExpiration: '', ...product }]);
  const [value, setValue] = useState<Date | null>();
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  useEffect(() => {
    const index = listPurchase.findIndex((item: Purchase) => item.ID === reception.nc);
    if (listPurchase[index] && listPurchase[index].detailsReption && listPurchase[index].detailsReption.length > 0) {
      let data = listPurchase[index].detailsReption
        .filter((e: any) => e !== undefined && e !== null && e !== '' && e.name === product?.Name)
        .map((item: any) => ({
          qtyrequested: '',
          lot: '',
          dateExpiration: '',
          ...item
        }));
      if (data.length > 0) {
        setInputList(data);
        window.localStorage.setItem('farmu-productsDetails', JSON.stringify(data));
      }
    }
  }, [reception, product, listPurchase]);

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { qtyrequested: '', lot: '', dateExpiration: '', ...product }]);
  };

  const formik = useFormik({
    initialValues: {
      missingQuantity: dataNew?.missingQuantity || '',
      returnQuantity: dataNew?.returnQuantity || '',
      reasonReturn: dataNew?.reasonReturn || ''
    },
    onSubmit: (values, { setSubmitting }) => {
      try {
        const newValue = {
          ...values,
          ...reception,
          detailsReption: inputList
        };
        dispatch(addReception(newValue));
        dispatch(
          openSnackbar({
            open: true,
            message: 'Recepción confirmada',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        onCancel();

        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  // handle input change
  const handleInputChange = (e: any, index: number) => {
    const list: any = [...inputList];
    if (e.target) {
      const { name, value } = e.target;
      if (name === 'qtyrequested') {
        list[index]['qtyrequested'] = value;
      }
      if (name === 'lot') {
        list[index]['lot'] = value;
      }

      setInputList(list);
    } else {
      list[index]['dateExpiration'] = e;
    }
  };

  return (
    <ScrollX>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                      InputProps={{ inputProps: { min: 0 } }}
                      placeholder="Ingresar Cantidad Faltantes"
                      fullWidth
                      {...getFieldProps('missingQuantity')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Devolución</InputLabel>
                    <TextField
                      sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      placeholder="Ingresar Cantidad Devolución"
                      fullWidth
                      {...getFieldProps('returnQuantity')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Motivo Devolución</InputLabel>
                    <TextField placeholder="Seleccionar Tipo Producto" fullWidth select {...getFieldProps('reasonReturn')}>
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
                  {inputList.map((x: any, i: number) => {
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
                            InputProps={{ inputProps: { min: 0 } }}
                            placeholder="Ingresar Cantidad"
                            fullWidth
                            name="qtyrequested"
                            value={x.qtyrequested}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Lote</InputLabel>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            onChange={(e) => handleInputChange(e, i)}
                            placeholder="Ingresar Lote"
                            fullWidth
                            name="lot"
                            value={x.lot}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Vencimiento</InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              label=""
                              inputFormat="MM/dd/yyyy"
                              value={value || x.dateExpiration}
                              onChange={(value: any) => {
                                handleInputChange(value, i);
                                handleChange(value);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2} alignItems="end" alignSelf="center">
                          <Tooltip title="Delete">
                            <IconButton
                              /*   disabled={inputList?.length <= 1} */
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
                    <Button variant="contained" type="submit" disabled={isSubmitting}>
                      Confirmar
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </MainCard>
        </Form>
      </FormikProvider>
    </ScrollX>
  );
};

export default AddReceptionLot;
