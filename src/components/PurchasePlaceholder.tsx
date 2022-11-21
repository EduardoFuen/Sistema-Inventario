// material-ui
import { Grid, Skeleton, CardContent } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| PurchasePlaceholder ||============================== //

const PurchasePlaceholder = () => (
  <MainCard content={false} boxShadow>
    <CardContent sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={350} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={200} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={100} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={100} />
        </Grid>
      </Grid>
    </CardContent>
  </MainCard>
);

export default PurchasePlaceholder;
