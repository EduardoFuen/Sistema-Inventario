import { useMemo } from 'react';

// material-ui
import { Button, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import { useTable, useFilters, useGlobalFilter, Column } from 'react-table';

// project import
import IconButton from 'components/@extended/IconButton';

import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import makeData from 'data/react-table';
// import {  SortingSelect } from 'components/third-party/ReactTable';

import { GlobalFilter, DefaultColumnFilter, SelectColumnFilter, SliderColumnFilter, renderFilterTypes } from 'utils/react-table';
import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone, PlusOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const initialState = useMemo(() => ({ filters: [{ id: 'status', value: '' }] }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      defaultColumn,
      // @ts-ignore
      initialState,
      filterTypes
    },
    useGlobalFilter,
    useFilters
  );

  const sortingRow = rows.slice(0, 10);
  console.log(rows);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 0 }}>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          // @ts-ignore
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Stack direction="row" alignItems="center" spacing={1}>
          {/*           <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} /> */}
          <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => {}}>
            Agregar Envase
          </Button>
        </Stack>
      </Stack>
      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: 2 }}>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {sortingRow.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Stack>
  );
}

// ==============================|| REACT TABLE - FILTERING ||============================== //

const FilteringTable = () => {
  const data = useMemo(() => makeData(5), []);
  const theme = useTheme();

  const columns = useMemo(
    () => [
      {
        Header: 'Envase',
        accessor: 'country'
      },
      {
        Header: 'Cantidad de Productos',
        accessor: 'age',
        className: 'cell-center',
        Filter: SliderColumnFilter,
        filter: 'equals'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }: any) => {
          switch (value) {
            case 'desactivado':
              return <Chip color="error" label="Desactivado" size="small" variant="light" />;
            case 'Activo':
              return <Chip color="success" label="Activo" size="small" variant="light" />;
            case 'Single':
            default:
              return <Chip color="error" label="Desactivado" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          const collapseIcon = row.isExpanded ? (
            <CloseOutlined style={{ color: theme.palette.error.main }} />
          ) : (
            <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
          );
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="View">
                <IconButton
                  color="secondary"
                  onClick={(e: any) => {
                    /* e.stopPropagation();
                    row.toggleRowExpanded(); */
                  }}
                >
                  {collapseIcon}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    /*                     e.stopPropagation(); */
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
    [theme]
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default FilteringTable;
