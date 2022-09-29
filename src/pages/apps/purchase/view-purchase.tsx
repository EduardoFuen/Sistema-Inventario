import { useState, useMemo, useEffect } from 'react';
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
  Autocomplete,
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
import { useSelector, useDispatch } from 'store';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { editPurchase, sendPurchase, resetItemsPurchase, editItemsPurchase } from 'store/reducers/purcharse';
import { SendOutlined } from '@ant-design/icons';
import DetailsPurchase from './detailsProduct';
import summary from 'utils/calculation';

import AddSelectProduct from './selectProducts';

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

const getInitialValues = (order: FormikValues | null) => {
  const newSubstance = {
    note: order?.note,
    create_order: order?.create_order,
    discountOrder: order?.discountOrder,
    supplier: order?.supplier,
    warehouse: order?.warehouse,
    paymentdiscount: order?.paymentdiscount,
    paymentdate: format(addDays(new Date(), order?.supplier.daysPayment), 'dd-MM-yyyy'),
    estimatedDeliveryDate: format(addDays(new Date(), order?.supplier.leadTimeBog), 'dd-MM-yyyy')
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
  const handleAdd = () => {
    setAdd(!add);
  };

  const { supplierList } = useSelector((state) => state.supplier);
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { detailsPurchase } = useSelector((state) => state.purchase);
  const { listPurchase } = useSelector((state) => state.purchase);
  useMemo(() => dispatch(resetItemsPurchase()), [dispatch]);

  const handleCancel = () => {
    history(`/purchase`);
  };

  const orderPurchase = useMemo(() => {
    if (id) {
      return listPurchase.find((item) => item.nc === id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let data = orderPurchase?.products.map((item: any) => ({ ...item, isSelected: true }));
    dispatch(editItemsPurchase(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formik = useFormik({
    initialValues: getInitialValues(orderPurchase!),
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (send) {
          const newValue = {
            dateR: format(new Date(), 'dd-MM-yyyy'),
            ...values,
            status: 'Send',
            products: orderPurchase?.products
          };
          dispatch(sendPurchase(id, newValue));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Orden Enviada successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          const newValue = {
            ...values,
            ...orderPurchase,
            products: detailsPurchase
          };
          dispatch(editPurchase(id, newValue));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Orden Actualizada successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        }
        history(`/purchase`);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });
  useEffect(() => {
    const items = summary(detailsPurchase, orderPurchase?.discountOrder || 0);
    setData(items);
  }, [detailsPurchase, orderPurchase]);

  const { handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

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
                    <Grid item xs={3}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Proveedor</InputLabel>
                      <Autocomplete
                        id="supplier-list"
                        options={supplierList.filter((item: any) => item.status === true)}
                        getOptionLabel={(option) => option.businessName}
                        onChange={(event, newValue) => {
                          setFieldValue('supplier', newValue === null ? '' : newValue);
                        }}
                        value={orderPurchase?.supplier}
                        disabled
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
                    <Grid item xs={2}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Bodega</InputLabel>
                      <TextField placeholder="Seleccionar Bodega" fullWidth select disabled {...getFieldProps('warehouse')}>
                        {warehouseList
                          .filter((item: any) => item.status === true)
                          .map((option: any) => (
                            <MenuItem key={option.name} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={1}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('discountOrder')}
                        placeholder="Ingresa Descuento %"
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Orden</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('create_order')}
                        placeholder=""
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Estimada Entrega</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('estimatedDeliveryDate')}
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
                    <Grid item xs={4}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Notas</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        multiline
                        rows={2}
                        placeholder="Ingresar Nota de compras"
                        fullWidth
                        {...getFieldProps('note')}
                      />
                    </Grid>
                    <Grid item xs={2} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento pronto Pago</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('paymentdiscount')}
                        placeholder="Descuento pronto Pago %"
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={2} alignSelf="center">
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Pronto Pago</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('paymentdate')}
                        placeholder=""
                        fullWidth
                        disabled
                      />
                    </Grid>
                  </Grid>
                  {orderPurchase?.status === 'New' && (
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
                {orderPurchase?.status === 'New' && <DetailsPurchase product={detailsPurchase} />}

                {orderPurchase?.status !== 'New' && (
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
                      {orderPurchase?.products.map((x: any, i: number) => (
                        <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            <Stack direction="row" spacing={1.5} alignItems="center">
                              <Stack spacing={0}>
                                <Typography variant="subtitle1">{x.name}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                  SKU {x.sku}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  EAN :{x.ean}
                                </Typography>
                              </Stack>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">{x.qty}</TableCell>
                          <TableCell align="center">{x.tax}</TableCell>
                          <TableCell align="center">{x.qty}</TableCell>
                          <TableCell align="center">{x.Negotiateddiscount}</TableCell>
                          <TableCell align="center">{x.Additionaldiscount}</TableCell>
                          <TableCell align="center">{x.bonus}</TableCell>
                          <TableCell align="center">{x.subtotal}</TableCell>
                          <TableCell align="center">{x.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Grid>
              <Grid item xs={12}>
                {orderPurchase?.products && orderPurchase?.products.length > 0 && (
                  <MainCard>
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 6 }}>
                      <Typography variant="subtitle1">Cantidad Total: ({orderPurchase?.products.length})</Typography>
                    </Stack>
                  </MainCard>
                )}
              </Grid>
              <Grid item xs={12}>
                {data && orderPurchase?.products && orderPurchase?.products.length > 0 && (
                  <MainCard>
                    <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 6 }}>
                      <Typography variant="subtitle1">Subtotal: $ {data?.subtotal || 0}</Typography>
                    </Stack>
                    {data.discount !== '0' && (
                      <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
                        <Typography variant="subtitle1">Descuento: $ {data.discount || 0}</Typography>
                      </Stack>
                    )}
                    {data.subtotalDiscount !== 0 && (
                      <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
                        <Typography variant="subtitle1">Subtotal con descuento: $ {data.subtotalDiscount || 0}</Typography>
                      </Stack>
                    )}
                    {data.tax !== 0 && (
                      <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
                        <Typography variant="subtitle1">IVA: $ {data.tax || 0}</Typography>
                      </Stack>
                    )}
                    <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
                      <Typography variant="subtitle1">Total: $ {data.total || 0}</Typography>
                    </Stack>
                  </MainCard>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  {orderPurchase?.status === 'New' && (
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SendOutlined />}
                      disabled={isSubmitting}
                      onClick={() => setSend(true)}
                    >
                      Enviar
                    </Button>
                  )}
                  {orderPurchase?.status === 'New' && (
                    <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                      Guardar
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </MainCard>
      {/* add user dialog */}
      <Dialog maxWidth="lg" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddSelectProduct onCancel={handleAdd} />}
      </Dialog>
    </>
  );
}

export default ViewPurchase;
