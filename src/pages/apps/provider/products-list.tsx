import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Tooltip, Typography, Dialog, Box, CircularProgress } from '@mui/material';

// project import
import ProductView from './viewProduct';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ReactTable from 'components/ReactTable';
import ScrollX from 'components/ScrollX';
import Import from './ImportProducts';

import { useDispatch, useSelector } from 'store';
import { getProducts, deleteProduct } from 'store/reducers/provider';
import { openSnackbar } from 'store/reducers/snackbar';


import { ProductDefault } from 'config';

// assets
import {EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Store } from 'types/store';


// ==============================|| PRODUCT LIST - MAIN ||============================== //

const ProductList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [addImport, setActiveImport] = useState<boolean>(false);
  const [typeSearch, setTypeSearch] = useState<any>('');
  const [valueSearch, setvalueSearch] = useState<any>('');

  const { stores, error, page, totalPages, isLoading } = useSelector((state) => state.store);


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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



  const handleAddProduct = () => {
    history(`/provider-list/add`);
  };

  const handleEditProduct = (id: any) => {
    history(`/provider-list/edit/${id}`);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const columnsProducts = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'idProvider',
        className: 'cell-center font-size'
      },
            {
        Header: 'Proveedor',
        accessor: 'Name',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
            
              <Stack spacing={0}>
                <Typography className="cell-center font-size">{original?.Name}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Persona Contacto',
        accessor: 'ContactName',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0} alignItems="center">
                <Typography  className="cell-center font-size">{original?.ContactName}</Typography>
              </Stack>
            </Stack>
          );
        }
      },

      {
        Header: 'Telefono',
        accessor: 'PhoneNumber',
           Cell: ({ row }: any) => {
             const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography className="cell-center font-size">{original?.PhoneNumber}</Typography>
                </Stack>
            </Stack>
          );
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
                    handleEditProduct(row?.values?.ID);
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
                    await dispatch(deleteProduct(row?.values?.idProvider));
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

  const renderRowSubComponent = useCallback(({ row }: any) => <ProductView data={stores[row.id]} />, [stores]);

  let listProducts: Store[] = stores && stores.length > 0 ? stores : [];

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columnsProducts}
          data={listProducts as []}
          handleImport={handleImport}
          handleAdd={handleAddProduct}
          TitleButton="Agregar"
          dataTemplate={ProductDefault as []}
          FileName="Productos"
          activeSearchType
          typeSearch={typeSearch}
          setTypeSearch={(e: any) => {
            setTypeSearch(e?.target?.value);
            if (valueSearch && e?.target?.value) {
              dispatch(getProducts(1, valueSearch, e?.target?.value));
            }
          }}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
          handlePagination={(page: number) => {
            dispatch(getProducts(page + 1));
          }}
          handleSearch={(value: any) => {
            if (value) {
              setvalueSearch(value);
              dispatch(getProducts(1, value, typeSearch));
            } else {
              dispatch(getProducts(1));
              setTypeSearch('');
            }
          }}
          isLoading={isLoading}
          numberPage={page}
          totalRows={totalPages}
        />
      </ScrollX>
 
          
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
      
    </MainCard>
  );
};

export default ProductList;
