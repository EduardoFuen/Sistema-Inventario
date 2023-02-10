import { useState } from 'react';
import { useDispatch } from 'react-redux';

// project import
import { addExcel } from 'store/reducers/supplier';
import ContainerModal from 'components/ContainerModal';
import { SupplierExport } from 'utils/SupplierTransform';
import { Supplier } from 'types/supplier';

// ==============================|| SUPPLIER IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const ImporSupplier = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const onSubmit = async () => {
    try {
      const newData: Supplier[] = SupplierExport(data);
      await dispatch(addExcel(newData));
      onCancel();
    } catch (error: any) {
      console.error(error);
    }
  };
  return <ContainerModal onSubmit={onSubmit} setData={setData} onCancel={onCancel} data={data} />;
};

export default ImporSupplier;
