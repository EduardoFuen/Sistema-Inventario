import { useCallback, useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, capitalize, Typography, Dialog } from '@mui/material';

import { useNavigate } from 'react-router-dom';

// third-party
import NumberFormat from 'react-number-format';
import { useSelector, useDispatch } from 'store';

// project import
import ReactTable from 'components/ReactTable';
import SupplierView from './supplirView';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Import from './ImportSupplier';
import { getSupplierList, deleteSupplier } from 'store/reducers/supplier';

// types
import { Supplier } from 'types/supplier';

// assets
import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// ==============================|| SUPPLIER - LIST ||============================== //

const SupplierListPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [addImport, setActiveImport] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getSupplierList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditSupplier = (id: any) => {
    history(`/supplier/edit/${id}`);
  };

  const handleAddSupplier = () => {
    history(`/supplier/add`);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const { supplierList } = useSelector((state) => state.supplier);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID',
        className: 'cell-center'
      },
      {
        Header: 'NIT',
        accessor: 'Nit',
        className: 'cell-center'
      },
      {
        Header: 'Razón social',
        accessor: 'BusinessName',
        className: 'cell-center',
        Cell: ({ value }: any) => (
          <Typography variant="h6" key={value}>
            {capitalize(value)}
          </Typography>
        )
      },
      {
        Header: 'Email',
        className: 'cell-center',
        accessor: 'EmailContact'
      },
      {
        Header: 'Teléfono',
        className: 'cell-center',
        accessor: 'PhoneContact',
        Cell: ({ value }) => <NumberFormat displayType="text" format="+57 (###) ###-####" mask="_" defaultValue={value} />
      },
      {
        Header: 'Nombre Contacto',
        className: 'cell-center',
        accessor: 'NameContact'
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
                    handleEditSupplier(row?.original?.ID);
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
                    dispatch(deleteSupplier(row?.original?.ID));
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

  const newDataExport: any = supplierList.map((item: Supplier) => ({
    ID: item?.ID,
    BusinessName: item?.BusinessName,
    Nit: item?.Nit,
    Cupo: item?.Cupo,
    DaysPayment: item?.DaysPayment,
    LeadTimeBaq: item?.LeadTimeBaq,
    LeadTimeBog: item?.LeadTimeBog,
    PaymenTerm: item?.PaymenTerm,
    Discount: item?.Discount,
    NameContact: item?.NameContact,
    EmailContact: item?.EmailContact,
    PhoneContact: item?.PhoneContact,
    Status: item?.Status
  }));

  const Template: any = [
    {
      ID: '',
      BusinessName: '',
      Nit: '',
      Cupo: '',
      DaysPayment: '',
      LeadTimeBaq: '',
      LeadTimeBog: '',
      PaymenTerm: '',
      Discount: '',
      NameContact: '',
      EmailContact: '',
      PhoneContact: '',
      Status: ''
    }
  ];
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
          TitleButton="Agregar Proveedor"
          FileName="Proveedores"
          dataExport={newDataExport}
          FileNameTemplate="Descargar Plantilla"
          download
          dataTemplate={Template}
        />
      </ScrollX>
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default SupplierListPage;
