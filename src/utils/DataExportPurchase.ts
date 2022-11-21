export const newDataExport = (data: any) =>
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
