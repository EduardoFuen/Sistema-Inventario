// types
import { Product } from 'types/products';

/**
 * It takes an array of objects and returns an array of objects with the same keys but different values
 * @param {object[]} data - any[] - this is the data that you want to map
 */

export const Articles = (data: any) =>
  data.map((item: any) => ({
    ProductID: item?.ProductID,
    Count: Number(item?.Count) || 0,
    BasePrice: parseFloat(item?.BasePrice) || 0,
    Tax: Number(item?.Tax) || 0,
    Discount: parseFloat(item?.DiscountNegotiated) || 0,
    DiscountAdditional: parseFloat(item?.DiscountAdditional) || 0,
    Bonus: Number(item?.Bonus) || 0,
    SubTotal: Number(item?.SubTotal) || 0,
    Total: Number(item?.Total) || 0
  }));

/**
 * It takes an array of objects and an array of objects and returns an array of objects
 * @param {object[]} data - object[] - this is the data that you want to transform
 * @param {Product[]} Product - Product[]
 */
export const TransformsArticles = (data: object[], products: Product[]) =>
  data.map((item: any) => ({
    ...item,
    ID: item?.ID,
    ArticleID: item?.ID,
    DiscountNegotiated: item?.Discount,
    Name: products.find((e: any) => e.ID === item.ProductID)?.Name,
    Sku: products.find((e: any) => e.ID === item.ProductID)?.Sku,
    Ean: products.find((e: any) => e.ID === item.ProductID)?.Ean,
    isSelected: true
  }));
