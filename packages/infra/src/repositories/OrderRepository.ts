import { ClientBase } from "pg";

export class OrderRepository {
  constructor(readonly client: ClientBase) {}

  async orderExistById(orderId: number): Promise<boolean> {
    try {
      const result = await this.client.query<{ exists: true }>(
        "SELECT EXISTS (SELECT 1 FROM public.order WHERE public.order.order_id = $1)",
        [orderId]
      );

      return result.rows[0]?.exists ?? false;
    } catch (error) {
      console.error("Erro ao verificar existência do pedido por ID:", error);
      throw error;
    }
  }
}
