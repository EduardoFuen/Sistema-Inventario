import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, Grid, InputLabel, Stack, TextField, Typography, Autocomplete, MenuItem, Dialog, FormHelperText } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project import
import MainCard from 'components/MainCard';
import summary from 'utils/calculation';
import Import from './ImportDetailsProduct';
import AddSelectProduct from './selectProducts';
import Export from 'components/ExportToFile';
import SummaryTemplate from 'components/SummaryTemplate';
import DetailsPurchase from './detailsProduct';
import { ProductPurchaseDefault } from 'config';

import { useSelector, useDispatch } from 'store';
import { addPurchase, resetItemsPurchase } from 'store/reducers/purcharse';
import { getProducts } from 'store/reducers/product';
import { getWarehouseList } from 'store/reducers/warehouse';
import { getSupplierList } from 'store/reducers/supplier';

// types
import { Warehouses } from 'types/products';
import { Supplier } from 'types/supplier';

// ==============================|| ADD NEW PURCHASE - MAIN ||============================== //

const getInitialValues = () => {
  const newSubstance = {
    Notes: '',
    Discount: 0,
    SupplierID: 0,
    WarehouseID: 0,
    DiscountEarliyPay: 0
  };
  return newSubstance;
};

function AddPurchase() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [add, setAdd] = useState<boolean>(false);
  const [discount, setDiscount] = useState<any>();
  const [addImport, setActiveImport] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getWarehouseList());
    dispatch(getSupplierList());
  }, [dispatch]);

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const handleAdd = () => {
    setAdd(!add);
  };

  const { supplierList } = useSelector((state) => state.supplier);
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { detailsPurchase } = useSelector((state) => state.purchase);

  useMemo(() => dispatch(resetItemsPurchase()), [dispatch]);

  const handleCancel = () => {
    history(`/purchase`);
  };

  const SubstSchema = Yup.object().shape({
    WarehouseID: Yup.string().max(255).required('Bodega es requerido'),
    SupplierID: Yup.number().required('Proveedor es requerido')
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (detailsPurchase.length > 0) {
          const newValue = {
            ...values,
            Status: 0,
            Articles: detailsPurchase
          };
          await dispatch(addPurchase(newValue));
        }
        setSubmitting(false);
      } catch (error: any) {
        setSubmitting(false);
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  const data = useMemo(
    () => detailsPurchase && detailsPurchase.length > 0 && summary(detailsPurchase, Number(discount) || 0),
    [detailsPurchase, discount]
  );

  return (
    <>
      <MainCard>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Detalles de la compra
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={4}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Proveedor</InputLabel>
                      <Autocomplete
                        id="supplier-list"
                        renderOption={(props, option) => {
                          return (
                            <li {...props} key={option.ID}>
                              {option.BusinessName}
                            </li>
                          );
                        }}
                        options={supplierList.filter((item: Supplier) => item.Status === true)}
                        getOptionLabel={(option: Supplier) => option.BusinessName ?? ''}
                        onChange={(event, newValue) => {
                          setFieldValue('SupplierID', newValue === null ? '' : newValue?.ID);
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
                      {touched.SupplierID && errors.SupplierID && (
                        <FormHelperText error id="personal-supplier-helper">
                          {errors.SupplierID}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={3}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Bodega</InputLabel>
                      <TextField
                        placeholder="Seleccionar Bodega"
                        fullWidth
                        select
                        {...getFieldProps('WarehouseID')}
                        error={Boolean(touched.WarehouseID && errors.WarehouseID)}
                        helperText={touched.WarehouseID && errors.WarehouseID}
                      >
                        {warehouseList
                          .filter((item: Warehouses) => item.Status === true)
                          .map((option: Warehouses) => (
                            <MenuItem key={option.ID} value={option.ID}>
                              {option.Name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={2}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Discount')}
                        placeholder="Ingresa Descuento %"
                        fullWidth
                        type="number"
                        onChange={(e) => {
                          setDiscount(e.target.value);
                          setFieldValue('Discount', e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    style={{
                      marginTop: 20
                    }}
                  >
                    <Grid item xs={5}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Notas</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        multiline
                        rows={2}
                        placeholder="Ingresar Nota de compras"
                        fullWidth
                        {...getFieldProps('Notes')}
                      />
                    </Grid>
                    <Grid item xs={4} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento pronto Pago</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('DiscountEarliyPay')}
                        placeholder="Descuento pronto Pago %"
                        type="number"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} alignSelf="center">
                      <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 3 }}>
                        <Export excelData={ProductPurchaseDefault} fileName="Details Purchase" title="Descargar plantilla de productos" />
                        <Button variant="contained" sx={{ textTransform: 'none' }} onClick={handleImport}>
                          Importar Productos
                        </Button>
                        <Button variant="contained" sx={{ textTransform: 'none' }} onClick={handleAdd}>
                          Agregar Productos
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                {detailsPurchase && detailsPurchase.length > 0 ? (
                  <DetailsPurchase />
                ) : (
                  <MainCard>
                    Detalles Productos
                    {detailsPurchase.length === 0 && (
                      <FormHelperText error id="personal-supplier-helper">
                        Productos Requeridos
                      </FormHelperText>
                    )}
                  </MainCard>
                )}
              </Grid>
              <Grid item xs={12}>
                {detailsPurchase && detailsPurchase.length > 0 && (
                  <MainCard>
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 6 }}>
                      <Typography variant="subtitle1">Cantidad Total: ({detailsPurchase.length})</Typography>
                    </Stack>
                  </MainCard>
                )}
              </Grid>
              <Grid item xs={12}>
                {detailsPurchase && detailsPurchase.length > 0 && <SummaryTemplate data={data} />}
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Guardar Compra
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </MainCard>
      {/* add Product Purchase dialog */}
      <Dialog maxWidth="lg" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddSelectProduct onCancel={handleAdd} />}
      </Dialog>
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </>
  );
}

export default AddPurchase;
