// ==============================|| CUSTOM FUNCTION - STATUS ||============================== //

/**
 * It returns true if the item passed in includes the word "Verdadero" or "VERDADERO" or "verdadero" or
 * "TRUE"
 * @param {any} item - any
 */
const getStatus = (item: any) => item.toLowerCase().includes('true');

export default getStatus;
