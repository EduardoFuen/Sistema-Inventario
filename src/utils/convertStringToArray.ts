import { SearchNameToArray } from 'utils/findName';

export const ConvertToArray = (ToString: string, data: any) => {
  let IDS: any = [];
  const dataArray: any = ToString && ToString?.split(',');
  if (dataArray && dataArray.length > 0) {
    dataArray.map((item: string) => {
      if (ToString && item) {
        IDS.push(SearchNameToArray(data, item?.trim())?.ID?.toString());
      }
      return false;
    });
  }

  return IDS.filter((item: any) => item !== undefined)?.toString();
};
