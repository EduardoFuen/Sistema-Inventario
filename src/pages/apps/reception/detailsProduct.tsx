import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Stack, Typography, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import ReactTable from 'components/ReactTable';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';

// assets
import { EditTwoTone } from '@ant-design/icons';

// ==============================|| DETAILS PRODUCT RECEPTION - LIST VIEW ||============================== //

interface PropsProduct {
  products: [];
  handleAdd: (item: any) => void;
  status: string;
}

const DetailsPurchase = ({ products, handleAdd, status }: PropsProduct) => {
  const theme = useTheme();

  const columns = useMemo(
    () => [
      {
        Header: 'PRODUCTO',
        accessor: 'Sku',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{original?.Name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Sku {original?.Sku}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Ean :{original?.Ean}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Cantidad',
        accessor: 'Count'
      },
      {
        Header: 'Precio base',
        accessor: 'BasePrice'
      },
      {
        Header: 'IVA',
        accessor: 'Tax'
      },
      {
        Header: 'Descuento Negociado',
        accessor: 'DiscountNegotiated'
      },
      {
        Header: 'Descuento Adicional',
        accessor: 'DiscountAdditional'
      },
      {
        Header: 'Bonificación',
        accessor: 'Bonus'
      },
      {
        Header: 'Subtotal',
        accessor: 'SubTotal'
      },
      {
        Header: 'Total',
        accessor: 'Total'
      },
      {
        Header: 'Acciones',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              {status === 'Send' && (
                <Tooltip title="Ingresar">
                  <IconButton
                    color="primary"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      handleAdd(row.values);
                    }}
                  >
                    <EditTwoTone twoToneColor={theme.palette.primary.main} />
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
  const [data, setData] = useState<any>(products);
  useEffect(() => {
    setData(products);
  }, [products]);

  useEffect(() => {
    window.localStorage.setItem('farmu-productsDetails', JSON.stringify(data));
  }, [data]);
  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} getHeaderProps={(column: any) => column.getSortByToggleProps()} />
      </ScrollX>
    </MainCard>
  );
};

export default DetailsPurchase;
