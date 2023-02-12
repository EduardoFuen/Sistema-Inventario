import { Article } from 'types/purchase';

/**
 * It takes an array of objects and a number, and returns an object with the total, tax, discount, and
 * subtotal
 * @param {Article | any} details - Article | any
 * @param {number} discount - number
 * @returns An object with the following properties:
 * SubTotal: 0,
 * Tax: 0,
 * DiscountGlobal: 0,
 * SubtotalWithDiscount: 0,
 * Total: 0
 */
const summary = (details: Article | any, discount: number) => {
  const initAcc = { SubTotal: 0, Tax: 0, DiscountGlobal: 0, SubtotalWithDiscount: 0, Total: 0 };

  return details.reduce((acc = initAcc, item: any) => {
    const itemTotal = item?.SubTotal || 0;
    const tax = (item?.BasePrice * item?.Count * item?.Tax) / 100 || 0;

    acc.SubTotal += itemTotal;
    acc.Tax += tax;

    acc.DiscountGlobal = acc.SubTotal - acc.SubTotal * ((100 - discount) / 100);

    acc.SubtotalWithDiscount = Number(acc.SubTotal) - Number(acc.DiscountGlobal);

    const SubtotalReal = acc.SubTotal - acc.DiscountGlobal;

    acc.Total = SubtotalReal + acc.Tax;

    return acc;
  }, initAcc);
};
export default summary;
