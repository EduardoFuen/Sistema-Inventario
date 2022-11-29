import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';

// material-ui
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project import
import MainCard from 'components/MainCard';
import PurchasePlaceholder from 'components/PurchasePlaceholder';
import SummaryTemplate from 'components/SummaryTemplate';

import DetailsPurchase from './detailsProduct';
import summary from 'utils/calculation';
import AddSelectProduct from './selectProducts';
import { DATEFORMAT } from 'config';
import { useSelector, useDispatch } from 'store';
import { editPurchase, getIDPurchase } from 'store/reducers/purcharse';

// types
import { Warehouses } from 'types/products';
import { Supplier } from 'types/supplier';

// assets
import { SendOutlined } from '@ant-design/icons';

// ==============================||VIEW PURCHASE - MAIN ||============================== //

const getInitialValues = (order: FormikValues | null) => {
  const newSubstance = {
    Notes: order?.Notes || '',
    CreatedAt: order?.CreatedAt ? format(new Date(order?.CreatedAt), DATEFORMAT) : '',
    DiscountGlobal: order?.DiscountGlobal || 0,
    SupplierID: order?.SupplierID || 0,
    WarehouseID: order?.WarehouseID || 0,
    Discount: order?.Discount || 0,
    DiscountEarliyPay: order?.DiscountEarliyPay || 0,
    DaysPayment: order?.Supplier?.DaysPayment ? format(addDays(new Date(), order?.Supplier?.DaysPayment), DATEFORMAT) : '',
    EstimatedDeliveryDateBog: order?.Supplier ? format(addDays(new Date(), order?.Supplier?.LeadTimeBog), DATEFORMAT) : '',
    EstimatedDeliveryDateBaq: order?.Supplier ? format(addDays(new Date(), order?.Supplier?.LeadTimeBaq), DATEFORMAT) : ''
  };

  return newSubstance;
};

function ViewPurchase() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [add, setAdd] = useState<boolean>(false);
  const [send, setSend] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const { id } = useParams();

  const { supplierList } = useSelector((state) => state.supplier);
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { detailsPurchase } = useSelector((state) => state.purchase);
  const { order: orderPurchase, isLoading } = useSelector((state) => state.purchase);

  useEffect(() => {
    if (id) {
      dispatch(getIDPurchase(Number(id)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/purchase`);
  };

  const handleAdd = () => {
    setAdd(!add);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(orderPurchase!),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const newValue = {
          ...orderPurchase,
          ...values,
          Articles: detailsPurchase?.map((item: any) => ({
            ...item,
            ID: 0
          }))
        };

        delete newValue.CreatedAt;

        if (send) {
          await dispatch(editPurchase(Number(id), { ...newValue, Status: 1 }));
        } else {
          await dispatch(editPurchase(Number(id), { ...newValue, Status: 0 }));
        }
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    const items = detailsPurchase && detailsPurchase.length > 0 && summary(detailsPurchase, orderPurchase?.Discount || 0);
    if (items) {
      setData(items);
    }
  }, [detailsPurchase, orderPurchase?.Discount]);

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

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
                      <Grid item xs={4}>
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Proveedor</InputLabel>
                        <TextField placeholder="Seleccionar Proveedor" fullWidth select disabled {...getFieldProps('SupplierID')}>
                          {supplierList
                            .filter((item: Supplier) => item.Status === true)
                            .map((option: Supplier) => (
                              <MenuItem key={option.ID} value={option.ID}>
                                {option.BusinessName}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={3}>
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Bodega</InputLabel>
                        <TextField placeholder="Seleccionar Bodega" fullWidth select disabled {...getFieldProps('WarehouseID')}>
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
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Orden</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('CreatedAt')}
                          placeholder=""
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
                      <Grid item xs={5}>
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Notas</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          multiline
                          rows={2}
                          placeholder="Ingresar Nota de compras"
                          fullWidth
                          disabled={orderPurchase.Status === 1}
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
                      <Grid item xs={3} alignSelf="center">
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Pronto Pago</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('DaysPayment')}
                          placeholder=""
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3} alignSelf="center">
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Estimada Entrega Bogota</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('EstimatedDeliveryDateBog')}
                          placeholder=""
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3} alignSelf="center">
                        <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Estimada Entrega Barranquilla</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                          {...getFieldProps('EstimatedDeliveryDateBaq')}
                          placeholder=""
                          fullWidth
                          disabled
                        />
                      </Grid>
                    </Grid>
                    {orderPurchase?.Status === 0 && (
                      <Grid item xs={12} alignSelf="center">
                        <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 3 }}>
                          <Button variant="contained" sx={{ textTransform: 'none' }} onClick={handleAdd}>
                            Agregar Productos
                          </Button>
                        </Stack>
                      </Grid>
                    )}
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  {orderPurchase?.Status === 0 && orderPurchase?.Articles && orderPurchase?.Articles?.length > 0 && (
                    <DetailsPurchase product={detailsPurchase} />
                  )}

                  {orderPurchase?.Status === 1 && orderPurchase?.Articles && orderPurchase?.Articles?.length > 0 && (
                    <Table sx={{ minWidth: 650 }} size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>PRODUCTO</TableCell>
                          <TableCell align="center">CANTIDAD</TableCell>
                          <TableCell align="center">PRECIO BASE</TableCell>
                          <TableCell align="center">IVA</TableCell>
                          <TableCell align="center">DESCUENTO NEGOCIADO %</TableCell>
                          <TableCell align="center">DESCUENTO ADICIONAL %</TableCell>
                          <TableCell align="center">BONIFICACIÓN</TableCell>
                          <TableCell align="center">SUBTOTAL</TableCell>
                          <TableCell align="center">TOTAL</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderPurchase?.Articles?.map((x: any, i: number) => {
                          return (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row">
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                  <Stack spacing={0}>
                                    <Typography variant="subtitle1">ID {x.ID}</Typography>
                                    <Typography variant="subtitle1">{x.Name}</Typography>
                                    <Typography variant="caption" color="textSecondary">
                                      SKU {x.Sku}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                      EAN :{x.Ean}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">{x.Count}</TableCell>
                              <TableCell align="center">{x.Tax}</TableCell>
                              <TableCell align="center">{x.BasePrice}</TableCell>
                              <TableCell align="center">{x.Discount}</TableCell>
                              <TableCell align="center">{x.DiscountAdditional}</TableCell>
                              <TableCell align="center">{x.Bonus}</TableCell>
                              <TableCell align="center">{x.SubTotal}</TableCell>
                              <TableCell align="center">{x.Total}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {orderPurchase?.Articles && orderPurchase?.Articles?.length > 0 && (
                    <MainCard>
                      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 6 }}>
                        <Typography variant="subtitle1">Cantidad Total: ({orderPurchase?.Articles?.length})</Typography>
                      </Stack>
                    </MainCard>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {data && orderPurchase?.Articles && orderPurchase?.Articles.length > 0 && <SummaryTemplate data={data} />}
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    {orderPurchase?.Status === 0 && (
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SendOutlined />}
                        disabled={isSubmitting}
                        onClick={() => {
                          setSend(true);
                        }}
                      >
                        Enviar
                      </Button>
                    )}
                    {orderPurchase?.Status === 0 && (
                      <Button
                        variant="contained"
                        onClick={() => {
                          setSend(false);
                        }}
                        sx={{ textTransform: 'none' }}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Guardar
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </MainCard>
      )}
      {/* add Details  */}
      <Dialog maxWidth="lg" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddSelectProduct onCancel={handleAdd} />}
      </Dialog>
    </>
  );
}

export default ViewPurchase;
