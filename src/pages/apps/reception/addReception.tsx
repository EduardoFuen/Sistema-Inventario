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
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FieldArray } from 'formik';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { getIDPurchase } from 'store/reducers/purcharse';
import { AddRecepctionArticles, deleteItemsRecepction } from 'store/reducers/reception';
import { Product } from 'types/products';

// assets
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';

// types
import { reception } from 'types/reception';
// ==============================|| ADD RECEPTION ||============================== //

export interface Props {
  onCancel: () => void;
  reception: any;
  product: Product | any;
  id: number;
}

const AddReception = ({ onCancel, reception, product, id }: Props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [validationQuantity, setValidationQuantity] = useState<boolean>(true);
  const validationItems = product?.Count ? product?.Count === reception?.TotalItemsCountReception : false;

  useEffect(() => {
    if (product?.Count === reception?.TotalItemsCountReception) {
      setValidationQuantity(true);
    }
  }, [product?.Count, reception?.TotalItemsCountReception]);

  const handleAddClick = (e: any) => {
    e.form.setValues({
      ...e.form.values,
      Articles: [...e.form.values?.Articles, { Count: '', Batch: '', Date: '', ArticleID: product?.ArticleID }]
    });
  };

  const validationQty = (list: any) => {
    const SumQty = list.reduce(
      (acc: any = {}, item: any) => {
        acc.Count = Number(acc.Count) + Number(item.Count);
        return acc;
      },
      {
        Count: ''
      }
    );
    if (product?.Count < SumQty?.Count) {
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

  const handleInputChange = (e: any, index: number, i: any) => {
    const list: any = [...i.form.values?.Articles];
    if (e && e.target) {
      const { name, value } = e.target;
      setValidationQuantity(false);
      if (name === `Articles[${index}].Count`) {
        list[index]['Count'] = value;
      }
      if (name === `Articles[${index}].Batch`) {
        list[index]['Batch'] = value;
      }
    } else {
      list[index]['Date'] = e;
    }
    i.form.setValues({
      ...i.form.values,
      Articles: list
    });
    validationQty(list);
  };

  const SubstSchema = Yup.object({
    Articles: Yup.array().of(
      Yup.object().shape({
        Count: Yup.string().required('Cantidad es requerida'),
        Batch: Yup.string().required('Lote es requerida'),
        Date: Yup.string().required('Fecha es requerida')
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      Missing: reception?.Missing || '',
      Refund: reception?.Refund || '',
      Reason: reception?.Reason || '',
      Articles: reception?.Articles || [
        {
          Count: '',
          Batch: '',
          Date: ''
        }
      ]
    },
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      let ArticleID: number = product?.ArticleID;
      let rows: reception = values.Articles;
      try {
        await dispatch(
          AddRecepctionArticles(
            {
              ...reception,
              ...values,
              Articles: rows
            },
            ArticleID
          )
        );
        await dispatch(getIDPurchase(Number(id)));
        setSubmitting(false);
        onCancel();
      } catch (error: any) {
        console.error(error);
      }
    }
  });

  const { handleSubmit, isSubmitting, getFieldProps, values, errors, touched } = formik;

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
                      fullWidth
                      {...getFieldProps('Refund')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Motivo Devolución</InputLabel>
                    <TextField placeholder="Seleccionar Tipo Producto" fullWidth select {...getFieldProps('Reason')}>
                      <MenuItem value="1">Mal Estado</MenuItem>
                      <MenuItem value="2">Fecha Corta</MenuItem>
                      <MenuItem value="3">Excedente</MenuItem>
                    </TextField>
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <MainCard>
                  <FieldArray
                    render={(arrayHelpers) => {
                      let articles = values?.Articles;
                      return (
                        <Grid
                          container
                          direction="row"
                          spacing={2}
                          style={{
                            marginTop: 10
                          }}
                        >
                          <Grid item xs={12}>
                            <Stack direction="row" justifyContent="end" spacing={2} alignItems="end" sx={{ p: 1 }}>
                              <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => handleAddClick(arrayHelpers)}>
                                Agregar
                              </Button>
                              <Divider />
                            </Stack>
                          </Grid>
                          {articles?.map((x: any, i: number) => {
                            let disabled: boolean = x.ID ? true : false;
                            const HelperText: any = errors;
                            const Touched: any = touched;
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
                                    name={`Articles[${i}].Count`}
                                    disabled={disabled}
                                    value={x.Count}
                                    onChange={(e) => handleInputChange(e, i, arrayHelpers)}
                                    onBlur={(e) => handleInputChange(e, i, arrayHelpers)}
                                    error={Boolean(
                                      HelperText.Articles &&
                                        HelperText.Articles.length > 0 &&
                                        HelperText.Articles[i]?.Count &&
                                        Touched &&
                                        Touched.Articles &&
                                        Touched?.Articles[i]?.Count
                                    )}
                                    helperText={
                                      HelperText.Articles &&
                                      HelperText.Articles.length > 0 &&
                                      Touched.Articles &&
                                      Touched?.Articles[i]?.Count &&
                                      HelperText.Articles[i]?.Count
                                    }
                                  />
                                </Grid>
                                <Grid item xs={3}>
                                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Lote</InputLabel>
                                  <TextField
                                    sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                                    placeholder="Ingresar Lote"
                                    fullWidth
                                    name={`Articles[${i}].Batch`}
                                    value={x.Batch}
                                    disabled={disabled}
                                    onChange={(e) => handleInputChange(e, i, arrayHelpers)}
                                    onBlur={(e) => handleInputChange(e, i, arrayHelpers)}
                                    error={Boolean(
                                      HelperText.Articles &&
                                        HelperText.Articles.length > 0 &&
                                        HelperText.Articles[i]?.Batch &&
                                        Touched &&
                                        Touched.Articles &&
                                        Touched?.Articles[i]?.Batch
                                    )}
                                    helperText={
                                      HelperText.Articles &&
                                      HelperText.Articles.length > 0 &&
                                      Touched.Articles &&
                                      Touched?.Articles[i]?.Batch &&
                                      HelperText.Articles[i]?.Batch
                                    }
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Fecha Vencimiento</InputLabel>
                                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                      value={x.Date}
                                      inputFormat="MM/dd/yyyy"
                                      disabled={disabled}
                                      onChange={(value: any) => {
                                        handleInputChange(value, i, arrayHelpers);
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          name={`Articles[${i}].Date`}
                                          onChange={(e) => handleInputChange(e, i, arrayHelpers)}
                                          onBlur={(e) => handleInputChange(e, i, arrayHelpers)}
                                          error={Boolean(
                                            HelperText.Articles &&
                                              HelperText.Articles.length > 0 &&
                                              HelperText.Articles[i]?.Date &&
                                              Touched &&
                                              Touched.Articles &&
                                              Touched?.Articles[i]?.Date
                                          )}
                                          helperText={
                                            HelperText.Articles &&
                                            HelperText.Articles.length > 0 &&
                                            Touched.Articles &&
                                            Touched?.Articles[i]?.Date &&
                                            HelperText.Articles[i]?.Date
                                          }
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                {(articles?.length > 1 || x.ID) && (
                                  <Grid item xs={2} alignItems="end" alignSelf="center">
                                    <Tooltip title="Delete">
                                      <IconButton
                                        color="secondary"
                                        onClick={async (e: any) => {
                                          e.stopPropagation();
                                          if (x.edit === false) {
                                            await dispatch(deleteItemsRecepction(x.ID));
                                            await dispatch(getIDPurchase(Number(id)));
                                            onCancel();
                                          } else {
                                            arrayHelpers.remove(i);
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
                        </Grid>
                      );
                    }}
                    {...getFieldProps('Articles')}
                  />
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

export default AddReception;
