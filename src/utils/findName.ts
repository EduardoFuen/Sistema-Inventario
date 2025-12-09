/**
 * It takes an array of objects and a string and returns the object that matches the string
 * @param {any} data - The array of objects that you want to search through.
 * @param {string} item - The item you want to search for.
 * @returns the data that matches the item.
 */
export const SearchNameToArray = (data: any, item: string) => {
  return data.find((data: any) => data?.Name?.trim() === item || data?.Sku === item || data?.Ean === item);
};

/**
 * It takes in two parameters, data and id. It then searches through the data array and returns the
 * object that matches the id.
 * @param {any} data - any - This is the data that you want to search through.
 * @param {number} id - number - The ID of the object you want to find
 */
export const SearchIDToArray = (data: any, id: number) => data.find((data: any) => data?.ID === id);
