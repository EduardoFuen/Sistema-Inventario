// ==============================|| CUSTOM FUNCTION - STATUS ||============================== //

const getStatus = (item: any) =>
  item.includes('Verdadero') || item.includes('VERDADERO') || item.includes('verdadero') || item.includes('TRUE');

export default getStatus;
