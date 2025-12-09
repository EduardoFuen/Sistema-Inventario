import { useState } from 'react';
import { useDispatch } from 'react-redux';

// project import
import ContainerModal from 'components/ContainerModal';
import { addExcel } from 'store/reducers/activeSubst';
import getStatus from 'utils/getStatus';

// types
import { Substances } from 'types/products';

// ==============================|| ACTIVE/SUBSTANCES IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const ImportActiveSubstances = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const onSubmit = async () => {
    try {
      const newData = data?.map((item: Substances) => ({
        Name: item?.Name?.toString(),
        Status: item?.Status ? getStatus(item?.Status) : false,
        ID: item?.ID || 0
      }));
      await dispatch(addExcel(newData));
      onCancel();
    } catch (error: any) {
      console.error(error);
    }
  };

  return <ContainerModal onSubmit={onSubmit} setData={setData} onCancel={onCancel} data={data} />;
};

export default ImportActiveSubstances;
