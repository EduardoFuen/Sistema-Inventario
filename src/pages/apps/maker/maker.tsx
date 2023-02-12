import { useEffect, useMemo, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Dialog, Stack, Tooltip, Box, CircularProgress } from '@mui/material';

// project import
import AddMaker from 'sections/apps/products/maker/AddMaker';
import ImportMarker from 'sections/apps/products/maker/ImportMarker';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import { useDispatch, useSelector } from 'store';
import { getMakerList, deleteMaker } from 'store/reducers/maker';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
// types
import { Maker } from 'types/products';

// ==============================|| MAKER - MAKER LIST ||============================== //

const MakersList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [maker, setWarehouse] = useState<any>(null);
  const [add, setAdd] = useState<boolean>(false);
  const [addImport, setActiveImport] = useState<boolean>(false);

  const { makerList } = useSelector((state) => state.maker);

  useEffect(() => {
    dispatch(getMakerList());
  }, [dispatch]);

  const handleAdd = () => {
    setAdd(!add);
    if (maker && !add) setWarehouse(null);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };
  const newDataExport: Maker[] = makerList.map((item: Maker) => {
    return {
      ID: item?.ID,
      Name: item?.Name,
      Status: Boolean(item?.Status)
    };
  });

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID',
        className: 'cell-center font-size'
      },
      {
        Header: 'Maker',
        accessor: 'Name',
        className: 'cell-center font-size'
      },
      {
        Header: 'Estado',
        accessor: 'Status',
        className: 'cell-center font-size',
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
                    setWarehouse(row.original);
                    handleAdd();
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
                    await dispatch(deleteMaker(row?.original?.ID));
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
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={makerList as []}
          handleAdd={handleAdd}
          handleImport={handleImport}
          TitleButton="Agregar Makers"
          dataExport={newDataExport as []}
          FileName="Makers"
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
      {/* add Maker Dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddMaker maker={maker} onCancel={handleAdd} />}
      </Dialog>
      {/* add import Dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <ImportMarker onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default MakersList;
