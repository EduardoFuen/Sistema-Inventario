import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Typography, CircularProgress, Box, Button, Autocomplete, TextField, Grid, Card, CardContent, Divider } from '@mui/material';
// third-party
import NumberFormat from 'react-number-format';
import { format } from 'date-fns';
// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
//import PDF from 'components/PDF';
import { newDataExport } from 'utils/PurchaseTransform';
import { getProducts } from 'store/reducers/product';

//import { useSelector, useDispatch, store } from 'store';
import { useDispatch } from 'store';
import { deletePurchase, getPurchaseList, resetItemsPurchase } from 'store/reducers/purcharse';

// types
import { FilterPurchase } from 'types/filterPurchase';
// assets
import { DeleteTwoTone, EyeTwoTone, CalendarOutlined } from '@ant-design/icons';
import { useFilterContext } from 'contexts/Filter.context';
import { findTopComprador, findTopVenta } from './filter';
import useAuth from 'hooks/useAuth';


// ==============================|| RECEPTION - LIST VIEW ||============================== //

const FilterList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useAuth();

  const context = useFilterContext();
  const { lista, dateFrom, dateTo } = context;


  // Estados para los filtros
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);


  useEffect(() => {
    dispatch(getPurchaseList());
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddPurchase = () => {
    dispatch(resetItemsPurchase());
    history(`/purchase/add`);
  };

  const handleViewPurchase = (id: number) => {
    //dispatch(resetItemsPurchase());
    history(`/purchase/view/${id}`);
  };

  const filtrar = () => {
    history('/filter');
  };




  const columns = useMemo(
    () => [
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ textAlign: 'center', width: 90 }}>
            #
          </Stack>
        ),
        accessor: 'NumberOrder',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1" className="font-size">
                  {value || ''}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Fecha OC',
        accessor: 'CreatedAt',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography className="cell-center font-size">{value || ''}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Cliente',
        accessor: 'BusinessName',
        Cell: ({ row }: any) => {
          const { original } = row;
          console.log('LISTA 101')
          console.log(original)
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1" className="font-size">
                  {original?.BusinessName || ''}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {original?.Rif || ''}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {original?.EmailContact || ''}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },

      {
        Header: 'Total',
        accessor: 'Total',
        className: 'cell-center font-size',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'MontoBCV',
        accessor: 'MontoBCV',
        className: 'cell-center font-size',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="Bs " />
      },
      {
        Header: 'Delivery',
        accessor: 'deliveryName',
        className: 'cell-center font-size',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography className="cell-center font-size">{value || 'NO ASIGNADO'}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Estado',
        accessor: 'Status',
        Cell: ({ value }: any) => {
          switch (value) {
            case 4:
              return <Chip color="warning" label="Pagado - No Aceptado por delivery" size="small" variant="light" />;
            case 2:
              return <Chip color="error" label="Cancelado" size="small" variant="light" />;
            case 1:
              return <Chip color="info" label="Pagado - Aceptado por delivery" size="small" variant="light" />;
            case 0:
              return <Chip color="warning" label="Sin Comprobar" size="small" variant="light" />;
            default:
              return <Chip color="warning" label="Sin Comprobar" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Acciones',
        className: 'cell-center font-size',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Ver">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    if (row?.original?.sk) handleViewPurchase(row?.original?.sk);
                  }}
                >
                  <EyeTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
              {user?.role == "1" && (
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={async (e: any) => {
                      e.stopPropagation();
                      setIsLoadingDelete(true);
                      await dispatch(deletePurchase(Number(row?.original?.sk)));
                      setIsLoadingDelete(false);
                    }}
                  >
                    {!isLoadingDelete ? (
                      <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                    ) : (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress color="success" size={20} />
                      </Box>
                    )}
                  </IconButton>
                </Tooltip>
              )}
              {row.original?.ReceptionStatus === 0 && (
                <Tooltip title="Cancelar">
                  <IconButton
                    color="error"
                    onClick={async (e: any) => {
                      e.stopPropagation();
                      setIsLoadingDelete(true);
                      await dispatch(deletePurchase(Number(row?.original?.sk)));
                      setIsLoadingDelete(false);
                    }}
                  >
                    {!isLoadingDelete ? (
                      <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                    ) : (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress color="success" size={20} />
                      </Box>
                    )}
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  // Obtener opciones únicas para los filtros
  const deliveryOptions = useMemo(() => {
    const deliveries = lista
      .map((item) => item.deliveryName)
      .filter((value): value is string => Boolean(value))
      .filter((value, index, self) => self.indexOf(value) === index);
    return deliveries.map(String);
  }, [lista]);

  const statusOptions = [
    { value: 0, label: 'Sin Comprobar' },
    { value: 1, label: 'Pagado - Aceptado por delivery' },
    { value: 2, label: 'Cancelado' },
    { value: 4, label: 'Pagado - No Aceptado por delivery' }
  ];

  // Filtrar la lista según los filtros seleccionados
  let list: FilterPurchase[] = useMemo(() => {
    let filteredList = lista && lista.length > 0 ? lista : [];

    // Filtrar por delivery
    if (selectedDelivery) {
      filteredList = filteredList.filter((item) => item.deliveryName === selectedDelivery);
    }

    // Filtrar por status
    if (selectedStatus !== null) {
      filteredList = filteredList.filter((item) => item.Status === selectedStatus);
    }

    return filteredList;
  }, [lista, selectedDelivery, selectedStatus]);

  // Calcular estadísticas basadas en la lista filtrada
  const topComprador = useMemo(() => findTopComprador(list), [list]);
  const topVenta = useMemo(() => findTopVenta(list), [list]);

  // Calcular suma total de las ventas filtradas
  const totalVentas = useMemo(() => {
    return list.reduce((sum, item) => sum + (Number(item.Total) || 0), 0);
  }, [list]);

  return (
    <MainCard content={false}>
      {/* Header con rango de fechas */}
      {dateFrom && dateTo && (
        <Box sx={{ p: 3, pb: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CalendarOutlined style={{ fontSize: '24px', color: theme.palette.primary.main }} />
            <Typography variant="h5" color="text.primary">
              Rango de fechas:
            </Typography>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
              {format(dateFrom, 'dd/MM/yyyy')} - {format(dateTo, 'dd/MM/yyyy')}
            </Typography>
          </Stack>
        </Box>
      )}

      {/* Sección de estadísticas con Grid */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${theme.palette.primary.lighter} 0%, ${theme.palette.primary.light} 100%)`,
                border: `1px solid ${theme.palette.primary.light}`,
                boxShadow: theme.shadows[2],
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    display: 'block',
                    mb: 1.5
                  }}
                >
                  Comprador Más Frecuente
                </Typography>
                <Typography
                  variant="h4"
                  color="primary.dark"
                  sx={{
                    fontWeight: 700,
                    wordBreak: 'break-word'
                  }}
                >
                  {topComprador || 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${theme.palette.success.lighter} 0%, ${theme.palette.success.light} 100%)`,
                border: `1px solid ${theme.palette.success.light}`,
                boxShadow: theme.shadows[2],
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    display: 'block',
                    mb: 1.5
                  }}
                >
                  Top Venta
                </Typography>
                <Typography
                  variant="body1"
                  color="success.dark"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    wordBreak: 'break-word'
                  }}
                >
                  {topVenta?.BusinessName || topVenta?.Supplier?.BusinessName || 'N/A'}
                </Typography>
                <Typography
                  variant="h4"
                  color="success.dark"
                  sx={{ fontWeight: 700 }}
                >
                  <NumberFormat value={topVenta?.Total || 0} displayType="text" prefix="$" thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card
              sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${theme.palette.warning.lighter} 0%, ${theme.palette.warning.light} 100%)`,
                border: `1px solid ${theme.palette.warning.light}`,
                boxShadow: theme.shadows[2],
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    display: 'block',
                    mb: 1.5
                  }}
                >
                  Total Ventas Filtradas
                </Typography>
                <Typography
                  variant="h3"
                  color="warning.dark"
                  sx={{ fontWeight: 700 }}
                >
                  <NumberFormat value={totalVentas} displayType="text" prefix="$" thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {/* Contador de registros filtrados */}
      {(selectedDelivery || selectedStatus !== null) && (
        <Box sx={{ px: 3, pt: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1" color="text.secondary">
              Mostrando:
            </Typography>
            <Chip
              label={`${list.length} de ${lista.length} registros`}
              color="secondary"
              size="small"
              variant="outlined"
            />
          </Stack>
        </Box>
      )}

      {/* Controles de filtrado */}
      <Box sx={{ p: 3, pt: 2 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="flex-end"
        >
          <Button
            variant="contained"
            onClick={filtrar}
            sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
          >
            Cambiar Fecha
          </Button>

          <Autocomplete
            sx={{ minWidth: { xs: '100%', sm: 250 } }}
            options={deliveryOptions}
            value={selectedDelivery}
            onChange={(event, newValue) => {
              setSelectedDelivery(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filtrar por Delivery"
                placeholder="Seleccione un delivery"
                size="medium"
              />
            )}
            clearOnEscape
          />

          <Autocomplete
            sx={{ minWidth: { xs: '100%', sm: 280 } }}
            options={statusOptions}
            getOptionLabel={(option) => option.label}
            value={statusOptions.find((opt) => opt.value === selectedStatus) || null}
            onChange={(event, newValue) => {
              setSelectedStatus(newValue ? newValue.value : null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filtrar por Estado"
                placeholder="Seleccione un estado"
                size="medium"
              />
            )}
            clearOnEscape
          />

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSelectedDelivery(null);
              setSelectedStatus(null);
            }}
            sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
          >
            Limpiar Filtros
          </Button>
        </Stack>
      </Box>

      <ScrollX>
        <ReactTable
          columns={columns}
          data={list as []}
          handleImport={() => { }}
          handleAdd={handleAddPurchase}
          TitleButton="Agregar"
          FileName="filterPurchase"
          hideButton={false}
          dataExport={newDataExport(list) as []}
          /*     handlePagination={(page: number) => {
            dispatch(getPurchaseList(page + 1));
          }} */
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        /*        isLoading={isLoading}
        numberPage={page}
        totalRows={totalPages} */
        />
      </ScrollX>
    </MainCard>
  );
};

export default FilterList;
