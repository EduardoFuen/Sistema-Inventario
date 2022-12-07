import { useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Dialog } from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import AddActiveSustances from 'sections/apps/products/activeSubstances/AddActiveSubstances';
import Import from 'sections/apps/products/activeSubstances/ImportActiveSubstances';
import { useDispatch, useSelector } from 'store';
import { getSubsList, deleteSubs } from 'store/reducers/activeSubst';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// types
import { Substances } from 'types/products';

// ==============================|| ACTIVE-SUBSTANCES LIST - MAIN ||============================== //

const ActiveSubstancesList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [subst, setSubst] = useState(null);
  const [add, setAdd] = useState<boolean>(false);
  const [addImport, setActiveImport] = useState<boolean>(false);

  const handleAdd = () => {
    setAdd(!add);
    if (subst && !add) setSubst(null);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const { todoListSubs } = useSelector((state) => state.substances);
  useEffect(() => {
    dispatch(getSubsList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newDataExport: any = todoListSubs.map((item: Substances) => {
    return {
      ID: item?.ID,
      Name: item?.Name,
      Status: Boolean(item?.Status)
    };
  });

  const columnsProducts = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID',
        className: 'cell-center'
      },
      {
        Header: 'Nombre',
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
                    setSubst(row.original);
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
                    dispatch(deleteSubs(row.original?.ID));
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
          data={todoListSubs as []}
          FileName="Sustancias&activos"
          handleImport={handleImport}
          TitleButton="Agregar"
          dataExport={newDataExport}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
      {/* add ActiveSubstances Dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddActiveSustances subst={subst} onCancel={handleAdd} />}
      </Dialog>
      {/* add import Dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default ActiveSubstancesList;
