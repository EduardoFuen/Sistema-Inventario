import { useMemo, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Button,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  FormControl,
  MenuItem,
  Select
} from '@mui/material';
// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination, Column } from 'react-table';
// project import
import Export from 'components/ExportToFile';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, SortingSelect, TablePagination, TableRowSelection, WareHouseSelect } from 'components/third-party/ReactTable';
// assets
import { PlusOutlined } from '@ant-design/icons';
import { initial } from 'lodash';

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: [];
  getHeaderProps: (column: any) => void;
  handleAdd: () => void;
  handleImport: () => void;
  TitleButton: string;
  FileName: string;
  hideButton: boolean;
  download: boolean;
  renderRowSubComponent: any | undefined;
  dataExport: [];
  dataTemplate: [];
  handleSelect: (row: any) => void;
  FileNameTemplate: string;
  FontSize: boolean;
  setRowSelection: any;
  handlePagination: (value: number) => void;
  totalRows: number;
  numberPage: number;
  isLoading: boolean;
  searchActive: boolean;
  warehousesActive: boolean;
  activeSearchType: boolean;
  setTypeSearch: (value: any) => void;
  warehouses: [];
  defaultWarehouse: number;
  typeSearch: string;
  handleChangeWareHouse: (value: number) => void;
  handleSearch: (value: any) => void;
}

const ReactTable = ({
  columns,
  data,
  handlePagination,
  getHeaderProps,
  handleImport,
  handleSearch,
  handleSelect,
  handleAdd,
  TitleButton,
  FileName,
  renderRowSubComponent,
  dataExport,
  hideButton,
  download,
  dataTemplate,
  FileNameTemplate,
  FontSize,
  setRowSelection,
  totalRows,
  numberPage,
  isLoading,
  searchActive,
  warehouses,
  defaultWarehouse,
  warehousesActive,
  handleChangeWareHouse,
  activeSearchType,
  typeSearch,
  setTypeSearch
}: Props) => {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'ID', desc: true };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    allColumns,
    rows,
    visibleColumns,
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
      initialState: { pageIndex: numberPage > 0 ? numberPage - 1 : 0, pageSize: 50, sortBy: [sortBy] },
      onRowSelectionChange: setRowSelection
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  let NewRows: any = numberPage > 0 ? rows : page;

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <TableRowSelection selected={Object.keys(selectedRowIds).length} />
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 0 }}>
            {searchActive && (
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                size="small"
                handleSearch={handleSearch}
              />
            )}

            {activeSearchType && (
              <FormControl sx={{ minWidth: 120 }}>
                <Select value={typeSearch} onChange={setTypeSearch}>
                  <MenuItem value="">---</MenuItem>
                  <MenuItem value="Sku">SKU</MenuItem>
                  <MenuItem value="Ean">Ean</MenuItem>
                </Select>
              </FormControl>
            )}
            {warehousesActive && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <WareHouseSelect data={warehouses} handleChange={handleChangeWareHouse} defaultWarehouse={defaultWarehouse} />
              </Stack>
            )}
            {download && dataTemplate.length > 0 && <Export excelData={dataTemplate} fileName={FileName} title={FileNameTemplate} />}
            {dataExport && dataExport.length > 0 && (
              <Export excelData={dataExport && dataExport.length > 0 ? dataExport : data} fileName={FileName} />
            )}
           
            <Stack direction="row" alignItems="center" spacing={1}>
              <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
              {TitleButton !== '' && (
                <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd}>
                  {TitleButton}
                </Button>
              )}
            </Stack>
          </Stack>

          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                  {headerGroup.headers.map((column: any) => (
                    <TableCell
                      {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}
                      style={{ fontSize: !FontSize ? initial : 8 }}
                    >
                      <HeaderSort column={column} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {!isLoading &&
                NewRows.map((row: any, i: number) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  return (
                    <Fragment key={i}>
                      <TableRow
                        {...row.getRowProps()}
                        onClick={() => {
                          handleSelect(row);
                          row.toggleRowSelected();
                        }}
                        sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                      >
                        {row.cells.map((cell: any) => (
                          <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                        ))}
                      </TableRow>
                      {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
                    </Fragment>
                  );
                })}
              {isLoading && (
                <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                  <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CircularProgress color="success" size={40} />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                  <TablePagination
                    gotoPage={gotoPage}
                    rows={rows}
                    setPageSize={setPageSize}
                    pageSize={pageSize}
                    pageIndex={numberPage > 0 ? numberPage - 1 : pageIndex}
                    setPagination={handlePagination}
                    totalRows={totalRows}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
      </Box>
    </>
  );
};

ReactTable.defaultProps = {
  renderRowSubComponent: () => {},
  handleSelect: () => {},
  handleAdd: () => {},
  handleImport: () => {},
  setRowSelection: () => {},
  handlePagination: () => {},
  handleSearch: () => {},
  handleChangeWareHouse: () => {},
  setTypeSearch: () => {},
  dataExport: [],
  dataTemplate: [],
  warehouses: [],
  defaultWarehouse: 0,
  hideButton: true,
  download: false,
  TitleButton: '',
  FileNameTemplate: '',
  typeSearch: '',
  FileName: '',
  FontSize: false,
  isLoading: false,
  searchActive: true,
  warehousesActive: false,
  totalRows: 0,
  numberPage: 0,
  activeSearchType: false
};

export default ReactTable;
