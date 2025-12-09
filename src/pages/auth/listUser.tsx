import { useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Tooltip, Dialog, Box, CircularProgress } from '@mui/material';
import { openSnackbar } from 'store/reducers/snackbar';
import { useNavigate } from 'react-router-dom';

// third-party
import { useSelector, useDispatch } from 'store';

// project import
import ReactTable from 'components/ReactTable';

import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

import { getUserList, deleteUser } from 'store/reducers/user';
import { DefaultSupplier } from 'config';
// assets
import { DeleteTwoTone } from '@ant-design/icons';

// ==============================|| SUPPLIER - LIST ||============================== //

const SupplierListPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [addImport, setActiveImport] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const { userList, error } = useSelector((state) => state.user);

  /*const handleEditSupplier = (id: any) => {
    history(`/supplier/edit/${id}`);
  };*/

   useEffect(() => {
      if (error && error?.response?.data?.Error && error?.response?.status !== 404) {
        dispatch(
          openSnackbar({
            open: true,
            message: error?.response?.data?.Error,
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      }
    }, [error, dispatch]);

  const handleAddSupplier = () => {
    history(`/auth/register`);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Usuario',
        accessor: 'username',
        className: 'cell-center font-size'
      },
      {
        Header: 'Rol',
        accessor: 'userRol',
        className: 'cell-center font-size'
      },
      {
        Header: 'Acciones',
        className: 'cell-center font-size',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          const [isLoading, setIsLoading] = useState<boolean>(false);

  

          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>


              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={async (e: any) => {
                    e.stopPropagation();
                    await dispatch(deleteUser(row?.original?.sk));
                    setIsLoading(true);
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
          handleImport={handleImport}
          handleAdd={handleAddSupplier}
          data={userList as []}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          TitleButton="Agregar"
          dataTemplate={DefaultSupplier as []}
        />
      </ScrollX>
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport}
      </Dialog>
    </MainCard>
  );
};

export default SupplierListPage;
