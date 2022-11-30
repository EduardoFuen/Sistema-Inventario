// Active Reception
export type reception = {
  ID?: string | number | undefined;
  ArticleID?: number;
  Missing?: number;
  Refund?: number;
  Reason?: number;
  Count?: number;
  Batch?: number;
  Date?: string;
};

export interface ReceptionStateProps {
  reception: reception;
  receptionAll: reception[];
  isLoading: boolean;
  error: object | string | null | any;
}
