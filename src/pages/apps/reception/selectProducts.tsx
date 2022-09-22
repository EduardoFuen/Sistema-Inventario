/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, Fragment, useState, useEffect } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
  Grid,
  DialogContent,
  DialogActions,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  InputLabel,
  TextField
} from '@mui/material';

// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination, Column } from 'react-table';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { renderFilterTypes } from 'utils/react-table';
import { useSelector, useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { addItemsPurchase } from 'store/reducers/purcharse';
import { HeaderSort, IndeterminateCheckbox, TablePagination } from 'components/third-party/ReactTable';

const productImage = require.context('assets/images/e-commerce', true);

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: [];
  handleSelect: (row: any) => void;
  getHeaderProps: (column: any) => void;
}

function ReactTable({ columns, data, getHeaderProps, handleSelect }: Props) {
  const theme = useTheme();

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'name', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    // @ts-ignore
    page,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      filterTypes,
      // @ts-ignore
      initialState: { pageIndex: 0, pageSize: 10, sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  return (
    <>
      <Stack spacing={3}>
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
              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      handleSelect(row);
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell: any) => (
                      <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                    ))}
                  </TableRow>
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
    </>
  );
}

// ==============================|| SELECT PRODUCT - LIST VIEW ||============================== //

export interface PropsSelect {
  onCancel: () => void;
}

const AddSelectProduct = ({ onCancel }: PropsSelect) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [itemsNew, setItems] = useState<any[]>([]);
  const { products } = useSelector((state) => state.product);
  const handleSelect = (row: any) => {
    setItems((prevArray) => [...prevArray, row]);
  };

  useEffect(() => {}, [itemsNew]);

  let detailsPurchase = itemsNew.filter((element, index) => {
    return itemsNew.indexOf(element) === index;
  });

  const columns = useMemo(
    () => [
      {
        accessor: 'selection',
        Cell: ({ row }: any) => {
          return <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
        },
        disableSortBy: true
      },
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
              <Avatar
                variant="rounded"
                alt={values.name}
                color="secondary"
                size="sm"
                src={productImage(`./thumbs/${!values.image ? 'prod-11.png' : values.image}`).default}
              />
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
        Header: 'Qty',
        accessor: 'quantity',
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
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  return (
    <ScrollX>
      <Grid container alignItems="center">
        <Grid item xs={4} alignSelf="center">
          <DialogTitle>Recepción de productos</DialogTitle>
        </Grid>
        <Grid item xs={8} justifyContent="end">
          <Stack direction="row" justifyContent="end" spacing={2} alignItems="end" sx={{ pr: 1 }}>
            <Button color="error" onClick={onCancel}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(addItemsPurchase(detailsPurchase));
                onCancel();
                dispatch(
                  openSnackbar({
                    open: true,
                    message: 'Producto Seleccionados',
                    variant: 'alert',
                    alert: {
                      color: 'success'
                    },
                    close: false
                  })
                );
              }}
            >
              Confirmar
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false}>
        <DialogContent sx={{ p: 2.5 }}>
          <Grid container direction="row" spacing={2}>
            <Stack direction="row" justifyContent="end" spacing={2} alignItems="end" sx={{ p: 3 }}>
              <Grid item xs={4}>
                <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Faltantes</InputLabel>
                <TextField
                  sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                  type="number"
                  placeholder="Ingresar Cantidad Faltantes"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Devolución</InputLabel>
                <TextField
                  sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                  type="number"
                  placeholder="Ingresar Cantidad Devolución"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Motivo Devolución</InputLabel>
                <TextField sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} placeholder="Ingresar Motivo Devolución" fullWidth />
              </Grid>
            </Stack>
          </Grid>
          <ReactTable
            columns={columns}
            data={products as []}
            handleSelect={(row: any) => handleSelect(row)}
            getHeaderProps={(column: any) => column.getSortByToggleProps()}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Grid container justifyContent="end" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="end">
                <Button color="error" onClick={onCancel}>
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(addItemsPurchase(detailsPurchase));
                    onCancel();
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'Producto Seleccionados',
                        variant: 'alert',
                        alert: {
                          color: 'success'
                        },
                        close: false
                      })
                    );
                  }}
                >
                  Confirmar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </MainCard>
    </ScrollX>
  );
};

export default AddSelectProduct;
