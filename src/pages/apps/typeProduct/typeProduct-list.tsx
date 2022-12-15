import { useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Dialog, Box, CircularProgress } from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import AddTypeProduct from 'sections/apps/products/type-product/AddTypeProduct';
import Import from 'sections/apps/products/type-product/ImportTypeProduct';
import { useDispatch, useSelector } from 'store';
import { getTypeProductList, deleteTypeProduct } from 'store/reducers/typeProduct';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// types
import { TypeProduct } from 'types/products';

// ==============================|| TYPE PRODUCT LIST - MAIN ||============================== //

const PackList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>(null);
  const [add, setAdd] = useState<boolean>(false);
  const [addImport, setActiveImport] = useState<boolean>(false);

  const handleAdd = () => {
    setAdd(!add);
    if (product && !add) setProduct(null);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const { typeProductList } = useSelector((state) => state.typeProduct);

  useEffect(() => {
    dispatch(getTypeProductList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newDataExport: any = typeProductList.map((item: TypeProduct) => {
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
        className: 'cell-center font-size'
      },
      {
        Header: 'Tipo de Producto',
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
                    setProduct(row.original);
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
                    await dispatch(deleteTypeProduct(row?.original?.ID));
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
          columns={columnsProducts}
          handleAdd={handleAdd}
          handleImport={handleImport}
          data={typeProductList as []}
          TitleButton="Agregar Tipo de Producto"
          FileName="TipodeProductos"
          dataExport={newDataExport}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>
      {/* add type product Dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddTypeProduct product={product} onCancel={handleAdd} />}
      </Dialog>
      {/* add import Dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default PackList;
