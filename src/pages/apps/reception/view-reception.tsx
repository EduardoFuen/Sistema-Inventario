import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { Chance } from 'chance';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// material-ui
import { Button, Grid, InputLabel, Stack, TextField, Typography, Autocomplete, MenuItem, Dialog, FormHelperText } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project import
import { useSelector, useDispatch } from 'store';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { addPurchase, resetItemsPurchase } from 'store/reducers/purcharse';

import AddSelectProduct from './addReception';
import DetailsReception from './detailsProduct';

// ==============================|| ADD VIEW RECEPTION - MAIN ||============================== //

const getInitialValues = (recep: FormikValues | null) => {
  const newSubstance = {
    priceP: '',
    dateP: '',
    note: '',
    date: '',
    create_order: recep?.create_order,
    discount: recep?.discount,
    supplier: recep?.supplier,
    warehouse: recep?.warehouse,
    nFactura: '',
    dateFact: '',
    dateLeadTimeBog: format(addDays(new Date(), recep?.supplier.leadTimeBog), 'dd-MM-yyyy'),
    dateLeadTimeBaq: format(addDays(new Date(), recep?.supplier.leadTimeBaq), 'dd-MM-yyyy')
  };
  return newSubstance;
};

function AddReception() {
  const history = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [add, setAdd] = useState<boolean>(false);
  const [value, setValue] = useState<Date | null>();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  const handleAdd = () => {
    setAdd(!add);
  };

  const { supplierList } = useSelector((state) => state.supplier);
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { detailsPurchase } = useSelector((state) => state.purchase);
  const { listPurchase } = useSelector((state) => state.purchase);

  useMemo(() => dispatch(resetItemsPurchase()), [dispatch]);

  const reception = useMemo(() => {
    if (id) {
      return listPurchase.find((item) => item.nc === id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/reception`);
  };

  const SubstSchema = Yup.object().shape({
    nFactura: Yup.string().max(255).required('Numero de Factura es requerido')
  });

  const formik = useFormik({
    initialValues: getInitialValues(reception!),
    validationSchema: SubstSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        const chance = new Chance();

        const newValue = {
          nc: chance.zip(),
          ...values
        };
        dispatch(addPurchase(newValue));
        dispatch(
          openSnackbar({
            open: true,
            message: 'Orden Recibida successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        history(`/reception`);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <MainCard>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Detalles de la compra
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={2} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Proveedor</InputLabel>
                      <Autocomplete
                        id="supplier-list"
                        options={supplierList.filter((item: any) => item.status === true)}
                        getOptionLabel={(option) => option.businessName}
                        onChange={(event, newValue) => {
                          setFieldValue('supplier', newValue === null ? '' : newValue);
                        }}
                        disabled
                        value={reception?.supplier}
                        renderInput={(params) => <TextField {...params} placeholder="" />}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            p: 0.5
                          },
                          '& .MuiAutocomplete-tag': {
                            bgcolor: 'primary.lighter',
                            border: '1px solid',
                            borderColor: 'primary.light',
                            '& .MuiSvgIcon-root': {
                              color: 'primary.main',
                              '&:hover': {
                                color: 'primary.dark'
                              }
                            }
                          }
                        }}
                      />
                      {touched.supplier && errors.supplier && (
                        <FormHelperText error id="personal-supplier-helper">
                          {errors.supplier}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={2} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Bodega</InputLabel>
                      <TextField placeholder="Seleccionar Bodega" fullWidth disabled select {...getFieldProps('warehouse')}>
                        {warehouseList
                          .filter((item: any) => item.status === true)
                          .map((option: any) => (
                            <MenuItem key={option.name} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={2} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento</InputLabel>
                      <TextField
                        disabled
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('discount')}
                        placeholder="Ingresa Descuento %"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={2} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Orden</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('create_order')}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>
                        Fecha Estimada para <br /> Bodega Bogota
                      </InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('dateLeadTimeBog')}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>
                        Fecha Estimada para <br />
                        Bodega Barranquilla
                      </InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('dateLeadTimeBaq')}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Recibo</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('create_order')}
                        fullWidth
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    style={{
                      marginTop: 20
                    }}
                  >
                    <Grid item xs={3}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Notas</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        multiline
                        rows={2}
                        placeholder="Ingresar Nota de compras"
                        fullWidth
                        {...getFieldProps('note')}
                      />
                    </Grid>
                    <Grid item xs={2} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento pronto Pago</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('priceP')}
                        placeholder="Descuento pronto Pago %"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={2} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Pronto Pago</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('create_order')}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5, textAlign: 'center' }}>Fecha Vencimiento Factura</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label=""
                          /*  name="dateExpiration" */
                          inputFormat="MM/dd/yyyy"
                          /*    {...getFieldProps('date')} */
                          value={value}
                          onChange={(value: any) => {
                            handleChange(value);
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
                    <Grid item xs={2} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Numero de Factura</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('nFactura')}
                        fullWidth
                        error={Boolean(touched.nFactura && errors.nFactura)}
                        helperText={touched.nFactura && errors.nFactura}
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <DetailsReception products={reception?.products} handleAdd={handleAdd} status={reception?.status || ''} />
              </Grid>
              <Grid item xs={12}>
                {detailsPurchase && detailsPurchase.length > 0 && (
                  <MainCard>
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 6 }}>
                      <Typography variant="subtitle1">Cantidad Total: ({detailsPurchase.length})</Typography>
                    </Stack>
                  </MainCard>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  {reception?.status === 'Send' && (
                    <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                      Confirmar/Cerrar Recepción
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </MainCard>
      {/* add user dialog */}
      <Dialog maxWidth="md" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddSelectProduct onCancel={handleAdd} />}
      </Dialog>
    </>
  );
}

export default AddReception;
