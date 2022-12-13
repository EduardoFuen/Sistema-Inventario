import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Typography } from '@mui/material';
// third-party
import NumberFormat from 'react-number-format';
// project import
import PDF from 'components/PDF';
import { getObject } from 'utils/Global';
import ReactTable from 'components/ReactTable';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { newDataExport } from 'utils/DataExportPurchase';
import { DATEFORMAT } from 'config';

import { useSelector, useDispatch, store } from 'store';
import { getPurchaseList, resetItemsPurchase, getIDPurchase } from 'store/reducers/purcharse';

// assets
import { PlusCircleOutlined, FilePdfOutlined, SyncOutlined } from '@ant-design/icons';

// ==============================|| RECEPTION - LIST VIEW ||============================== //

const ReceptionList = () => {
  const theme = useTheme();
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchaseList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewReception = (id: any) => {
    dispatch(resetItemsPurchase());
    history(`/reception/view/${id}`);
  };

  const { listPurchase } = useSelector((state) => state.purchase);
  const { supplierList } = useSelector((state) => state.supplier);
  const { warehouseList } = useSelector((state) => state.warehouse);

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
                <Typography className="font-size">{format(new Date(value), DATEFORMAT)}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Proveedor',
        accessor: 'SupplierID',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{getObject(supplierList, value)?.BusinessName || ''}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {getObject(supplierList, value)?.Nit || ''}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {getObject(supplierList, value)?.EmailContact || ''}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Bodega',
        accessor: 'WarehouseID',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{getObject(warehouseList, value)?.Name || ''}</Typography>
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
              <Tooltip title="Ingresar">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleViewReception(row.values.ID);
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
