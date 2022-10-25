/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from 'react';

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

// ==============================|| SELECT PRODUCT PURCHASE - LIST VIEW ||============================== //

export interface PropsSelect {
  onCancel: () => void;
}

const AddSelectProduct = ({ onCancel }: PropsSelect) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [itemsNew, setItems] = useState<any[]>([]);
  const { products } = useSelector((state) => state.product);
  const { tradeMarkList } = useSelector((state) => state.trademaker);

  const TradeMark = (id: number) => {
    if (id) {
      let MakerID: any = tradeMarkList.find((item: any) => item.ID === id);
      return MakerID?.Name;
    }
  };

  const handleSelect = (row: any) => {
    let newRow = {
      ...row.original,
      isSelected: true
    };
    setItems((prevArray) => [...prevArray, newRow]);
  };

  useEffect(() => {}, [itemsNew]);

  let detailsPurchase: any = itemsNew.filter((element, index) => {
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
              <Avatar variant="rounded" alt={original.Name} color="secondary" size="sm" src={original.UrlImage} />
              <Stack spacing={0}>
                <Typography variant="subtitle1">{original.Name}</Typography>
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
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  return (
    <ScrollX>
      <Grid container alignItems="center">
        <Grid item xs={4} alignSelf="center">
          <DialogTitle>Listado de productos</DialogTitle>
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
          <ReactTable
            columns={columns}
            data={products as []}
            hideButton={false}
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
