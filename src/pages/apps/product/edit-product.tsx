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
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project import
import { useSelector, useDispatch } from 'store';
import MainCard from 'components/MainCard';
import { editProduct } from 'store/reducers/product';
import { idsToString } from 'utils/convertToObject';
import { openSnackbar } from 'store/reducers/snackbar';
import { getTrademarkList } from 'store/reducers/trademark';
import { getCategoryListOne, getCategoryListTwo, getCategoryListThree } from 'store/reducers/category';
import { getMakerList } from 'store/reducers/maker';
import { getPackList } from 'store/reducers/pack';
import { getSubsList } from 'store/reducers/activeSubst';
import { getWarehouseList } from 'store/reducers/warehouse';

// types
import {
  Products,
  Packs,
  TypeProduct,
  Warehouses,
  Trademark,
  Maker,
  Substances,
  CategoryOne,
  CategoryTwo,
  CategoryThree
} from 'types/products';

// assets
import { CameraOutlined } from '@ant-design/icons';

// ==============================|| EDIT PRODUCT - MAIN ||============================== //

const getInitialValues = (product: FormikValues | null) => {
  const newProduct: Products = {
    Name: product?.Name,
    Sku: product?.Sku,
    Ean: product?.Ean,
    MakerID: product?.Maker?.ID || '',
    TrademarkID: product?.TrademarkID || '',
    TypesProductID: product?.TypesProductID || '',
    Variation: product?.Variation,
    CategoryOneID: product?.CategoryOneID || '',
    CategoryTwoID: product?.CategoryTwoID || '',
    CategoryThreeID: product?.CategoryThreeID || '',
    PackID: product?.PackID || '',
    Wrapper: product?.Wrapper,
    Quantity: product?.Quantity || '',
    MakerUnit: product?.MakerUnit || '',
    Weight: product?.Weight || '',
    Width: product?.Width || '',
    PackInfo: product?.PackInfo,
    Height: product?.Height || '',
    WrapperUnit: product?.WrapperUnit || '',
    Depth: product?.Depth || '',
    SubstancesIDS: product?.Substance || '',
    Keywords: product?.Keywords,
    SubstitutesIDS: product?.Substitutes || '',
    WarehouseIDS: product?.Warehouses || '',
    UrlImage: product?.UrlImage,
    Status: product?.Status,
    Tax: product?.iva?.toString(),
    IsTaxed: product?.Taxed
  };
  return newProduct;
};

