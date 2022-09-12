import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, Grid, InputLabel, MenuItem, Stack, TextField, Typography, FormControlLabel, Switch } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function AddNewProduct() {
  const history = useNavigate();

  const quantities = [
    {
      value: 'one',
      label: '1'
    },
    {
      value: 'two',
      label: '2'
    },
    {
      value: 'three',
      label: '3'
    }
  ];

  const [quantity, setQuantity] = useState('one');

  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleCancel = () => {
    history(`/p/product-list`);
  };

  return (
    <>
      <MainCard>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MainCard>
              <Grid container spacing={1} direction="column">
                <Grid item xs={12}>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Categoria
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Nombre de Categoria</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresar Nombre Categoria" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Estado</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <FormControlLabel control={<Switch sx={{ mt: 0 }} />} label="" labelPlacement="top" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="contained" sx={{ textTransform: 'none' }}>
                      Add
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MainCard>
              <Grid container spacing={1} direction="column">
                <Grid item xs={12}>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Categoria 2
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Nombre de Categoria 2</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        placeholder="Ingresar Nombre Categoria 2"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Estado</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <FormControlLabel control={<Switch sx={{ mt: 0 }} />} label="" labelPlacement="top" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="contained" sx={{ textTransform: 'none' }}>
                      Add
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MainCard>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Categoria 3
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Nombre de Categoria 3</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        placeholder="Ingresar Nombre Categoria 3"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Categoria 1</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField placeholder="Select quantity" fullWidth select value={quantity} onChange={handleQuantity}>
                        {quantities.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Categoria 2</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField placeholder="Select quantity" fullWidth select value={quantity} onChange={handleQuantity}>
                        {quantities.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Estado</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <FormControlLabel control={<Switch sx={{ mt: 0 }} />} label="" labelPlacement="top" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="contained" sx={{ textTransform: 'none' }}>
                      Add
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default AddNewProduct;
