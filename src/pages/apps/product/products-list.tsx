import { useCallback, useEffect, useMemo, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Button, Chip, Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography, Dialog } from '@mui/material';
// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination, Column } from 'react-table';

// project import
import ProductView from './ProductView';
/* import Avatar from 'components/@extended/Avatar'; */
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Export from 'components/ExportToFile';
import Import from './Import';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, SortingSelect, TablePagination } from 'components/third-party/ReactTable';
import { useDispatch, useSelector } from 'store';

import { getProducts, deleteProduct } from 'store/reducers/product';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { CloseOutlined, PlusOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone, ImportOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: [];
  getHeaderProps: (column: any) => void;
  renderRowSubComponent: any;
  handleImport: () => void;
}

function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent, handleImport }: Props) {
  const theme = useTheme();
  const history = useNavigate();
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'Name', desc: true };

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
    history(`/p/product-list/add-new-product`);
  };

  const newDataExport = data.map((item: any) => {
    let substances: string = '';
    let substitutes: string = '';
    let warehouse: string = '';

    if (item?.substances) {
      substances = item.substances.map((e: any) => e.name).join();
    }
    if (item?.substitutes) {
      substitutes = item?.substitutes.map((e: any) => e.name).join();
    }
    if (item?.warehouse) {
      warehouse = item?.warehouse.map((e: any) => e.name).join();
    }
    return {
      name: item.name,
      sku: item.sku,
      ean: item.ean,
      categoryOne: item.categoryOne,
      categoryThree: item.categoryThree,
      categoryTwo: item.categoryTwo,
      depth: item.depth,
      height: item.height,
      img: item.img,
      keywords: item.keywords,
      maker: item.maker,
      makerUnit: item.makerUnit,
      pack: item.pack,
      packInfo: item.packUnit,
      packUnit: item.packUnit,
      trademark: item.trademark,
      'type product': item.type_product,
      variation: item.variation,
      weight: item.weight,
      width: item.width,
      warehouse,
      substances,
      substitutes,
      status: item.status
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
  const handleEditProduct = (id: any) => {
    history(`/p/product-list/product-edit/${id}`);
  };
  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsProducts = useMemo(
    () => [
      {
        Header: 'SKU',
        accessor: 'sku',
        className: 'cell-center'
      },
      {
        Header: 'EAN',
        accessor: 'ean',
        className: 'cell-center'
      },
      {
        Header: 'Nombre Producto',
        accessor: 'name',
        Cell: ({ row }: any) => {
          const { values } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              {/*   <Avatar
                variant="rounded"
                alt={values.name}
                color="secondary"
                size="sm"
                src={productImage(`./thumbs/${!values.image ? 'prod-11.png' : values.image}`).default}
              /> */}
              <Stack spacing={0}>
                <Typography variant="subtitle1">{values.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {values.description}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Maker',
        accessor: 'maker',
        className: 'cell-right'
      },
      {
        Header: 'Trademark',
        accessor: 'trademark',
        className: 'cell-right'
      },
      {
        Header: 'Estado',
        accessor: 'status',
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
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'Producto delete successfully.',
                        variant: 'alert',
                        alert: {
                          color: 'success'
                        },
                        close: false
                      })
                    );
                    dispatch(deleteProduct(row.name));
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
        />
      </ScrollX>
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default ProductList;
