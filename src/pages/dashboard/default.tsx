import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Grid, Typography, Box, Link } from '@mui/material';

// assets
import products from 'assets/images/home/products.png';
import proveedor from 'assets/images/home/proveedor.png';
import shoppingcart from 'assets/images/home/shoppingcart.png';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  return (
    <Grid container xs={6} item rowSpacing={7} columnSpacing={4} style={{ marginTop: '10%' }} alignSelf="center" className="cell-center">
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Link component={RouterLink} to="/product-list" variant="caption" color="textPrimary">
          <Box sx={{ width: { xs: 50, sm: '100%' } }}>
            <img src={products} alt="products" style={{ width: '35%', height: 'auto' }} />
          </Box>
          <Typography variant="h4">Productos</Typography>
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Link component={RouterLink} to="/supplier" variant="caption" color="textPrimary">
          <Box sx={{ width: { xs: 50, sm: '100%' } }}>
            <img src={proveedor} alt="proveedor" style={{ width: '35%', height: 'auto' }} />
          </Box>
          <Typography variant="h4"> Clientes</Typography>
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Link component={RouterLink} to="/purchase" variant="caption" color="textPrimary">
          <Box sx={{ width: { xs: 50, sm: '100%' } }}>
            <img src={shoppingcart} alt="shoppingcart" style={{ width: '35%', height: 'auto' }} />
          </Box>
          <Typography variant="h4"> Compras</Typography>
        </Link>
      </Grid>

    </Grid>
  );
};

export default DashboardDefault;
