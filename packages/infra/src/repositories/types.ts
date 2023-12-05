import { Order, UserRelations, Product } from "@technical-challenge/domain";

export interface IRepository<T, PrimaryKeys extends keyof T> {
  existById(keys: Pick<T, PrimaryKeys>): Promise<boolean>;

  insert(entity: T): Promise<void>;
}

export interface IOrderRepository extends IRepository<Order, "order_id"> {
  findAll(
    limit: number,
    offset: number,
    orderId?: number,
    startDate?: string,
    endDate?: string,
  ): Promise<UserRelations[]>;
}

export interface IProductRepository
  extends IRepository<Product, "product_id" | "order_id"> {
  update(entity: Product): Promise<void>;
}
