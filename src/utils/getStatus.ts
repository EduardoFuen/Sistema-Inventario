// ==============================|| CUSTOM FUNCTION - STATUS ||============================== //

/**
 * It returns true if the item is truthy, or if the item is a string that includes the word "true" or
 * "verdadero"
 * @param {any} item - any
 */
const getStatus = (item: any) => {
  if (!item) {
    item.toLowerCase().includes('true') || item.toLowerCase().includes('verdadero');
  }
  return item;
};

export default getStatus;
