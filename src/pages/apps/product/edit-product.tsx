import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  FormLabel,
  Avatar,
  Autocomplete
} from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project import

import { useSelector, useDispatch } from 'store';
import MainCard from 'components/MainCard';
import { editProduct } from 'store/reducers/product';

// assets
import { CameraOutlined } from '@ant-design/icons';

// ==============================|| EDIT PRODUCT - MAIN ||============================== //

function UpdateProduct() {
  const history = useNavigate();
  const theme = useTheme();
  const { id } = useParams();

  const [avatar, setAvatar] = useState<string | undefined>();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [istaxed, setIsTaxed] = useState<boolean>();

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const { makerList } = useSelector((state) => state.maker);
  const dispatch = useDispatch();
  const { tradeMarkList } = useSelector((state) => state.trademaker);
  const { packList } = useSelector((state) => state.pack);
  const { typeProductList } = useSelector((state) => state.typeProduct);
  const { products } = useSelector((state) => state.product);
  const { todoListSubs } = useSelector((state) => state.substances);
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { categoryListThree, categoryListOne, categoryListTwo } = useSelector((state) => state.category);

  const product = useMemo(() => {
    if (id) {
      return products.find((item) => item.ID === Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/product-list`);
  };

  const SubstSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido'),
    Sku: Yup.string().max(255).required('sku es requerido'),
    Ean: Yup.string().max(255).required('ean es requerido')
  });

  const formik = useFormik({
    initialValues: {
      Name: product?.Name,
      Sku: product?.Sku,
      Ean: product?.Ean,
      Maker: product?.Maker,
      Trademark: product?.Trademark,
      TypeProduct: product?.TypeProduct,
      Variation: product?.Variation,
      CategoryOne: product?.CategoryOne,
      CategoryTwo: product?.CategoryTwo,
      CategoryThree: product?.CategoryThree,
      Pack: product?.Wrapper,
      Quantity: product?.Quantity,
      MakerUnit: product?.MakerUnit,
      Weight: product?.Weight,
      Width: product?.Width,
      PackInfo: product?.PackInfo,
      Height: product?.Height,
      WrapperUnit: product?.WrapperUnit,
      Depth: product?.Depth,
      Substances: product?.Substances,
      Keywords: product?.Keywords,
      Substitutes: product?.Substitutes,
      Warehouse: product?.Warehouse,
      UrlImage: product?.UrlImage,
      Status: product?.Status,
      Tax: product?.Tax,
      IsTaxed: product?.IsTaxed
    },
    validationSchema: SubstSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        dispatch(editProduct(Number(id), values));
        history(`/product-list`);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <MainCard>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos Básicos
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Nombre Producto</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Name')}
                        error={Boolean(touched.Name && errors.Name)}
                        helperText={touched.Name && errors.Name}
                        placeholder="Ingresar Nombre"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>SKU</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Sku')}
                        error={Boolean(touched.Sku && errors.Sku)}
                        helperText={touched.Sku && errors.Sku}
                        placeholder="Ingresar SKU"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>EAN</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Ean')}
                        error={Boolean(touched.Ean && errors.Ean)}
                        helperText={touched.Ean && errors.Ean}
                        placeholder="Ingresar EAN"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mt: 2, opacity: 0.5 }}> Es gravado</InputLabel>
                      <FormControlLabel
                        control={
                          <Switch
                            sx={{ mt: 0 }}
                            onChange={() => {
                              setIsTaxed(!istaxed);
                              setFieldValue('IsTaxed', !istaxed);
                            }}
                            defaultChecked={product?.IsTaxed}
                          />
                        }
                        label=""
                        labelPlacement="top"
                        {...getFieldProps('IsTaxed')}
                      />
                    </Grid>
                    {istaxed ||
                      (product?.IsTaxed && (
                        <Grid item xs={6}>
                          <InputLabel sx={{ mt: 2, opacity: 0.5 }}>IVA</InputLabel>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            {...getFieldProps('Tax')}
                            placeholder="Ingresar IVA"
                            fullWidth
                          />
                        </Grid>
                      ))}
                    <Grid item xs={6}>
                      <Stack alignItems="center" sx={{ mt: 1 }}>
                        <Typography>Agregar imagen</Typography>
                        <FormLabel
                          htmlFor="change-avtar"
                          sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover .MuiBox-root': { opacity: 1 },
                            cursor: 'pointer'
                          }}
                        >
                          <Avatar src={avatar} sx={{ width: 124, height: 124, border: '1px solid' }} variant="rounded" />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                              width: '100%',
                              height: '100%',
                              opacity: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Stack spacing={0.5} alignItems="center">
                              <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                              <Typography sx={{ color: 'secondary.lighter' }}>Agregar Imagen</Typography>
                            </Stack>
                          </Box>
                        </FormLabel>
                        <TextField
                          type="file"
                          id="change-avtar"
                          label="Outlined"
                          variant="outlined"
                          sx={{ display: 'none' }}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setSelectedImage(e.target.files?.[0]);
                          }}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos Adicionales
                  </Typography>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Maker</InputLabel>
                      <TextField placeholder="Seleccionar Maker" fullWidth select {...getFieldProps('Maker')}>
                        {makerList
                          .filter((item: any) => item.Status === true)
                          .map((option: any) => (
                            <MenuItem key={option.Name} value={option.Name}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Trademark</InputLabel>
                      <TextField placeholder="Seleccionar Trademark" {...getFieldProps('Trademark')} fullWidth select>
                        {tradeMarkList
                          .filter((item: any) => item.Status === true)
                          .map((option: any) => (
                            <MenuItem key={option.Name} value={option.Name}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Tipo de Producto</InputLabel>
                      <TextField
                        placeholder="Seleccionar Tipo Producto"
                        {...getFieldProps('TypeProduct')}
                        error={Boolean(touched.TypeProduct && errors.TypeProduct)}
                        helperText={touched.TypeProduct && errors.TypeProduct}
                        fullWidth
                        select
                      >
                        {typeProductList
                          .filter((item: any) => item.Status === true)
                          .map((option: any) => (
                            <MenuItem key={option.Name} value={option.Name}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Bodega</InputLabel>
                      <Autocomplete
                        multiple
                        id="warehouse-list"
                        options={warehouseList.filter((item: any) => item.Status === true)}
                        getOptionLabel={(option) => option.Name}
                        defaultValue={[...(product?.Warehouse || '')] as []}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          setFieldValue('Warehouse', newValue === null ? '' : newValue);
                        }}
                        renderInput={(params) => <TextField {...params} placeholder="" />}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            p: 0.5
                          },
                          '& .MuiAutocomplete-tag': {
                            bgcolor: 'primary.lighter',
                            border: '1px solid',
                            borderColor: 'primary.light',
                            '& .MuiSvgIcon-root': {
                              color: 'primary.main',
                              '&:hover': {
                                color: 'primary.dark'
                              }
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Variación</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Variation')}
                        placeholder="Ingresar Variación"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Categoria</InputLabel>
                      <TextField placeholder="Seleccionar Categoria" fullWidth select {...getFieldProps('CategoryOne')}>
                        {categoryListOne
                          .filter((item: any) => item.Status === true)
                          .map((option: any) => (
                            <MenuItem key={option.Name} value={option.Name}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Categoria 2</InputLabel>
                      <TextField placeholder="Seleccionar Categoria" fullWidth select {...getFieldProps('CategoryTwo')}>
                        {categoryListTwo
                          .filter((item: any) => item.Status === true)
                          .map((option: any) => (
                            <MenuItem key={option.Name} value={option.Name}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Categoria 3</InputLabel>
                      <TextField placeholder="Seleccionar Categoria" {...getFieldProps('CategoryThree')} fullWidth select>
                        {categoryListThree
                          .filter((item: any) => item.Status === true)
                          .map((option: any) => (
                            <MenuItem key={option.Name} value={option.Name}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>

              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos Medidas
                  </Typography>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Envase</InputLabel>
                      <TextField
                        placeholder="Selecconar Envase"
                        {...getFieldProps('Pack')}
                        error={Boolean(touched.Pack && errors.Pack)}
                        helperText={touched.Pack && errors.Pack}
                        select
                        fullWidth
                      >
                        {packList
                          .filter((item: any) => item.Status === true)
                          .map((option: any) => (
                            <MenuItem key={option.Name} value={option.Name}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Cantidad</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Quantity')}
                        placeholder="Ingresar Cantidad"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Maker Unit</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('MakerUnit')}
                        placeholder="Ingresar Maker Unit"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Weight(grams)</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Weight')}
                        placeholder="Ingresar Weight(grams)"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Width(cm)</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Width')}
                        placeholder="Ingresar Width(cm)"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Pack</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Wrapper')}
                        placeholder="Ingresar Pack"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Height(cm) </InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Height')}
                        placeholder="Ingresar Height(cm)"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}> Pack Unit</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('WrapperUnit')}
                        placeholder="Ingresar Pack Unit"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Depth(cm)</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Depth')}
                        placeholder="Ingresar Depth(cm)"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <MainCard>
                      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                        Sustancias o principios activos
                      </Typography>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={12}>
                          <Autocomplete
                            multiple
                            id="substances-list"
                            options={todoListSubs.filter((item: any) => item.Status === true)}
                            getOptionLabel={(option) => option.Name}
                            defaultValue={[...(product?.Substances || '')] as []}
                            filterSelectedOptions
                            onChange={(event, newValue) => {
                              setFieldValue('Substances', newValue === null ? '' : newValue);
                            }}
                            renderInput={(params) => <TextField {...params} placeholder="" />}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                p: 0.5
                              },
                              '& .MuiAutocomplete-tag': {
                                bgcolor: 'primary.lighter',
                                border: '1px solid',
                                borderColor: 'primary.light',
                                '& .MuiSvgIcon-root': {
                                  color: 'primary.main',
                                  '&:hover': {
                                    color: 'primary.dark'
                                  }
                                }
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos Extras
                  </Typography>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Keywords</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        multiline
                        rows={3}
                        placeholder="Ingresar Keywords del Producto"
                        fullWidth
                        {...getFieldProps('Keywords')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Sustitutos</InputLabel>
                      <Autocomplete
                        multiple
                        id="list-product"
                        options={products.filter((item: any) => item.Status === true)}
                        getOptionLabel={(option) => option?.Name}
                        defaultValue={[...(product?.Substitutes || '')] as []}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          setFieldValue('Substitutes', newValue === null ? '' : newValue);
                        }}
                        renderInput={(params) => <TextField {...params} placeholder="Producto" />}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            p: 0.5
                          },
                          '& .MuiAutocomplete-tag': {
                            bgcolor: 'primary.lighter',
                            border: '1px solid',
                            borderColor: 'primary.light',
                            '& .MuiSvgIcon-root': {
                              color: 'primary.main',
                              '&:hover': {
                                color: 'primary.dark'
                              }
                            }
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                  <FormControlLabel
                    control={<Switch sx={{ mt: 0 }} defaultChecked={product?.Status} value={product?.Status} />}
                    label=""
                    {...getFieldProps('status')}
                    labelPlacement="top"
                  />
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Update Product
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </MainCard>
    </>
  );
}

export default UpdateProduct;
