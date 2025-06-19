import { useCallback, useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Tooltip, Dialog, Box, CircularProgress } from '@mui/material';

import { useNavigate } from 'react-router-dom';

// third-party
import { useSelector, useDispatch } from 'store';

// project import
import ReactTable from 'components/ReactTable';
import SupplierView from './view';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Import from './ImportSupplier';
import { getSupplierList, deleteSupplier } from 'store/reducers/supplier';
import { DefaultSupplier } from 'config';
import { SupplierExport } from 'utils/SupplierTransform';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// ==============================|| SUPPLIER - LIST ||============================== //

const SupplierListPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [addImport, setActiveImport] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getSupplierList());
  }, [dispatch]);

  const { supplierList } = useSelector((state) => state.supplier);
  const data = (supplierList.length >= 0 && SupplierExport(supplierList)) || [];

  const handleEditSupplier = (id: any) => {
    history(`/supplier/edit/${id}`);
  };

  const handleAddSupplier = () => {
    history(`/supplier/add`);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Codigo',
        accessor: 'Code',
        className: 'cell-center font-size'
      },
      {
        Header: 'RIF',
        accessor: 'Rif',
        className: 'cell-center font-size'
      },
      {
        Header: 'Descripción',
        accessor: 'BusinessName',
        className: 'cell-center font-size',
      },
      {
        Header: 'Email',
        className: 'cell-center font-size',
        accessor: 'EmailContact'
      },
      {
        Header: 'Teléfono',
        className: 'cell-center font-size',
        accessor: 'PhoneContact',
      },
      {
        Header: 'Nombre Contacto',
        className: 'cell-center font-size',
        accessor: 'NameContact'
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
                    handleEditSupplier(row?.original?.sk);
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
                    await dispatch(deleteSupplier(row?.original?.sk));
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

  const renderRowSubComponent = useCallback(({ row }: any) => <SupplierView data={supplierList[row.id]} />, [supplierList]);

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          handleImport={handleImport}
          handleAdd={handleAddSupplier}
          data={supplierList as []}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
          TitleButton="Agregar"
          FileName="Proveedores"
          dataExport={data as []}
          FileNameTemplate="Descargar Plantilla"
          download
          dataTemplate={DefaultSupplier as []}
        />
      </ScrollX>
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default SupplierListPage;
