import { useState } from 'react';
import { useDispatch } from 'react-redux';

// project import
import ContainerModal from 'components/ContainerModal';
import { addMakerExcel } from 'store/reducers/maker';
import getStatus from 'utils/getStatus';

// types
import { Maker } from 'types/products';

// ==============================|| MAKER IMPORT||============================== //

export interface Props {
  onCancel: () => void;
}

const ImportMarker = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const onSubmit = async () => {
    try {
      const newData = data?.map((item: Maker) => ({
        Name: item?.Name?.toString(),
        ID: item?.ID || 0,
        Status: item?.Status ? getStatus(item?.Status) : false
      }));
      await dispatch(addMakerExcel(newData));
      onCancel();
    } catch (error: any) {
      console.error(error);
    }
  };

  return <ContainerModal onSubmit={onSubmit} setData={setData} onCancel={onCancel} data={data} />;
};

export default ImportMarker;
