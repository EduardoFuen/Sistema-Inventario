const summary = (details: any, discount: number) =>
  details.reduce(
    (acc: any = {}, item: any) => {
      if (item?.subtotal && item?.total) {
        const itemTotal = item?.subtotal || 0;
        const tax = (item?.price * item?.qty * item?.tax) / 100 || 0;
        acc.subtotal = parseFloat((acc.subtotal + itemTotal).toFixed(2));
        acc.tax = parseFloat((acc.tax + tax).toFixed(2));
        acc.discount = acc.subtotal - acc.subtotal * ((100 - discount) / 100) || 0;
        acc.total = parseFloat((acc.total + item?.total * ((100 - discount) / 100) || 0).toFixed(2));
        return acc;
      }
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
