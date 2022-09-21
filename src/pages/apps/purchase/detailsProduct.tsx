import { useEffect, useMemo, useState, ChangeEvent } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Stack, Tooltip, IconButton, Typography } from '@mui/material';
import { DeleteTwoTone } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';

// third-party
import { useTable, useFilters, Column } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { deleteItemsPurchase } from 'store/reducers/purcharse';
import { openSnackbar } from 'store/reducers/snackbar';

import { useDispatch, useSelector } from 'store';

// ==============================|| REACT TABLE - EDITABLE CELL ||============================== //

const DetailsPurchaseCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData }: any) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <TextField
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      sx={{ '& .MuiOutlinedInput-input': { py: 0.75, px: 1 }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
    />
  );
};

const defaultColumn = {
  Cell: DetailsPurchaseCell
};

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: [];
  updateMyData: (rowIndex: number, columnId: any, value: any) => void;
  skipPageReset: boolean;
}

function ReactTable({ columns, data, updateMyData, skipPageReset }: Props) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // @ts-ignore
      autoResetPage: !skipPageReset,
      updateMyData
    },
    useFilters
  );

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row: any, i: number) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell: any) => (
                <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ==============================|| REACT TABLE - EDITABLE ||============================== //

const DetailsPurchase = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: 'Producto',
        accessor: 'name',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{original.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  SKU: {original?.sku}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  EAN: {original?.ean}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Descuento Negociado',
        accessor: 'discount'
      },
      {
        Header: 'Descuento Adicional',
        accessor: 'additionalDiscount'
      },
      {
        Header: 'Cantidad',
        accessor: 'qty'
      },
      {
        Header: 'Costo de compra',
        accessor: 'price'
      },
      {
        Header: 'IVA',
        accessor: 'iva'
      },
      {
        Header: 'Subtotal',
        accessor: 'subtotal',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                {original?.qty && original?.price ? <Typography variant="subtitle1">{original?.qty * original?.price}</Typography> : 0}
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: ({ row }: any) => {
          const { original } = row;
          let subtotal = original?.qty * original?.price || 0;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                {subtotal ? <Typography variant="subtitle1">{subtotal + (subtotal * original?.iva || 0) / 100}</Typography> : 0}
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Acciones',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={() => {
                    dispatch(deleteItemsPurchase(row.values?.name));
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'Producto Delete successfully',
                        variant: 'alert',
                        alert: {
                          color: 'success'
                        },
                        close: false
                      })
                    );
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
    [theme]
  );
  const { detailsPurchase } = useSelector((state) => state.purchase);

  const [data, setData] = useState<any>(detailsPurchase);
  const [skipPageReset, setSkipPageReset] = useState(false);
  useEffect(() => {
    setData(detailsPurchase);
  }, [detailsPurchase]);
  const updateMyData = (rowIndex: number, columnId: any, value: any) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old: []) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            // @ts-ignore
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

console.log(data);

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} updateMyData={updateMyData} skipPageReset={skipPageReset} />
      </ScrollX>
    </MainCard>
  );
};

export default DetailsPurchase;
