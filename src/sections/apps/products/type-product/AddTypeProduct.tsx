import { useDispatch } from 'react-redux';

// material-ui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
  FormControlLabel,
  Switch
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { addTypeProduct, editTypeProduct, deleteTypeProduct } from 'store/reducers/typeProduct';

// assets
import { DeleteFilled } from '@ant-design/icons';

// constant
const getInitialValues = (product: FormikValues | null) => {
  const newProduct = {
    Name: '',
    Status: false
  };

  if (product) {
    newProduct.Name = product.Name;
    newProduct.Status = product.Status;
    return _.merge({}, newProduct, product);
  }
  return newProduct;
};

// ==============================|| TYPE PRODUCT ADD / EDIT / DELETE ||============================== //

export interface Props {
  product?: any;
  onCancel: () => void;
}

const AddPackList = ({ product, onCancel }: Props) => {
  const dispatch = useDispatch();
  const isCreating = !product;

  const UserSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido')
  });

  const deleteHandler = () => {
    dispatch(
      openSnackbar({
        open: true,
        message: 'Tipo de Producto deleted successfully.',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
    dispatch(deleteTypeProduct(product.ID));
    onCancel();
  };

  const formik = useFormik({
    initialValues: getInitialValues(product!),
    validationSchema: UserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const newProduct = {
          Name: values.Name,
          Status: values.Status
        };

        if (product) {
          await dispatch(editTypeProduct(product.ID, newProduct));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Tipo de Producto update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          await dispatch(addTypeProduct(newProduct));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Tipo de Producto add successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        }

        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>{product ? 'Editar Tipo de Producto' : 'Agregar Tipo de Producto'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="product-Name">Nombre Tipo de Producto</InputLabel>
                      <TextField
                        fullWidth
                        id="product-Name"
                        placeholder="Ingresar Tipo de Producto"
                        {...getFieldProps('Name')}
                        error={Boolean(touched.Name && errors.Name)}
                        helperText={touched.Name && errors.Name}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <FormControlLabel
                        control={<Switch sx={{ mt: 0 }} defaultChecked={product?.Status} value={product?.Status} />}
                        label="Estado"
                        {...getFieldProps('Status')}
                        labelPlacement="top"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {!isCreating && (
                  <Tooltip title="Delete User" placement="top">
                    <IconButton onClick={deleteHandler} size="large" color="error">
                      <DeleteFilled />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button color="error" onClick={onCancel}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {product ? 'Edit' : 'Add'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
};

export default AddPackList;
