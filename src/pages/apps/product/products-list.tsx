import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {Stack, Tooltip, Box, CircularProgress } from '@mui/material';

// project import
import ProductView from './viewProduct';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ReactTable from 'components/ReactTable';
import ScrollX from 'components/ScrollX';


import { useDispatch, useSelector } from 'store';
import { getProducts, deleteProduct } from 'store/reducers/product';
import { openSnackbar } from 'store/reducers/snackbar';
import useAuth from 'hooks/useAuth';
import { ProductDefault } from 'config';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Product } from 'types/products';

// ==============================|| PRODUCT LIST - MAIN ||============================== //

const ProductList = () => {
   const { user } = useAuth();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [typeSearch, setTypeSearch] = useState<any>('');
  const [valueSearch, setvalueSearch] = useState<any>('');

  const { products, error, page, totalPages, isLoading } = useSelector((state) => state.product);


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
    history(`/product-list/add`);
  };

  const handleEditProduct = (id: any) => {
    history(`/product-list/edit/${id}`);
  };
 
  const columnsProducts = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'sk',
        className: 'cell-center font-size'
      },
      {
        Header: 'SKU',
        accessor: 'Sku',
        className: 'cell-center font-size'
      },
      {
        Header: 'Nombre Producto',
        accessor: 'Name',
      },
      {
        Header: 'Precio',
        accessor: 'Price',
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
    
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleEditProduct(row?.values?.sk);
                  }}
                >
                  <EditTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
              {user?.role == "1" && (
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={async (e: any) => {
                    e.stopPropagation();
                    setIsLoading(true);
                    await dispatch(deleteProduct(row?.values?.sk));
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

  const renderRowSubComponent = useCallback(({ row }: any) => <ProductView data={products[row.id]} />, [products]);

  let listProducts: Product[] = products && products.length > 0 ? products : [];

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columnsProducts}
          data={listProducts as []}
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
    </MainCard>
  );
};

export default ProductList;
