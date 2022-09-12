import { useState } from 'react';

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
  Switch,
  MenuItem,
  Select,
  SelectChangeEvent
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
import { addTradeMaker, editTradeMaker, deleteTradeMaker } from 'store/reducers/trademaker';

// assets
import { DeleteFilled } from '@ant-design/icons';

// constant
const getInitialValues = (tradeMaker: FormikValues | null) => {
  const newTradeTradeMaker = {
    name: '',
    maker: '',
    status: false
  };

  if (tradeMaker) {
    return _.merge({}, newTradeTradeMaker, tradeMaker);
  }

  return newTradeTradeMaker;
};

// ==============================|| WAREHOUSE ADD / EDIT / DELETE ||============================== //

export interface Props {
  tradeMaker?: any;
  onCancel: () => void;
}

const AddTradetradeMaker = ({ tradeMaker, onCancel }: Props) => {
  const dispatch = useDispatch();
  const isCreating = !tradeMaker;
  const [maker, setMaker] = useState('');

  const TradeMakerSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Nombre es requerido')
  });

  const deleteHandler = () => {
    dispatch(deleteTradeMaker(tradeMaker?.name));
    dispatch(
      openSnackbar({
        open: true,
        message: 'TradeMaker deleted successfully.',
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
    initialValues: getInitialValues(tradeMaker!),
    validationSchema: TradeMakerSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        const newTradeTradeMaker = {
          name: values.name,
          maker: maker,
          status: values.status
        };

        if (tradeMaker) {
          dispatch(editTradeMaker(tradeMaker.name, newTradeTradeMaker));
          dispatch(
            openSnackbar({
              open: true,
              message: 'TradeMaker update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          dispatch(addTradeMaker(newTradeTradeMaker));
          dispatch(
            openSnackbar({
              open: true,
              message: 'TradeMaker add successfully.',
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

  const handleChange = (event: SelectChangeEvent<string>) => {
    setMaker(event.target.value);
  };
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>{tradeMaker ? 'Editar TradeMaker' : 'Agregar TradeMaker'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={9}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="tradeMaker-name">Nombre</InputLabel>
                      <TextField
                        fullWidth
                        id="tradeMaker-name"
                        placeholder="Ingresa Nombre TradeMaker"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={9}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="personal-experience">Maker</InputLabel>
                      <Select fullWidth id="tradeMaker-maker" {...getFieldProps('maker')} value={maker} onChange={handleChange}>
                        <MenuItem value="Pfizer">Pfizer</MenuItem>
                        <MenuItem value="Bayer">Bayer</MenuItem>
                        <MenuItem value="Bayer">Bayer</MenuItem>
                        <MenuItem value="Merck">Merck</MenuItem>
                        <MenuItem value="Sanofi">Sanofi</MenuItem>
                      </Select>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
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
                    {tradeMaker ? 'Edit' : 'Add'}
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

export default AddTradetradeMaker;
