import { arrayToString } from 'utils/convertToObject';
import { SearchIDToArray } from 'utils/findName';
/**
 * It takes an array of objects and an array of objects and returns an array of objects
 * @param {object[]} data - object[] = the data you want to export
 * @param {object[]} listTypeProduct - list of types of products
 */

const productExport = (data: object[], listTypeProduct: object[]) =>
  data?.map((item: any) => {
    const Warehouse = item?.Warehouses ? arrayToString(item?.Warehouses) : '';
    const Substitutes = item?.Substitutes ? item?.Substitutes.map((e: { Sku: string }) => e.Sku).join() : '';
    const Substance = item?.Substance ? arrayToString(item?.Substance) : '';
    const TypesProduct = item?.TypesProductID ? SearchIDToArray(listTypeProduct, item?.TypesProductID)?.Name || '' : '';
    return {
      ID: item?.ID,
      HandlesBaq: item?.HandlesBaq,
      HandlesBog: item?.HandlesBog,
      Name: item?.Name,
      Sku: item?.Sku,
      Ean: item?.Ean,
      Maker: item?.Maker?.Name,
      Trademark: item?.Trademark,
      Type_Product: TypesProduct,
      Variation: item?.Variation,
      Grupo: item?.CategoryOne?.Name,
      CategoryOne: item?.CategoryTwo?.Name,
      CategoryTwo: item?.CategoryThree?.Name,
      Pack: item?.Pack?.Name,
      Quantity: item?.Quantity,
      MakerUnit: item?.MakerUnit,
      Weight: item?.Weight,
      Width: item?.Width,
      PackInfo: item?.Wrapper,
      Height: item?.Height,
      WrapperUnit: item?.WrapperUnit,
      Depth: item?.Depth,
      Warehouse,
      IDProduct: item?.IDFloorProduct,
      Substance,
      Substitutes,
      Status: Boolean(item?.Status),
      Keywords: item?.Keywords,
      Tax: item?.iva,
      IsTaxed: item?.Taxed
    };
  });

export { productExport };
