import { useState, useEffect } from 'react';

// project import
import { addItemsPurchase } from 'store/reducers/purcharse';
import { getProductSKU } from 'store/reducers/product';
import { useDispatch, useSelector } from 'store';
import ContainerModal from 'components/ContainerModal';
import { SearchNameToArray } from 'utils/findName';
import { openSnackbar } from 'store/reducers/snackbar';
import { Article } from 'types/purchase';

// ==============================|| PURCHASE PRODUCT IMPORT ||============================== //

export interface Props {
  onCancel: () => void;
}

const Import = ({ onCancel }: Props) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState<boolean>(true);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    let newArray: any = [];
    data.map(async (item: any) => {
      setisLoading(true);
      newArray.push(item?.Sku);
      if (data.length === newArray.length) {
        await dispatch(getProductSKU(newArray?.join(',')));
        setActive(false);
        setisLoading(false);
      }
    });
  }, [data, dispatch]);

  const newData = data.map((item: any) => {
    let TotalDiscountNegotiated = item?.DiscountNegotiated ? Number((100 - item.DiscountNegotiated) / 100) : 0;
    let SubTotal =
      TotalDiscountNegotiated !== 0 ? item?.Quantity * item?.BasePrice * TotalDiscountNegotiated : item?.Quantity * item?.BasePrice;
    let Tax = Number.parseFloat(item?.Tax) || 0;
    let Total = SubTotal + (item?.Quantity * item?.BasePrice * Tax) / 100 || 0;
    return {
      ProductID: SearchNameToArray(products, String(item?.Sku) || String(item?.Ean) || item?.Name)?.ID || 0,
      Sku: item?.Sku,
      Ean: item?.Ean,
      ID: SearchNameToArray(products, String(item?.Sku) || String(item?.Ean) || item?.Name)?.ID || 0,
      Name: SearchNameToArray(products, String(item?.Sku) || String(item?.Ean) || item?.Name)?.Name || '',
      isSelected: true,
      Count: item?.Quantity ? Number(item?.Quantity) : 0,
      BasePrice: item?.BasePrice ? Number.parseFloat(item?.BasePrice) : 0,
      DiscountNegotiated: item?.DiscountNegotiated ? Number.parseFloat(item?.DiscountNegotiated) : 0,
      DiscountAdditional: item?.DiscountAdditional ? Number.parseFloat(item?.DiscountAdditional) : 0,
      Bonus: item?.Bonus ? Number(item?.Bonus) : 0,
      SubTotal,
      Tax,
      Total
    };
  });
  let detailsPurchase = newData.filter((element: Article, index: number) => {
    return newData.indexOf(element) === index;
  });

  const onSubmit = async () => {
    try {
      let arrayError: string[] = [];
      detailsPurchase
        .filter((item: { ProductID: number }) => item.ProductID === 0)
        .map(async (item: { sku: string }) => {
          arrayError.push(item.sku);
        });

      if (arrayError && arrayError.length > 0) {
        dispatch(
          openSnackbar({
            open: true,
            message: `Los Siguientes productos no estan creados ${arrayError.join(',')}.`,
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      }
      const dataNew: Article[] = detailsPurchase.filter((item: Article) => item.ProductID !== 0);
      await dispatch(addItemsPurchase(dataNew));
      onCancel();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <ContainerModal onSubmit={onSubmit} setData={setData} onCancel={onCancel} data={data} Submitting={active} isLoading={!isLoading} />
  );
};

export default Import;
