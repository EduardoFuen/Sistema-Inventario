import { useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Chip, Grid, DialogContent, DialogActions, DialogTitle, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
import { useSelector, useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { addItemsPurchase } from 'store/reducers/purcharse';
import { IndeterminateCheckbox } from 'components/third-party/ReactTable';
import { SearchIDToArray } from 'utils/findName';

import { getProducts } from 'store/reducers/product';

// ==============================|| SELECT PRODUCT PURCHASE - LIST VIEW ||============================== //

export interface PropsSelect {
  onCancel: () => void;
}

const SelectLinePurchase = ({ onCancel }: PropsSelect) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [itemsNew, setItems] = useState<any[]>([]);
  const [typeSearch, setTypeSearch] = useState<any>('');
  const [valueSearch, setvalueSearch] = useState<any>('');

  const { products, page, totalPages, isLoading } = useSelector((state) => state.product);
  const { tradeMarkList } = useSelector((state) => state.trademark);

  const TradeMark = (id: number) => SearchIDToArray(tradeMarkList, id)?.Name || '';

  const handleSelect = (row: any) => {
    const index = itemsNew.findIndex((item) => item?.ID === row?.original?.ID);
    if (index > -1) {
      itemsNew.splice(index, 1);
    }
    let newRow = {
      ...row?.original,
      isSelected: !row?.isSelected
    };
    setItems([...itemsNew, newRow]);
  };

  let detailsPurchase: any = itemsNew.filter((item: any) => item.isSelected === true);

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
        Header: 'Nombre Producto',
        accessor: 'Name',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar variant="rounded" alt={original.Name} color="secondary" size="sm" src={original.UrlImage} />
              <Stack spacing={0}>
                <Typography className="font-size">{original?.Name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Sku {original?.Sku}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Ean {original?.Ean}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Registro Sanitario (INVIMA)',
        accessor: '',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography>{value?.Name}</Typography>
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
                <Typography>{value?.Name}</Typography>
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
              <Stack spacing={0}>{value && <Typography>{TradeMark(value)}</Typography>}</Stack>
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
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const Accions = () => (
    <Stack direction="row" justifyContent="end" spacing={2} alignItems="end" sx={{ pr: 1 }}>
      <Button color="error" onClick={onCancel}>
        Cancelar
      </Button>
      <Button
        variant="contained"
        disabled={detailsPurchase && detailsPurchase.length === 0}
        onClick={() => {
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
          dispatch(addItemsPurchase(detailsPurchase));
          dispatch(getProducts());
          onCancel();
        }}
      >
        Confirmar
      </Button>
    </Stack>
  );

  let listProducts: any = products && products.length > 0 ? products : [];

  return (
    <ScrollX>
      <Grid container alignItems="center">
        <Grid item xs={4} alignSelf="center">
          <DialogTitle>Listado de productos</DialogTitle>
        </Grid>
        <Grid item xs={8} justifyContent="end">
          <Accions />
        </Grid>
      </Grid>
      <MainCard content={false}>
        <DialogContent sx={{ p: 2.5 }}>
          <ReactTable
            columns={columns}
            data={listProducts as []}
            hideButton={false}
            handleSelect={(row: any) => handleSelect(row)}
            getHeaderProps={(column: any) => column.getSortByToggleProps()}
            handlePagination={(page: number) => {
              dispatch(getProducts(page + 1));
            }}
            activeSearchType
            typeSearch={typeSearch}
            setTypeSearch={(e: any) => {
              setTypeSearch(e?.target?.value);
              if (valueSearch && e?.target?.value) {
                dispatch(getProducts(1, valueSearch, e?.target?.value));
              }
            }}
            handleSearch={(value: any) => {
              if (value) {
                dispatch(getProducts(1, value));
                setvalueSearch(value);
              } else {
                dispatch(getProducts(1));
                setTypeSearch('');
              }
            }}
            isLoading={isLoading}
            numberPage={page}
            totalRows={totalPages}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Grid container justifyContent="end" alignItems="center">
            <Grid item>
              <Accions />
            </Grid>
          </Grid>
        </DialogActions>
      </MainCard>
    </ScrollX>
  );
};

export default SelectLinePurchase;
