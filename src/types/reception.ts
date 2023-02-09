/**
 * Reception is an object with optional properties ID, ArticleID, Missing, Refund, Reason, Count,
 * Batch, and Date, where ID, ArticleID, Missing, Refund, Reason, Count, Batch, and Date are all of
 * type string | number | undefined.
 * @property {string | number | undefined} ID - The ID of the reception.
 * @property {number} ArticleID - The ID of the article that is being received.
 * @property {number} Missing - The number of items that are missing from the order.
 * @property {number} Refund - The number of items that were refunded
 * @property {number} Reason - 1 = Missing, 2 = Refund
 * @property {number} Count - The number of items received
 * @property {number} Batch - The batch number of the article
 * @property {string} Date - The date of the reception
 */

export type reception = {
  ID?: string | number | undefined;
  ArticleID?: number;
  Missing?: number;
  Refund?: number;
  Reason?: number;
  Count?: number;
  Batch?: number;
  Date?: Date;
};

export interface ReceptionStateProps {
  reception: reception;
  receptionAll: reception[];
  isLoading: boolean;
  error: object | string | null | any;
}
