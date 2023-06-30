import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Stack, Typography, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import NumberFormat from 'react-number-format';

// project import
import ReactTable from 'components/ReactTable';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';

import { useSelector } from 'store';

// assets
import { CheckSquareOutlined } from '@ant-design/icons';

// ==============================|| LINE RECEPTION - LIST VIEW ||============================== //

interface PropsProduct {
  products: [];
  handleAdd: (item: any) => void;
}

const DetailsPurchase = ({ products, handleAdd }: PropsProduct) => {
  const theme = useTheme();
  const { receptionAll }: any = useSelector((state) => state.reception);

  const ItemsReception = (id: number) => {
    let TotalCount: number = 0;
    receptionAll.map((item: any) => {
      if (item.ArticleID === id) {
        TotalCount = TotalCount + item.Count;
      }
      return false;
    });
    return TotalCount;
  };

  const columns = useMemo(
    () => [
      {
        Header: 'PRODUCTO',
        accessor: 'Name',
        className: 'custom-td',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography className="font-size-6">{original?.Name}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Sku',
        accessor: 'Sku',
        className: 'custom-td',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography className="font-size-6" variant="caption" color="textSecondary">
                  {original?.Sku}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Ean',
        accessor: 'Ean',
        className: 'custom-td',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography className="font-size-6" variant="caption" color="textSecondary">
                  {original?.Ean}
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
        Header: 'Registro Sanitario',
        accessor: ''
      },
      {
        Header: 'Precio base',
        accessor: 'BasePrice',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'IVA',
        accessor: 'Tax',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" suffix="%" />
      },
      {
        Header: 'Descuento Negociado',
        accessor: 'DiscountNegotiated'
      },
      {
        Header: 'Descuento por nota credito',
        accessor: 'DiscountAdditional'
      },
      {
        Header: 'Bonificación',
        accessor: 'Bonus'
      },
      {
        Header: 'SubTotal',
        accessor: 'SubTotal',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Total',
        accessor: 'Total',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Cantidad Recibida',
        accessor: '0',
        Cell: ({ row }: any) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              {ItemsReception(row.original?.ArticleID) || 0}
            </Stack>
          );
        }
      },
      {
        Header: 'SubTotal Recibido',
        accessor: '1',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              {(ItemsReception(row.original?.ArticleID) && (
                <NumberFormat value={original?.BasePrice * ItemsReception(row.original?.ArticleID)} displayType="text" prefix="$" />
              )) ||
                0}
            </Stack>
          );
        }
      },
      {
        Header: 'Total Recibido',
        accessor: '2',
        Cell: ({ row }: any) => {
          const { original } = row;
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              {(ItemsReception(row.original?.ArticleID) && (
                <NumberFormat
                  value={(original?.BasePrice + original?.Tax) * ItemsReception(row.original?.ArticleID)}
                  displayType="text"
                  prefix="$"
                />
              )) ||
                0}
            </Stack>
          );
        }
      },

      {
        Header: 'Acciones',
        className: 'cell-center font-size',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Ingresar">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleAdd(row.original);
                  }}
                >
                  <CheckSquareOutlined twoToneColor={theme.palette.primary.main} />
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
        <ReactTable
          columns={columns}
          hideButton={false}
          data={data}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          FontSize
        />
      </ScrollX>
    </MainCard>
  );
};

export default DetailsPurchase;
