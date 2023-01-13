import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Typography, Box, CircularProgress } from '@mui/material';
// third-party
import NumberFormat from 'react-number-format';
// project import
import PDF from 'components/PDF';
import ReactTable from 'components/ReactTable';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { newDataExport } from 'utils/PurchaseTransform';

import { useSelector, useDispatch, store } from 'store';
import { getPurchaseList, resetItemsPurchase, getIDPurchase } from 'store/reducers/purcharse';

// assets
import { PlusCircleOutlined, FilePdfOutlined } from '@ant-design/icons';

// ==============================|| RECEPTION - LIST VIEW ||============================== //

const ReceptionList = () => {
  const theme = useTheme();
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchaseList());
  }, [dispatch]);

  const handleViewReception = (id: any) => {
    dispatch(resetItemsPurchase());
    history(`/reception/view/${id}`);
  };

  const { listPurchase } = useSelector((state) => state.purchase);

  const handleInfoPDF = async (setIsLoading: any, id: number) => {
    dispatch(getIDPurchase(id)).then(async () => {
      let {
        purchase: { order }
      } = store.getState();

      if (order) await PDF(order, 'Recepción');
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
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1" className="font-size">
                  {original?.Supplier?.BusinessName || ''}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {original?.Supplier?.Nit || ''}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {original?.Supplier?.EmailContact || ''}
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
                <Typography variant="subtitle1" className="font-size">
                  {value || ''}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Subtotal',
        accessor: 'SubTotal',
        className: 'cell-center font-size',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'IVA',
        accessor: 'Tax',
        className: 'cell-center font-size',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Total',
        accessor: 'Total',
        className: 'cell-center font-size',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Estado',
        accessor: 'ReceptionStatus',
        Cell: ({ value }: any) => {
          switch (value) {
            case 3:
              return <Chip color="error" label="Cancelled" size="small" variant="light" />;
            case 2:
              return <Chip color="success" label="Completed" size="small" variant="light" />;
            case 1:
              return <Chip color="warning" label="Partial" size="small" variant="light" />;
            default:
              return <Chip color="info" label="New" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Acciones',
        className: 'cell-center font-size',
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
              <Tooltip title="Ingresar">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleViewReception(row?.original?.ID);
                  }}
                >
                  <PlusCircleOutlined twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
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
          data={listPurchase.filter((item) => item.Status === 1) as []}
          handleImport={() => {}}
          hideButton={false}
          FileName="Recepción"
          dataExport={newDataExport(listPurchase) as []}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
    </MainCard>
  );
};

export default ReceptionList;
