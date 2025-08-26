import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
 
} from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project import
import { useDispatch } from 'store';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';



// types

import { Delivery } from 'types/delivery';
import { addDelivery } from 'store/reducers/purcharse';

// ==============================|| ADD SUPPLIER - MAIN ||============================== //

const getInitialValues = () => {
  const newSubstance: Delivery = {
    Name: '',
    phoneContact: 0,
    
  };
  return newSubstance;
};

function AddDelivery() {
  const history = useNavigate();

  const dispatch = useDispatch();

  const handleCancel = () => {
    history(`/delivery`);
  };

  const SubstSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido'),
    phoneContact: Yup.string()
    .matches(/^[0-9]+$/, 'El teléfono solo debe contener dígitos') 
    .length(11, 'Por favor, revise el numero de telefono')
    .required('El número de teléfono es requerido'),
});

 
  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(addDelivery(values));
        dispatch(
          openSnackbar({
            open: true,
            message: 'Delivery agregado satisfactiramente.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        history(`/delivery`);
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
                    Datos Básicos
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Nombre del Delivery</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Name')}
                        error={Boolean(touched.NameContact && errors.NameContact)}
                        helperText={touched.NameContact && errors.NameContact}
                        placeholder="Ingresar Nombre y Apellido"
                        fullWidth
                      />
                    </Grid>

                     <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Numero de telefono</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('phoneContact')}
                        error={Boolean(touched.PhoneContact && errors.PhoneContact)}
                        helperText={touched.PhoneContact && errors.PhoneContact}
                        placeholder="Ingresar numero telefonico"
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
                    Agregar Delivery
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

export default AddDelivery;
