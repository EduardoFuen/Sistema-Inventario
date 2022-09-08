import { useDispatch } from 'react-redux';

// material-ui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
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
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { DeleteFilled } from '@ant-design/icons';

// const avatarImage = require.context('assets/images/users', true);

// constant
const getInitialValues = (user: FormikValues | null) => {
  const newUser = {
    name: '',
    email: '',
    location: '',
    orderStatus: ''
  };

  if (user) {
    newUser.name = user.fatherName;
    newUser.location = user.address;
    return _.merge({}, newUser, user);
  }

  return newUser;
};

const allStatus = ['Activo', 'Desactivado', 'Pendiente'];

// ==============================|| USER ADD / EDIT / DELETE ||============================== //

export interface Props {
  user?: any;
  onCancel: () => void;
}

const AddWarehouse = ({ user, onCancel }: Props) => {
  const dispatch = useDispatch();
  const isCreating = !user;
  console.log(user);

  //  avatarImage(`./avatar-${isCreating && !user?.avatar ? 1 : user.avatar}.png`).default

  const UserSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Nombre es requerido'),
    orderStatus: Yup.string().required('Nombre es requerido'),
    email: Yup.string().max(255).required('Email es requerido').email('Email invalido'),
    location: Yup.string().max(500)
  });

  const deleteHandler = () => {
    // dispatch(deleteUser(user?.id)); - delete
    dispatch(
      openSnackbar({
        open: true,
        message: 'Bodega deleted successfully.',
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
    initialValues: getInitialValues(user!),
    validationSchema: UserSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        // const newUser = {
        //   name: values.name,
        //   email: values.email,
        //   location: values.location,
        //   orderStatus: values.orderStatus
        // };

        if (user) {
          // dispatch(updateUser(user.id, newUser)); - update
          dispatch(
            openSnackbar({
              open: true,
              message: 'Bodega update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          // dispatch(createUser(newUser)); - add
          dispatch(
            openSnackbar({
              open: true,
              message: 'Bodega add successfully.',
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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>{user ? 'Editar Bodega' : 'Agregar Bodega'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="user-name">Nombre</InputLabel>
                      <TextField
                        fullWidth
                        id="user-name"
                        placeholder="Enter User Name"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="user-orderStatus">Ciudad</InputLabel>
                      <FormControl fullWidth>
                        <Select
                          id="column-hiding"
                          displayEmpty
                          {...getFieldProps('orderStatus')}
                          onChange={(event: SelectChangeEvent<string>) => setFieldValue('orderStatus', event.target.value as string)}
                          input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                          renderValue={(selected) => {
                            if (!selected) {
                              return <Typography variant="subtitle1">Seleccionar Ciudad</Typography>;
                            }

                            return <Typography variant="subtitle2">{selected}</Typography>;
                          }}
                        >
                          {allStatus.map((column: any) => (
                            <MenuItem key={column} value={column}>
                              <ListItemText primary={column} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {touched.orderStatus && errors.orderStatus && (
                        <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                          {errors.orderStatus}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="user-location">Dirección</InputLabel>
                      <TextField
                        fullWidth
                        id="user-location"
                        multiline
                        rows={2}
                        placeholder="Ingresar Dirección"
                        {...getFieldProps('location')}
                        error={Boolean(touched.location && errors.location)}
                        helperText={touched.location && errors.location}
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
                    {user ? 'Edit' : 'Add'}
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

export default AddWarehouse;
