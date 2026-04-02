import { useEffect, useMemo, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Dialog, Stack, Tooltip } from '@mui/material';

// project import
import AddMaker from 'sections/apps/products/maker/AddMaker';
import ImportMarker from 'sections/apps/products/maker/ImportMarker';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';

import { useDispatch, useSelector } from 'store';
import { getMakerList, deleteMaker } from 'store/reducers/maker';
import AlertDelete from 'components/AlertDelete';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// ==============================|| MAKER - MAKER LIST ||============================== //

const MakersList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [maker, setWarehouse] = useState<any>(null);
  const [add, setAdd] = useState<boolean>(false);
  const [addImport, setActiveImport] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>(null);

  const { providerList } = useSelector((state) => state.maker);

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

  const handleAlertClose = async (status: boolean) => {
    if (status && selected) {
      await dispatch(deleteMaker(selected.ID));
    }
    setOpenAlert(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID',
        className: 'cell-center font-size'
      },
      {
        Header: 'Laboratorio',
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
                   onClick={(e: any) => {
                     e.stopPropagation();
                     setSelected(row.original);
                     setOpenAlert(true);
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
          handleAdd={handleAdd}
          handleImport={handleImport}
          data={providerList as []}
          dataExport={providerList as []}
          TitleButton="Agregar Laboratorio"
          FileName="Laboratorios"
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
      <AlertDelete title={selected?.Name || ''} open={openAlert} handleClose={handleAlertClose} />
    </MainCard>
  );
};

export default MakersList;
