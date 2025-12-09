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

} from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project import
import { useDispatch, useSelector } from 'store';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { editSupplier, deleteSupplier } from 'store/reducers/supplier';


// types
import { Supplier } from 'types/supplier';

// ==============================|| EDIT SUPPLIER - MAIN ||============================== //

const getInitialValues = (supplier: FormikValues | Supplier) => {
  const newSubstance = {
    NameContact: supplier?.NameContact,
    PhoneContact: supplier?.PhoneContact,
    BusinessName: supplier?.BusinessName,
    EmailContact: supplier?.EmailContact,
    Nit: supplier?.Nit,
    LeadTimeBog: supplier?.LeadTimeBog,
    PaymenTerm: supplier?.PaymenTerm,
    LeadTimeBaq: supplier?.LeadTimeBaq,
    Discount: supplier?.Discount,
    DaysPayment: supplier?.DaysPayment,
    Cupo: supplier?.Cupo,
    Status: supplier?.Status,
    Rif : supplier?.Rif,
    DesT: supplier?.DesT,
    Zona: supplier?.Zona,
    ZonaDes: supplier?.ZonaDes,
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
      return supplierList.find((item) => item.sk === String(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/supplier`);
  };

  const SubstSchema = Yup.object().shape({
    BusinessName: Yup.string().max(255).required('Razón social es requerido'),
    PhoneContact: Yup.string().max(255).required('Teléfono es requerido'),
    DaysPayment: Yup.string().max(255).required('Plazo de pago es requerido')
  });

  const formik = useFormik({
    initialValues: getInitialValues(supplier!),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(editSupplier(Number(id), values));
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
      } catch (error: any) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
console.log(touched)
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
                        error={Boolean(touched.BusinessName && errors.BusinessName)}
                        helperText={
                          !Boolean(touched.BusinessName && errors.BusinessName) ? '' : String(touched.BusinessName && errors.BusinessName)
                        }
                        placeholder="Ingresar Razón Social"
                        fullWidth
                        {...getFieldProps('BusinessName')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>RIF</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Rif')}
                        error={Boolean(touched.Rif && errors.Rif)}
                        helperText={Boolean(touched.Rif && errors.Rif) ? String(touched.Rif && errors.Rif) : ''}
                        placeholder="Ingresar RIF"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Direccion Empresa</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('DesT')}
                        error={Boolean(touched.DesT && errors.DesT)}
                        helperText={Boolean(touched.DesT && errors.DesT) ? String(touched.DesT && errors.DesT) : ''}
                        placeholder="Ingresar Direccion Empresa"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Latitud (GOOGLEMAPS)</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Zona')}
                        error={Boolean(touched.Zona && errors.Zona)}
                        helperText={Boolean(touched.Zona && errors.Zona) ? String(touched.Zona && errors.Zona) : ''}
                        placeholder="Ingresar Latitud"
                        fullWidth
                      />
                    </Grid>
                      <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Días de crédito</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('DaysPayment')}
                        placeholder="Ingresar días de crédito"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Longitud (GOOGLEMAPS)</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('ZonaDes')}
                        error={Boolean(touched.ZonaDes && errors.ZonaDes)}
                        helperText={Boolean(touched.ZonaDes && errors.ZonaDes) ? String(touched.ZonaDes && errors.ZonaDes) : ''}
                        placeholder="Ingresar Longitud"
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
                        {...getFieldProps('Vendedor')}
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
                        helperText={
                          Boolean(touched.PhoneContact && errors.PhoneContact) ? String(touched.PhoneContact && errors.PhoneContact) : ''
                        }
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
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                  <FormControlLabel
                    control={<Switch sx={{ mt: 0 }} defaultChecked={supplier?.Status} value={supplier?.Status} />}
                    label=""
                    labelPlacement="top"
                    {...getFieldProps('Status')}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      dispatch(deleteSupplier(Number(id)));
                      history(`/supplier`);
                    }}
                  >
                    Delete
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Actualizar
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
