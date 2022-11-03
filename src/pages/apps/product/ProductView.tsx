// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Stack, TableCell, TableRow, Typography } from '@mui/material';

// ==============================||  PRODUCT - VIEW ||============================== //

const ProductView = ({ data }: any) => {
  const theme = useTheme();
  return (
    <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` } }}>
      <TableCell colSpan={8} sx={{ p: 2.5 }}>
        <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10, xl: 12 } }}>
          <Grid item xs={6} sm={5} md={4} lg={3}>
            <Box sx={{ position: 'relative' }}>
              {data.UrlImage && <img src={data.UrlImage} alt="product" style={{ background: theme.palette.grey[200], width: '100%' }} />}
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Stack spacing={1} sx={{ px: 2 }}>
              <Typography variant="h5">{data?.Name}</Typography>
              <Box sx={{ width: '80%', pt: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Typography color="textSecondary">Cantidad</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h6">{data?.Quantity}</Typography>
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
