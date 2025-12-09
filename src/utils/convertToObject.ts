/**
 * Convert an array of objects with an ID property to a comma separated string of the IDs.
 * @param {any} data - any - this is the data that we're going to be mapping over.
 */
export const idsToString = (data: any) => data.map((item: any) => item.ID).join(',');

/**
 * It takes an array of objects and returns a string of the values of the Name property of each object
 * @param {any} data - The array of objects that you want to convert to a string.
 */

export const arrayToString = (data: any[]) => data.map(({ name }) => name).join(',');
