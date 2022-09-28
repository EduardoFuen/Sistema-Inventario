import { useEffect, useState /*  ChangeEvent */ } from 'react';

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
import { deleteItemsPurchase, updateItemsPurchase } from 'store/reducers/purcharse';
import { openSnackbar } from 'store/reducers/snackbar';

import { useDispatch, useSelector } from 'store';

const DetailsPurchase = ({ product }: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [inputList, setInputList] = useState<any>([{}]);
  const { detailsPurchase } = useSelector((state) => state.purchase);

  const data = product && product?.length > 0 ? product : detailsPurchase;

  useEffect(() => {
    let newData = data.map((item: any) => ({
      qty: '',
      price: '',
      tax: '',
      Negotiateddiscount: '',
      Additionaldiscount: '',
      bonus: '',
      subtotal: '',
      total: '',
      ...item
    }));
    setInputList(newData);
    window.localStorage.setItem('farmu-productsDetails', JSON.stringify(newData));
  }, [data]);

  const handleInputChange = (e: any, index: number) => {
    const list = [...inputList];
    const { name, value } = e.target;
    if (name === 'qty') {
      list[index]['qty'] = value;
    }
    if (name === 'price') {
      list[index]['price'] = value;
    }
    if (name === 'tax') {
      list[index]['tax'] = value;
    }
    if (name === 'Negotiateddiscount') {
      list[index]['Negotiateddiscount'] = value;
    }
    if (name === 'Additionaldiscount') {
      list[index]['Additionaldiscount'] = value;
    }
    if (name === 'bonus') {
      list[index]['bonus'] = value;
    }
    list[index]['subtotal'] = list[index]?.qty * list[index]?.price * ((100 - list[index]?.Negotiateddiscount) / 100) || 0;
    list[index]['total'] = list[index]?.subtotal + (list[index]?.qty * list[index]?.price * list[index]?.tax) / 100;

    setInputList(list);
    dispatch(updateItemsPurchase(list));
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
            {inputList.map((x: any, i: number) => (
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
                <TableCell align="center">
                  <TextField
                    InputProps={{ inputProps: { min: 0 } }}
                    sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                    type="number"
                    placeholder="Ingresar Cantidad"
                    fullWidth
                    name="qty"
                    value={x.qty}
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
                    name="price"
                    value={x.price}
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
                    name="tax"
                    value={x.tax}
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
                    name="Negotiateddiscount"
                    value={x.Negotiateddiscount}
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
                    name="Additionaldiscount"
                    value={x.Additionaldiscount}
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
                    value={x.bonus}
                    name="bonus"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Input
                    id="standard-adornment-amount"
                    onChange={(e) => handleInputChange(e, i)}
                    name="subtotal"
                    value={x.subtotal || 0}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                </TableCell>
                <TableCell align="center">
                  <Input
                    id="standard-adornment-amount"
                    onChange={(e) => handleInputChange(e, i)}
                    name="total"
                    value={x.total || 0}
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
                        dispatch(deleteItemsPurchase(x.name));
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

        {/*   <ReactTable columns={columns} data={data} updateMyData={updateMyData} skipPageReset={skipPageReset} /> */}
      </ScrollX>
    </MainCard>
  );
};

export default DetailsPurchase;
