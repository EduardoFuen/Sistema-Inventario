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
import { addSubs, editSubs, deleteSubs } from 'store/reducers/activeSubst';

// assets
import { DeleteFilled } from '@ant-design/icons';

// constant
const getInitialValues = (subst: FormikValues | null) => {
  const newSubstance = {
    name: '',
    status: false
  };

  if (subst) {
    newSubstance.name = subst.name;
    newSubstance.status = subst.status;
    return _.merge({}, newSubstance, subst);
  }
  return newSubstance;
};

// ==============================|| ACTIVE SUBSTANCES ADD / EDIT / DELETE ||============================== //

export interface Props {
  subst?: any;
  onCancel: () => void;
}

const AddPackList = ({ subst, onCancel }: Props) => {
  const dispatch = useDispatch();
  const isCreating = !subst;

  const SubstSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Nombre es requerido')
  });

  const deleteHandler = () => {
    dispatch(
      openSnackbar({
        open: true,
        message: 'Deleted successfully.',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
    dispatch(deleteSubs(subst.name));
    onCancel();
  };

  const formik = useFormik({
    initialValues: getInitialValues(subst!),
    validationSchema: SubstSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        const newSubstance = {
          name: values.name,
          status: values.status,
          qty: 0
        };

        if (subst) {
          dispatch(editSubs(subst.name, newSubstance));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          dispatch(addSubs(newSubstance));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Add successfully.',
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
          <DialogTitle>{subst ? 'Editar Sustancias o principios activos' : 'Agregar Sustancias o principios activos'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="subst-name">Nombre</InputLabel>
                      <TextField
                        fullWidth
                        id="subst-name"
                        placeholder="Ingresar Nombre"
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
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <FormControlLabel
                        control={<Switch sx={{ mt: 0 }} defaultChecked={subst?.status} />}
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
                  <Tooltip title="Delete Subst" placement="top">
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
                    {subst ? 'Edit' : 'Add'}
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
