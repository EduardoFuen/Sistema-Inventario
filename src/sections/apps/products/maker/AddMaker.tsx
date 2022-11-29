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
import { merge } from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import { addMaker, editMaker, deleteMaker } from 'store/reducers/maker';

// assets
import { DeleteFilled } from '@ant-design/icons';

// types
import { Maker } from 'types/products';

// constant
const getInitialValues = (maker: FormikValues | null) => {
  const newMaker = {
    Name: '',
    Status: false
  };

  if (maker) {
    newMaker.Status = maker?.Status;
    return merge({}, newMaker, maker);
  }

  return newMaker;
};

// ==============================|| MAKER ADD / EDIT / DELETE ||============================== //

export interface Props {
  maker?: any;
  onCancel: () => void;
}

const AddMaker = ({ maker, onCancel }: Props) => {
  const dispatch = useDispatch();
  const isCreating = !maker;

  const MakerSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido')
  });

  const deleteHandler = async () => {
    await dispatch(deleteMaker(maker?.ID));
    onCancel();
  };
  const formik = useFormik({
    initialValues: getInitialValues(maker!),
    validationSchema: MakerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const newMaker: Maker = {
          Name: values.Name,
          Status: values.Status
        };

        if (maker) {
          await dispatch(editMaker(maker.ID, newMaker));
        } else {
          await dispatch(addMaker(newMaker));
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
          <DialogTitle>{maker ? 'Editar Maker' : 'Agregar Maker'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={9}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="maker-Name">Nombre</InputLabel>
                      <TextField
                        fullWidth
                        id="maker-Name"
                        placeholder="Ingresa Nombre Maker"
                        {...getFieldProps('Name')}
                        error={Boolean(touched.Name && errors.Name)}
                        helperText={touched.Name && errors.Name}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <FormControlLabel
                        control={<Switch sx={{ mt: 0 }} defaultChecked={maker?.Status} value={maker?.Status} />}
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
                    {maker ? 'Edit' : 'Add'}
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

export default AddMaker;
