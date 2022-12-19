/**
 * Country is an object with an id, a department, and cities.
 * @property {string | number | undefined} id - The id of the country.
 * @property {string} department - The name of the department.
 * @property {any} cities - any;
 */
export type Country = {
  id: string | number | undefined;
  department: string;
  cities: any;
};
