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

import { Delivery } from 'types/delivery';

// ==============================|| EDIT SUPPLIER - MAIN ||============================== //

const getInitialValues = (delivery: FormikValues | Delivery) => {
  const newSubstance = {
    NameContact: delivery?.NameContact,
    PhoneContact: delivery?.PhoneContact,
    vehicle:delivery?.vehicle
  };
  return newSubstance;
};

function UpdateDelivery() {
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
    history(`/delivery`);
  };

  const SubstSchema = Yup.object().shape({
    NameContact: Yup.string().max(255).required('Nombre de Contacto es requerido'),
    PhoneContact: Yup.string().max(255).required('Teléfono es requerido'),
    
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
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Nombre y Apellido</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        error={Boolean(touched.NameContact && errors.NameContact)}
                        helperText={
                          !Boolean(touched.NameContact && errors.NameContact) ? '' : String(touched.NameContact && errors.NameContact)
                        }
                        placeholder="Ingresar Nombre y Apellido"
                        fullWidth
                        {...getFieldProps('NameContact')}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Numero Telefonico</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        error={Boolean(touched.PhoneContact && errors.PhoneContact)}
                        helperText={
                          !Boolean(touched.PhoneContact && errors.PhoneContact) ? '' : String(touched.PhoneContact && errors.PhoneContact)
                        }
                        placeholder="Ingresar Numero Telefonico"
                        fullWidth
                        {...getFieldProps('NameContact')}
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

export default UpdateDelivery;
