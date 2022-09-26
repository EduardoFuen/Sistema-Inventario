import { useEffect, useMemo, Fragment, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  useMediaQuery,
  Box,
  Tab,
  Tabs
} from '@mui/material';

// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination, Column } from 'react-table';

// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Export from 'components/ExportToFile';

import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, SortingSelect, TablePagination } from 'components/third-party/ReactTable';

import { useDispatch, useSelector } from 'store';

import { openSnackbar } from 'store/reducers/snackbar';
import { getCategoryList, deleteCategory } from 'store/reducers/category';

// assets
import { PlusOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}
interface Props {
  columns: Column[];
  data: [];
  getHeaderProps: (column: any) => void;
}

function ReactTable({ columns, data, getHeaderProps }: Props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'categoryOne', desc: false };

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
  const history = useNavigate();

  const handleAddCategory = () => {
    history(`/p/product-list/add-category`);
  };

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
          <Export excelData={data} fileName="Categories" />
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
            <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAddCategory}>
              Agregar Categorias
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

const CategoriesList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleEditCategory = (id: any, index: any) => {
    history(`/p/product-list/add-category/${id}/${index}`);
  };
  const [value, setValue] = useState(0);
  const [columnsValue, setColumnsValue] = useState<any>({
    Header: 'Categoria',
    accessor: 'categoryOne',
    className: 'cell-center'
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    let columnOne = {
      Header: 'Categoria',
      accessor: 'categoryOne',
      className: 'cell-center'
    };
    let columnTwo = {
      Header: 'Categoria 2',
      accessor: 'categoryTwo',
      className: 'cell-center'
    };

    if (newValue === 0) {
      setColumnsValue(columnOne);
    }
    if (newValue === 1) {
      setColumnsValue(columnTwo);
    }
    setValue(newValue);
  };

  const { categoryListThree } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = () => [
    value !== 2 && columnsValue,

    value === 2 && {
      Header: 'Categoria',
      accessor: 'categoryOne',
      className: 'cell-center'
    },
    value === 2 && {
      Header: 'Categoria 2',
      accessor: 'categoryTwo',
      className: 'cell-center'
    },
    value === 2 && {
      Header: 'Categoria 3',
      accessor: 'categoryThree',
      className: 'cell-center'
    },
    {
      Header: 'Estado',
      accessor: 'status',
      className: 'cell-center',
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
                  let category: string;
                  switch (value) {
                    case 0:
                      category = row.values?.categoryOne;
                      break;
                    case 1:
                      category = row.values?.categoryTwo;
                      break;

                    default:
                      category = row.values?.categoryThree;
                      break;
                  }
                  handleEditCategory(category, value);
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
                      message: 'Categoria deleted successfully.',
                      variant: 'alert',
                      alert: {
                        color: 'success'
                      },
                      close: false
                    })
                  );
                  dispatch(deleteCategory(row.values));
                }}
              >
                <DeleteTwoTone twoToneColor={theme.palette.error.main} />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      }
    }
  ];
  /*     // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  ); */

  return (
    <MainCard content={false}>
      <ScrollX>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Categoria" {...a11yProps(0)} />
            <Tab label="Categoria 2" {...a11yProps(1)} />
            <Tab label="Categoria 3" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ReactTable
            columns={columns().filter((item) => item !== false)}
            data={categoryListThree as []}
            getHeaderProps={(column: any) => column.getSortByToggleProps()}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReactTable
            columns={columns().filter((item) => item !== false)}
            data={categoryListThree as []}
            getHeaderProps={(column: any) => column.getSortByToggleProps()}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ReactTable
            columns={columns().filter((item) => item !== false)}
            data={categoryListThree as []}
            getHeaderProps={(column: any) => column.getSortByToggleProps()}
          />
        </TabPanel>
      </ScrollX>
    </MainCard>
  );
};

export default CategoriesList;
