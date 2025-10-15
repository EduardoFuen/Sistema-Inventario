import { Collection } from 'types/collection';

/**
 * It takes an array of objects, and returns an array of objects with the same keys, but with different
 * values
 * @param {Collection[]} data - Purchase[] - this is the data that you want to export
 */
export const newDataExport = (data: Collection[]) =>
  data.map(({ ID, Supplier, Notes, Total, SubTotal, SubtotalWithDiscount, Warehouse }: Collection) => ({
    Order: `Farmu-${ID}`,
    BusinessName: Supplier?.BusinessName,
    Notes,
    Total,
    SubTotal,
    SubtotalWithDiscount,
    Warehouse
  }));