import { useEffect, useState } from 'react';
// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Typography,
  Tooltip,
  Stack,
  Input,
  InputAdornment
} from '@mui/material';
import { DeleteTwoTone } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { deleteItemsPurchase, editItemsPurchase } from 'store/reducers/purcharse';
import { openSnackbar } from 'store/reducers/snackbar';

import { useDispatch, useSelector } from 'store';

// types
import { Article } from 'types/purchase';

const DetailsPurchase = ({ product }: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [inputList, setInputList] = useState<any>([]);
  const { detailsPurchase } = useSelector((state) => state.purchase);

  const data = product && product?.length > 0 ? product : detailsPurchase;

  useEffect(() => {
    let newData = data?.map((item: Article) => ({
      Count: '',
      BasePrice: '',
      Tax: '',
      DiscountAdditional: '',
      DiscountNegotiated: '',
      Bonus: '',
      SubTotal: '',
      Total: '',
      ProductID: item?.ID || '',
      ...item
    }));
    setInputList(newData);
  }, [data]);

  const handleInputChange = (e: any, index: number) => {
    const list: any = [...inputList];
    const { name, value } = e.target;
    if (name === 'Count') {
      list[index]['Count'] = Number(value);
    }
    if (name === 'BasePrice') {
      list[index]['BasePrice'] = Number(value);
    }
    if (name === 'Tax') {
      list[index]['Tax'] = Number(value);
    }
    if (name === 'DiscountNegotiated') {
      list[index]['DiscountNegotiated'] = Number(value);
    }
    if (name === 'DiscountAdditional') {
      list[index]['DiscountAdditional'] = Number(value);
    }
    if (name === 'Bonus') {
      list[index]['Bonus'] = Number(value);
    }
    list[index]['SubTotal'] = list[index]?.Count * list[index]?.BasePrice * ((100 - list[index]?.DiscountNegotiated) / 100) || 0;
    list[index]['Total'] = list[index]?.SubTotal + (list[index]?.Count * list[index]?.BasePrice * list[index]?.Tax) / 100;
    setInputList(list);
    dispatch(editItemsPurchase(list));
  };

  return (
    <MainCard content={false}>
      <ScrollX>
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
              <TableCell align="center">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inputList?.map((x: any, i: number) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Stack spacing={0}>
                      <Typography className="font-size">{x.Name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        Sku {x.Sku}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Ean {x.Ean}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <TextField
                    InputProps={{ inputProps: { min: 0 } }}
                    sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                    type="number"
                    placeholder="Ingresar Cantidad"
                    fullWidth
                    name="Count"
                    value={x.Count}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    placeholder="Ingresar Precio Base"
                    fullWidth
                    name="BasePrice"
                    value={x.BasePrice}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    placeholder="Ingresar IVA"
                    fullWidth
                    name="Tax"
                    value={x.Tax}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    placeholder="Ingresar Descuento Negociado"
                    fullWidth
                    name="DiscountNegotiated"
                    value={x.DiscountNegotiated}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    placeholder="Ingresar Descuento Adicional"
                    fullWidth
                    name="DiscountAdditional"
                    value={x.DiscountAdditional}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    placeholder="Ingresar Bonificación"
                    fullWidth
                    value={x.Bonus}
                    name="Bonus"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Input
                    id="SubTotal"
                    onChange={(e) => handleInputChange(e, i)}
                    name="SubTotal"
                    value={x.SubTotal || 0}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                </TableCell>
                <TableCell align="center">
                  <Input
                    id="Total"
                    onChange={(e) => handleInputChange(e, i)}
                    name="Total"
                    value={x.Total || 0}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Delete">
                    <IconButton
                      color="secondary"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        dispatch(
                          openSnackbar({
                            open: true,
                            message: 'Producto delete successfully.',
                            variant: 'alert',
                            alert: {
                              color: 'success'
                            },
                            close: false
                          })
                        );
                        dispatch(deleteItemsPurchase(x.ID));
                      }}
                    >
                      <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollX>
    </MainCard>
  );
};

export default DetailsPurchase;
