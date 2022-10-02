import { useEffect, useMemo, useState, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Button, Chip, Dialog, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, useMediaQuery } from '@mui/material';

// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination, Column } from 'react-table';

// project import
import AddTrademark from 'sections/apps/products/trademark/AddTrademark';
import Import from 'sections/apps/products/trademark/ImportTradeMark';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Export from 'components/ExportToFile';

import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

import { useDispatch, useSelector } from 'store';

import { openSnackbar } from 'store/reducers/snackbar';
import { getTrademarkList, deleteTrademark } from 'store/reducers/trademaker';

// assets
import { PlusOutlined, EditTwoTone, DeleteTwoTone, ImportOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: [];
  getHeaderProps: (column: any) => void;
  handleAdd: () => void;
  handleImport: () => void;
}

function ReactTable({ columns, data, getHeaderProps, handleAdd, handleImport }: Props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'name', desc: true };

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
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
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
      initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['avatar', 'email'], sortBy: [sortBy] }
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
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
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
          <Export excelData={data} fileName="Trademark" />
          <Button variant="contained" startIcon={<ImportOutlined />} onClick={handleImport}>
            Importar
          </Button>
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
            <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd}>
              Agregar Trademark
            </Button>
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

// ==============================|| PROFILE - USER LIST ||============================== //

const TradeMarkList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [tradeMark, setTrademark] = useState(null);
  const [add, setAdd] = useState<boolean>(false);
  const [addImport, setActiveImport] = useState<boolean>(false);

  const handleAdd = () => {
    setAdd(!add);
    if (tradeMark && !add) setTrademark(null);
  };
  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const { tradeMarkList } = useSelector((state) => state.trademaker);

  useEffect(() => {
    dispatch(getTrademarkList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: 'Trademark',
        accessor: 'name'
      },
      {
        Header: 'Maker',
        accessor: 'maker'
      },
      {
        Header: 'Estado',
        accessor: 'status',
        Cell: ({ value }: any) => {
          switch (value) {
            case false:
              return <Chip color="error" label="Desactivado" size="small" variant="light" />;
            case true:
            default:
              return <Chip color="success" label="Activo" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Acciones',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setTrademark(row.values);
                    handleAdd();
                  }}
                >
                  <EditTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'Trademark deleted successfully.',
                        variant: 'alert',
                        alert: {
                          color: 'success'
                        },
                        close: false
                      })
                    );
                    dispatch(deleteTrademark(row?.name));
                  }}
                >
                  <DeleteTwoTone twoToneColor={theme.palette.error.main} />
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
          data={tradeMarkList as []}
          handleAdd={handleAdd}
          handleImport={handleImport}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>

      {/* add user dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddTrademark tradeMark={tradeMark} onCancel={handleAdd} />}
      </Dialog>
      {/* add import dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default TradeMarkList;
