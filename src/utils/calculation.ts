const summary = (details: any, discount: number) =>
  details.reduce(
    (acc: any = {}, item: any) => {
      const itemTotal = parseFloat(item?.SubTotal) || 0;
      const tax = (item?.Price * item?.Qty * item?.Tax) / 100 || 0;
      acc.subtotal = parseFloat((acc.subtotal + itemTotal).toFixed(2));
      acc.tax = parseFloat((acc.tax + tax).toFixed(2));
      acc.discount = (acc.subtotal - acc.subtotal * ((100 - discount) / 100)).toFixed(0) || 0;
      acc.subtotalDiscount = (acc.subtotal - acc.discount).toFixed(0) || 0;
      const subtotalReal = acc.subtotal - acc.discount || 0;
      acc.total = parseFloat((subtotalReal + acc.tax).toFixed(2) || 0);
      return acc;
    },
    {
      subtotal: 0,
      tax: 0,
      discount: 0,
      subtotalDiscoount: 0,
      total: 0
    }
  );

export default summary;
