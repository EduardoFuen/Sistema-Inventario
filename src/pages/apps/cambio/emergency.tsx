import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project import
import { useSelector, useDispatch } from 'store';
import MainCard from 'components/MainCard';
import { emergencyes,getEmergencyID } from 'store/reducers/store';


// types
import { Emergency } from 'types/store';

// assets


// ==============================|| EDIT PRODUCT - MAIN ||============================== //

const getInitialValues = (cambios: FormikValues | Emergency) => {
  const newProduct: Emergency = {
    Base: cambios?.Base,
    active: cambios?.active
  };
  return newProduct;
};

function ButtonEmergency() {
  const history = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmergencyID(1));
  }, [dispatch]);

  const { id } = useParams();
const { emergency } = useSelector((state) => state.emergency);
  console.log(emergency)


  const handleCancel = () => {
    history(`/dashboard`);
  };

  const SubstSchema = Yup.object().shape({
    Base: Yup.string().max(255).required('No puedes activar modo emergencia sin un mensaje'),

  });


  const formik = useFormik({
    initialValues: getInitialValues(emergency!),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let data = {
          ...emergency,
          ...values
        };
        console.log(values)
        await dispatch(emergencyes(Number(id), data));
        history(`/emergency`);
        setSubmitting(false);
      } catch (error: any) {
        setSubmitting(false);
      }
    }
  });


  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <MainCard>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={6} >
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }} >
                    Activar Modo Emergencia
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Mensaje de emergencia</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 1 } }}
                        {...getFieldProps('Base')}
                        error={Boolean(touched.Base && errors.Base)}
                        helperText={touched.Base && errors.Base}
                        placeholder="Ingresar mensaje de emergencia"
                        fullWidth
                        rows={2}
                        multiline
                      />
                    </Grid>

                  </Grid>
                </MainCard>
              </Grid>
    

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="left" alignItems="center" sx={{ mt: 6 }}>
               
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancelar
                  </Button>
                   {emergency?.active == 0 &&(
                  <Button variant="contained" color="success" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Activar!
                  </Button>
                   )}
                   {emergency?.active == 1 &&(
                  <Button variant="contained" color="warning" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Desactivar!
                  </Button>
                   )}
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </MainCard>
    </>
  );
}

export default ButtonEmergency;
