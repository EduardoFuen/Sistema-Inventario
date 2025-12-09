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
import { editProduct } from 'store/reducers/product';


// types
import {
  Product,
} from 'types/products';


// ==============================|| EDIT PRODUCT - MAIN ||============================== //

const getInitialValues = (product: FormikValues | null) => {
  const newProduct: Product = {
    Name: product?.Name,
    Sku: product?.Sku,
    Price: product?.Price,
    sk: product?.sk
  };
  return newProduct;
};

function UpdateProduct() {
  const history = useNavigate();
  const dispatch = useDispatch();


  const { id } = useParams();



 


  const { products } = useSelector((state) => state.product);
  
  const product = useMemo(() => {
    if (id) {
   
      return products.find((item: Product) => item.sk == id);
    }
  }, [id, products]);



  const handleCancel = () => {
    history(`/product-list`);
  };

  const SubstSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido'),
  });


  const formik = useFormik({
    initialValues: getInitialValues(product!),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let data = {
          ...values
        };
        await dispatch(editProduct(Number(id), data));
        history(`/product-list`);
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                        placeholder="Actualizar Nombre"
                        fullWidth
                        disabled
                        rows={2}
                        multiline
                      />
                    </Grid>
          
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Precio</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Price')}
                        error={Boolean(touched.Price && errors.Price)}
                        helperText={touched.Price && errors.Price}
                        placeholder="Actualizar precio"
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
                    Update Product
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
