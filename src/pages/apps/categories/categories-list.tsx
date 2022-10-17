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
  Tabs,
  Dialog
} from '@mui/material';

// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination, Column } from 'react-table';

// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Export from 'components/ExportToFile';
import Import from './Import';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, SortingSelect, TablePagination } from 'components/third-party/ReactTable';

import { useDispatch, useSelector } from 'store';

import { getCategoryListOne, getCategoryListTwo, getCategoryListThree, deleteCategory } from 'store/reducers/category';

// assets
import { PlusOutlined, EditTwoTone, DeleteTwoTone, ImportOutlined } from '@ant-design/icons';

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
  handleImport: () => void;
}

function ReactTable({ columns, data, getHeaderProps, handleImport }: Props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'ID', desc: true };

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
    history(`/product-list/add-category`);
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
          <Button variant="contained" startIcon={<ImportOutlined />} onClick={handleImport}>
            Importar
          </Button>
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
    history(`/product-list/edit-category/${id}/${index}`);
  };
  const [value, setValue] = useState(0);

  const [addImport, setActiveImport] = useState<boolean>(false);

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const [columnsValue, setColumnsValue] = useState<any>({
    Header: 'Grupo',
    accessor: 'Name',
    className: 'cell-center'
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    let columnOne = {
      Header: 'Grupo',
      accessor: 'Name',
      className: 'cell-center'
    };
    let columnTwo = {
      Header: 'Categoria 1',
      accessor: 'Name',
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

  const { categoryListThree, categoryListOne, categoryListTwo } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryListOne());
    dispatch(getCategoryListTwo());
    dispatch(getCategoryListThree());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = () => [
    {
      Header: 'ID',
      accessor: 'ID',
      className: 'cell-center'
    },
    value !== 2 && columnsValue,

    value === 2 && {
      Header: 'Grupo',
      accessor: 'CategoryOneID',
      className: 'cell-center'
    },
    value === 2 && {
      Header: 'Categoria 1',
      accessor: 'CategoryTwoID',
      className: 'cell-center'
    },
    value === 2 && {
      Header: 'Categoria 2',
      accessor: 'Name',
      className: 'cell-center'
    },
    {
      Header: 'Estado',
      accessor: 'Status',
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
                      category = row.original?.ID;
                      break;
                    case 1:
                      category = row.original?.ID;
                      break;

                    default:
                      category = row.original?.ID;
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
                  let type: string = '';
                  switch (value) {
                    case 0:
                      type = 'CategoryOne';
                      break;
                    case 1:
                      type = 'CategoryTwo';
                      break;
                    default:
                      type = 'CategoryThree';
                      break;
                  }
                  dispatch(deleteCategory(row.original?.ID, type));
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

  return (
    <MainCard content={false}>
      <ScrollX>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Grupo" {...a11yProps(0)} />
            <Tab label="Categoria 1" {...a11yProps(1)} />
            <Tab label="Categoria 2" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ReactTable
            columns={columns().filter((item) => item !== false)}
            data={categoryListOne as []}
            getHeaderProps={(column: any) => column.getSortByToggleProps()}
            handleImport={handleImport}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReactTable
            columns={columns().filter((item) => item !== false)}
            data={categoryListTwo as []}
            getHeaderProps={(column: any) => column.getSortByToggleProps()}
            handleImport={handleImport}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ReactTable
            columns={columns().filter((item) => item !== false)}
            data={categoryListThree as []}
            getHeaderProps={(column: any) => column.getSortByToggleProps()}
            handleImport={handleImport}
          />
        </TabPanel>
      </ScrollX>
      {/* add import dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} value={value} />}
      </Dialog>
    </MainCard>
  );
};

export default CategoriesList;
