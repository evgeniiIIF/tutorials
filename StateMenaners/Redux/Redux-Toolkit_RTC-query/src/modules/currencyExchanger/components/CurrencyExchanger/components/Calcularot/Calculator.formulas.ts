import { Decimal } from 'decimal.js';
/* eslint-disable @typescript-eslint/no-explicit-any */
// export type FormulaFn<FormulaArgs> = (args: FormulaArgs) => number;
export type FormulaFn<T> = (args: T) => number;
// export type FormulaArgs = DefaultFormulaArgs & DiscountFormulaArgs;

export interface DefaultFormulaArgs {
  amount: number;
  price: number;
  fee: number;
  direction: 'toQuote' | 'toBase';
}
export interface CustomFormulaArgs extends DefaultFormulaArgs {
  discount: number;
  some: number;
}

export const defaultFormulaFn: FormulaFn<DefaultFormulaArgs> = ({ amount, price, fee }): number => {
  console.log(amount, price, fee);

  const amountDecimal = new Decimal(amount);
  const priceDecimal = new Decimal(price);
  const feeDecimal = new Decimal(fee);
  // return (amount / price) * (1 - fee);

  const result = amountDecimal
    .mul(priceDecimal) // Делим amount на price
    .times(new Decimal(1).plus(feeDecimal)); // Умножаем на (1 - fee)

  // Возвращаем результат как число (или строку, если нужна точность)
  return result.toNumber(); // или .toString() для точного строкового представления
};

export const discountFormulaFn: FormulaFn<CustomFormulaArgs> = ({ amount, price, fee, discount }): number => {
  return amount * price * (1 - fee) * (1 + discount);
};

export const someFormulaFn: FormulaFn<CustomFormulaArgs> = ({ amount, price, fee, some }): number => {
  return amount * price * (1 - fee) + some;
};

export const customFormulaRepository = {
  abcd: discountFormulaFn,
  some: discountFormulaFn,
};

export type CustomFormulaRepositoryKeys = keyof typeof customFormulaRepository;
