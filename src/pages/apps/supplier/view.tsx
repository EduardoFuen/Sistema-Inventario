// material-ui
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Grid,
  Divider,
  List,
  ListItem,
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
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

// ==============================|| VIEW SUPPLIER - MAIN ||============================== //

const UserView = ({ data }: any) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

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
                      <Typography variant="h5">{capitalize(data?.BusinessName)}</Typography>
                      <Typography variant="h6" color="secondary">
                        NIT {data.Nit}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={2.5} alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h6">
                        <MailOutlined /> {data?.EmailContact}
                      </Typography>
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
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Stack spacing={2.5}>
              <MainCard title="Detalle Proveedor">
                <List sx={{ py: 0 }}>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Datos de Contacto</Typography>
                          <Typography>Nombre {capitalize(data?.NameContact)}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
            
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      {data.PaymenTerm && (
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary" align="center">
                              Plazo de pagos
                            </Typography>
                            <Typography align="center">{data?.PaymenTerm}</Typography>
                          </Stack>
                        </Grid>
                      )}
                      {data.DaysPayment && (
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary" align="center">
                              Días pronto pago
                            </Typography>
                            <Typography align="center">{data?.DaysPayment}</Typography>
                          </Stack>
                        </Grid>
                      )}
                    </Grid>
                  </ListItem>
                </List>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default UserView;
