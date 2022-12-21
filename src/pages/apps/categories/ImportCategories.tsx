import { useState } from 'react';

// project import
import { useDispatch, useSelector } from 'store';
import ContainerModal from 'components/ContainerModal';
import { addExcel } from 'store/reducers/category';
import { SearchNameToArray } from 'utils/findName';

// types
import { CategoryOne, CategoryTwo, CategoryThree } from 'types/products';

// ==============================|| CATEGORY IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
  value: number;
}

const ImportCategories = ({ onCancel, value }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const { categoryListOne, categoryListTwo } = useSelector((state) => state.category);

  const onSubmit = () => {
    try {
      let newData: any;

      switch (value) {
        case 0:
          newData = data.map((item: CategoryOne) => ({
            Name: item?.Name?.toString(),
            ID: item?.ID || 0,
            Status: Boolean(item?.Status)
          }));
          break;
        case 1:
          newData = data.map((item: CategoryTwo | any) => ({
            Name: item?.Name?.toString(),
            CategoryOneID: SearchNameToArray(categoryListOne, item?.CategoryOne)?.ID || 0,
            Status: Boolean(item?.Status),
            ID: item?.ID || 0
          }));
          break;

        default:
          newData = data.map((item: CategoryThree | any) => ({
            Name: item?.Name?.toString(),
            CategoryOneID: SearchNameToArray(categoryListOne, item?.CategoryOne)?.ID || 0,
            CategoryTwoID: SearchNameToArray(categoryListTwo, item?.CategoryTwo)?.ID || 0,
            ID: item?.ID || 0,
            Status: Boolean(item?.Status)
          }));
          break;
      }

      dispatch(addExcel(newData, value));
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return <ContainerModal onSubmit={onSubmit} setData={setData} onCancel={onCancel} data={data} />;
};

export default ImportCategories;
