import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import PDF from 'components/PDF';
import { newDataExport } from 'utils/DataExportPurchase';
import { DATEFORMAT } from 'config';

import { useSelector, useDispatch, store } from 'store';
import { deletePurchase, getPurchaseList, resetItemsPurchase, getIDPurchase } from 'store/reducers/purcharse';

// assets
import { DeleteTwoTone, EditTwoTone, FilePdfOutlined, SyncOutlined } from '@ant-design/icons';

// ==============================|| PURCHASE - LIST VIEW ||============================== //

const PurchaseList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();

  const { listPurchase } = useSelector((state) => state.purchase);

  useEffect(() => {
    dispatch(getPurchaseList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        Header: '#',
        accessor: 'ID',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">Farmu-{value}</Typography>
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
                <Typography variant="subtitle1">{format(new Date(value), DATEFORMAT)}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Proveedor',
        accessor: 'Supplier',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{value?.BusinessName || ''}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {value?.Nit || ''}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {value?.EmailContact || ''}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Bodega',
        accessor: 'Warehouse',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{value?.Name || ''}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Subtotal',
        accessor: 'SubTotal',
        className: 'cell-center',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      /* {
        Header: 'Subtotal con Descuento',
        accessor: 'SubtotalWithDiscount',
        className: 'cell-center',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      }, */
      {
        Header: 'IVA',
        accessor: 'Tax',
        className: 'cell-center',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Total',
        accessor: 'Total',
        className: 'cell-center',
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
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          const [isLoading, setIsLoading] = useState<boolean>(false);
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="PDF">
                <IconButton
                  color="primary"
                  disabled={isLoading}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setIsLoading(true);
                    if (row?.values?.ID) handleInfoPDF(setIsLoading, row?.values?.ID);
                  }}
                >
                  {!isLoading ? (
                    <FilePdfOutlined twoToneColor={theme.palette.primary.main} />
                  ) : (
                    <SyncOutlined spin twoToneColor={theme.palette.primary.main} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    if (row?.values?.ID) handleViewPurchase(row?.values?.ID);
                  }}
                >
                  <EditTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
              {row.original.Status === 0 ||
                (row.original.Status === 1 && (
                  <Tooltip title="Cancelar">
                    <IconButton
                      color="error"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        dispatch(deletePurchase(Number(row?.values?.ID), { ...row.original, Status: 2 }));
                      }}
                    >
                      <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                    </IconButton>
                  </Tooltip>
                ))}
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );
  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={listPurchase as []}
          handleImport={() => {}}
          handleAdd={handleAddPurchase}
          TitleButton="Agregar Orden Compra"
          FileName="Purchase"
          hideButton={false}
          dataExport={newDataExport(listPurchase) as []}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
    </MainCard>
  );
};

export default PurchaseList;
