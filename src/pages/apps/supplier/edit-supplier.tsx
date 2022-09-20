import { useMemo } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  FormHelperText
  // SelectChangeEvent
} from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project import
import { useDispatch, useSelector } from 'store';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { editSupplier, deleteSupplier } from 'store/reducers/supplier';

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

const getInitialValues = (supplier: FormikValues | null) => {
  const newSubstance = {
    name: supplier?.name,
    phone: supplier?.phone,
    businessName: supplier?.businessName,
    email: supplier?.email,
    nit: supplier?.nit,
    leadTimeBog: supplier?.leadTimeBog,
    paymenTerm: supplier?.paymenTerm,
    leadTimeBaq: supplier?.leadTimeBaq,
    discount: supplier?.discount,
    daysPayment: supplier?.daysPayment,
    cupo: supplier?.cupo,
    status: supplier?.status
  };
  return newSubstance;
};

function UpdateSuplier() {
  const history = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const { supplierList } = useSelector((state) => state.supplier);

  const supplier = useMemo(() => {
    if (id) {
      return supplierList.find((item) => item.businessName === id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/supplier`);
  };

  const SubstSchema = Yup.object().shape({
    businessName: Yup.string().max(255).required('Razón social es requerido'),
    nit: Yup.string().max(255).required('NIT es requerido'),
    name: Yup.string().max(255).required('Nombre de Contacto es requerido'),
    email: Yup.string().max(255).required('Email es requerido'),
    phone: Yup.string().max(255).required('Teléfono es requerido'),
    paymenTerm: Yup.string().max(255).required('Plazo de pago es requerido')
  });

  const formik = useFormik({
    initialValues: getInitialValues(supplier!),
    validationSchema: SubstSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        dispatch(editSupplier(id, values));
        dispatch(
          openSnackbar({
            open: true,
            message: 'Supplier Update successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        history(`/supplier`);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <MainCard>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos Básicos
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Razón Social</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('businessName')}
                        error={Boolean(touched.businessName && errors.businessName)}
                        helperText={touched.businessName && errors.businessName}
                        placeholder="Ingresar Razón Social"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>NIT</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('nit')}
                        error={Boolean(touched.nit && errors.nit)}
                        helperText={touched.nit && errors.nit}
                        placeholder="Ingresar NIT"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>

              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos de Contacto
                  </Typography>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Nombre de Contacto</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        placeholder="Ingresar Nombre de Contacto"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Teléfono</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('phone')}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                        placeholder="Ingresar Teléfono"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Email</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        type="email"
                        placeholder="Ingresar Email"
                        fullWidth
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <MainCard>
                      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                        Datos de Entregas
                      </Typography>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={6}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Lead Time Bogota</InputLabel>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            {...getFieldProps('leadTimeBog')}
                            type="number"
                            error={Boolean(touched.leadTimeBog && errors.leadTimeBog)}
                            helperText={touched.leadTimeBog && errors.leadTimeBog}
                            placeholder="Ingresar Lead Time Bogota"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Lead Time Barranquilla</InputLabel>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            type="number"
                            placeholder="Ingresar Lead Time Barranquilla"
                            fullWidth
                            {...getFieldProps('leadTimeBaq')}
                            error={Boolean(touched.leadTimeBaq && errors.leadTimeBaq)}
                            helperText={touched.leadTimeBaq && errors.leadTimeBaq}
                          />
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos de Pago
                  </Typography>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Plazo de pago</InputLabel>
                      <Select
                        fullWidth
                        {...getFieldProps('paymenTerm')}
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={Boolean(touched.paymenTerm && errors.paymenTerm)}
                      >
                        <MenuItem value="" sx={{ color: 'text.secondary' }}>
                          Seleccionar Plazo de pago
                        </MenuItem>
                        <MenuItem value="Pago inmediato">Pago inmediato</MenuItem>
                        <MenuItem value="1 Día">1 Día</MenuItem>
                        <MenuItem value="2 Días">2 Días</MenuItem>
                        <MenuItem value="3 Días">3 Días</MenuItem>
                        <MenuItem value="3 Días">3 Días</MenuItem>
                        <MenuItem value="15 Días">15 Días</MenuItem>
                        <MenuItem value="21 Días">21 Días</MenuItem>
                        <MenuItem value="30 Días">30 Días</MenuItem>
                        <MenuItem value="45 Días">45 Días</MenuItem>
                        <MenuItem value="2 Meses">2 Meses</MenuItem>
                      </Select>
                      {touched.paymenTerm && <FormHelperText error>{formik.errors.paymenTerm} </FormHelperText>}
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Cupo</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        type="number"
                        placeholder="Ingresar cupo"
                        fullWidth
                        {...getFieldProps('cupo')}
                        error={Boolean(touched.cupo && errors.cupo)}
                        helperText={touched.cupo && errors.cupo}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Días pronto pago</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        placeholder="Ingresar Días pronto pago"
                        fullWidth
                        {...getFieldProps('daysPayment')}
                        error={Boolean(touched.daysPayment && errors.daysPayment)}
                        helperText={touched.daysPayment && errors.daysPayment}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento pronto pago </InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        placeholder="Ingresar Descuento pronto pago %"
                        fullWidth
                        {...getFieldProps('discount')}
                        error={Boolean(touched.discount && errors.discount)}
                        helperText={touched.discount && errors.discount}
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                  <FormControlLabel
                    control={<Switch sx={{ mt: 0 }} defaultChecked={supplier?.status} />}
                    label=""
                    labelPlacement="top"
                    {...getFieldProps('status')}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      dispatch(deleteSupplier(supplier?.businessName));
                      history(`/supplier`);
                      dispatch(
                        openSnackbar({
                          open: true,
                          message: 'Proveedor deleted successfully.',
                          variant: 'alert',
                          alert: {
                            color: 'success'
                          },
                          close: false
                        })
                      );
                    }}
                  >
                    Delete
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Agregar Proveedor
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </MainCard>
    </>
  );
}

export default UpdateSuplier;
