import { useMemo, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Button, Box, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination, Column } from 'react-table';
// project import
import Export from 'components/ExportToFile';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
// assets
import { PlusOutlined, ImportOutlined } from '@ant-design/icons';
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
}

const ReactTable = ({
  columns,
  data,
  getHeaderProps,
  handleAdd,
  handleImport,
  TitleButton,
  FileName,
  renderRowSubComponent,
  dataExport,
  hideButton,
  download,
  dataTemplate,
  handleSelect,
  FileNameTemplate,
  FontSize
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
      initialState: { pageIndex: 0, pageSize: 5, sortBy: [sortBy] }
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
      <Box sx={{ width: '100%' }}>
        <TableRowSelection selected={Object.keys(selectedRowIds).length} />
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 0 }}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              size="small"
            />
            {download && dataTemplate.length > 0 && <Export excelData={dataTemplate} fileName={FileName} title={FileNameTemplate} />}
            {dataExport && dataExport.length > 0 && (
              <Export excelData={dataExport && dataExport.length > 0 ? dataExport : data} fileName={FileName} />
            )}
            {hideButton && (
              <Button variant="contained" startIcon={<ImportOutlined />} onClick={handleImport}>
                Importar
              </Button>
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
              {page.map((row: any, i: number) => {
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
              <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                  <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
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
  dataExport: [],
  dataTemplate: [],
  hideButton: true,
  download: false,
  TitleButton: '',
  FileNameTemplate: '',
  FileName: '',
  FontSize: false
};

export default ReactTable;
