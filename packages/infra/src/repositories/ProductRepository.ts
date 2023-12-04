import { Product } from "@technical-challenge/domain";

import { ClientBase } from "pg";

class ProductRepository {
  constructor(private readonly client: ClientBase) {}

  async existById(productId: number, orderId: number): Promise<boolean> {
    const result = await this.client.query<{ exists: true }>(
      "SELECT EXISTS (SELECT 1 FROM public.product WHERE public.product.product_id = $1 AND public.product.order_id = $2)",
      [productId, orderId],
    );

    return result.rows[0]?.exists ?? false;
  }

  async insert(produc: Product): Promise<void> {
    await this.client.query(
      "INSERT INTO public.product (product_id, order_id, value) VALUES ($1, $2, $3)",
      [produc.product_id, produc.order_id, produc.value],
    );
  }
}

export default ProductRepository;
