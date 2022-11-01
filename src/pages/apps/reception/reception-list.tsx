import { useMemo, useEffect } from 'react';
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
import { useSelector, useDispatch } from 'store';
import { getPurchaseList } from 'store/reducers/purcharse';
import { newDataExport } from 'utils/DataExportPurchase';

// assets
import { EyeTwoTone } from '@ant-design/icons';

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
    history(`/reception/view/${id}`);
  };

  const { listPurchase } = useSelector((state) => state.purchase);
  const { supplierList } = useSelector((state) => state.supplier);
  const { warehouseList } = useSelector((state) => state.warehouse);

  const columns = useMemo(
    () => [
      {
        Header: 'Order',
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
                <Typography variant="subtitle1">{format(new Date(value), 'dd-MM-yyyy')}</Typography>
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
        className: 'cell-center',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Total Descuento',
        accessor: 'SubtotalWithDiscount',
        className: 'cell-center',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
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
            case 4:
              return <Chip color="warning" label="Partial" size="small" variant="light" />;
            case 3:
              return <Chip color="success" label="Completed" size="small" variant="light" />;
            case 2:
              return <Chip color="error" label="Cancelled" size="small" variant="light" />;
            case 1:
              return <Chip color="info" label="Send" size="small" variant="light" />;
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
          let dataPDF: any = {
            ...row.original,
            supplier: getObject(supplierList, row?.original?.SupplierID),
            warehouse: getObject(warehouseList, row?.original?.WarehouseID)?.Name
          };
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <PDF values={dataPDF} FileName="Recepción" />
              <Tooltip title="Ingresar">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleViewReception(row.values.ID);
                  }}
                >
                  <EyeTwoTone twoToneColor={theme.palette.primary.main} />
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
          data={listPurchase as []}
          handleImport={() => {}}
          hideButton={false}
          FileName="Recepción"
          dataExport={newDataExport(listPurchase, warehouseList, supplierList) as []}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
    </MainCard>
  );
};

export default ReceptionList;
