// material-ui

import {

  Grid,
  Divider,
  
  /*   ListItemSecondaryAction, */
  Stack,
  TableCell,
  TableRow,
  Typography,
  capitalize
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import MainCard from 'components/MainCard';

// assets
import { PhoneOutlined } from '@ant-design/icons';

// ==============================|| VIEW SUPPLIER - MAIN ||============================== //

const UserView = ({ data }: any) => {


  return (
    <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` } }}>
      <TableCell colSpan={8} sx={{ p: 2.5 }}>
        <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10, xl: 12 } }}>
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={2.5} alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{capitalize(data?.NameContact)}</Typography>
                     
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={2.5} alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                     
                      <Typography align="right">
                        <PhoneOutlined />{' '}
                        <NumberFormat displayType="text" format="+57 (###) ###-####" mask="_" defaultValue={data?.PhoneContact} />
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default UserView;
