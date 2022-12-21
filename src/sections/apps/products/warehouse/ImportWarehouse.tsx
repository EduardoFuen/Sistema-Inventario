import { useState } from 'react';
import { useDispatch } from 'react-redux';

// project import
import ContainerModal from 'components/ContainerModal';
import { addExcel } from 'store/reducers/warehouse';
import getStatus from 'utils/getStatus';

// types
import { Warehouses } from 'types/products';

// ==============================|| WAREHOUSE IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const ImportMarker = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const onSubmit = async () => {
    try {
      const newData = data?.map((item: Warehouses) => ({
        Name: item?.Name?.toString(),
        Department: item?.Department,
        City: item?.City,
        Location: item?.Location,
        Status: item?.Status ? getStatus(item?.Status) : false,
        ID: item?.ID || 0
      }));
      await dispatch(addExcel(newData));
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return <ContainerModal onSubmit={onSubmit} setData={setData} onCancel={onCancel} data={data} />;
};

export default ImportMarker;
