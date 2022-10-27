const summary = (details: any, discount: number) =>
  details.reduce(
    (acc: any = {}, item: any) => {
      const itemTotal = parseFloat(item?.SubTotal) || 0;
      const tax = (item?.BasePrice * item?.Count * item?.Tax) / 100 || 0;
      acc.SubTotal = parseFloat((acc.SubTotal + itemTotal).toFixed(2));
      acc.Tax = parseFloat((acc.Tax + tax).toFixed(2));
      acc.DiscountGlobal = parseFloat((acc.SubTotal - acc.SubTotal * ((100 - discount) / 100)).toFixed(0)) || 0;
      acc.SubtotalWithDiscount = parseFloat((Number(acc.SubTotal) - Number(acc.DiscountGlobal)).toFixed(0)) || 0;
      const SubtotalReal = acc.SubTotal - acc.DiscountGlobal || 0;
      acc.Total = parseFloat((SubtotalReal + acc.Tax).toFixed(2) || 0);
      return acc;
    },
    {
      SubTotal: 0,
      Tax: 0,
      DiscountGlobal: 0,
      SubtotalWithDiscount: 0,
      Total: 0
    }
  );

export default summary;
