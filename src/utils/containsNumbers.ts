// ==============================|| CUSTOM FUNCTION - CONTAINS NUMBERS ||============================== //
/**
 * It takes a string and returns the first number found in the string
 * @param {any} str - any - This is the string that we are going to be checking for numbers.
 * @returns The first number in the string.
 */

export const containsNumbers = (str: any) => {
  let value = /[0-9]/.test(str);
  if (value) {
    return str.match(/\d+/g)?.[0];
  }
  return str;
};
