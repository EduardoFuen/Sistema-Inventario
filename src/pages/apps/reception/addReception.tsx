import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Grid,
  DialogContent,
  DialogActions,
  DialogTitle,
  Stack,
  InputLabel,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
  Divider
} from '@mui/material';

// third-party
import { useFormik, Form, FormikProvider } from 'formik';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { getIDPurchase } from 'store/reducers/purcharse';
import { UpdateRecepctionArticles, deleteItemsRecepction } from 'store/reducers/reception';
import { Products } from 'types/products';
// assets
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';

// ==============================|| ADD RECEPTION ||============================== //

export interface PropsSelect {
  onCancel: () => void;
  reception: any;
  product: Products | any;
  id: number;
}

const AddReceptionLot = ({ onCancel, reception, product, id }: PropsSelect) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const validationItems = product?.Count ? product?.Count === reception?.TotalItemsCountReception : false;

  let Items: any;

  if (reception && reception?.Articles) {
    Items = reception?.Articles.map((item: any) => ({
      ...item,
      edit: false
    }));
  } else {
    Items = [{ CountItemReception: '', Batch: '', Date: '', ArticleID: product?.ArticleID, ...product }];
  }

  const [inputList, setInputList] = useState(Items);
  const [validationQuantity, setValidationQuantity] = useState<boolean>(true);

  useEffect(() => {
    if (product?.Count === reception?.TotalItemsCountReception) {
      setValidationQuantity(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { CountItemReception: '', Batch: '', Date: '', ArticleID: product?.ArticleID }]);
  };

  const validationQty = (list: any) => {
    const SumQty = list.reduce(
      (acc: any = {}, item: any) => {
        acc.CountItemReception = Number(acc.CountItemReception) + Number(item.CountItemReception);
        return acc;
      },
      {
        CountItemReception: ''
      }
    );
    if (product?.Count < SumQty?.CountItemReception) {
      dispatch(
        openSnackbar({
          open: true,
          message: 'La Cantidad a ingresar debe ser igual o menor a la compra',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
      setValidationQuantity(true);
    }
  };

  const handleInputChange = (e: any, index: number) => {
    const list: any = [...inputList];
    if (e.target) {
      const { name, value } = e.target;
      setValidationQuantity(false);
      if (name === 'CountItemReception') {
        list[index]['CountItemReception'] = value;
      }
      if (name === 'Batch') {
        list[index]['Batch'] = value;
      }
    } else {
      list[index]['Date'] = e;
    }
    validationQty(list);
    setInputList(list);
  };

  const formik = useFormik({
    initialValues: {
      Missing: reception?.Missing || '',
      Refund: reception?.Refund || '',
      Reason: reception?.Reason || ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let data = {
          ...reception,
          ...values,
          Articles: inputList
        };

        let ArticleID: number = product?.ArticleID;

        await dispatch(UpdateRecepctionArticles(data, ArticleID));
        await dispatch(getIDPurchase(Number(id)));
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <ScrollX>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container alignItems="center">
            <Grid item xs={4} alignSelf="center">
              <DialogTitle>Recepción de productos</DialogTitle>
            </Grid>
          </Grid>
          <MainCard content={false}>
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container direction="row" spacing={2}>
                <Stack direction="row" justifyContent="end" spacing={2} alignItems="end" sx={{ p: 3 }}>
                  <Grid item xs={4}>
                    <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Faltantes</InputLabel>
                    <TextField
                      sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      placeholder="Ingresar Cantidad Faltantes"
                      fullWidth
                      disabled={validationItems}
                      {...getFieldProps('Missing')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Devolución</InputLabel>
                    <TextField
                      sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      placeholder="Ingresar Cantidad Devolución"
                      // disabled={validationItems}
                      fullWidth
                      {...getFieldProps('Refund')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Motivo Devolución</InputLabel>
                    <TextField
                      placeholder="Seleccionar Tipo Producto"
                      fullWidth
                      select
                      {...getFieldProps('Reason')}
                      //  disabled={validationItems}
                    >
                      <MenuItem value="1">Mal Estado</MenuItem>
                      <MenuItem value="2">Fecha Corta</MenuItem>
                      <MenuItem value="3">Excedente</MenuItem>
                    </TextField>
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <MainCard>
                  <Stack direction="row" justifyContent="end" spacing={2} alignItems="end" sx={{ p: 1 }}>
                    <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAddClick}>
                      Agregar
                    </Button>
                    <Divider />
                  </Stack>
                  {inputList?.map((x: any, i: number) => {
                    return (
                      <Grid
                        container
                        direction="row"
                        spacing={2}
                        key={i}
                        style={{
                          marginTop: 10
                        }}
                      >
                        <Grid item xs={3}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Cantidad</InputLabel>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            type="number"
                            InputProps={{ inputProps: { min: 0, max: product?.Count } }}
                            placeholder="Ingresar Cantidad"
                            fullWidth
                            name="CountItemReception"
                            value={x.CountItemReception}
                            // disabled={validationItems || x.edit === false}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Lote</InputLabel>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            onChange={(e) => handleInputChange(e, i)}
                            placeholder="Ingresar Lote"
                            fullWidth
                            name="Batch"
                            value={x.Batch}
                            // disabled={validationItems || x.edit === false}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Vencimiento</InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              label=""
                              inputFormat="MM/dd/yyyy"
                              value={x.Date}
                              // disabled={validationItems || x.edit === false}
                              onChange={(value: any) => {
                                handleInputChange(value, i);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                        </Grid>
                        {inputList?.length > 1 && !validationQuantity && (
                          <Grid item xs={2} alignItems="end" alignSelf="center">
                            <Tooltip title="Delete">
                              <IconButton
                                color="secondary"
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  if (x.edit === false) {
                                    dispatch(deleteItemsRecepction(x.ID));
                                  } else {
                                    handleRemoveClick(i);
                                  }
                                }}
                              >
                                <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        )}
                      </Grid>
                    );
                  })}
                </MainCard>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="end" alignItems="center">
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="end">
                    <Button color="error" onClick={onCancel}>
                      Cancelar
                    </Button>
                    <Button variant="contained" type="submit" disabled={validationQuantity || isSubmitting}>
                      Confirmar
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </MainCard>
        </Form>
      </FormikProvider>
    </ScrollX>
  );
};

export default AddReceptionLot;
