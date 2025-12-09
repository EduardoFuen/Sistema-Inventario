import { useEffect, useMemo, useState } from 'react';

// material-ui

import { useTheme } from '@mui/material/styles';
import { Stack, Tooltip, Box, CircularProgress } from '@mui/material';

import { useNavigate } from 'react-router-dom';

// third-party
import { useSelector, useDispatch } from 'store';

// project import
import ReactTable from 'components/ReactTable';
import useAuth from 'hooks/useAuth';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { DefaultSupplier } from 'config';
// assets
import { DeleteTwoTone } from '@ant-design/icons';

import { getDeliveryList,deleteDelivery } from 'store/reducers/purcharse';

// ==============================|| SUPPLIER - LIST ||============================== //

const DeliveryListPage = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [addImport, setActiveImport] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getDeliveryList());
  }, [dispatch]);

const { deliveryList } = useSelector((state) => state.purchase);


  /*const handleEditDelivery = (id: any) => {
    history(`/delivery/edit/${id}`);
  };*/

  const handleAddDelivery = () => {
    history(`/delivery/add`);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const columns = useMemo(
    () => [
      
     
      {
        Header: 'Nombre',
        className: 'cell-center font-size',
        accessor: 'Name'
      },
      {
        Header: 'Teléfono',
        className: 'cell-center font-size',
        accessor: 'phoneContact',
      },
    
      {
        Header: 'Acciones',
        className: 'cell-center font-size',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          const [isLoading, setIsLoading] = useState<boolean>(false);



          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
           {user?.role == "1" && (
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={async (e: any) => {
                    e.stopPropagation();
                    setIsLoading(true);
                    await dispatch(deleteDelivery(row?.original?.sk));
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
               )}
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
          handleAdd={handleAddDelivery}
          data={deliveryList as []}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          TitleButton="Agregar"
          dataTemplate={DefaultSupplier as []}
        />
      </ScrollX>
   
    </MainCard>
  );
};


export default DeliveryListPage;
