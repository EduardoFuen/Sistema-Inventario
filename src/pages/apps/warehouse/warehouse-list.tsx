import { useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Dialog, Stack, Tooltip, Box, CircularProgress } from '@mui/material';

// project import
import AddWarehouse from 'sections/apps/products/warehouse/AddWarehouse';
import Import from 'sections/apps/products/warehouse/ImportWarehouse';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import { useDispatch, useSelector } from 'store';
import { getWarehouseList, deleteWarehouse } from 'store/reducers/warehouse';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// ==============================|| WAREHOUSE LIST ||============================== //

const WarehouseList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [warehouse, setWarehouse] = useState<any>(null);
  const [add, setAdd] = useState<boolean>(false);
  const [addImport, setActiveImport] = useState<boolean>(false);

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const handleAdd = () => {
    setAdd(!add);
    if (warehouse && !add) setWarehouse(null);
  };

  const deleteHandler = async (setIsLoading: any, id: number) => {
    await dispatch(deleteWarehouse(id));
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(getWarehouseList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { warehouseList } = useSelector((state) => state.warehouse);
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID',
        className: 'cell-center font-size'
      },
      {
        Header: 'Bodega',
        accessor: 'Name'
      },
      {
        Header: 'Dirección',
        accessor: 'Location'
      },
      {
        Header: 'Ciudad',
        accessor: 'City'
      },
      {
        Header: 'Departamento',
        accessor: 'Department'
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
          const { original } = row;
          const [isLoading, setIsLoading] = useState<boolean>(false);

          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setWarehouse(original);
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
                    setIsLoading(true);
                    deleteHandler(setIsLoading, original.ID);
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
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          handleImport={handleImport}
          data={warehouseList as []}
          dataExport={warehouseList as []}
          handleAdd={handleAdd}
          TitleButton="Agregar Bodega"
          FileName="Bodegas"
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>

      {/* add WareHouse*/}
      <Dialog maxWidth="sm" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddWarehouse warehouse={warehouse} onCancel={handleAdd} />}
      </Dialog>
      {/* add import dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default WarehouseList;
