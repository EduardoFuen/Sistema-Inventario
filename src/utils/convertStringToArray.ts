import { SearchNameToArray } from 'utils/findName';

export const ConvertToArray = (ToString: string, data: any) => {
  let IDS: any = [];
  const dataArray: any = (ToString && ToString?.split(',')) || '';
  if (dataArray.length > 0) {
    dataArray.map((item: string) => IDS.push(SearchNameToArray(data, item)?.ID?.toString()));
  }
  return IDS?.toString();
};
