import { useCallback, useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Tooltip, Dialog } from '@mui/material';

import { useNavigate } from 'react-router-dom';

// third-party
import { useSelector, useDispatch } from 'store';
import useAuth from 'hooks/useAuth';
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
import AlertSupplierDelete from './AlertSupplierDelete';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// ==============================|| SUPPLIER - LIST ||============================== //

const SupplierListPage = () => {
    const { user } = useAuth();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [addImport, setActiveImport] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

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

  const handleAlertClose = async (status: boolean) => {
    if (status && selectedSupplier) {
      await dispatch(deleteSupplier(selectedSupplier.sk));
    }
    setOpenAlert(false);
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
                   {user?.role == "1" && (
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={async (e: any) => {
                    e.stopPropagation();
                    setSelectedSupplier(row?.original);
                    setOpenAlert(true);
                  }}
                >
                  <DeleteTwoTone twoToneColor={theme.palette.error.main} />
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
      <AlertSupplierDelete title={selectedSupplier?.BusinessName || ''} open={openAlert} handleClose={handleAlertClose} />
    </MainCard>
  );
};

export default SupplierListPage;
