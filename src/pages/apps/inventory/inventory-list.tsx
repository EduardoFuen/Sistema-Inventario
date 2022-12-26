import { useMemo, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import { format } from 'date-fns';

// project import

import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import { useSelector, useDispatch } from 'store';
import { getWarehouseList } from 'store/reducers/warehouse';

import { DATEFORMAT } from 'config';
// ==============================|| INVENTORY - LIST VIEW ||============================== //
const InventoryList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWarehouseList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { listPurchase } = useSelector((state) => state.purchase);
  const { warehouseList } = useSelector((state) => state.warehouse);

  const columns = useMemo(
    () => [
      {
        Header: 'Fecha Movimiento',
        accessor: 'CreatedAt',
        disableSortBy: true,
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
        Header: 'Producto',
        accessor: 'Sku',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{value?.Name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Sku {value?.Sku}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Ean :{value?.Ean}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
            <Stack spacing={0}>
              <Typography variant="subtitle1">Unidades</Typography>
              <Typography variant="caption" color="textSecondary">
                inventario Inicial
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'initialInvUnd'
      },
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
            <Stack spacing={0}>
              <Typography variant="subtitle1">Costo</Typography>
              <Typography variant="caption" color="textSecondary">
                inventario Inicial
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'initialInvCosto'
      },
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
            <Stack spacing={0}>
              <Typography variant="subtitle1">Unidades</Typography>
              <Typography variant="caption" color="textSecondary">
                Compras
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'purchaseInvUnd'
      },
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
            <Stack spacing={0}>
              <Typography variant="subtitle1">Costo</Typography>
              <Typography variant="caption" color="textSecondary">
                Compras
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'purchaseInvCosto'
      },
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
            <Stack spacing={0}>
              <Typography variant="subtitle1">Unidades</Typography>
              <Typography variant="caption" color="textSecondary">
                Inventario Disponible
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'availableInvUnd'
      },
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
            <Stack spacing={0}>
              <Typography variant="subtitle1">Costo</Typography>
              <Typography variant="caption" color="textSecondary">
                Inventario Disponible
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'availableInvCosto'
      },
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
            <Stack spacing={0}>
              <Typography variant="subtitle1">Unidades</Typography>
              <Typography variant="caption" color="textSecondary">
                Ventas
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'salesInvUnd'
      },
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
            <Stack spacing={0}>
              <Typography variant="subtitle1">Costo</Typography>
              <Typography variant="caption" color="textSecondary">
                Ventas
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'salesInvCosto'
      },
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
            <Stack spacing={0}>
              <Typography variant="subtitle1">Unidades</Typography>
              <Typography variant="caption" color="textSecondary">
                Inventario Final
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'endInvUnd'
      },
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
            <Stack spacing={0}>
              <Typography variant="subtitle1">Costo</Typography>
              <Typography variant="caption" color="textSecondary">
                Inventario Final
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'endInvCosto'
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
          TitleButton=""
          hideButton={false}
          dataExport={listPurchase as []}
          FileName="ReporteInventario"
          searchActive={false}
          warehouses={warehouseList as []}
          defaultWarehouse={Number(warehouseList[0]?.ID) || 0}
          handleChangeWareHouse={(value: number) => {
            console.log(value);
          }}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
    </MainCard>
  );
};

export default InventoryList;
