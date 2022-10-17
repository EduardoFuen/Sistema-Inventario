import { useCallback, useEffect, useMemo, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Button, Chip, Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography, Dialog } from '@mui/material';
// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination, Column } from 'react-table';

// project import
import ProductView from './ProductView';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Export from 'components/ExportToFile';
import Import from './Import';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, SortingSelect, TablePagination } from 'components/third-party/ReactTable';
import { useDispatch, useSelector } from 'store';

import { getProducts, deleteProduct } from 'store/reducers/product';

// assets
import { CloseOutlined, PlusOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone, ImportOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: [];
  typeProductData: [];
  getHeaderProps: (column: any) => void;
  renderRowSubComponent: any;
  handleImport: () => void;
}

function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent, handleImport, typeProductData }: Props) {
  const theme = useTheme();
  const history = useNavigate();
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'ID', desc: true };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    allColumns,
    visibleColumns,
    rows,
    // @ts-ignore
    page,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { globalFilter, pageIndex, pageSize },
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter,
    // @ts-ignore
    setSortBy
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      filterTypes,
      // @ts-ignore
      initialState: { pageIndex: 0, pageSize: 5, sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const handleAddProduct = () => {
    history(`/product-list/add-new-product`);
  };

  const newDataExport = data.map((item: any) => {
    let warehouse: string = '';
    let TypesProduct: any;

    if (item?.warehouse) {
      warehouse = item?.warehouse.map((e: any) => e.Name).join();
    }
    if (item?.TypesProductID) {
      TypesProduct = typeProductData.find((data: any) => data?.ID === item?.TypesProductID) || '';
    }

    return {
      ID: item?.ID,
      Name: item?.Name,
      Sku: item?.Sku,
      Ean: item?.Ean,
      Maker: item?.Maker?.Name,
      Trademark: item?.Trademark,
      Type_Product: TypesProduct?.Name,
      Variation: item?.Variation,
      CategoryOne: item?.CategoryOne?.Name,
      CategoryTwo: item?.CategoryTwo?.Name,
      CategoryThree: item?.CategoryThree?.Name,
      Pack: item?.Pack?.Name,
      Quantity: item?.Quantity,
      MakerUnit: item?.MakerUnit,
      Weight: item?.Weight,
      Width: item?.Width,
      PackInfo: item?.PackInfo,
      Height: item?.Height,
      WrapperUnit: item?.WrapperUnit,
      Depth: item?.Depth,
      Warehouse: warehouse,
      UrlImage: item?.UrlImage,
      Status: item?.Status,
      Tax: item?.Tax,
      IsTaxed: item?.IsTaxed
    };
  });

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {/*   <TableRowSelection selected={Object.keys(selectedRowIds).length} /> */}
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 0 }}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              size="small"
            />
            <Export excelData={newDataExport} fileName="Productos" />
            <Button variant="contained" startIcon={<ImportOutlined />} onClick={handleImport}>
              Importar
            </Button>
            <Stack direction="row" alignItems="center" spacing={1}>
              <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
              <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAddProduct}>
                Agregar Producto
              </Button>
            </Stack>
          </Stack>

          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                  {headerGroup.headers.map((column: any) => (
                    <TableCell {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                      <HeaderSort column={column} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row: any, i: number) => {
                prepareRow(row);
                const rowProps = row.getRowProps();

                return (
                  <Fragment key={i}>
                    <TableRow
                      {...row.getRowProps()}
                      onClick={() => {
                        row.toggleRowSelected();
                      }}
                      sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                    >
                      {row.cells.map((cell: any) => (
                        <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                      ))}
                    </TableRow>
                    {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
                  </Fragment>
                );
              })}
              <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                  <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
      </Box>
    </>
  );
}

// ==============================|| PRODUCT LIST - MAIN ||============================== //

const ProductList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [addImport, setActiveImport] = useState<boolean>(false);

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const { products } = useSelector((state) => state.product);
  const { tradeMarkList } = useSelector((state) => state.trademaker);
  const { typeProductList } = useSelector((state) => state.typeProduct);

  const TradeMark = (id: number) => {
    if (id) {
      let MakerID: any = tradeMarkList.find((item) => item.ID === id);
      return MakerID?.Name;
    }
  };

  const handleEditProduct = (id: any) => {
    history(`/product-list/product-edit/${id}`);
  };
  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        accessor: 'Maker',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{value?.Name}</Typography>
              </Stack>
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
              <Stack spacing={0}>{value && <Typography variant="subtitle1">{TradeMark(value)}</Typography>}</Stack>
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
          typeProductData={typeProductList as []}
        />
      </ScrollX>
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default ProductList;
