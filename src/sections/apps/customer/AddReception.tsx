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
// assets
import { DeleteFilled } from '@ant-design/icons';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'store/reducers/snackbar';

// assets

// const avatarImage = require.context('assets/images/users', true);

// constant
const getInitialValues = (customer: FormikValues | null) => {
  const newRecepción = {
    name: '',
    email: '',
    location: '',
    orderStatus: ''
  };

  if (customer) {
    newRecepción.name = customer.fatherName;
    newRecepción.location = customer.address;
    return _.merge({}, newRecepción, customer);
  }

  return newRecepción;
};

const allStatus = ['Complicated', 'Single', 'Relationship'];

// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

export interface Props {
  customer?: any;
  onCancel: () => void;
}

const AddRecepción = ({ customer, onCancel }: Props) => {
  const dispatch = useDispatch();
  const isCreating = !customer;
  const RecepciónSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Name is required'),
    orderStatus: Yup.string().required('Name is required'),
    email: Yup.string().max(255).required('Email is required').email('Must be a valid email'),
    location: Yup.string().max(500)
  });

  const deleteHandler = () => {
    // dispatch(deleteRecepción(customer?.id)); - delete
    dispatch(
      openSnackbar({
        open: true,
        message: 'Recepción deleted successfully.',
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
    initialValues: getInitialValues(customer!),
    validationSchema: RecepciónSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        // const newRecepción = {
        //   name: values.name,
        //   email: values.email,
        //   location: values.location,
        //   orderStatus: values.orderStatus
        // };

        if (customer) {
          // dispatch(updateRecepción(customer.id, newRecepción)); - update
          dispatch(
            openSnackbar({
              open: true,
              message: 'Recepción update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          // dispatch(createRecepción(newRecepción)); - add
          dispatch(
            openSnackbar({
              open: true,
              message: 'Recepción add successfully.',
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
          <DialogTitle>{customer ? 'Editar  Ingreso' : 'Registrar Nuevo Ingreso'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="customer-name">Name</InputLabel>
                      <TextField
                        fullWidth
                        id="customer-name"
                        placeholder="Enter Recepción Name"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="customer-email">Email</InputLabel>
                      <TextField
                        fullWidth
                        id="customer-email"
                        placeholder="Enter Recepción Email"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="customer-orderStatus">Status</InputLabel>
                      <FormControl fullWidth>
                        <Select
                          id="column-hiding"
                          displayEmpty
                          {...getFieldProps('orderStatus')}
                          onChange={(event: SelectChangeEvent<string>) => setFieldValue('orderStatus', event.target.value as string)}
                          input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                          renderValue={(selected) => {
                            if (!selected) {
                              return <Typography variant="subtitle1">Select Status</Typography>;
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
                      <InputLabel htmlFor="customer-location">Location</InputLabel>
                      <TextField
                        fullWidth
                        id="customer-location"
                        multiline
                        rows={2}
                        placeholder="Enter Location"
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
                  <Tooltip title="Delete Recepción" placement="top">
                    <IconButton onClick={deleteHandler} size="large" color="error">
                      <DeleteFilled />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button color="error" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {customer ? 'Edit' : 'Add'}
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

export default AddRecepción;
