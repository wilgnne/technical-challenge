import { ClientBase } from "pg";

import { Order } from "@technical-challenge/domain";

import { IRepository } from "./types";

export type IOrderRepository = IRepository<Order, "order_id">;

export class OrderRepository implements IOrderRepository {
  constructor(private readonly client: ClientBase) {}

  async existById(keys: Pick<Order, "order_id">): Promise<boolean> {
    const result = await this.client.query<{ exists: true }>(
      "SELECT EXISTS (SELECT 1 FROM public.order WHERE public.order.order_id = $1)",
      [keys.order_id],
    );

    return result.rows[0]?.exists ?? false;
  }

  async insert(order: Order): Promise<void> {
    await this.client.query(
      "INSERT INTO public.order (order_id, user_id, date) VALUES ($1, $2, $3)",
      [order.order_id, order.user_id, order.date],
    );
  }
}
