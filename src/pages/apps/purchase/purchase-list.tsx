import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Typography, Button, Box } from '@mui/material';
// third-party
import NumberFormat from 'react-number-format';
// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
//import PDF from 'components/PDF';
import { newDataExport } from 'utils/PurchaseTransform';
import { getProducts } from 'store/reducers/product';

//import { useSelector, useDispatch, store } from 'store';
import { useSelector, useDispatch } from 'store';
import { deletePurchase, getPurchaseList, resetItemsPurchase } from 'store/reducers/purcharse';
import useAuth from 'hooks/useAuth';
import AlertDelete from 'components/AlertDelete';

// types
import { Purchase } from 'types/purchase';
// assets
import { DeleteTwoTone, EyeTwoTone } from '@ant-design/icons';

// ==============================|| PURCHASE - LIST VIEW ||============================== //

const PurchaseList = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>(null);

  const { listPurchase } = useSelector((state) => state.purchase);

  useEffect(() => {
    dispatch(getPurchaseList());
    dispatch(getProducts());
  }, [dispatch]);

   const filtrar = () => {
    history('/filter');
  };

  const handleAddPurchase = () => {
    dispatch(resetItemsPurchase());
    history(`/purchase/add`);
  };

  const handleViewPurchase = (id: number) => {
    //dispatch(resetItemsPurchase());
    history(`/purchase/view/${id}`);
  };

  const handleAlertClose = async (status: boolean) => {
    if (status && selected) {
      await dispatch(deletePurchase(Number(selected.sk)));
    }
    setOpenAlert(false);
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
            case 5:
              return <Chip color="info" label="Pagado en Caja" size="small" variant="light" />;
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
                      onClick={(e: any) => {
                        e.stopPropagation();
                        setSelected(row.original);
                        setOpenAlert(true);
                      }}
                    >
                      <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                    </IconButton>
                </Tooltip>
               )}
              {row.original?.ReceptionStatus === 0 && (
                <Tooltip title="Cancelar">
                  <IconButton
                    color="error"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setSelected(row.original);
                      setOpenAlert(true);
                    }}
                  >
                    <DeleteTwoTone twoToneColor={theme.palette.error.main} />
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

  let list: Purchase[] = listPurchase && listPurchase.length > 0 ? listPurchase : [];

  return (
    <MainCard content={false}>
      <ScrollX>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button variant="contained" sx={{ marginTop: 2, marginRight: 3 }} onClick={filtrar}>
            {' '}
            Filtrar fecha{' '}
          </Button>
        </Box>
        <ReactTable
          columns={columns}
          data={list as []}
          handleImport={() => {}}
          handleAdd={handleAddPurchase}
          TitleButton="Agregar"
          FileName="Purchase"
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
      <AlertDelete title={selected?.sk || ''} open={openAlert} handleClose={handleAlertClose} />
    </MainCard>
  );
};

export default PurchaseList;