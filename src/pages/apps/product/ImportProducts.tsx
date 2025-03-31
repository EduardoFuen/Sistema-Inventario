import { useState } from 'react';

// project import
import { addExcel } from 'store/reducers/product';
import ContainerModal from 'components/ContainerModal';
import { useDispatch } from 'store';


// types
import { Product } from 'types/products';

// ==============================|| PRODUCT IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const Import = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const [Submitting, setSubmitting] = useState<boolean>(false);


  const onSubmit = async () => {
    try {
      setSubmitting(true);
      const newData: Product[] = data?.map((item: Product) => ({
        Name: item?.Name?.toString(),
        Sku: item?.Sku?.toString(),
        Price: item?.Price?.toString(),
      }));
      await dispatch(addExcel(newData));
      onCancel();
      setSubmitting(false);
    } catch (error: any) {
      setSubmitting(false);
      console.error(error);
    }
  };

  return <ContainerModal onSubmit={onSubmit} setData={setData} onCancel={onCancel} Submitting={Submitting} data={data} />;
};

export default Import;
