// material-ui
import Avatar from 'components/@extended/Avatar';
import { Box, Grid, Stack, TableCell, TableRow, Typography } from '@mui/material';

// types
import { Product } from 'types/products';

// ==============================||  PRODUCT - VIEW ||============================== //

interface Props {
  data: Product;
}

const ProductView = ({ data }: Props) => {
  return (
    <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` } }}>
      <TableCell colSpan={8} sx={{ p: 2.5 }}>
        <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10, xl: 12 } }}>
          <Grid item xs={6} sm={5} md={4} lg={3}>
            <Box sx={{ position: 'relative' }}>
              <Avatar variant="rounded" alt={data?.Name} color="secondary" size="sm" src={data?.Sku} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Stack spacing={1} sx={{ px: 2 }}>
              <Typography variant="h5">{data?.Name}</Typography>
              <Typography variant="h5">{data?.Sku}</Typography>
              <Typography variant="h5">{data?.Price}</Typography>
              <Box sx={{ width: '80%', pt: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Typography color="textSecondary">Cantidad</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h6">{data?.Price}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default ProductView;
