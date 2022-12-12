export const SearchNameToArray = (data: any, item: string) => {
  return data.find((data: any) => data?.Name?.trim() === item || data?.Sku === item || data?.Ean === item);
};

export const SearchIDToArray = (data: any, id: number) => data.find((data: any) => data?.ID === id);
