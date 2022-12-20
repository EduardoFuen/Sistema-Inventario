/**
 * It takes an array of objects, maps over the array, and returns a new array of objects with the same
 * keys but different values
 * @param {object[]} data - object[] - this is the data that you want to export
 */
export const newDataExport = (data: object[]) =>
  data.map((item: any) => {
    return {
      Order: `Farmu-${item?.ID}`,
      BusinessName: item?.Supplier?.BusinessName,
      Notes: item?.Notes,
      Total: item?.Total,
      SubTotal: item?.SubTotal,
      SubtotalWithDiscount: item?.SubtotalWithDiscount,
      Warehouse: item?.Warehouse?.Name
    };
  });
