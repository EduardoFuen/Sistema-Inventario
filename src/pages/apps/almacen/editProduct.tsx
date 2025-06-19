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
import { editProduct } from 'store/reducers/store';


// types
import { Store } from 'types/store';

// assets


// ==============================|| EDIT PRODUCT - MAIN ||============================== //

const getInitialValues = (store: FormikValues | Store) => {
  const newProduct: Store = {
    Name: store?.Name,
    Sku: store?.Sku,
    Quantity: store?.Quantity,
    IdProvider: store?.IdProvider,
    Exist: 0

  };
  return newProduct;
};

function UpdateProduct() {
  const history = useNavigate();
  const dispatch = useDispatch();


  const { id } = useParams();
const { stores } = useSelector((state) => state.store);
  console.log(stores)
 const store = useMemo(() => {
    if (id) {
      return stores.find((item) => item.ID === String(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/store-list`);
  };

  const SubstSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido'),

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
        await dispatch(editProduct(Number(id), data));
        history(`/store-list`);
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
                    Sumar al Almacen
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Producto</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 1 } }}
                        {...getFieldProps('Name')}
                        error={Boolean(touched.Name && errors.Name)}
                        helperText={touched.Name && errors.Name}
                        placeholder="Ingresar Nombre"
                        fullWidth
                        disabled
                        defaultValue={0}
                        rows={2}
                        multiline
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Cantidad Comprada</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 1 } }}
                        {...getFieldProps('Exist')}
                        placeholder="Ingresar Cantidad"
                        fullWidth
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
                    Cancel
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Añadir al Almacen
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
