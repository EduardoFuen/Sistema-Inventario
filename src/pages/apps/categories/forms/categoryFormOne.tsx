import { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, Grid, InputLabel, Stack, TextField, Typography, FormControlLabel, Switch } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project import
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { addCategory, editCategory } from 'store/reducers/category';
import { useSelector } from 'store';

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function AddCategoryOne(category: any) {
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    history(`/p/product-list`);
  };

  const SubstSchema = Yup.object().shape({
    categoryOne: Yup.string().max(255).required('Nombre es requerido')
  });
  const { categoryListOne } = useSelector((state) => state.category);

  const items = useMemo(() => {
    if (category) {
      const { categoryOne } = category;
      return categoryListOne.find((item) => item?.categoryOne === categoryOne);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      categoryOne: items?.categoryOne || '',
      status: items?.status || false
    },
    validationSchema: SubstSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        if (category?.categoryOne) {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Categoria Update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
          dispatch(editCategory('CategoryOne', category?.categoryOne, values));
        } else {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Categoria Add successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
          dispatch(addCategory(values));
          resetForm();
        }
        setSubmitting(false);
      } catch (error) {
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
                        Categoria
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                          <InputLabel>Nombre de Categoria</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            placeholder="Ingresar Nombre Categoria"
                            fullWidth
                            {...getFieldProps('categoryOne')}
                            error={Boolean(touched.categoryOne && errors.categoryOne)}
                            helperText={touched.categoryOne && errors.categoryOne}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                          <InputLabel>Estado</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <FormControlLabel
                            control={<Switch sx={{ mt: 0 }} defaultChecked={items?.status} />}
                            label=""
                            labelPlacement="top"
                            {...getFieldProps('status')}
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
