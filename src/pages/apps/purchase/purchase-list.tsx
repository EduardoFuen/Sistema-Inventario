import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Typography, CircularProgress, Box } from '@mui/material';
// third-party
import NumberFormat from 'react-number-format';
// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import PDF from 'components/PDF';
import { newDataExport } from 'utils/PurchaseTransform';
import { getProducts } from 'store/reducers/product';

import { useSelector, useDispatch, store } from 'store';
import { deletePurchase, getPurchaseList, resetItemsPurchase, getIDPurchase } from 'store/reducers/purcharse';

// types
import { Purchase } from 'types/purchase';
// assets
import { DeleteTwoTone, EditTwoTone, FilePdfOutlined } from '@ant-design/icons';

// ==============================|| PURCHASE - LIST VIEW ||============================== //

const PurchaseList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();

  const { listPurchase } = useSelector((state) => state.purchase);

  useEffect(() => {
    dispatch(getPurchaseList());
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddPurchase = () => {
    dispatch(resetItemsPurchase());
    history(`/purchase/add`);
  };

  const handleViewPurchase = (id: number) => {
    dispatch(resetItemsPurchase());
    history(`/purchase/view/${id}`);
  };

  const handleInfoPDF = async (setIsLoading: any, id: number) => {
    dispatch(getIDPurchase(id)).then(async () => {
      let {
        purchase: { order }
      } = store.getState();

      if (order) await PDF(order, 'Purchase');
      setIsLoading(false);
    });
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
        Header: 'Proveedor',
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
        Header: 'Estado',
        accessor: 'Status',
        Cell: ({ value }: any) => {
          switch (value) {
            case 2:
              return <Chip color="error" label="Cancelled" size="small" variant="light" />;
            case 1:
              return <Chip color="info" label="Send" size="small" variant="light" />;
            case 0:
            default:
              return <Chip color="warning" label="New" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Acciones',
        className: 'cell-center font-size',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          const [isLoading, setIsLoading] = useState<boolean>(false);
          const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="PDF">
                <IconButton
                  color="primary"
                  disabled={isLoading}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setIsLoading(true);
                    if (row?.original?.ID) handleInfoPDF(setIsLoading, row?.original?.ID);
                  }}
                >
                  {!isLoading ? (
                    <FilePdfOutlined twoToneColor={theme.palette.primary.main} />
                  ) : (
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress color="success" size={20} />
                    </Box>
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    if (row?.original?.ID) handleViewPurchase(row?.original?.ID);
                  }}
                >
                  <EditTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
              {row.original?.ReceptionStatus === 0 && (
                <Tooltip title="Cancelar">
                  <IconButton
                    color="error"
                    onClick={async (e: any) => {
                      e.stopPropagation();
                      setIsLoadingDelete(true);
                      await dispatch(deletePurchase(Number(row?.original?.ID)));
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

  let list: Purchase[] = listPurchase && listPurchase.length > 0 ? listPurchase : [];

  return (
    <MainCard content={false}>
      <ScrollX>
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
    </MainCard>
  );
};

export default PurchaseList;
