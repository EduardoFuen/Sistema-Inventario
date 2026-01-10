import { useState, useMemo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, Grid, InputLabel, Stack, TextField, Typography, Autocomplete, Dialog, FormHelperText } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project import
import MainCard from 'components/MainCard';
import summary from 'utils/calculation';
import Import from './importLinePurchase';
import SelectLinePurchase from './selectLinePurchase';
import SummaryTemplate from 'components/SummaryTemplate';
import DetailsPurchase from './detailsProduct';

import { useSelector, useDispatch } from 'store';
import { addPurchase, resetItemsPurchase } from 'store/reducers/purcharse';
import { getProducts } from 'store/reducers/product';
import { getWarehouseList } from 'store/reducers/warehouse';
import { getSupplierList } from 'store/reducers/supplier';

// types
import { Supplier } from 'types/supplier';
import { Purchase } from 'types/purchase';
// ==============================|| ADD NEW PURCHASE - MAIN ||============================== //

const getInitialValues = () => {
  const newSubstance = {
    Notes: '',
    Discount: '',
    sk: '',
    SupplierID: '',
    WarehouseID: '',
    DiscountEarliyPay: '',
    CreatedAt: new Date()
  };
  return newSubstance;
};

function AddPurchase() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [add, setAdd] = useState<boolean>(false);
  const [discount] = useState<number>();
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
  const { detailsPurchase } = useSelector((state) => state.purchase);

  useMemo(() => dispatch(resetItemsPurchase()), [dispatch]);

  const handleCancel = () => {
    history(`/purchase`);
  };

  const SubstSchema = Yup.object().shape({
    SupplierID: Yup.string().required('Proveedor es requerido'),
  });

  const data = useMemo(
    () => detailsPurchase && detailsPurchase.length > 0 && summary(detailsPurchase, Number(discount) || 0),
    [detailsPurchase, discount]
  );

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const sk = Date.now().toString()
        if (detailsPurchase.length > 0) {
          const newValue: Purchase = {
            ...values,
            Status: 0,
            ...data,
            sk: sk,
            Articles: detailsPurchase,
            Discount: values?.Discount,
            DiscountEarliyPay: Number(values?.DiscountEarliyPay)
          };
          await dispatch(addPurchase(newValue));
        }
        setSubmitting(false);
        history(`/purchase/view/${sk}`);
      } catch (error: any) {
        setSubmitting(false);
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
              <Grid item xs={12}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Detalles del Pedido
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={4}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Cliente</InputLabel>
                      <Autocomplete
                        id="supplier-list"
                        renderOption={(props, option) => {
                          return (
                            <li {...props} key={option.sk}>
                              {option.BusinessName}
                            </li>
                          );
                        }}
                        options={supplierList.filter((item: Supplier) => item.sk)}
                        getOptionLabel={(option: Supplier) => option.BusinessName ?? ''}
                        onChange={(event, newValue) => {
                          setFieldValue('SupplierID', newValue === null ? '' : newValue?.sk);
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
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    style={{
                      marginTop: 20
                    }}
                  >
                    <Grid item xs={5} >
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

                    <Grid item xs={12} alignSelf="center">
                      <Stack direction="row" spacing={2} justifyContent="center" alignItems="left" sx={{ mt: 3 }}>
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
        {add && <SelectLinePurchase onCancel={handleAdd} />}
      </Dialog>
      {/* import product Purchase dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </>
  );
}

export default AddPurchase;
