import { Product } from "@technical-challenge/domain";

import { ClientBase } from "pg";

class ProductRepository {
  constructor(private readonly client: ClientBase) {}

  async insert(produc: Product): Promise<void> {
    await this.client.query(
      "INSERT INTO public.product (product_id, order_id, value) VALUES ($1, $2, $3)",
      [produc.product_id, produc.order_id, produc.value],
    );
  }
}

export default ProductRepository;
