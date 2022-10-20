import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { getSupplierList } from 'store/reducers/supplier';
import { getWarehouseList } from 'store/reducers/warehouse';
import { newDataExport } from 'utils/DataExportPurchase';

// assets
import { EyeTwoTone } from '@ant-design/icons';

// ==============================|| RECEPTION - LIST VIEW ||============================== //

const ReceptionList = () => {
  const theme = useTheme();
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSupplierList());
    dispatch(getWarehouseList());
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
        className: 'cell-center'
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
      /*    {
        Header: 'Fecha OC',
        accessor: 'create_order',
        disableSortBy: true
      }, */
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
        Cell: ({ row }: any) => {
          const { original } = row;
          let status = original.orderStatus ? original.orderStatus : original.status;
          switch (status) {
            case 'Partial':
              return <Chip color="warning" label="Partial" size="small" variant="light" />;
            case 'Completed':
              return <Chip color="success" label="Completed" size="small" variant="light" />;
            case 'Cancelled':
              return <Chip color="error" label="Cancelled" size="small" variant="light" />;
            case 'Send':
              return <Chip color="info" label="Send" size="small" variant="light" />;
            case 'New':
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
              <PDF values={dataPDF} />
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
          handleAdd={() => {}}
          hideButton={false}
          TitleButton=""
          FileName="Recepción"
          dataExport={newDataExport(listPurchase, warehouseList, supplierList) as []}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
    </MainCard>
  );
};

export default ReceptionList;
