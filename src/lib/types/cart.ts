/* eslint-disable @typescript-eslint/no-explicit-any */

export type Cart = {
  products: CartProduct[];
  total_price: number;
  fees: number;
  discount: number;
  count: number;
  createdAt: string;
  updatedAt: string;
};

export type CartProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  additions: any[];
  __v: number;
  old_price: number;
  quantity: number;
};
