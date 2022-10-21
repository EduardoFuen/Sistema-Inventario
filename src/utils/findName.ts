export const SearchNameToArray = (data: any, item: string) =>
  data.find((data: any) => data?.Name === item?.trim() || data?.Sku === item?.trim() || data?.Ean === item?.trim());
