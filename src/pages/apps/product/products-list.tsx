import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Typography, Dialog } from '@mui/material';

// project import
import ProductView from './ProductView';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ReactTable from 'components/ReactTable';
import ScrollX from 'components/ScrollX';
import Import from './Import';

import { useDispatch, useSelector } from 'store';
import { getProducts, deleteProduct } from 'store/reducers/product';
import { openSnackbar } from 'store/reducers/snackbar';

import { SearchIDToArray, SearchNameToArray } from 'utils/findName';
import { ArrayToString } from 'utils/convertToObject';
import { ProductDefault } from 'config';

// assets
import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// ==============================|| PRODUCT LIST - MAIN ||============================== //

const ProductList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [addImport, setActiveImport] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { products, error } = useSelector((state) => state.product);
  const { tradeMarkList } = useSelector((state) => state.trademaker);
  const { makerList } = useSelector((state) => state.maker);
  const { typeProductList } = useSelector((state) => state.typeProduct);

  useEffect(() => {
    if (error?.response?.data?.Error && error?.response?.status !== 404) {
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

  const getMaker = (id: number) => SearchIDToArray(makerList, id)?.Name || '';
  const getTradeMark = (id: number) => SearchIDToArray(tradeMarkList, id)?.Name || '';

  const handleAddProduct = () => {
    history(`/product-list/add-new-product`);
  };

  const handleEditProduct = (id: any) => {
    history(`/product-list/product-edit/${id}`);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const newDataExport: any = products.map((item: any) => {
    let Warehouse: string = '';
    let Substitutes: string = '';
    let Substance: string = '';
    let TypesProduct: string = '';

    if (item?.Substance) {
      Substance = ArrayToString(item?.Substance);
    }
    if (item?.Warehouses) {
      Warehouse = ArrayToString(item?.Warehouses);
    }
    if (item?.Substitutes) {
      Substitutes = item?.Substitutes.map((e: any) => e.Sku).join();
    }
    if (item?.TypesProductID) {
      TypesProduct = SearchNameToArray(typeProductList, item?.TypesProductID)?.Name || '';
    }

    return {
      ID: item?.ID,
      Name: item?.Name,
      Sku: item?.Sku,
      Ean: item?.Ean,
      Maker: item?.Maker?.Name,
      Trademark: item?.Trademark,
      Type_Product: TypesProduct,
      Variation: item?.Variation,
      Grupo: item?.CategoryOne?.Name,
      CategoryOne: item?.CategoryTwo?.Name,
      CategoryTwo: item?.CategoryThree?.Name,
      Pack: item?.Pack?.Name,
      Quantity: item?.Quantity,
      MakerUnit: item?.MakerUnit,
      Weight: item?.Weight,
      Width: item?.Width,
      PackInfo: item?.Wrapper,
      Height: item?.Height,
      WrapperUnit: item?.WrapperUnit,
      Depth: item?.Depth,
      Warehouse,
      Substance,
      Substitutes,
      Status: item?.Status,
      Keywords: item?.Keywords,
      Tax: item?.iva,
      IsTaxed: item?.Taxed
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
        Header: 'SKU',
        accessor: 'Sku',
        className: 'cell-center'
      },
      {
        Header: 'EAN',
        accessor: 'Ean',
        className: 'cell-center'
      },
      {
        Header: 'Nombre Producto',
        accessor: 'Name',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar variant="rounded" alt={original?.Name} color="secondary" size="sm" src={original?.UrlImage} />
              <Stack spacing={0}>
                <Typography variant="subtitle1">{original?.Name}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Maker',
        accessor: 'MakerID',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>{value && <Typography variant="subtitle1">{getMaker(value)}</Typography>}</Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Trademark',
        accessor: 'TrademarkID',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>{value && <Typography variant="subtitle1">{getTradeMark(value)}</Typography>}</Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Estado',
        accessor: 'Status',
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
          const collapseIcon = row.isExpanded ? (
            <CloseOutlined style={{ color: theme.palette.error.main }} />
          ) : (
            <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
          );
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="View">
                <IconButton
                  color="secondary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    row.toggleRowExpanded();
                  }}
                >
                  {collapseIcon}
                </IconButton>
              </Tooltip>
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
                  onClick={(e: any) => {
                    e.stopPropagation();
                    dispatch(deleteProduct(row?.values?.ID));
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

  const renderRowSubComponent = useCallback(({ row }) => <ProductView data={products[row.id]} />, [products]);

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columnsProducts}
          data={products as []}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
          handleImport={handleImport}
          handleAdd={handleAddProduct}
          TitleButton="Agregar Producto"
          FileNameTemplate="Descargar Plantilla"
          dataExport={newDataExport}
          download
          dataTemplate={ProductDefault}
          FileName="Productos"
        />
      </ScrollX>
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default ProductList;
