import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Tooltip, Typography, Dialog } from '@mui/material';

// project import
import ProductView from './viewProduct';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ReactTable from 'components/ReactTable';
import ScrollX from 'components/ScrollX';
import Import from './ImportProducts';

import { useDispatch, useSelector } from 'store';
import { getDolar } from 'store/reducers/store';
import { openSnackbar } from 'store/reducers/snackbar';


import { ProductDefault } from 'config';

// assets
import { PlusCircleOutlined } from '@ant-design/icons';
import { Cambios } from 'types/store';


// ==============================|| PRODUCT LIST - MAIN ||============================== //

const ProductList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [addImport, setActiveImport] = useState<boolean>(false);
  const [typeSearch, setTypeSearch] = useState<any>('');
  const [valueSearch, setvalueSearch] = useState<any>('');

  const { cambios, error, page, totalPages, isLoading } = useSelector((state) => state.store);


  useEffect(() => {
    dispatch(getDolar());
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




  const handleEditProduct = (id: any) => {
    history(`/cambios/edit/${id}`);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const columnsProducts = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID',
        className: 'cell-center font-size'
      },
            {
        Header: 'Dolar',
        accessor: 'Base',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
            
              <Stack spacing={0}>
                <Typography className="cell-center font-size">{original?.Base}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'BCV',
        accessor: 'BCV',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0} alignItems="center">
                <Typography  className="cell-center font-size">{original?.BCV}</Typography>
              </Stack>
            </Stack>
          );
        }
      },

      {
        Header: 'Ultima Actualizacion',
        accessor: 'Date',
           Cell: ({ row }: any) => {
             const { original } = row;
          let fecha = original?.Date
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
        Header: 'Acciones',
        className: 'cell-center font-size',
        disableSortBy: true,
        Cell: ({ row }: any) => {
      

          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            
                <Tooltip title="Comprar">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleEditProduct(row?.values?.ID);
                  }}
                >
                  <PlusCircleOutlined twoToneColor={theme.palette.primary.main} />
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

  const renderRowSubComponent = useCallback(({ row }: any) => <ProductView data={cambios[row.id]} />, [cambios]);

  let listProducts: Cambios[] = cambios && cambios.length > 0 ? cambios : [];

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columnsProducts}
          data={listProducts as []}
          handleImport={handleImport}
          dataTemplate={ProductDefault as []}
          FileName="Productos"
          activeSearchType
          typeSearch={typeSearch}
          setTypeSearch={(e: any) => {
            setTypeSearch(e?.target?.value);
            if (valueSearch && e?.target?.value) {
              dispatch(getDolar(1, valueSearch, e?.target?.value));
            }
          }}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
          handlePagination={(page: number) => {
            dispatch(getDolar(page + 1));
          }}
          handleSearch={(value: any) => {
            if (value) {
              setvalueSearch(value);
              dispatch(getDolar(1, value, typeSearch));
            } else {
              dispatch(getDolar(1));
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
