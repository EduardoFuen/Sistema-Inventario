/**
 * Get the object from the array that has the ID property that matches the id parameter.
 * @param {any} data - any - this is the data that we're searching through.
 * @param {number} id - number - the ID of the object you want to find
 */
export const getObject = (data: any, id: number) => {
  return data.find((item: { ID: number }) => item.ID === id);
};
