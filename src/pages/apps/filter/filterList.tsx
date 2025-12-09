import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Typography, CircularProgress, Box, Button, Autocomplete, TextField } from '@mui/material';
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
  console.log('Lista completa:', lista);
  console.log('Primer elemento de la lista:', lista[0]);
  console.log('Fecha desde:', dateFrom);
  console.log('Fecha hasta:', dateTo);

  // Estados para los filtros
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);

  const topComprador = findTopComprador(lista);
  console.log('Top Comprador:', topComprador);

  const topVenta = findTopVenta(lista);
  console.log('Top Venta completo:', topVenta);
  console.log('Top Venta Total:', topVenta?.Total);
  console.log('Top Venta BusinessName:', topVenta?.BusinessName);
  console.log('Top Venta Supplier:', topVenta?.Supplier);

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

  return (
    <MainCard content={false}>


      {dateFrom && dateTo && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginLeft: 2, marginBottom: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
            <Typography variant="h6" component="h2" color="text.secondary">
              Rango de fechas:
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              {format(dateFrom, 'dd/MM/yyyy')} - {format(dateTo, 'dd/MM/yyyy')}
            </Typography>
          </Stack>
        </Box>
      )}
      {(selectedDelivery || selectedStatus !== null) && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginLeft: 2, marginTop: 1 }}>
          <Typography variant="body1" component="h2">
            Mostrando:
          </Typography>
          <Typography variant="body1" color="secondary" sx={{ marginLeft: 1, fontWeight: 'bold' }}>
            {list.length} de {lista.length} registros
          </Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, marginRight: 3, marginTop: 2, marginBottom: 2 }}>
        <Autocomplete
          sx={{ minWidth: 250 }}
          options={deliveryOptions}
          value={selectedDelivery}
          onChange={(event, newValue) => {
            setSelectedDelivery(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Filtrar por Delivery" placeholder="Seleccione un delivery" />}
          clearOnEscape
        />

        <Autocomplete
          sx={{ minWidth: 280 }}
          options={statusOptions}
          getOptionLabel={(option) => option.label}
          value={statusOptions.find((opt) => opt.value === selectedStatus) || null}
          onChange={(event, newValue) => {
            setSelectedStatus(newValue ? newValue.value : null);
          }}
          renderInput={(params) => <TextField {...params} label="Filtrar por Estado" placeholder="Seleccione un estado" />}
          clearOnEscape
        />

        <Button
          variant="outlined"
          onClick={() => {
            setSelectedDelivery(null);
            setSelectedStatus(null);
          }}
        >
          Limpiar Filtros
        </Button>

        <Button variant="contained" onClick={filtrar}>
          Cambiar Fecha
        </Button>
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
