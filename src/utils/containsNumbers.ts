// ==============================|| CUSTOM FUNCTION - CONTAINS NUMBERS ||============================== //

export const containsNumbers = (str: any) => {
  let value = /[0-9]/.test(str);
  if (value) {
    return str.match(/\d+/g)?.[0];
  }
  return str;
};
