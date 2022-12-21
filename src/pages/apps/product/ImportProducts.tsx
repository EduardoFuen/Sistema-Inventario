import { useState } from 'react';

// project import
import { addExcel } from 'store/reducers/product';
import ContainerModal from 'components/ContainerModal';
import { useDispatch, useSelector } from 'store';
import { SearchNameToArray } from 'utils/findName';
import { ConvertToArray } from 'utils/convertStringToArray';
import getStatus from 'utils/getStatus';
import { containsNumbers } from 'utils/containsNumbers';

// types
import { Products } from 'types/products';

// ==============================|| PRODUCT IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const Import = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const [Submitting, setSubmitting] = useState<boolean>(false);

  const { makerList } = useSelector((state) => state.maker);
  const { tradeMarkList } = useSelector((state) => state.trademaker);
  const { packList } = useSelector((state) => state.pack);
  const { typeProductList } = useSelector((state) => state.typeProduct);
  const { categoryListThree, categoryListOne, categoryListTwo } = useSelector((state) => state.category);
  const { warehouseList } = useSelector((state) => state.warehouse);
  const { todoListSubs } = useSelector((state) => state.substances);
  const { products } = useSelector((state) => state.product);

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      const newData: Products = data?.map((item: any) => ({
        Name: item?.Name?.toString(),
        Sku: item?.Sku?.toString(),
        Ean: item?.Ean?.toString(),
        MakerID: item?.Maker ? SearchNameToArray(makerList, item?.Maker)?.ID?.toString() : '',
        TrademarkID: item?.Trademark ? SearchNameToArray(tradeMarkList, item?.Trademark)?.ID?.toString() : '',
        TypesProductID: item?.Type_Product ? SearchNameToArray(typeProductList, item?.Type_Product)?.ID?.toString() : '',
        Variation: item?.Variation?.toString(),
        CategoryOneID: item?.Grupo ? SearchNameToArray(categoryListOne, item?.Grupo)?.ID?.toString() : '',
        CategoryTwoID: item?.CategoryOne ? SearchNameToArray(categoryListTwo, item?.CategoryOne)?.ID?.toString() : '',
        CategoryThreeID: item?.CategoryThree ? SearchNameToArray(categoryListThree, item?.CategoryThree)?.ID?.toString() : '',
        PackID: item?.Pack ? SearchNameToArray(packList, item?.Pack)?.ID.toString() : '',
        Quantity: item?.Quantity ? containsNumbers(item?.Quantity?.toString()?.trim()) : '',
        MakerUnit: item?.MakerUnit?.toString()?.trim(),
        Weight: item?.Weight?.toString()?.trim(),
        Width: item?.Width?.toString()?.trim(),
        Height: item?.Height?.toString()?.trim(),
        Depth: item?.Depth?.toString()?.trim(),
        Wrapper: item?.PackInfo?.toString()?.trim(),
        WrapperUnit: item?.WrapperUnit?.toString()?.trim(),
        Keywords: item?.Keywords?.toString(),
        SubstancesIDS: item?.Substance ? ConvertToArray(item?.Substance?.toString(), todoListSubs) : '',
        WarehouseIDS: item?.Warehouse ? ConvertToArray(item?.Warehouse?.toString(), warehouseList) : '',
        SubstitutesIDS: item?.Substitutes ? ConvertToArray(item?.Substitutes?.toString(), products) : '',
        Status: item?.Status ? getStatus(item?.Status) : false,
        HandlesBaq: item?.id_baq?.toString() || '',
        HandlesBog: item?.id_bog?.toString() || '',
        iva: item?.Tax?.toString(),
        IDFloorProduct: item?.IDProduct?.toString(),
        Taxed: item?.IsTaxed
      }));
      await dispatch(addExcel(newData));
      onCancel();
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.error(error);
    }
  };

  return <ContainerModal onSubmit={onSubmit} setData={setData} onCancel={onCancel} Submitting={Submitting} data={data} />;
};

export default Import;
