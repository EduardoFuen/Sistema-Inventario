const summary = (details: any, discount: number) =>
  details.reduce(
    (acc: any = {}, item: any) => {
      const itemTotal = item?.subtotal || 0;
      const tax = (item?.price * item?.qty * item?.tax) / 100 || 0;
      acc.subtotal = parseFloat((acc.subtotal + itemTotal).toFixed(2));
      acc.tax = parseFloat((acc.tax + tax).toFixed(2));
      acc.discount = (acc.subtotal - acc.subtotal * ((100 - discount) / 100)).toFixed(0) || 0;
      acc.total = parseFloat((acc.total + item?.total * ((100 - discount || 0) / 100)).toFixed(2) || 0);
      return acc;
    },
    {
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0
    }
  );

export default summary;
