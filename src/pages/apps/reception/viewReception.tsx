import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// material-ui
import { Button, Grid, InputLabel, Stack, TextField, Typography, MenuItem, Dialog } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project import
import MainCard from 'components/MainCard';
import SummaryTemplate from 'components/SummaryTemplate';
import PurchasePlaceholder from 'components/PurchasePlaceholder';
import AddReceptionModal from './addReception';
import summary from 'utils/calculation';
import DetailsReception from './lineRecepction';
import { DATEFORMAT } from 'config';

import { useSelector, useDispatch } from 'store';
import { getIDPurchase, editPurchase } from 'store/reducers/purcharse';
import { getByArticleId, getAllReception } from 'store/reducers/reception';

// types
import { Warehouses } from 'types/products';
import { Supplier } from 'types/supplier';

// ==============================|| VIEW RECEPTION - MAIN ||============================== //

const getInitialValues = (order: FormikValues | null) => {
  const newSubstance = {
    CreatedAt: order?.CreatedAt ? format(new Date(order?.CreatedAt), DATEFORMAT) : '',
    UpdateAt: order?.updateAt ? format(new Date(order?.updateAt), DATEFORMAT) : '',
    Discount: order?.Discount || 0,
    DiscountGlobal: order?.DiscountGlobal || 0,
    SupplierID: order?.SupplierID || 0,
    WarehouseID: order?.WarehouseID || 0,
    DiscountEarliyPay: order?.DiscountEarliyPay || 0,
    InvoiceNumber: order?.InvoiceNumber || '',
    DateExpireInvoice: order?.DateExpireInvoice || '',
    EstimatedDeliveryDateBog: order?.Supplier ? format(addDays(new Date(), order?.Supplier?.LeadTimeBog), DATEFORMAT) : '',
    EstimatedDeliveryDateBaq: order?.Supplier ? format(addDays(new Date(), order?.Supplier?.LeadTimeBaq), DATEFORMAT) : ''
  };

  return newSubstance;
};

function AddReception() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [add, setAdd] = useState<boolean>(false);
  const [product, setProduct] = useState<any>();
  const [data, setData] = useState<any>();

  const { supplierList } = useSelector((state) => state.supplier);
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { detailsPurchase } = useSelector((state) => state.purchase);
  const { order, isLoading } = useSelector((state) => state.purchase);
  const { reception: itemReception } = useSelector((state) => state.reception);

  useEffect(() => {
    if (id) {
      dispatch(getAllReception());
      dispatch(getIDPurchase(Number(id)));
    }
  }, [dispatch, id]);

  const handleCancel = () => {
    history(`/reception`);
  };

  const handleAdd = () => {
    setAdd(!add);
  };

  const SubstSchema = Yup.object().shape({
    InvoiceNumber: Yup.string().max(255).required('Numero de Factura es requerido')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(order!),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const newValue = {
          ...order,
          InvoiceNumber: values?.InvoiceNumber || '',
          DateExpireInvoice: values?.DateExpireInvoice || ''
        };
        delete newValue.CreatedAt;

        await dispatch(editPurchase(Number(id), newValue));

        history(`/reception`);
        setSubmitting(false);
      } catch (error: any) {
        console.error(error);
      }
    }
  });
  useEffect(() => {
    const items = detailsPurchase && detailsPurchase?.length > 0 && summary(detailsPurchase, order?.Discount || 0);
    if (items) {
      setData(items);
    }
  }, [detailsPurchase, order?.Discount]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <>
      {isLoading ? (
        <PurchasePlaceholder />
      ) : (
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
                      <Grid item xs={2} alignSelf="center">
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Proveedor</InputLabel>
                        <TextField placeholder="Seleccionar Proveedor" fullWidth select {...getFieldProps('SupplierID')} disabled>
                          {supplierList
                            .filter((item: Supplier) => item.Status === true)
                            .map((option: Supplier) => (
                              <MenuItem key={option.ID} value={option.ID}>
                                {option.BusinessName}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={2} alignSelf="center">
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Bodega</InputLabel>
                        <TextField placeholder="Seleccionar Bodega" fullWidth select {...getFieldProps('WarehouseID')} disabled>
                          {warehouseList
                            .filter((item: Warehouses) => item.Status === true)
                            .map((option: Warehouses) => (
                              <MenuItem key={option.ID} value={option.ID}>
                                {option.Name}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={2} alignSelf="center">
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('Discount')}
                          disabled
                          placeholder="Ingresa Descuento %"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={2} alignSelf="center">
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Orden</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('CreatedAt')}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>
                          Fecha Estimada para <br /> Bodega Bogota
                        </InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('EstimatedDeliveryDateBog')}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>
                          Fecha Estimada para <br />
                          Bodega Barranquilla
                        </InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('EstimatedDeliveryDateBaq')}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Recibo</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('UpdateAt')}
                          fullWidth
                          disabled
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
                      <Grid item xs={3}>
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
                      <Grid item xs={2} alignSelf="center">
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento pronto Pago</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('DiscountEarliyPay')}
                          placeholder="Descuento pronto Pago %"
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2} alignSelf="center">
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Pronto Pago</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('CreatedAt')}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3} alignSelf="center">
                        <InputLabel sx={{ mb: 1, opacity: 0.5, textAlign: 'center' }}>Fecha Vencimiento Factura</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label=""
                            inputFormat="MM/dd/yyyy"
                            {...getFieldProps('DateExpireInvoice')}
                            onChange={(value: any) => {
                              setFieldValue('DateExpireInvoice', value);
                            }}
                            renderInput={(params) => <TextField {...params} disabled={order?.DateExpireInvoice || false} />}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={2} alignSelf="center">
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Numero de Factura</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('InvoiceNumber')}
                          type="text"
                          fullWidth
                          disabled={order?.InvoiceNumber !== ''}
                          error={Boolean(touched.InvoiceNumber && errors.InvoiceNumber)}
                          helperText={touched.InvoiceNumber && errors.InvoiceNumber}
                        />
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <DetailsReception
                    products={detailsPurchase as []}
                    handleAdd={async (item: any) => {
                      await dispatch(getByArticleId(Number(item.ArticleID)));
                      setAdd(true);
                      setProduct(item);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {detailsPurchase && detailsPurchase?.length > 0 && (
                    <MainCard>
                      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 6 }}>
                        <Typography variant="subtitle1">Cantidad Total: ({detailsPurchase.length})</Typography>
                      </Stack>
                    </MainCard>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {data && order?.Articles && order?.Articles.length > 0 && <SummaryTemplate data={data} />}
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    {order?.Status === 1 && (
                      <Button
                        variant="contained"
                        sx={{ textTransform: 'none' }}
                        type="submit"
                        disabled={isSubmitting || (order?.DateExpireInvoice && order?.InvoiceNumber)}
                      >
                        Confirmar/Cerrar Recepción
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </MainCard>
      )}
      {/* add lot dialog */}
      <Dialog maxWidth="md" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddReceptionModal onCancel={handleAdd} reception={itemReception} product={product} id={Number(id)} />}
      </Dialog>
    </>
  );
}

export default AddReception;
