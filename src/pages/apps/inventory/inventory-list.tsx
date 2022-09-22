import { useMemo, Fragment } from 'react';

// import PSPDFKit from "./PSPDFKit";

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination, Column } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { useSelector } from 'store';

import Export from 'components/ExportToFile';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, SortingSelect, TablePagination } from 'components/third-party/ReactTable';

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: [];
  getHeaderProps: (column: any) => void;
}

function ReactTable({ columns, data, getHeaderProps }: Props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'create_order', desc: false };

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
          <Export excelData={data} fileName="Purchase" />
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
        accessor: 'warehouse'
      },
      {
        Header: 'EAN',
        accessor: 'subtotal',
        className: 'cell-right',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" thousandSeparator prefix="$" />
      },
      {
        Header: 'IVA',
        accessor: 'tax',
        className: 'cell-right',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" thousandSeparator prefix="$" />
      },
      {
        Header: 'Total',
        accessor: 'total',
        className: 'cell-right',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" thousandSeparator prefix="$" />
      },
      {
        Header: 'Estado',
        accessor: 'status',
        Cell: ({ value }: any) => {
          switch (value) {
            case 'Refunded':
              return <Chip color="error" label="Cancelled" size="small" variant="light" />;
            case 'Completed':
              return <Chip color="success" label="Completed" size="small" variant="light" />;
            case 'Cancelled':
              return <Chip color="secondary" label="Closed" size="small" variant="light" />;
            case 'Processing':
              return <Chip color="info" label="Processing" size="small" variant="light" />;
            case 'Delivered':
            default:
              return <Chip color="warning" label="New" size="small" variant="light" />;
          }
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );
  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={listPurchase as []} getHeaderProps={(column: any) => column.getSortByToggleProps()} />
      </ScrollX>
    </MainCard>
  );
};

export default InventoryList;
