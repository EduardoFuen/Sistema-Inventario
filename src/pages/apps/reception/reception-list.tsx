import { useMemo, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography, useMediaQuery } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination, Column } from 'react-table';

// project import
import PDF from 'components/PDF';
import { getObject } from 'utils/Global';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { useSelector, useDispatch } from 'store';
import Export from 'components/ExportToFile';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, SortingSelect, TablePagination } from 'components/third-party/ReactTable';
import { getPurchaseList } from 'store/reducers/purcharse';
import { getSupplierList } from 'store/reducers/supplier';
import { getWarehouseList } from 'store/reducers/warehouse';
import { newDataExport } from 'utils/DataExportPurchase';

// assets
import { EyeTwoTone } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: [];
  newDataExport: [];
  getHeaderProps: (column: any) => void;
}

function ReactTable({ columns, data, getHeaderProps, newDataExport }: Props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'nc', desc: true };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    allColumns,
    rows,
    // @ts-ignore
    page,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { globalFilter, pageIndex, pageSize },
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter,
    // @ts-ignore
    setSortBy
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      filterTypes,
      // @ts-ignore
      initialState: { pageIndex: 0, pageSize: 10, sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  return (
    <>
      <Stack spacing={3}>
        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 0 }}
        >
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Export excelData={newDataExport} fileName="Reception" />
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
            <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
          </Stack>
        </Stack>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column: any) => (
                  <TableCell {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                    <HeaderSort column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell: any) => (
                      <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                    ))}
                  </TableRow>
                </Fragment>
              );
            })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

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
          newDataExport={newDataExport(listPurchase, warehouseList, supplierList) as []}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
    </MainCard>
  );
};

export default ReceptionList;
