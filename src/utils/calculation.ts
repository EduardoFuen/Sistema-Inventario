const summary = (details: any, discount: number) =>
  details.reduce(
    (acc: any = {}, item: any) => {
      const itemTotal = parseFloat(item?.SubTotal) || 0;
      const tax = (item?.BasePrice * item?.Count * item?.Tax) / 100 || 0;
      acc.Subtotal = parseFloat((acc.Subtotal + itemTotal).toFixed(2));
      acc.Tax = parseFloat((acc.Tax + tax).toFixed(2));
      acc.DiscountGlobal = parseFloat((acc.Subtotal - acc.Subtotal * ((100 - discount) / 100)).toFixed(0)) || 0;
      acc.SubtotalWithDiscount = parseFloat((Number(acc.Subtotal) - Number(acc.DiscountGlobal)).toFixed(0)) || 0;
      const SubtotalReal = acc.Subtotal - acc.DiscountGlobal || 0;
      acc.Total = parseFloat((SubtotalReal + acc.Tax).toFixed(2) || 0);
      return acc;
    },
    {
      Subtotal: 0,
      Tax: 0,
      DiscountGlobal: 0,
      SubtotalWithDiscount: 0,
      Total: 0
    }
  );

export default summary;
