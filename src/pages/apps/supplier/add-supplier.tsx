import { useNavigate } from 'react-router-dom';

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
} from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project import
import { useDispatch } from 'store';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { createSupplier } from 'store/reducers/supplier';

// ==============================|| ADD SUPPLIER - MAIN ||============================== //

const getInitialValues = () => {
  const newSubstance = {
    NameContact: '',
    PhoneContact: '',
    BusinessName: '',
    EmailContact: '',
    Nit: '',
    PaymenTerm: '',
    LeadTimeBog: 0,
    LeadTimeBaq: 0,
    Discount: 0,
    DaysPayment: '',
    Cupo: 0,
    Status: false
  };
  return newSubstance;
};

function AddSupplier() {
  const history = useNavigate();

  const dispatch = useDispatch();

  const handleCancel = () => {
    history(`/supplier`);
  };

  const SubstSchema = Yup.object().shape({
    BusinessName: Yup.string().max(255).required('Razón social es requerido'),
    Nit: Yup.string().max(255).required('NIT es requerido'),
    NameContact: Yup.string().max(255).required('Nombre de Contacto es requerido'),
    EmailContact: Yup.string().max(255).required('Email es requerido'),
    PhoneContact: Yup.string().max(255).required('Teléfono es requerido'),
    PaymenTerm: Yup.string().max(255).required('Plazo de pago es requerido')
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(createSupplier(values));
        dispatch(
          openSnackbar({
            open: true,
            message: 'Proveedor Add successfully.',
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
                        {...getFieldProps('BusinessName')}
                        error={Boolean(touched.BusinessName && errors.BusinessName)}
                        helperText={touched.BusinessName && errors.BusinessName}
                        placeholder="Ingresar Razón Social"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>NIT</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Nit')}
                        error={Boolean(touched.Nit && errors.Nit)}
                        helperText={touched.Nit && errors.Nit}
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
                        {...getFieldProps('NameContact')}
                        error={Boolean(touched.NameContact && errors.NameContact)}
                        helperText={touched.NameContact && errors.NameContact}
                        placeholder="Ingresar Nombre de Contacto"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Teléfono</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('PhoneContact')}
                        error={Boolean(touched.PhoneContact && errors.PhoneContact)}
                        helperText={touched.PhoneContact && errors.PhoneContact}
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
                        {...getFieldProps('EmailContact')}
                        error={Boolean(touched.EmailContact && errors.EmailContact)}
                        helperText={touched.EmailContact && errors.EmailContact}
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
                            {...getFieldProps('LeadTimeBog')}
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            error={Boolean(touched.LeadTimeBog && errors.LeadTimeBog)}
                            helperText={touched.LeadTimeBog && errors.LeadTimeBog}
                            placeholder="Ingresar Lead Time Bogota"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Lead Time Barranquilla</InputLabel>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            placeholder="Ingresar Lead Time Barranquilla"
                            fullWidth
                            {...getFieldProps('LeadTimeBaq')}
                            error={Boolean(touched.LeadTimeBaq && errors.LeadTimeBaq)}
                            helperText={touched.LeadTimeBaq && errors.LeadTimeBaq}
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
                        {...getFieldProps('PaymenTerm')}
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={Boolean(touched.PaymenTerm && errors.PaymenTerm)}
                      >
                        <MenuItem value="" sx={{ color: 'text.secondary' }}>
                          Seleccionar Plazo de pago
                        </MenuItem>
                        <MenuItem value="Pago inmediato">Pago inmediato</MenuItem>
                        <MenuItem value="Pago inmediato">Pago inmediato</MenuItem>
                        <MenuItem value="Pago inmediato 1">1 Día</MenuItem>
                        <MenuItem value="Pago inmediato 2">2 Días</MenuItem>
                        <MenuItem value="Pago inmediato 3">3 Días</MenuItem>
                        <MenuItem value="Pago inmediato 5">15 Días</MenuItem>
                        <MenuItem value="Pago inmediato 21">21 Días</MenuItem>
                        <MenuItem value="Pago inmediato 30">30 Días</MenuItem>
                        <MenuItem value="Pago inmediato 45">45 Días</MenuItem>
                        <MenuItem value="Pago inmediato 2 Meses">2 Meses</MenuItem>
                      </Select>
                      {touched.PaymenTerm && <FormHelperText error>{formik.errors.PaymenTerm} </FormHelperText>}
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Cupo</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        placeholder="Ingresar cupo"
                        fullWidth
                        {...getFieldProps('Cupo')}
                        error={Boolean(touched.Cupo && errors.Cupo)}
                        helperText={touched.Cupo && errors.Cupo}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Días pronto pago</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        placeholder="Ingresar Días pronto pago"
                        fullWidth
                        {...getFieldProps('DaysPayment')}
                        error={Boolean(touched.DaysPayment && errors.DaysPayment)}
                        helperText={touched.DaysPayment && errors.DaysPayment}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento pronto pago </InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        placeholder="Ingresar Descuento pronto pago %"
                        fullWidth
                        type="number"
                        {...getFieldProps('Discount')}
                        error={Boolean(touched.Discount && errors.Discount)}
                        helperText={touched.Discount && errors.Discount}
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                  <FormControlLabel control={<Switch sx={{ mt: 0 }} />} label="" labelPlacement="top" {...getFieldProps('Status')} />
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

export default AddSupplier;
