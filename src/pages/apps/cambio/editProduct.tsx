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

} from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project import
import { useSelector, useDispatch } from 'store';
import MainCard from 'components/MainCard';
import { editCambios } from 'store/reducers/store';


// types
import { Cambios } from 'types/store';

// assets


// ==============================|| EDIT PRODUCT - MAIN ||============================== //

const getInitialValues = (cambios: FormikValues | Cambios) => {
  const newProduct: Cambios = {
    Base: cambios?.Base,
    BCV: cambios?.BCV,
    Date: cambios?.Date

  };
  return newProduct;
};

function UpdateProduct() {
  const history = useNavigate();
  const dispatch = useDispatch();


  const { id } = useParams();
const { cambios } = useSelector((state) => state.store);
  console.log(cambios)
 const store = useMemo(() => {
    if (id) {
      return cambios.find((item) => item.ID === String(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/cambios`);
  };

  const SubstSchema = Yup.object().shape({
    Base: Yup.string().max(255).required('Base es requerido'),

  });


  const formik = useFormik({
    initialValues: getInitialValues(store!),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let data = {
          ...values
        };
        console.log(values)
        await dispatch(editCambios(Number(id), data));
        history(`/cambios`);
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
                    Tasa de Cambio
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Dolar</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 1 } }}
                        {...getFieldProps('Base')}
                        error={Boolean(touched.Base && errors.Base)}
                        helperText={touched.Base && errors.Base}
                        placeholder="Ingresar Nombre"
                        fullWidth
                        disabled
                        defaultValue={0}
                        rows={2}
                        multiline
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>BCV</InputLabel>
                          <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 1 } }}
                        {...getFieldProps('BCV')}
                        error={Boolean(touched.BCV && errors.BCV)}
                        helperText={touched.BCV && errors.BCV}
                        placeholder="Ingresar Nombre"
                        fullWidth
                        defaultValue={0}
                        rows={2}
                        multiline
                      />
                   
                    </Grid>

   <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0 }, opacity: 0}}
                        {...getFieldProps('Quantity')}
                        placeholder="Ingresar Cantidad"
                        defaultValue={0}
  disabled
                        fullWidth
                        
                      />
                  </Grid>
                </MainCard>
              </Grid>
    

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
               
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Actualizar Tasa
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

export default UpdateProduct;
