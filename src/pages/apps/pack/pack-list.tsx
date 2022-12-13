import { useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Dialog } from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import AddPackList from 'sections/apps/products/pack-list/AddPackList';
import Import from 'sections/apps/products/pack-list/ImportPackList';
import { useDispatch, useSelector } from 'store';
import { getPackList, deletePack } from 'store/reducers/pack';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// ==============================|| PRODUCT LIST - MAIN ||============================== //

const PackList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [pack, setPack] = useState(null);
  const [add, setAdd] = useState<boolean>(false);
  const [addImport, setActiveImport] = useState<boolean>(false);

  const { packList } = useSelector((state) => state.pack);

  useEffect(() => {
    dispatch(getPackList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImport = () => {
    setActiveImport(!addImport);
  };
  const handleAdd = () => {
    setAdd(!add);
    if (pack && !add) setPack(null);
  };

  const columnsProducts = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID',
        className: 'cell-center font-size'
      },
      {
        Header: 'Envase',
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
                    setPack(row.original);
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
                    dispatch(deletePack(row?.original?.ID));
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
          columns={columnsProducts}
          handleAdd={handleAdd}
          handleImport={handleImport}
          data={packList as []}
          dataExport={packList as []}
          TitleButton="Agregar Envase"
          FileName="Envase"
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
      {/* add pack Dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddPackList pack={pack} onCancel={handleAdd} />}
      </Dialog>
      {/* add import Dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default PackList;
