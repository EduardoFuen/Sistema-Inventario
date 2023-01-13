import { useMemo, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// project import

import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import { useSelector, useDispatch } from 'store';
import { getWarehouseList } from 'store/reducers/warehouse';
import { getInventoryList } from 'store/reducers/inventory';

// ==============================|| INVENTORY - LIST VIEW ||============================== //
const InventoryList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWarehouseList());
    dispatch(getInventoryList());
  }, [dispatch]);

  const { listInventory, isLoading } = useSelector((state) => state.inventory);
  const { warehouseList } = useSelector((state) => state.warehouse);

  const columns = useMemo(
    () => [
      {
        Header: 'Fecha Movimiento',
        accessor: 'Date',
        disableSortBy: true,
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{value || ''}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Producto',
        accessor: 'Sku',
        Cell: ({ row }: any) => {
          const { original } = row;

          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{original?.ProductName}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Sku {original?.Sku}
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
        accessor: 'InitInventory.Units',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography>{value}</Typography>
              </Stack>
            </Stack>
          );
        }
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
        accessor: 'InitInventory.Cost',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography>{value}</Typography>
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
                Compras
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'Purchase.Unids',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography>{value}</Typography>
              </Stack>
            </Stack>
          );
        }
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
        accessor: 'Purchase.Cost',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography>{value}</Typography>
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
                Inventario Disponible
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'Available.Units',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography>{value}</Typography>
              </Stack>
            </Stack>
          );
        }
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
        accessor: 'Available.Cost',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography>{value}</Typography>
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
                Ventas
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'Selled.Units',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography>{value}</Typography>
              </Stack>
            </Stack>
          );
        }
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
        accessor: 'Selled.Cost',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography>{value}</Typography>
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
                Inventario Final
              </Typography>
            </Stack>
          </Stack>
        ),
        accessor: 'EndInventory.Units',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography>{value}</Typography>
              </Stack>
            </Stack>
          );
        }
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
        accessor: 'EndInventory.Cost',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography>{value}</Typography>
              </Stack>
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
          data={listInventory as []}
          handleImport={() => {}}
          handleAdd={() => {}}
          TitleButton=""
          hideButton={false}
          isLoading={isLoading}
          dataExport={listInventory as []}
          FileName="ReporteInventario"
          searchActive={false}
          warehouses={warehouseList as []}
          defaultWarehouse={Number(warehouseList[0]?.ID) || 0}
          handleChangeWareHouse={(value: number) => {
            dispatch(getInventoryList(value));
          }}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
    </MainCard>
  );
};

export default InventoryList;
