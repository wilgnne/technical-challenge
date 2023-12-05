import { ClientBase } from "pg";
import { Product } from "@technical-challenge/domain";
import { IProductRepository } from "./types";

class ProductRepository implements IProductRepository {
  constructor(private readonly client: ClientBase) {}

  async existById(
    keys: Pick<Product, "product_id" | "order_id">,
  ): Promise<boolean> {
    const result = await this.client.query<{ exists: true }>(
      "SELECT EXISTS (SELECT 1 FROM public.product WHERE public.product.product_id = $1 AND public.product.order_id = $2)",
      [keys.product_id, keys.order_id],
    );

    return result.rows[0]?.exists ?? false;
  }

  async insert(product: Product): Promise<void> {
    await this.client.query(
      "INSERT INTO public.product (product_id, order_id, value) VALUES ($1, $2, $3)",
      [product.product_id, product.order_id, product.value],
    );
  }

  async update(product: Product): Promise<void> {
    await this.client.query(
      "UPDATE public.product SET value = $3 WHERE public.product.product_id = $1 AND public.product.order_id = $2",
      [product.product_id, product.order_id, product.value],
    );
  }
}

export default ProductRepository;
