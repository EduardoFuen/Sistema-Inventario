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
import { openSnackbar } from 'store/reducers/snackbar';
import { editProduct } from 'store/reducers/product';

// assets
import { CameraOutlined } from '@ant-design/icons';

// ==============================|| EDIT PRODUCT - MAIN ||============================== //

/* const getInitialValues = (product: FormikValues | null) => {
  console.log(product?.name);
  
  const newSubstance = {
    name: product?.name,
    sku: '',
    ean: '',
    price: '',
    maker: '',
    trademark: '',
    type_product: '',
    variation: '',
    categoryOne: '',
    categoryTwo: '',
    categoryThree: '',
    pack: '',
    quantity: '',
    makerUnit: '',
    weight: '',
    width: '',
    packInfo: '',
    height: '',
    packUnit: '',
    depth: '',
    quantityInv: '',
    warehouse: '',
    substances: '',
    keywords: '',
    substitutes: '',
    img: '',
    status: false
  };

  return newSubstance;
}; */

function AddNewProduct() {
  const history = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const statuss = [
    {
      value: 'Saludable',
      label: 'Saludable'
    },
    {
      value: 'Salud',
      label: 'Salud'
    }
  ];

  //  const [product, setProduct] = useState({});
  const [avatar, setAvatar] = useState<string | undefined>();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const { makerList } = useSelector((state) => state.maker);
  const dispatch = useDispatch();
  const { tradeMakerList } = useSelector((state) => state.trademaker);
  const { packList } = useSelector((state) => state.pack);
  const { typeProductList } = useSelector((state) => state.typeProduct);
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { products } = useSelector((state) => state.product);
  const { todoListSubs } = useSelector((state) => state.substances);

  const product = useMemo(() => {
    if (id) {
      return products.find((item) => item.name === id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/p/product-list`);
  };

  const SubstSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Nombre es requerido'),
    sku: Yup.string().max(255).required('sku es requerido'),
    ean: Yup.string().max(255).required('ean es requerido'),
    price: Yup.string().max(255).required('Precio es requerido'),
    type_product: Yup.string().max(255).required('Tipo de Producto es requerido'),
    pack: Yup.string().max(255).required('Envase es requerido')
  });

  const formik = useFormik({
    initialValues: {
      name: product?.name,
      sku: product?.sku,
      ean: product?.ean,
      price: product?.price,
      maker: product?.maker,
      trademark: product?.trademark,
      type_product: product?.type_product,
      variation: product?.variation,
      categoryOne: '',
      categoryTwo: '',
      categoryThree: '',
      pack: product?.pack,
      quantity: product?.quantity,
      makerUnit: product?.makerUnit,
      weight: product?.weight,
      width: product?.width,
      packInfo: product?.packInfo,
      height: product?.height,
      packUnit: product?.packUnit,
      depth: product?.depth,
      quantityInv: product?.quantityInv,
      warehouse: product?.warehouse,
      substances: product?.substances,
      keywords: product?.keywords,
      substitutes: product?.substitutes,
      img: '',
      status: product?.status
    },
    validationSchema: SubstSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        dispatch(editProduct(id, values));
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
        history(`/p/product-list`);
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
                    Datos Basicos
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Nombre Producto</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        placeholder="Ingresar Nombre"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>SKU</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('sku')}
                        error={Boolean(touched.sku && errors.sku)}
                        helperText={touched.sku && errors.sku}
                        placeholder="Ingresar SKU"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>EAN</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('ean')}
                        error={Boolean(touched.ean && errors.ean)}
                        helperText={touched.ean && errors.ean}
                        placeholder="Ingresar EAN"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Precio</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        type="number"
                        placeholder="Ingresar Precio"
                        fullWidth
                        {...getFieldProps('price')}
                        error={Boolean(touched.price && errors.price)}
                        helperText={touched.price && errors.price}
                      />
                    </Grid>
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
                      <TextField placeholder="Seleccionar Maker" fullWidth select {...getFieldProps('maker')}>
                        {makerList.map((option) => (
                          <MenuItem key={option.name} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Trademark</InputLabel>
                      <TextField placeholder="Seleccionar Trademark" {...getFieldProps('trademark')} fullWidth select>
                        {tradeMakerList.map((option) => (
                          <MenuItem key={option.name} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Tipo de Producto</InputLabel>
                      <TextField
                        placeholder="Seleccionar Tipo Producto"
                        {...getFieldProps('type_product')}
                        error={Boolean(touched.type_product && errors.type_product)}
                        helperText={touched.type_product && errors.type_product}
                        fullWidth
                        select
                      >
                        {typeProductList.map((option) => (
                          <MenuItem key={option.name} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Variación</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('variation')}
                        placeholder="Ingresar Variación"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Categoria</InputLabel>
                      <TextField placeholder="Seleccionar Categoria" fullWidth select {...getFieldProps('categoryOne')}>
                        {statuss.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Categoria 2</InputLabel>
                      <TextField placeholder="Seleccionar Categoria" fullWidth select {...getFieldProps('categoryTwo')}>
                        {statuss.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Categoria 3</InputLabel>
                      <TextField placeholder="Seleccionar Categoria" {...getFieldProps('categoryThree')} fullWidth select>
                        {statuss.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
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
                        {...getFieldProps('pack')}
                        error={Boolean(touched.pack && errors.pack)}
                        helperText={touched.pack && errors.pack}
                        select
                        fullWidth
                      >
                        {packList.map((option) => (
                          <MenuItem key={option.name} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Cantidad</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('quantity')}
                        placeholder="Ingresar Cantidad"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Maker Unit</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('makerUnit')}
                        placeholder="Ingresar Maker Unit"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Weight(grams)</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('weight')}
                        placeholder="Ingresar Weight(grams)"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Width(cm)</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('width')}
                        placeholder="Ingresar Width(cm)"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Pack</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('packInfo')}
                        placeholder="Ingresar Pack"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Height(cm) </InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('height')}
                        placeholder="Ingresar Height(cm)"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}> Pack Unit</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('packUnit')}
                        placeholder="Ingresar Pack Unit"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Depth(cm)</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('depth')}
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
                        Inventario
                      </Typography>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={6}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Stock</InputLabel>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            {...getFieldProps('quantityInv')}
                            placeholder="Ingresar Stock"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Bodega</InputLabel>
                          <Autocomplete
                            multiple
                            id="warehouse-list"
                            options={warehouseList}
                            getOptionLabel={(option) => option.name}
                            defaultValue={[]}
                            filterSelectedOptions
                            onChange={(event, newValue) => {
                              setFieldValue('warehouse', newValue === null ? '' : newValue);
                            }}
                            renderInput={(params) => <TextField {...params} placeholder="Bodega" />}
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
                    <MainCard>
                      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                        Sustancias o principios activos
                      </Typography>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={12}>
                          <Autocomplete
                            multiple
                            id="substances-list"
                            options={todoListSubs}
                            getOptionLabel={(option) => option.name}
                            defaultValue={[]}
                            filterSelectedOptions
                            onChange={(event, newValue) => {
                              setFieldValue('substances', newValue === null ? '' : newValue);
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
                        {...getFieldProps('keywords')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Sustitutos</InputLabel>
                      <Autocomplete
                        multiple
                        id="list-product"
                        options={products}
                        getOptionLabel={(option) => option.name}
                        defaultValue={[]}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          setFieldValue('substitutes', newValue === null ? '' : newValue);
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
                  <FormControlLabel control={<Switch sx={{ mt: 0 }} />} label="Estado" labelPlacement="top" {...getFieldProps('status')} />
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Add new Product
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

export default AddNewProduct;
