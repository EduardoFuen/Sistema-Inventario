import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chance } from 'chance';
import { format } from 'date-fns';

// material-ui
import { Button, Grid, InputLabel, Stack, TextField, Typography, Autocomplete, MenuItem, Dialog, FormHelperText } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project import
import { useSelector, useDispatch } from 'store';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { addPurchase, resetItemsPurchase } from 'store/reducers/purcharse';

import AddSelectProduct from './selectProducts';
import DetailsPurchase from './detailsProduct';

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

const getInitialValues = () => {
  const newSubstance = {
    priceP: '',
    dateP: '',
    note: '',
    date: '',
    discount: '',
    supplier: '',
    warehouse: ''
  };
  return newSubstance;
};

function AddPurchase() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [add, setAdd] = useState<boolean>(false);

  const handleAdd = () => {
    setAdd(!add);
  };

  const { supplierList } = useSelector((state) => state.supplier);
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { detailsPurchase } = useSelector((state) => state.purchase);
  useMemo(() => dispatch(resetItemsPurchase()), [dispatch]);

  const handleCancel = () => {
    history(`/purchase`);
  };

  const [value, setValue] = useState<Date | null>();
  const [valueP, setValueP] = useState<Date | null>();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const handleChangeP = (newValue: Date | null) => {
    setValueP(newValue);
  };
  const SubstSchema = Yup.object().shape({
    warehouse: Yup.string().max(255).required('Bodega es requerido'),
    supplier: Yup.object().required('Proveedor es requerido'),
    date: Yup.date().required('Fecha Estimada es requerido')
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: SubstSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (detailsPurchase.length > 0) {
          const chance = new Chance();

          const newValue = {
            nc: chance.zip(),
            create_order: format(new Date(), 'dd-MM-yyyy'),
            products: detailsPurchase,
            ...values
          };
          dispatch(addPurchase(newValue));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Orden Creada successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
          history(`/purchase`);
        }
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
                    <Grid item xs={4}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Proveedor</InputLabel>
                      <Autocomplete
                        id="supplier-list"
                        options={supplierList.filter((item: any) => item.status === true)}
                        getOptionLabel={(option) => option.businessName}
                        onChange={(event, newValue) => {
                          setFieldValue('supplier', newValue === null ? '' : newValue);
                        }}
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
                    <Grid item xs={3}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Bodega</InputLabel>
                      <TextField
                        placeholder="Seleccionar Bodega"
                        fullWidth
                        select
                        {...getFieldProps('warehouse')}
                        error={Boolean(touched.warehouse && errors.warehouse)}
                        helperText={touched.warehouse && errors.warehouse}
                      >
                        {warehouseList
                          .filter((item: any) => item.status === true)
                          .map((option: any) => (
                            <MenuItem key={option.name} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={2}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('discount')}
                        placeholder="Ingresa Descuento %"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Estimada Entrega</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label=""
                          inputFormat="MM/dd/yyyy"
                          {...getFieldProps('date')}
                          value={value}
                          onChange={(value: any) => {
                            handleChange(value);
                            setFieldValue('date', value === null ? '' : value);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        {touched.date && errors.date && (
                          <FormHelperText error id="personal-supplier-helper">
                            {errors.date}
                          </FormHelperText>
                        )}
                      </LocalizationProvider>
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
                    <Grid item xs={5}>
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
                    <Grid item xs={4} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento pronto Pago</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('priceP')}
                        placeholder="Descuento pronto Pago %"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Pronto Pago</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label=""
                          inputFormat="MM/dd/yyyy"
                          {...getFieldProps('dateP')}
                          value={valueP}
                          onChange={(value: any) => {
                            handleChangeP(value);
                            setFieldValue('dateP', value === null ? '' : value);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} alignSelf="center">
                      <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 3 }}>
                        <Button variant="contained" sx={{ textTransform: 'none' }} onClick={handleAdd}>
                          Agregar Productos
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                {detailsPurchase && detailsPurchase.length > 0 ? (
                  <DetailsPurchase />
                ) : (
                  <MainCard>
                    Detalles Productos
                    {detailsPurchase.length === 0 && (
                      <FormHelperText error id="personal-supplier-helper">
                        Productos Requeridos
                      </FormHelperText>
                    )}
                  </MainCard>
                )}
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

                  <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Confirmar Compra
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </MainCard>
      {/* add user dialog */}
      <Dialog maxWidth="lg" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddSelectProduct onCancel={handleAdd} />}
      </Dialog>
    </>
  );
}

export default AddPurchase;
