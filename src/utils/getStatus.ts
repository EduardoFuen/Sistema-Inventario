// ==============================|| CUSTOM FUNCTION - STATUS ||============================== //

/**
 * It returns true if the item passed in includes the word "Verdadero" or "VERDADERO" or "verdadero" or
 * "TRUE"
 * @param {any} item - any
 */
const getStatus = (item: any) =>
  item.includes('Verdadero') || item.includes('VERDADERO') || item.includes('verdadero') || item.includes('TRUE');

export default getStatus;
