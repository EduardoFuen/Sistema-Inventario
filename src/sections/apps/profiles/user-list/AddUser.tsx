import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormLabel,
  Grid,
  InputLabel,
  Switch,
  FormControlLabel,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project imports
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { createSupplier, editSupplier, deleteSupplier } from 'store/reducers/supplier';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { CameraOutlined, DeleteFilled } from '@ant-design/icons';

// const avatarImage = require.context('assets/images/suppliers', true);

// constant
const getInitialValues = (supplier: FormikValues | null) => {
  const newSupplier = {
    nit: '',
    email: '',
    name: '',
    location: '',
    businessName: '',
    phone: '',
    status: false
  };

  if (supplier) {
    return _.merge({}, newSupplier, supplier);
  }

  return newSupplier;
};

// ==============================|| USER ADD / EDIT / DELETE ||============================== //

export interface Props {
  supplier?: any;
  onCancel: () => void;
}

const AddUser = ({ supplier, onCancel }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreating = !supplier;

  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>();
  //  avatarImage(`./avatar-${isCreating && !supplier?.avatar ? 1 : supplier.avatar}.png`).default

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const UserSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Nombre es requerido'),
    email: Yup.string().max(255).required('Email es requerido').email('Email invalido'),
    location: Yup.string().max(500)
  });

  const deleteHandler = () => {
    // dispatch(deleteUser(supplier?.id)); - delete
    dispatch(deleteSupplier(supplier?.businessName));
    dispatch(
      openSnackbar({
        open: true,
        message: 'Proveedor deleted successfully.',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
    onCancel();
  };

  const formik = useFormik({
    initialValues: getInitialValues(supplier!),
    validationSchema: UserSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      try {
        const newSupplier = {
          name: values.name,
          nit: values.nit,
          email: values.email,
          location: values.location,
          phone: values.phone,
          businessName: values.businessName,
          status: values.status
        };

        if (supplier) {
          dispatch(editSupplier(supplier.businessName, newSupplier));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Proveedor update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          dispatch(createSupplier(newSupplier));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Proveedor add successfully.',
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
          <DialogTitle>{supplier ? 'Editar Proveedor' : 'Agregar Proveedor'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                  <FormLabel
                    htmlFor="change-avtar"
                    sx={{
                      position: 'relative',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      '&:hover .MuiBox-root': { opacity: 1 },
                      cursor: 'pointer'
                    }}
                  >
                    <Avatar alt="Avatar 1" src={avatar} sx={{ width: 72, height: 72, border: '1px dashed' }} />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Stack spacing={0.5} alignItems="center">
                        <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                        <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                      </Stack>
                    </Box>
                  </FormLabel>
                  <TextField
                    type="file"
                    id="change-avtar"
                    label="Outlined"
                    variant="outlined"
                    sx={{ display: 'none' }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedImage(e.target.files?.[0])}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="supplier-name">NIT</InputLabel>
                      <TextField
                        fullWidth
                        id="supplier-name"
                        placeholder="Ingresar NIT"
                        {...getFieldProps('nit')}
                        error={Boolean(touched.nit && errors.nit)}
                        helperText={touched.nit && errors.nit}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="supplier-name">Razón Social</InputLabel>
                      <TextField
                        fullWidth
                        id="supplier-name"
                        placeholder="Ingresar Razón Social"
                        {...getFieldProps('businessName')}
                        error={Boolean(touched.businessName && errors.businessName)}
                        helperText={touched.businessName && errors.businessName}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="supplier-name">Nombre de Contacto </InputLabel>
                      <TextField
                        fullWidth
                        id="supplier-name"
                        placeholder="Nombre de Contacto"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="supplier-name">Teléfono </InputLabel>
                      <TextField
                        fullWidth
                        id="supplier-name"
                        placeholder="Ingresar Teléfono"
                        {...getFieldProps('phone')}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="supplier-email">Email</InputLabel>
                      <TextField
                        fullWidth
                        id="supplier-email"
                        placeholder="Ingresar Email"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="supplier-location">Dirección</InputLabel>
                      <TextField
                        fullWidth
                        id="supplier-location"
                        multiline
                        rows={2}
                        placeholder="Ingresar Dirección"
                        {...getFieldProps('location')}
                        error={Boolean(touched.location && errors.location)}
                        helperText={touched.location && errors.location}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <FormControlLabel
                            control={<Switch sx={{ mt: 0 }} />}
                            label="Estado"
                            {...getFieldProps('status')}
                            labelPlacement="top"
                          />
                        </Stack>
                      </Grid>
                    </Grid>
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
                    {supplier ? 'Edit' : 'Add'}
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

export default AddUser;
