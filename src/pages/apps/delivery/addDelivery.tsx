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

import { addDelivery } from 'store/reducers/purcharse';

import { openSnackbar } from 'store/reducers/snackbar';
import { getMakerList } from 'store/reducers/maker';


// types
import {
  Product,
} from 'types/products';

import {
  Store,
} from 'types/store';

// assets


// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

const getInitialValues = () => {
  const newProduct: Store = {
    Name: '',
    ID: '',
    Quantity: '',
    IdProvider: ''
  };
  return newProduct;
};

function AddNewProduct() {
  const history = useNavigate();
  const dispatch = useDispatch();

  //const { tradeMarkList } = useSelector((state) => state.trademark);
  //const { typeProductList } = useSelector((state) => state.typeProduct);
  const { stores, error } = useSelector((state) => state.store);
  //const { warehouseList } = useSelector((state) => state.warehouse);
  //const { categoryListThree, categoryListOne, categoryListTwo } = useSelector((state) => state.category);
  console.log(stores)

 

  useEffect(() => {
    dispatch(getMakerList());
  }, [dispatch]);



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
    history(`/delivery-list`);
  };


  const SubstSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido'),
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let data: Product = {
          ...values,
        };

        await dispatch(addDelivery(data));
        setSubmitting(false);
        history(`/delivery-list`);
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos Básicos
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Proveedor</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Name')}
                        error={Boolean(touched.Name && errors.Name)}
                        helperText={touched.Name && errors.Name}
                        placeholder="Ingresar Nombre"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Persona de Contacto</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('ContactName')}
                        placeholder="Ingresar Cantidad"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Telefono</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('PhoneNumber')}

                        placeholder="Ingresar Codigo Correlativo"
                        fullWidth
                      />
                    </Grid>
                      <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Dirreccion</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Adress')}

                        placeholder="Ingresar Codigo Correlativo"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
    
  
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
        
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
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

export default AddNewProduct;
