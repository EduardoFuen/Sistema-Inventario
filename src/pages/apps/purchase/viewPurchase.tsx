import { useState, useEffect,ChangeEvent } from 'react';
import { Map, Marker } from "pigeon-maps"
import { useNavigate, useParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import * as Yup from 'yup';
// material-ui
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  Dialog,
  Table,
    MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

import { useFormik, Form, FormikProvider, FormikValues } from 'formik';
// third-party
import NumberFormat from 'react-number-format';

// project import
import MainCard from 'components/MainCard';
import PurchasePlaceholder from 'components/PurchasePlaceholder';
import SummaryTemplate from 'components/SummaryTemplate';

import DetailsPurchase from './detailsProduct';
import AddSelectProduct from './selectLinePurchase';
import { DATEFORMAT } from 'config';
import { useSelector, useDispatch } from 'store';
import { editPurchase, getIDPurchase, getDeliveryList } from 'store/reducers/purcharse';

import {
  Delivery,
} from 'types/products';
// types

// assets
import { SendOutlined } from '@ant-design/icons';

// ==============================||VIEW PURCHASE - MAIN ||============================== //

const getInitialValues = (order: FormikValues | null) => {
  const newSubstance = {
    Notes: order?.Notes || '',
    ID: '',
    IDdely: '',
    CreatedAt: order?.CreatedAt ? format(new Date(order?.CreatedAt), DATEFORMAT) : '',
    DiscountGlobal: order?.DiscountGlobal || 0,
    SupplierID: order?.SupplierID || 0,
    WarehouseID: order?.WarehouseID || 0,
    Discount: order?.Discount || 0,
    BusinessName: order?.BusinessName,
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
  const { id } = useParams();
  const { deliveryList } = useSelector((state) => state.purchase);
  const { detailsPurchase } = useSelector((state) => state.purchase);
  const { order: orderPurchase, isLoading } = useSelector((state) => state.purchase);

  useEffect(() => {
    if (id) {
      dispatch(getIDPurchase(Number(id)));
      dispatch(getDeliveryList());
    }
  }, [dispatch, id]);

  const handleCancel = () => {
    history(`/purchase`);
  };
 const [maker_ID, setIsMakerID] = useState<string | number>();
  console.log(maker_ID)
  const handleAdd = () => {
    setAdd(!add);
  };
   const SubstSchema = Yup.object().shape({
      IDdely: Yup.string().max(255).required('Delivery es requerido'),
    });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: SubstSchema,
    initialValues: getInitialValues(orderPurchase!),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const newValue = {
          ...orderPurchase,
          ...values,
          Articles: detailsPurchase?.map((item: any) => ({
            ...item,
            DiscountNegotiated: item.DiscountNegotiated || 0,
            DiscountAdditional: item?.DiscountAdditional || 0,
            Bonus: item?.Bonus || 0,
            Count: item?.Count || 0,
            Tax: item?.Tax || 0,
            BasePrice: item?.BasePrice || 0,
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
      } catch (error: any) {
        console.error(error);
      }
    }
  });

  const { handleSubmit,touched,errors, isSubmitting, getFieldProps, setFieldValue } = formik;

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
                      Detalles del Pedido
                    </Typography>
                    <Grid container spacing={1} direction="row">
                      <Grid item xs={4}>
                        <InputLabel sx={{ mb: 1,}}>Cliente</InputLabel>
                         <TextField
                          sx={{ '& .MuiOutlinedInput-input': {  } }}
                          {...getFieldProps('BusinessName')}
                          placeholder=""
                          fullWidth
                          disabled
                        />
                      </Grid>
 
                      <Grid item xs={3}>
                        <InputLabel sx={{ mb: 1,  }}>Fecha Pedido</InputLabel>
                       <TextField
                          sx={{ '& .MuiOutlinedInput-input': { opacity: 10 } }}
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
                        <InputLabel sx={{ mb: 1,  }}>Notas</InputLabel>
                        <TextField
                          sx={{ '& .MuiOutlinedInput-input': {  } }}
                          multiline
                          rows={2}
                          placeholder="Ingresar Nota de compras"
                          fullWidth
                          disabled={orderPurchase?.Status !== 0}
                          {...getFieldProps('Notes')}
                        />
                      </Grid>
                      <Grid item xs={5}>
                         <InputLabel sx={{ mb: 1,  }}>Delivery</InputLabel>

                                              <TextField
                                                placeholder="Seleccionar Maker"
                                                fullWidth
                                                 error={Boolean(touched.IDdely && errors.IDdely)}
                                                  helperText={touched.IDdely && errors.IDdely}
                                                select
                                                {...getFieldProps('IDdely')}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                  setIsMakerID(event.target.value);
                                                  setFieldValue('IDdely', event.target.value);
                                                }}
                                              >
                                                {deliveryList
                                                  .map((option: Delivery) => (
                                                    <MenuItem key={option.Name} value={option.phoneContact}>
                                                      {option.Name}
                                                    </MenuItem>
                                                  ))}
                                              </TextField>
                  
                      </Grid>
                  <Grid item xs={5}>
                    <InputLabel sx={{ mb: 1,  }}>Punto de Entrega</InputLabel>
                  {orderPurchase?.latitude &&(
                    <Map height={300} defaultCenter={[orderPurchase?.latitude, orderPurchase?.longitude]} defaultZoom={15}>
                                <Marker color='Red' width={50} anchor={[orderPurchase?.latitude, orderPurchase?.longitude]} />
                            </Map>
                  )}
                         
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  {orderPurchase?.Status === 0 && orderPurchase?.Articles && orderPurchase?.Articles?.length > 0 && (
                    <DetailsPurchase product={detailsPurchase} />
                  )}

                  {(orderPurchase?.Status === 1 || orderPurchase?.Status === 2) &&
                    orderPurchase?.Articles &&
                    orderPurchase?.Articles?.length > 0 && (
                      <Table sx={{ minWidth: 650 }} size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>PRODUCTO</TableCell>
                            <TableCell align="center">CANTIDAD</TableCell>
                            <TableCell align="center">PRECIO BASE</TableCell>
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
                                      <Typography className="font-size">{x.ProductID}</Typography>
                                    </Stack>
                                  </Stack>
                                </TableCell>
                                <TableCell align="center">{x.Count}</TableCell>
                                <TableCell align="center">
                                  <NumberFormat value={x.BasePrice} displayType="text" prefix="$" />
                                </TableCell>
                            
                    
     

                                <TableCell align="center">
                                  <NumberFormat value={x.Total} displayType="text" prefix="$" />
                                </TableCell>
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
                  {orderPurchase?.Articles && orderPurchase?.Articles.length > 0 && <SummaryTemplate data={orderPurchase} />}
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Atras
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
                        Comprobar y Despachar
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
