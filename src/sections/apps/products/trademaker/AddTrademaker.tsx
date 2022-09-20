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
import { useSelector } from 'store';
// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { addTrademark, editTrademark, deleteTrademark } from 'store/reducers/trademaker';

// assets
import { DeleteFilled } from '@ant-design/icons';

// constant
const getInitialValues = (tradeMark: FormikValues | null) => {
  const newTradeTrademark = {
    name: '',
    maker: '',
    status: false
  };
  if (tradeMark) {
    newTradeTrademark.status = tradeMark.status;
    return _.merge({}, newTradeTrademark, tradeMark);
  }

  return newTradeTrademark;
};

// ==============================|| WAREHOUSE ADD / EDIT / DELETE ||============================== //

export interface Props {
  tradeMark?: any;
  onCancel: () => void;
}

const AddTrademark = ({ tradeMark, onCancel }: Props) => {
  const dispatch = useDispatch();
  const isCreating = !tradeMark;
  const [maker, setMaker] = useState('');
  const { makerList } = useSelector((state) => state.maker);
  const TrademarkSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Nombre es requerido')
  });

  const deleteHandler = () => {
    dispatch(deleteTrademark(tradeMark?.name));
    dispatch(
      openSnackbar({
        open: true,
        message: 'Trademark deleted successfully.',
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
    initialValues: getInitialValues(tradeMark!),
    validationSchema: TrademarkSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        const newTradeTrademark = {
          name: values.name,
          maker: maker,
          status: values.status
        };

        if (tradeMark) {
          dispatch(editTrademark(tradeMark.name, newTradeTrademark));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Trademark update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          dispatch(addTrademark(newTradeTrademark));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Trademark add successfully.',
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
          <DialogTitle>{tradeMark ? 'Editar Trademark' : 'Agregar Trademark'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={9}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="tradeMark-name">Nombre</InputLabel>
                      <TextField
                        fullWidth
                        id="tradeMark-name"
                        placeholder="Ingresa Nombre Trademark"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={9}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="personal-experience">Maker</InputLabel>
                      <Select
                        fullWidth
                        id="tradeMark-maker"
                        {...getFieldProps('maker')}
                        value={maker || tradeMark?.maker}
                        onChange={handleChange}
                      >
                        {makerList
                          .filter((item: any) => item.status === true)
                          .map((option: any) => (
                            <MenuItem key={option.name} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <FormControlLabel
                        control={<Switch sx={{ mt: 0 }} defaultChecked={tradeMark?.status} />}
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
                    {tradeMark ? 'Edit' : 'Add'}
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

export default AddTrademark;
