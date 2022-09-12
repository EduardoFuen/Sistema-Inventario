import { useState } from 'react';

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
  Typography,
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
import { addWarehouse, editWarehouse, deleteWarehouse } from 'store/reducers/warehouse';
import { countrys } from 'data/country';

// assets
import { DeleteFilled } from '@ant-design/icons';

// constant
const getInitialValues = (warehouse: FormikValues | null) => {
  const newWarehouse = {
    name: '',
    department: '',
    city: '',
    location: '',
    status: false
  };

  if (warehouse) {
    newWarehouse.location = warehouse.address;
    return _.merge({}, newWarehouse, warehouse);
  }

  return newWarehouse;
};

// ==============================|| WAREHOUSE ADD / EDIT / DELETE ||============================== //

export interface Props {
  warehouse?: any;
  onCancel: () => void;
}

const AddWarehouse = ({ warehouse, onCancel }: Props) => {
  const dispatch = useDispatch();
  const isCreating = !warehouse;
  const [citys, setCities] = useState([]);

  const UserSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Nombre es requerido'),
    department: Yup.string().required('Departamento es requerido'),
    city: Yup.string().required('Ciudad es requerido'),
    location: Yup.string().required('Dirección es requerido').max(500)
  });

  const deleteHandler = () => {
    dispatch(deleteWarehouse(warehouse?.name));
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

  const changeHandler = (item: any) => {
    setCities([]);
    const index = countrys.findIndex((d) => d.department === item);
    setCities(countrys[index].cities);
  };

  const formik = useFormik({
    initialValues: getInitialValues(warehouse!),
    validationSchema: UserSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        const newWarehouse = {
          name: values.name,
          department: values.department,
          city: values.city,
          location: values.location,
          status: values.status
        };

        if (warehouse) {
          dispatch(editWarehouse(warehouse.id, newWarehouse));
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
          dispatch(addWarehouse(newWarehouse));
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
          <DialogTitle>{warehouse ? 'Editar Bodega' : 'Agregar Bodega'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="warehouse-name">Nombre</InputLabel>
                      <TextField
                        fullWidth
                        id="warehouse-name"
                        placeholder="Ingresa Nombre Bodega"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="warehouse-orderStatus">Departamento</InputLabel>
                      <FormControl fullWidth>
                        <Select
                          id="column-hiding"
                          displayEmpty
                          {...getFieldProps('department')}
                          onChange={(event: SelectChangeEvent<string>) => {
                            changeHandler(event.target.value as string);
                            setFieldValue('city', '');
                            setFieldValue('department', event.target.value as string);
                          }}
                          input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                          renderValue={(selected) => {
                            if (!selected) {
                              return <Typography variant="subtitle1">Seleccionar Departamento</Typography>;
                            }

                            return <Typography variant="subtitle2">{selected}</Typography>;
                          }}
                        >
                          {countrys.map((column: any) => (
                            <MenuItem key={column.id} value={column.department}>
                              <ListItemText primary={column.department} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {touched.department && errors.department && (
                        <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                          {errors.department}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="warehouse-orderStatus">Ciudad</InputLabel>
                      <FormControl fullWidth>
                        <Select
                          id="column-hiding"
                          displayEmpty
                          {...getFieldProps('city')}
                          onChange={(event: SelectChangeEvent<string>) => setFieldValue('city', event.target.value as string)}
                          input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                          renderValue={(selected) => {
                            if (!selected) {
                              return <Typography variant="subtitle1">Seleccionar Ciudad</Typography>;
                            }

                            return <Typography variant="subtitle2">{selected}</Typography>;
                          }}
                        >
                          {citys.map((column: any) => (
                            <MenuItem key={column} value={column}>
                              <ListItemText primary={column} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {touched.city && errors.city && (
                        <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                          {errors.city}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="warehouse-location">Dirección</InputLabel>
                      <TextField
                        fullWidth
                        id="warehouse-location"
                        multiline
                        rows={2}
                        placeholder="Ingresar Dirección"
                        {...getFieldProps('location')}
                        error={Boolean(touched.location && errors.location)}
                        helperText={touched.location && errors.location}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <FormControlLabel
                            control={<Switch sx={{ mt: 0 }} defaultChecked={warehouse?.status} />}
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
                    {warehouse ? 'Edit' : 'Add'}
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
