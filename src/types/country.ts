/**
 * Country is an object with an id, a department, and an array of cities.
 * @property {string | number | undefined} id - The id of the country.
 * @property {string} department - The name of the department.
 * @property {string[]} cities - An array of strings.
 */
export type Country = {
  id: number;
  department: string;
  cities: string[];
};
