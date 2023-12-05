import { Product } from "@technical-challenge/domain";

export interface IRepository<T, PrimaryKeys extends keyof T> {
  existById(keys: Pick<T, PrimaryKeys>): Promise<boolean>;

  insert(entity: T): Promise<void>;
}

export interface IProductRepository
  extends IRepository<Product, "product_id" | "order_id"> {
  update(entity: Product): Promise<void>;
}
