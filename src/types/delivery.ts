/**
 * Delivery is a type that has a bunch of optional properties, all of which are strings, numbers, or
 * booleans.
 * @property {string | number | undefined} ID - The ID of the delivery.
 * @property {string} NameContact - The name of the contact person.
 * @property {number} PhoneContact - number;
 * @property {string} vehicle - type of vehicle (car or motorcycle).
 */

export type Delivery = {
  ID?: string | number | undefined;
  NameContact?: string;
  Name?: string;
  PhoneContact?: string | number;
  phoneContact?: string | number;
  vehicle?: string;

};

export type User = {
  ID?: string | number | undefined;
  sk?: string | number | undefined;
  username?: string;
  userRol?: number;
};

/* Defining the state of the component. */
export interface DeliveryStateProps {
  deliveryList: 
  Delivery[];
  error: object | string | null;
}
export interface UserStateProps {
  userList: User[];
  error: object | string | null;
}