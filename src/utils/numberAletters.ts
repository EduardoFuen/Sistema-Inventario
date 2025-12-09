// ==============================|| CUSTOM FUNCTION - CONTAINS NUMBERS ||============================== //

/**
 * Given a number, return the word for that number.
 * @param {number} num - number - this is the parameter that we're passing into the function.
 * @returns 'one'
 */
export const numberAletters = (num: number) => {
  switch (num) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    default:
      return '';
  }
};