function UpdateProduct() {
  const history = useNavigate();
  const theme = useTheme();
  const { id } = useParams();

  const [avatar, setAvatar] = useState<string | undefined>();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [istaxed, setIsTaxed] = useState<boolean | undefined>();
  const [maker_ID, setIsMakerID] = useState<string | number>();

  useEffect(() => {
    dispatch(getTrademarkList());
    dispatch(getCategoryListOne());
    dispatch(getCategoryListTwo());
    dispatch(getCategoryListThree());
    dispatch(getPackList());
    dispatch(getMakerList());
    dispatch(getSubsList());
    dispatch(getWarehouseList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const { products, error } = useSelector((state) => state.product);
  const { todoListSubs } = useSelector((state) => state.substances);
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { categoryListThree, categoryListOne, categoryListTwo } = useSelector((state) => state.category);

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const product = useMemo(() => {
    if (id) {
      return products.find((item: Products) => item.ID === Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ((error && Object.keys(error).length !== 0) || error?.response?.data?.Error) {
      dispatch(
        openSnackbar({
          open: true,
          message: error?.response?.data?.Error || error?.message,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }

    if (product) {
      setIsTaxed(product?.Taxed);
      setAvatar(product?.UrlImage);
    }
  }, [error, dispatch, product]);

  const handleCancel = () => {
    history(`/product-list`);
  };

  const SubstSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('Nombre es requerido'),
    Sku: Yup.string().max(255).required('Sku es requerido'),
    Ean: Yup.string().max(255).required('Ean es requerido')
  });

  const onChange = (e: any) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFieldValue('UrlImage', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const formik = useFormik({
    initialValues: getInitialValues(product!),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let data: Products = {
          ...values,
          CategoryOneID: values?.CategoryOneID?.toString(),
          CategoryTwoID: values?.CategoryTwoID?.toString(),
          CategoryThreeID: values?.CategoryThreeID?.toString(),
          PackID: values?.PackID?.toString(),
          TrademarkID: values?.TrademarkID?.toString(),
          MakerID: values?.MakerID?.toString(),
          TypesProductID: values?.TypesProductID?.toString(),
          Taxed: values.IsTaxed,
          Quantity: values?.Quantity?.toString(),
          MakerUnit: values.MakerUnit?.toString(),
          iva: values.Tax?.toString(),
          Weight: values?.Weight?.toString(),
          Width: values?.Width?.toString(),
          Height: values?.Height?.toString(),
          Depth: values?.Depth?.toString(),
          SubstitutesIDS: idsToString(values.SubstitutesIDS),
          WarehouseIDS: idsToString(values.WarehouseIDS),
          SubstancesIDS: idsToString(values.SubstancesIDS)
        };
        await dispatch(editProduct(Number(id), data));
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
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
                            defaultChecked={product?.Taxed}
                            value={product?.Taxed}
                          />
                        }
                        label=""
                        labelPlacement="top"
                        {...getFieldProps('IsTaxed')}
                      />
                    </Grid>
                    {istaxed && (
                      <Grid item xs={6}>
                        <InputLabel sx={{ mt: 2, opacity: 0.5 }}>IVA</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('Tax')}
                          placeholder="Ingresar IVA"
                          fullWidth
                        />
                      </Grid>
                    )}
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
                            onChange(e);
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
                      <TextField
                        placeholder="Seleccionar Maker"
                        fullWidth
                        select
                        {...getFieldProps('MakerID')}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          setIsMakerID(event.target.value);
                          setFieldValue('MakerID', event.target.value);
                        }}
                      >
                        {makerList
                          .filter((item: Maker) => item.Status === true)
                          .map((option: Maker) => (
                            <MenuItem key={option.ID} value={option.ID}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Trademark</InputLabel>
                      <TextField placeholder="Seleccionar Trademark" {...getFieldProps('TrademarkID')} fullWidth select>
                        {tradeMarkList
                          .filter((item: Trademark) => (item.Status === true && item.MakerID === maker_ID) || product?.Maker?.ID)
                          .map((option: Trademark) => (
                            <MenuItem key={option.ID} value={option.ID}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Tipo de Producto</InputLabel>
                      <TextField
                        placeholder="Seleccionar Tipo Producto"
                        {...getFieldProps('TypesProductID')}
                        error={Boolean(touched.TypesProductID && errors.TypesProductID)}
                        helperText={touched.TypesProductID && errors.TypesProductID}
                        fullWidth
                        select
                      >
                        {typeProductList
                          .filter((item: TypeProduct) => item.Status === true)
                          .map((option: TypeProduct) => (
                            <MenuItem key={option.ID} value={option.ID}>
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
                        options={warehouseList.filter((item: Warehouses) => item.Status === true)}
                        getOptionLabel={(option: Warehouses) => option.Name ?? ''}
                        defaultValue={[...(product?.Warehouses || '')] as []}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          setFieldValue('WarehouseIDS', newValue === null ? '' : newValue);
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
                      <TextField placeholder="Seleccionar Categoria" fullWidth select {...getFieldProps('CategoryOneID')}>
                        {categoryListOne
                          .filter((item: CategoryOne) => item.Status === true)
                          .map((option: CategoryOne) => (
                            <MenuItem key={option.ID} value={option.ID}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Categoria 2</InputLabel>
                      <TextField placeholder="Seleccionar Categoria" fullWidth select {...getFieldProps('CategoryTwoID')}>
                        {categoryListTwo
                          .filter((item: CategoryTwo) => item.Status === true)
                          .map((option: CategoryTwo) => (
                            <MenuItem key={option.ID} value={option.ID}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Categoria 3</InputLabel>
                      <TextField placeholder="Seleccionar Categoria" {...getFieldProps('CategoryThreeID')} fullWidth select>
                        {categoryListThree
                          .filter((item: CategoryThree) => item.Status === true)
                          .map((option: CategoryThree) => (
                            <MenuItem key={option.ID} value={option.ID}>
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
                        {...getFieldProps('PackID')}
                        value={product?.PackID}
                        error={Boolean(touched.PackID && errors.PackID)}
                        helperText={touched.PackID && errors.PackID}
                        select
                        fullWidth
                      >
                        {packList
                          .filter((item: Packs) => item.Status === true)
                          .map((option: Packs) => (
                            <MenuItem key={option.ID} value={option.ID}>
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
                            options={todoListSubs.filter((item: Substances) => item.Status === true)}
                            getOptionLabel={(option: Substances) => option.Name ?? ''}
                            defaultValue={[...(product?.Substance || '')] as []}
                            filterSelectedOptions
                            onChange={(event, newValue) => {
                              setFieldValue('SubstancesIDS', newValue === null ? '' : newValue);
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
                        options={products.filter((item: Products) => item.Status === true)}
                        getOptionLabel={(option: string | any) => option.Name ?? option}
                        defaultValue={[...(product?.Substitutes || '')] as []}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          setFieldValue('SubstitutesIDS', newValue === null ? '' : newValue);
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
                    {...getFieldProps('Status')}
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
