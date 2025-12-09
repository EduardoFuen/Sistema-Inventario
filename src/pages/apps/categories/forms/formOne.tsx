import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, Grid, InputLabel, Stack, TextField, Typography, FormControlLabel, Switch } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project import
import MainCard from 'components/MainCard';
import { addCategoryOne, editCategory } from 'store/reducers/category';
import { CATEGORY } from 'config';

// types
import { CategoryOne } from 'types/products';

// ==============================|| ADD CATEGORY ONE - MAIN ||============================== //

interface Props {
  data: CategoryOne;
}

function AddCategoryOne({ data }: Props) {
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    history(`/product-list`);
  };

  const SubstSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido')
  });

  const formik = useFormik({
    initialValues: {
      Name: data?.Name || '',
      Status: data?.Status || false
    },
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (data?.Name) {
          await dispatch(editCategory(CATEGORY.CategoryOne, Number(data?.ID), values));
        } else {
          await dispatch(addCategoryOne(values));
          resetForm();
        }
        setSubmitting(false);
      } catch (error: any) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <MainCard>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MainCard>
                  <Grid container spacing={1} direction="column">
                    <Grid item xs={12}>
                      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                        Grupo
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                          <InputLabel>Nombre del Grupo</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            placeholder="Ingresar Nombre del Grupo"
                            fullWidth
                            {...getFieldProps('Name')}
                            error={Boolean(touched.Name && errors.Name)}
                            helperText={touched.Name && errors.Name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                          <InputLabel>Estado</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <FormControlLabel
                            control={<Switch sx={{ mt: 0 }} defaultChecked={data?.Status} value={data?.Status} />}
                            label=""
                            labelPlacement="top"
                            {...getFieldProps('Status')}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained" sx={{ textTransform: 'none' }} disabled={isSubmitting}>
                          Agregar
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </MainCard>
    </>
  );
}

export default AddCategoryOne;
