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
    Name: '',
    Status: false
  };

  if (subst) {
    newSubstance.Name = subst.Name;
    newSubstance.Status = subst.Status;
    return _.merge({}, newSubstance, subst);
  }
  return newSubstance;
};

// ==============================|| ACTIVE SUBSTANCES ADD / EDIT / DELETE ||============================== //

export interface Props {
  subst?: any;
  onCancel: () => void;
}

const AddActiveSubstances = ({ subst, onCancel }: Props) => {
  const dispatch = useDispatch();
  const isCreating = !subst;

  const SubstSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido')
  });

  const deleteHandler = async () => {
    await dispatch(deleteSubs(subst.ID));
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
    onCancel();
  };

  const formik = useFormik({
    initialValues: getInitialValues(subst!),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const newSubstance = {
          Name: values.Name,
          Status: values.Status
        };

        if (subst) {
          await dispatch(editSubs(subst.ID, newSubstance));
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
          await dispatch(addSubs(newSubstance));
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
                      <InputLabel htmlFor="subst-Name">Nombre</InputLabel>
                      <TextField
                        fullWidth
                        id="subst-Name"
                        placeholder="Ingresar Nombre"
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
                        control={<Switch sx={{ mt: 0 }} defaultChecked={subst?.Status} value={subst?.Status} />}
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

export default AddActiveSubstances;
