import { useDispatch } from 'react-redux';
// material-ui
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack, Tooltip, FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';
// import UploadSingleFile from 'components/third-party/dropzone/SingleFile';
// project imports
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { addMaker, editMaker, deleteMaker } from 'store/reducers/maker';

// assets
import { DeleteFilled } from '@ant-design/icons';

// constant
const getInitialValues = (maker: FormikValues | null) => {
  const newMaker = {
    name: '',
    status: false
  };

  if (maker) {
    newMaker.status = maker.status;
    return _.merge({}, newMaker, maker);
  }

  return newMaker;
};

// ==============================|| MAKER ADD / EDIT / DELETE ||============================== //

export interface Props {
  maker?: any;
  onCancel: () => void;
}

const ImportMarker = ({ maker, onCancel }: Props) => {
  const dispatch = useDispatch();
  const isCreating = !maker;

  const MakerSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Nombre es requerido')
  });

  const deleteHandler = () => {
    dispatch(deleteMaker(maker?.name));
    dispatch(
      openSnackbar({
        open: true,
        message: 'Maker deleted successfully.',
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
    initialValues: getInitialValues(maker!),
    validationSchema: MakerSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        const newMaker = {
          name: values.name,
          status: values.status
        };

        if (maker) {
          dispatch(editMaker(maker.name, newMaker));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Maker update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          dispatch(addMaker(newMaker));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Maker add successfully.',
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

  const { handleSubmit, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>Importar Registro</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Formik
                  initialValues={{ files: null }}
                  onSubmit={(values: any) => {
                    console.log(values);

                    // submit form
                  }}
                  /*   validationSchema={yup.object().shape({
                    files: yup.mixed().required('Avatar is a required.')
                  })} */
                >
                  {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Stack spacing={1.5} alignItems="center">
                            {/*  <UploadSingleFile setFieldValue={setFieldValue} file={values.files} error={touched.files && !!errors.files} /> */}
                            {touched.files && errors.files && (
                              <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.files}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
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

export default ImportMarker;
