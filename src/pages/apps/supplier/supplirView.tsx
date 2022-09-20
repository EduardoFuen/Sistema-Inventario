// material-ui
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
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
// ==============================|| USER - VIEW ||============================== //

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
                      <Typography variant="h5">{capitalize(data.businessName)}</Typography>
                      <Typography variant="h6" color="secondary">
                        {data.nit}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0 }}>
                    <ListItem>
                      <ListItemIcon>
                        <MailOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{data.email}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">
                          <NumberFormat displayType="text" format="+57 (###) ###-####" mask="_" defaultValue={data.phone} />
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
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
                          <Typography>Nombre {capitalize(data.name)}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary" align="center">
                            Lead Time Bogota
                          </Typography>
                          <Typography align="center">{data.leadTimeBog}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary" align="center">
                            Lead Time Barraquilla
                          </Typography>
                          <Typography align="center">{data.leadTimeBaq}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      {data.paymenTerm && (
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary" align="center">
                              Plazo de pagos
                            </Typography>
                            <Typography align="center">{data.paymenTerm}</Typography>
                          </Stack>
                        </Grid>
                      )}
                      {data.daysPayment && (
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary" align="center">
                              Días pronto pago
                            </Typography>
                            <Typography align="center">{data.daysPayment}</Typography>
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
