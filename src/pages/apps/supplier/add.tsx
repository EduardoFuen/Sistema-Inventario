import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Select,
  MenuItem,
  Typography,
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
import { ClientType, ClientContribu, ClientType2 } from 'config';

// types
import { Supplier } from 'types/supplier';

// ==============================|| ADD SUPPLIER - MAIN ||============================== //

const getInitialValues = () => {
  const newSubstance: Supplier = {
    NameContact: '',
    PhoneContact: 0,
    BusinessName: '',
    EmailContact: '',
    Rif: '',
    Contribuyente: ''
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
    BusinessName: Yup.string().max(255).required('Razón social es requerido')
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('TEST66')
      try {
        await dispatch(createSupplier(values));
        dispatch(
          openSnackbar({
            open: true,
            message: 'Cliente Agregado Satisfactorio.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        history(`/supplier`);
        setSubmitting(false);
      } catch (error: any) {
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
                    Datos Juridicos
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Nombre Empresa</InputLabel>
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
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>RIF</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('rifempresa')}
                        placeholder="Ingresar RIF"
                        fullWidth
                      />
                    </Grid>
                                  
                  </Grid>

                  <Grid container spacing={1} direction="row">
                   
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Direccion Empresa</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('DesT')}
                        placeholder="Ingresar Destino Tipo"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Días de Credito</InputLabel>
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
                    <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Contribuyente Especial</InputLabel>
                      <Select
                        fullWidth
                        {...getFieldProps('PaymenTerm')}
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={Boolean(touched.PaymenTerm && errors.PaymenTerm)}
                      >
                        <MenuItem value="" sx={{ color: 'text.secondary' }}>
                          Tipo de Contribuyente
                        </MenuItem>
                        {ClientContribu.map((option: any) => {
                          return (
                            <MenuItem key={option.id} value={option.id}>
                              {option.title}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {touched.PaymenTerm && <FormHelperText error>{formik.errors.PaymenTerm} </FormHelperText>}
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Credito Maximo</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('credit')}
                        placeholder="credito"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
           
                </MainCard>
              </Grid>

              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos de Contacto - Servicios
                  </Typography>
                  <Grid container direction="row" spacing={2}>
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
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Nombre Completo</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Vendedor')}
                        placeholder="Ingresar Nombre"
                        fullWidth
                      />
                    </Grid>
                      <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Tipo Cliente</InputLabel>
                      <Select
                        fullWidth
                        {...getFieldProps('PaymenTerm')}
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={Boolean(touched.PaymenTerm && errors.PaymenTerm)}
                      >
                        <MenuItem value="" sx={{ color: 'text.secondary' }}>
                          Seleccionar Tipo de cliente
                        </MenuItem>
                        {ClientType.map((option: any) => {
                          return (
                            <MenuItem key={option.id} value={option.id}>
                              {option.title}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {touched.PaymenTerm && <FormHelperText error>{formik.errors.PaymenTerm} </FormHelperText>}
                    </Grid>
                     <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>-</InputLabel>
                        <Select
                        fullWidth
                        {...getFieldProps('rif2')}
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={Boolean(touched.PaymenTerm && errors.PaymenTerm)}
                      >
                        <MenuItem value="" sx={{ color: 'text.secondary' }}>
                          Elija una opcion
                        </MenuItem>
                        {ClientType2.map((option: any) => {
                          return (
                            <MenuItem key={option.id} value={option.id}>
                              {option.title}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Documento</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Rif')}
                        placeholder="Ingresar Documento"
                        fullWidth
                      />
                    </Grid>
                            
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Direccion</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('VendedorDir')}
                        placeholder="Ingresar Direccion"
                        fullWidth
                      />
                    </Grid>
                                        <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Latitud (Opcional)</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Zona')}
                        placeholder="Ingresar Latitud"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Longitud (Opcional)</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('ZonaDes')}
                        placeholder="Ingresar Longitud"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>


              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 6 }}>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Agregar Cliente
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
