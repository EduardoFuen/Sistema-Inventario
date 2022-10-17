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
import { addPack, editPack, deletePack } from 'store/reducers/pack';

// assets
import { DeleteFilled } from '@ant-design/icons';

// constant
const getInitialValues = (pack: FormikValues | null) => {
  const newPack = {
    Name: '',
    Status: false
  };

  if (pack) {
    newPack.Name = pack.Name;
    newPack.Status = pack.Status;
    return _.merge({}, newPack, pack);
  }
  return newPack;
};

// ==============================|| PACK ADD / EDIT / DELETE ||============================== //

export interface Props {
  pack?: any;
  onCancel: () => void;
}

const AddPackList = ({ pack, onCancel }: Props) => {
  const dispatch = useDispatch();
  const isCreating = !pack;

  const UserSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido')
  });

  const deleteHandler = () => {
    dispatch(
      openSnackbar({
        open: true,
        message: 'Envase deleted successfully.',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
    dispatch(deletePack(pack.ID));
    onCancel();
  };

  const formik = useFormik({
    initialValues: getInitialValues(pack!),
    validationSchema: UserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const newPack = {
          Name: values.Name,
          Status: values.Status
        };

        if (pack) {
          await dispatch(editPack(pack.ID, newPack));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Envase update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          await dispatch(addPack(newPack));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Envase add successfully.',
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
          <DialogTitle>{pack ? 'Editar Envase' : 'Agregar Envase'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="pack-Name">Nombre</InputLabel>
                      <TextField
                        fullWidth
                        id="pack-Name"
                        placeholder="Ingresar Nombre Envase"
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
                        control={<Switch sx={{ mt: 0 }} defaultChecked={pack?.Status} value={pack?.Status} />}
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
                    {pack ? 'Edit' : 'Add'}
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
