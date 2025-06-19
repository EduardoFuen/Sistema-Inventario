import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Dialog,  Button } from '@mui/material';

// project import
import ProductView from './viewProduct';

import MainCard from 'components/MainCard';
import ReactTable from 'components/ReactTable';
import ScrollX from 'components/ScrollX';
import Import from './ImportProducts';

import { useDispatch, useSelector } from 'store';
import { getProductsEntry } from 'store/reducers/store';
import { openSnackbar } from 'store/reducers/snackbar';


import { ProductDefault } from 'config';

// assets

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
    dispatch(getProductsEntry());
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

 const handleCancel = () => {
    history(`/store-list/exit`);
  };

  const handleCancel2 = () => {
    history(`/store-list/entry`);
  };


  const handleAddProduct = () => {
    history(`/store-list/add`);
  };


  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const columnsProducts = useMemo(
    () => [
      {
        Header: 'Fecha de la entrada',
        accessor: 'ID',
           Cell: ({ row }: any) => {
          const { original } = row;
          let fecha = original?.ID
          fecha = parseInt(fecha)
          fecha = new Date(fecha);
          
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
            
              <Stack spacing={0}>
                <Typography className="cell-center font-size">{fecha.toLocaleString()}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
            {
        Header: 'Nombre Producto',
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
        Header: 'Cantidad Entrante',
        accessor: 'Quantity',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0} alignItems="center">
                <Typography  className="cell-center font-size">{original?.Quantity}</Typography>
              </Stack>
            </Stack>
          );
        }
      },

      {
        Header: 'Proveedor',
        accessor: 'IdProvider',
           Cell: ({ row }: any) => {
             const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography className="cell-center font-size">{original?.Provider}</Typography>
                </Stack>
            </Stack>
          );
        }
      },
        {
        Header: 'Observacion',
        accessor: 'Observation',
           Cell: ({ row }: any) => {
             const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography className="cell-center font-size">{original?.Observation}</Typography>
                </Stack>
            </Stack>
          );
        }
      },
   
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
          dataTemplate={ProductDefault as []}
          FileName="Productos"
          activeSearchType
          typeSearch={typeSearch}
          setTypeSearch={(e: any) => {
            setTypeSearch(e?.target?.value);
            if (valueSearch && e?.target?.value) {
              dispatch(getProductsEntry(1, valueSearch, e?.target?.value));
            }
          }}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
          handlePagination={(page: number) => {
            dispatch(getProductsEntry(page + 1));
          }}
          handleSearch={(value: any) => {
            if (value) {
              setvalueSearch(value);
              dispatch(getProductsEntry(1, value, typeSearch));
            } else {
              dispatch(getProductsEntry(1));
              setTypeSearch('');
            }
          }}
          isLoading={isLoading}
          numberPage={page}
          totalRows={totalPages}
        />
      </ScrollX>
      <Button variant="contained"  color="primary" onClick={handleCancel2}>
                          Ver Entradas
                        </Button>
                           ------<Button variant="contained" color="primary" onClick={handleCancel}>
                          Ver Salidas
                        </Button>     
          
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
      
    </MainCard>
  );
};

export default ProductList;
