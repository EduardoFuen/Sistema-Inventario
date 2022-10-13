export const idsToString = (data: any) => {
  let ids = data.map((item: any) => item.ID).join(',');
  return ids;
};
