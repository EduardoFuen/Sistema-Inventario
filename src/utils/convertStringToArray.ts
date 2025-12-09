import { SearchNameToArray } from 'utils/findName';
/**
 * ConvertToArray takes a string of names and a data array and returns a string of IDs
 * @param {string} ToString - The string you want to convert to an array.
 * @param {any} data - This is the data that you want to search in.
 * @returns an array of strings.
 */

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
