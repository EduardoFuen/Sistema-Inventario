import { useState } from 'react';
import { useDispatch } from 'react-redux';

// project import
import ContainerModal from 'components/ContainerModal';
import { addExcel } from 'store/reducers/trademark';
import getStatus from 'utils/getStatus';

// types
import { Trademark } from 'types/products';

// ==============================|| TRADEMARK IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const ImportTradeMark = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const onSubmit = async () => {
    try {
      const newData = data?.map((item: Trademark) => ({
        Name: item?.Name?.toString(),
        MakerID: item?.MakerID,
        ID: item?.ID || 0,
        Status: item?.Status ? getStatus(item?.Status) : false
      }));
      await dispatch(addExcel(newData));
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return <ContainerModal onSubmit={onSubmit} setData={setData} onCancel={onCancel} data={data} />;
};

export default ImportTradeMark;
