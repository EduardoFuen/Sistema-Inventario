import { useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Dialog, Stack, Tooltip, Typography, Box, CircularProgress } from '@mui/material';

// project import
import AddTrademark from 'sections/apps/products/trademark/AddTrademark';
import Import from 'sections/apps/products/trademark/ImportTradeMark';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';

import { useDispatch, useSelector } from 'store';
import { getMakerList } from 'store/reducers/maker';
import { getTrademarkList, deleteTrademark } from 'store/reducers/trademark';

// types
import { Maker } from 'types/products';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// ==============================|| TRADEMARK - LIST ||============================== //

const TradeMarkList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [tradeMark, setTrademark] = useState<any>(null);
  const [add, setAdd] = useState<boolean>(false);
  const [addImport, setActiveImport] = useState<boolean>(false);

  const handleAdd = () => {
    setAdd(!add);
    if (tradeMark && !add) setTrademark(null);
  };
  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const { tradeMarkList } = useSelector((state) => state.trademaker);
  const { makerList } = useSelector((state) => state.maker);

  const getMaker = (id: number) => {
    if (id) {
      let Maker: any = makerList.find((item: Maker) => item.ID === id);
      return Maker?.Name;
    }
  };

  useEffect(() => {
    dispatch(getMakerList());
    dispatch(getTrademarkList());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID'
      },
      {
        Header: 'Trademark',
        accessor: 'Name'
      },
      {
        Header: 'Maker',
        accessor: 'MakerID',
        Cell: ({ value }: any) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>{value && <Typography className="cell-center font-size">{getMaker(value)}</Typography>}</Stack>
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
                    setTrademark(row.original);
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
                    await dispatch(deleteTrademark(row?.original?.ID));
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
          columns={columns}
          data={tradeMarkList as []}
          dataExport={tradeMarkList as []}
          handleAdd={handleAdd}
          handleImport={handleImport}
          TitleButton="Agregar Trademark"
          FileName="Trademark"
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
        />
      </ScrollX>

      {/* add TradeMark Dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleAdd} open={add} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {add && <AddTrademark tradeMark={tradeMark} onCancel={handleAdd} />}
      </Dialog>
      {/* add import Dialog */}
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default TradeMarkList;
