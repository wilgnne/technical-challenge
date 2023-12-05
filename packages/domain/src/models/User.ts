export type User = {
  user_id: number;
  name: string;
};

export type UserRelations = {
  user_id: number;
  name: string;
  orders: {
    order_id: number;
    date: string;
    total: string;
    products: { product_id: number; value: string }[];
  }[];
};
