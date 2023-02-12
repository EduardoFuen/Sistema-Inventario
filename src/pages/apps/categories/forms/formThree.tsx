import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, Grid, InputLabel, Stack, TextField, Typography, FormControlLabel, Switch, MenuItem } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project import
import MainCard from 'components/MainCard';
import { addCategoryThree, editCategory } from 'store/reducers/category';
import { useSelector } from 'store';
import { CATEGORY } from 'config';
// types
import { CategoryThree } from 'types/products';

// ==============================|| ADD CATEGORY THREE - MAIN ||============================== //

interface Props {
  data: CategoryThree;
}

function AddCategoryThree({ data }: Props) {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { categoryListOne, categoryListTwo } = useSelector((state) => state.category);
  const handleCancel = () => {
    history(`/product-list`);
  };

  const SubstSchema = Yup.object().shape({
    CategoryOneID: Yup.string().max(255).required('Grupo es requerido'),
    CategoryTwoID: Yup.string().max(255).required('Categoria 1 es requerido'),
    Name: Yup.string().max(255).required('Nombre es requerido')
  });

  const formik = useFormik({
    initialValues: {
      Name: data?.Name || '',
      CategoryOneID: data?.CategoryOneID || 0,
      CategoryTwoID: data?.CategoryTwoID || 0,
      Status: data?.Status || false
    },
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (data?.Name) {
          await dispatch(editCategory(CATEGORY.CategoryThree, Number(data?.ID), values));
        } else {
          await dispatch(addCategoryThree(values));
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
                        Categoria 2
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                          <InputLabel>Grupo</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <TextField
                            placeholder="Grupo"
                            fullWidth
                            select
                            {...getFieldProps('CategoryOneID')}
                            error={Boolean(touched.CategoryOneID && errors.CategoryOneID)}
                            helperText={touched.CategoryOneID && errors.CategoryOneID}
                          >
                            {categoryListOne
                              .filter((item: any) => item.Status === true)
                              .map((option: any) => (
                                <MenuItem key={option.Name} value={option.ID}>
                                  {option.Name}
                                </MenuItem>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                          <InputLabel>Categoria 1</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <TextField
                            placeholder="Categoria 1"
                            fullWidth
                            select
                            {...getFieldProps('CategoryTwoID')}
                            error={Boolean(touched.CategoryTwoID && errors.CategoryTwoID)}
                            helperText={touched.CategoryTwoID && errors.CategoryTwoID}
                          >
                            {categoryListTwo
                              .filter((item: any) => item.Status === true)
                              .map((option: any) => (
                                <MenuItem key={option.Name} value={option.ID}>
                                  {option.Name}
                                </MenuItem>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={5} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                          <InputLabel>Nombre de Categoria 2</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            placeholder="Ingresar Nombre Categoria"
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

export default AddCategoryThree;
