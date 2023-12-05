import { ClientBase } from "pg";

import { Order, UserRelations } from "@technical-challenge/domain";

import { IOrderRepository } from "./types";

class OrderRepository implements IOrderRepository {
  constructor(private readonly client: ClientBase) {}

  async findAll(
    limit: number,
    offset: number,
    orderId?: number,
    startDate?: string,
    endDate?: string,
  ): Promise<UserRelations[]> {
    const { where, params } = OrderRepository.buildWhere(
      [limit, offset],
      orderId,
      startDate,
      endDate,
    );

    const query = `
    SELECT u.user_id,
        u.name,
        json_agg(o.order) as orders
    FROM public.user u
    INNER JOIN
    (SELECT o.user_id,
            o.order_id,
            o.date,
            json_build_object(
                'order_id', o.order_id,
                'date', o.date,
                'total', SUM(p.value)::numeric::text,
                'products', json_agg(json_build_object('product_id', p.product_id, 'value', p.value::numeric::text))
            ) AS order
      FROM public.order o
      INNER JOIN public.product p ON p.order_id = o.order_id
      ${where}
      GROUP BY o.order_id) o ON o.user_id = u.user_id
      GROUP BY u.user_id
      ORDER BY u.user_id
      LIMIT $1
      OFFSET $2`;

    const result = await this.client.query(query, params);

    return result.rows;
  }

  private static buildWhere(
    initalParamns: unknown[],
    orderId?: number,
    startDate?: string,
    endDate?: string,
  ): { where: string; params: unknown[] } {
    const conditions: string[] = [];
    const params: unknown[] = [...initalParamns];

    if (orderId !== undefined) {
      conditions.push(`o.order_id = $${params.length + 1}`);
      params.push(orderId);
    }

    if (startDate !== undefined) {
      conditions.push(`o.date >= $${params.length + 1}`);
      params.push(startDate);
    }

    if (endDate !== undefined) {
      conditions.push(`o.date <= $${params.length + 1}`);
      params.push(endDate);
    }

    if (conditions.length > 0) {
      const whereClause = `WHERE ${conditions.join(" AND ")}`;
      return { where: whereClause, params };
    }

    return { where: "", params };
  }

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

export default OrderRepository;
