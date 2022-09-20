import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, Grid, InputLabel, MenuItem, Stack, TextField, Typography, FormControlLabel, Switch } from '@mui/material';

// project import
import { useSelector, useDispatch } from 'store';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
// assets
import { UploadOutlined } from '@ant-design/icons';

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function AddPurchase() {
  const history = useNavigate();
  const statuss = [
    {
      value: 'Saludable',
      label: 'Saludable'
    },
    {
      value: 'Salud',
      label: 'Salud'
    }
  ];

  const [quantity, setQuantity] = useState('one');
  const [status, setStatus] = useState('in stock');

  const { makerList } = useSelector((state) => state.maker);
  const dispatch = useDispatch();
  const { tradeMarkList } = useSelector((state) => state.trademaker);
  const { packList } = useSelector((state) => state.pack);
  const { product } = useSelector((state) => state.product);
  const [productNew, setProductNew] = useState({
    name: product?.name,
    sku: product?.sku
  });
  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
    setProductNew({
      name: event.target.value,
      sku: event.target.value
    });
  };
  const handleCancel = () => {
    history(`/apps/e-commerce/product-list`);
  };

  return (
    <>
      <MainCard>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MainCard>
              <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                Datos Básicos
              </Typography>
              <Grid container spacing={1} direction="row">
                <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Nombre Producto</InputLabel>
                  <TextField
                    sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                    value={productNew?.name}
                    placeholder="Ingresa Nombre"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>SKU</InputLabel>
                  <TextField
                    sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                    value={productNew?.sku}
                    placeholder="Ingresa SKU"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>EAN</InputLabel>
                  <TextField
                    sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                    value={productNew?.sku}
                    placeholder="Ingresa EAN"
                    fullWidth
                  />
                </Grid>
                {/*   <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Product Description</InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Enter your email" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Category</InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Enter your category" fullWidth />
                </Grid> */}
                <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Precio</InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresa Precio" fullWidth />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography color="error.main" sx={{ mt: 4, opacity: 0.5 }}>
                  *{' '}
                  <Typography component="span" color="textSecondary">
                    La resolución recomendada es 640*640 con tamaño de archivo
                  </Typography>
                </Typography>
                <Button variant="outlined" color="secondary" startIcon={<UploadOutlined />} sx={{ mt: 1, textTransform: 'none' }}>
                  Click to Upload
                </Button>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MainCard>
              <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                Datos Adicionales
              </Typography>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Maker</InputLabel>
                  <TextField placeholder="Select quantity" fullWidth select value={quantity} onChange={handleQuantity}>
                    {makerList.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Categoria</InputLabel>
                  <TextField placeholder="Select status" fullWidth select value={status} onChange={handleStatus}>
                    {statuss.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Trademark</InputLabel>
                  <TextField placeholder="Select status" fullWidth select value={status} onChange={handleStatus}>
                    {tradeMarkList.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Categoria 2</InputLabel>
                  <TextField placeholder="Select status" fullWidth select value={status} onChange={handleStatus}>
                    {statuss.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Variación</InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresa Variación" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Categoria 3</InputLabel>
                  <TextField placeholder="Select status" fullWidth select value={status} onChange={handleStatus}>
                    {statuss.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          <Grid item xs={12} sm={6}>
            <MainCard>
              <Grid container direction="row" spacing={2}>
                <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                  Datos Medidas
                </Typography>
                <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Envase</InputLabel>
                  <TextField placeholder="Selecconar Envase" select value={quantity} fullWidth onChange={handleQuantity}>
                    {packList.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Cantidad</InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresa Cantidad" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Maker Unit</InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresa Maker Unit" fullWidth />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Weight(grams)</InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresa Unidad" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Width(cm)</InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresa Maker Unit" fullWidth />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Pack</InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresa Pack" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Height(cm) </InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresa Maker Unit" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}> Pack Unit</InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresa Pack Unit" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Depth(cm)</InputLabel>
                  <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresa Maker Unit" fullWidth />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/*     <Grid item xs={12} sm={6}>
            <MainCard>
              <Grid container direction="row" spacing={2}>
                <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                  Sustancias o principios Activo
                </Typography>
                <Grid item xs={6}>ß
                  <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Envase</InputLabel>
                  <TextField placeholder="Select quantity" select value={quantity} onChange={handleQuantity}>
                    {quantities.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </MainCard>
          </Grid> */}
          <Grid item xs={12} sm={8}>
            <FormControlLabel control={<Switch sx={{ mt: 0 }} />} label="Estado" labelPlacement="top" />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ textTransform: 'none' }}
                onClick={() => {
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: 'Producto update successfully.',
                      variant: 'alert',
                      alert: {
                        color: 'success'
                      },
                      close: false
                    })
                  );
                  history(`/p/product-list`);
                }}
              >
                Add new Product
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default AddPurchase;
