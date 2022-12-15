import { useEffect, useState, ReactNode, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Box, Tab, Tabs, Dialog, Typography, CircularProgress } from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import Import from './Import';
import { getObject } from 'utils/Global';
import { useDispatch, useSelector } from 'store';
import { CATEGORY } from 'config';
import { getCategoryListOne, getCategoryListTwo, getCategoryListThree, deleteCategory } from 'store/reducers/category';
import { SearchIDToArray } from 'utils/findName';

// types
import { CategoryTwo, CategoryThree } from 'types/products';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

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

// ==============================|| CATEGORIES - LIST ||============================== //

const CategoriesList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [value, setValue] = useState(0);
  const [addImport, setActiveImport] = useState<boolean>(false);
  const { categoryListOne, categoryListTwo, categoryListThree } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryListOne());
    dispatch(getCategoryListTwo());
    dispatch(getCategoryListThree());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditCategory = (id: number, index: number) => {
    history(`/product-list/category/edit/${id}/${index}`);
  };
  const handleAddCategory = () => {
    history(`/product-list/category/add`);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  let CategoryOne: string = '';

  const exportCategoryThre: any = categoryListThree.map((item: CategoryThree) => {
    let CategoryTwo: string = '';

    if (item?.CategoryOneID) {
      CategoryOne = SearchIDToArray(categoryListOne, item?.CategoryOneID)?.Name || '';
    }
    if (item?.CategoryTwoID) {
      CategoryTwo = SearchIDToArray(categoryListTwo, item?.CategoryTwoID)?.Name || '';
    }
    return {
      ID: item?.ID,
      Name: item?.Name,
      CategoryTwo,
      CategoryOne
    };
  });

  const exportCategoryTwo: any = categoryListTwo.map((item: CategoryTwo) => {
    if (item?.CategoryOneID) {
      CategoryOne = SearchIDToArray(categoryListOne, item?.CategoryOneID)?.Name || '';
    }
    return {
      ID: item?.ID,
      Name: item?.Name,
      CategoryOne
    };
  });

  const [columnsValue, setColumnsValue] = useState<any>({
    Header: 'Grupo',
    accessor: 'Name',
    className: 'cell-center font-size'
  });

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    let columnOne = {
      Header: 'Grupo',
      accessor: 'Name',
      Cell: ({ value }: any) => {
        return (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Stack spacing={0}>
              <Typography className="cell-center font-size">{value || ''}</Typography>
            </Stack>
          </Stack>
        );
      }
    };
    let columnTwo = {
      Header: 'Categoria 1',
      accessor: 'Name',
      Cell: ({ value }: any) => {
        return (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Stack spacing={0}>
              <Typography className="cell-center font-size">{value || ''}</Typography>
            </Stack>
          </Stack>
        );
      }
    };

    if (newValue === 0) {
      setColumnsValue(columnOne);
    }
    if (newValue === 1) {
      setColumnsValue(columnTwo);
    }
    setValue(newValue);
  };

  const columns = () => [
    {
      Header: 'ID',
      accessor: 'ID',
      className: 'cell-center font-size'
    },
    value !== 2 && columnsValue,

    value === 1 && {
      Header: 'Grupo',
      accessor: 'CategoryOneID',
      Cell: ({ value }: any) => {
        return (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Stack spacing={0}>
              <Typography className="cell-center font-size">{getObject(categoryListOne, value)?.Name || ''}</Typography>
            </Stack>
          </Stack>
        );
      }
    },
    value === 2 && {
      Header: 'Grupo',
      accessor: 'CategoryOneID',
      Cell: ({ value }: any) => {
        return (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Stack spacing={0}>
              <Typography className="cell-center font-size">{getObject(categoryListOne, value)?.Name || ''}</Typography>
            </Stack>
          </Stack>
        );
      }
    },
    value === 2 && {
      Header: 'Categoria 1',
      accessor: 'CategoryTwoID',
      Cell: ({ value }: any) => {
        return (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Stack spacing={0}>
              <Typography className="cell-center font-size">{getObject(categoryListTwo, value)?.Name || ''}</Typography>
            </Stack>
          </Stack>
        );
      }
    },
    value === 2 && {
      Header: 'Categoria 2',
      accessor: 'Name',
      Cell: ({ value }: any) => {
        return (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Stack spacing={0}>
              <Typography className="cell-center font-size">{value || ''}</Typography>
            </Stack>
          </Stack>
        );
      }
    },
    {
      Header: 'Estado',
      accessor: 'Status',
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
      className: 'cell-center font-size',
      disableSortBy: true,
      Cell: ({ row }: any) => {
        const [isLoading, setIsLoading] = useState<boolean>(false);

        return (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                onClick={(e: any) => {
                  e.stopPropagation();
                  let ID: number;
                  switch (value) {
                    case 0:
                      ID = row.original?.ID;
                      break;
                    case 1:
                      ID = row.original?.ID;
                      break;

                    default:
                      ID = row.original?.ID;
                      break;
                  }
                  handleEditCategory(ID, value);
                }}
              >
                <EditTwoTone twoToneColor={theme.palette.primary.main} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={async (e: any) => {
                  e.stopPropagation();
                  setIsLoading(true);

                  let type: string = '';
                  switch (value) {
                    case 0:
                      type = CATEGORY.CategoryOne;
                      break;
                    case 1:
                      type = CATEGORY.CategoryTwo;
                      break;
                    default:
                      type = CATEGORY.CategoryThree;
                      break;
                  }
                  await dispatch(deleteCategory(row.original?.ID, type));
                  setIsLoading(false);
                }}
              >
                {!isLoading ? (
                  <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                ) : (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress color="success" size={20} />
                  </Box>
                )}
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
            dataExport={categoryListOne as []}
            getHeaderProps={(column: any) => column.getSortByToggleProps()}
            handleImport={handleImport}
            TitleButton="Agregar Grupo"
            FileName="Grupo"
            handleAdd={handleAddCategory}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReactTable
            columns={columns().filter((item) => item !== false)}
            data={categoryListTwo as []}
            getHeaderProps={(column: any) => column.getSortByToggleProps()}
            handleImport={handleImport}
            TitleButton=" Agregar Categorias"
            FileName="Categorias"
            dataExport={exportCategoryTwo}
            handleAdd={handleAddCategory}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ReactTable
            columns={columns().filter((item) => item !== false)}
            data={categoryListThree as []}
            getHeaderProps={(column: any) => column.getSortByToggleProps()}
            handleImport={handleImport}
            TitleButton=" Agregar Categorias"
            FileName="Categorias"
            dataExport={exportCategoryThre}
            handleAdd={handleAddCategory}
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
