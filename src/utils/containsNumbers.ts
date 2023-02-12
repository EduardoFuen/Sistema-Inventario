// ==============================|| CUSTOM FUNCTION - CONTAINS NUMBERS ||============================== //
/**
 * It returns the first number in a string, or the string itself if it doesn't contain any numbers
 * @param {string} str - string - The string to be tested.
 * @returns the first number in the string.
 */
export const containsNumbers = (str: string) => {
  let value = /[0-9]/.test(str);
  return value ? str.match(/\d+/g)?.[0] : str;
};
