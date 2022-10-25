import { getObject } from 'utils/Global';

export const newDataExport = (data: any, warehouseList: any, supplierList: any) =>
  data.map((item: any) => {
    let Warehouse: string = '';
    let Supplier: any;

    if (item?.WarehouseID) {
      Warehouse = getObject(warehouseList, item?.WarehouseID)?.Name;
    }
    if (item?.SupplierID) {
      Supplier = getObject(supplierList, item?.SupplierID)?.BusinessName;
    }
    return {
      Id: item?.ID,
      Order: item?.ID,
      Notes: item?.Notes,
      Total: item?.Total,
      SubTotal: item?.SubTotal,
      SubtotalWithDiscount: item?.SubtotalWithDiscount,
      BusinessName: Supplier,
      Warehouse
    };
  });
