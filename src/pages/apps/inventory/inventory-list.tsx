import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import { useSelector } from 'store';

// ==============================|| INVENTORY - LIST VIEW ||============================== //

const InventoryList = () => {
  const theme = useTheme();

  const { listPurchase } = useSelector((state) => state.purchase);
  const columns = useMemo(
    () => [
      {
        Header: 'Fecha Movimiento',
        accessor: 'create_order',
        disableSortBy: true
      },
      {
        Header: 'SKU',
        accessor: 'sku'
      },
      {
        Header: 'EAN',
        accessor: 'ean'
      },
      {
        Header: 'Producto',
        accessor: 'nameProduct'
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
          FileName="ReporteInventario"
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
    </MainCard>
  );
};

export default InventoryList;
