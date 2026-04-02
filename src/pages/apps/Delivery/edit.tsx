import { useMemo, useEffect } from 'react';
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
import { useFormik, Form, FormikProvider } from 'formik';

// project import
import { useDispatch, useSelector } from 'store';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { getDeliveryList, editDelivery, deleteDelivery } from 'store/reducers/purcharse';

// types

// ==============================|| EDIT DELIVERY - MAIN ||============================== //

const getInitialValues = (delivery: any) => {
  const newDelivery = {
    NameContact: delivery?.NameContact || '',
    PhoneContact: String(delivery?.PhoneContact || ''),
    vehicle: delivery?.vehicle || '',
    Status: delivery?.Status ?? true
  };
  return newDelivery;
};

function UpdateDelivery() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { deliveryList } = useSelector((state) => state.purchase);

  useEffect(() => {
    if (!deliveryList || deliveryList.length === 0) {
      dispatch(getDeliveryList());
    }
  }, [dispatch]);

  const delivery = useMemo(() => {
    if (id && deliveryList) {
      return deliveryList.find((item: any) => item.sk === String(id) || String(item.ID) === String(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, deliveryList]);

  const handleCancel = () => {
    history(`/delivery`);
  };

  const DeliverySchema = Yup.object().shape({
    NameContact: Yup.string().max(255).required('Nombre de Contacto es requerido'),
    PhoneContact: Yup.string().max(255).required('Teléfono es requerido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(delivery || {}),
    validationSchema: DeliverySchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(editDelivery(Number(id), values));
        dispatch(
          openSnackbar({
            open: true,
            message: 'Delivery actualizado satisfactoriamente.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        setSubmitting(false);
        history(`/delivery`);
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
                    Datos Básicos
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1 }}>Nombre y Apellido</InputLabel>
                      <TextField
                        error={Boolean(touched.NameContact && errors.NameContact)}
                        helperText={touched.NameContact && errors.NameContact ? (errors.NameContact as string) : ''}
                        placeholder="Ingresar Nombre y Apellido"
                        fullWidth
                        {...getFieldProps('NameContact')}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1 }}>Numero Telefonico</InputLabel>
                      <TextField
                        error={Boolean(touched.PhoneContact && errors.PhoneContact)}
                        helperText={touched.PhoneContact && errors.PhoneContact ? (errors.PhoneContact as string) : ''}
                        placeholder="Ingresar Numero Telefonico"
                        fullWidth
                        {...getFieldProps('PhoneContact')}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1 }}>Vehículo</InputLabel>
                      <TextField
                        placeholder="Ingresar Vehículo"
                        fullWidth
                        {...getFieldProps('vehicle')}
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                  <FormControlLabel
                    control={<Switch sx={{ mt: 0 }} checked={formik.values.Status} />}
                    label="Estado"
                    labelPlacement="start"
                    {...getFieldProps('Status')}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={async () => {
                      if (window.confirm('¿Estás seguro de que quieres eliminar este delivery?')) {
                        await dispatch(deleteDelivery(Number(id)));
                        history(`/delivery`);
                      }
                    }}
                  >
                    Eliminar
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

export default UpdateDelivery;
