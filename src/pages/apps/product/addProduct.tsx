import { useEffect } from 'react';
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
import { useSelector, useDispatch } from 'store';
import MainCard from 'components/MainCard';

import { addProduct } from 'store/reducers/product';
import { openSnackbar } from 'store/reducers/snackbar';


// types
import {
  Product
} from 'types/products';

// assets

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

const getInitialValues = () => {
  const newProduct: Product = {
    Name: '',
    Sku: '',
    Price: 0,
  };
  return newProduct;
};

function AddNewProduct() {
  const history = useNavigate();
  const dispatch = useDispatch();


  const { error } = useSelector((state) => state.product);



  useEffect(() => {
    if (error?.response?.data?.Error) {
      dispatch(
        openSnackbar({
          open: true,
          message: error?.response?.data?.Error,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  }, [error, dispatch]);

  const handleCancel = () => {
    history(`/product-list`);
  };


  const SubstSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido')
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let data: Product = {
          ...values
        };

        await dispatch(addProduct(data));
        setSubmitting(false);
        history(`/product-list`);
      } catch (error: any) {
        console.error(error);
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
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} >
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos Básicos
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Nombre Producto</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Name')}
                        error={Boolean(touched.Name && errors.Name)}
                        helperText={touched.Name && errors.Name}
                        placeholder="Ejemplo: BOTELLA DE AGUA MINERAL 300ML"
                        fullWidth
                        rows={2}
                        multiline
                      />
                    </Grid>
                    <Grid item xs={6}>
                    <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Referencia</InputLabel>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}></InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Sku')}
                        error={Boolean(touched.Sku && errors.Sku)}
                        helperText={touched.Sku && errors.Sku}
                        placeholder="Ejemplo: 001"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Precio Unitario</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Price')}
                        error={Boolean(touched.Price && errors.Price)}
                        helperText={touched.Price && errors.Price}
                        placeholder="Ejemplo: 0.50"
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
                    Agrega Nuevo Item
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

export default AddNewProduct;
