import { Purchase } from 'types/purchase';

/**
 * It takes an array of objects, and returns an array of objects with the same keys, but with different
 * values
 * @param {Purchase[]} data - Purchase[] - this is the data that you want to export
 */
export const newDataExport = (data: Purchase[]) =>
  data.map(({ ID, Supplier, Notes, Total, SubTotal, SubtotalWithDiscount, Warehouse }: Purchase) => ({
    Order: `Farmu-${ID}`,
    BusinessName: Supplier?.BusinessName,
    Notes,
    Total,
    SubTotal,
    SubtotalWithDiscount,
    Warehouse
  }));
