import {
  UserRepository,
  OrderRepository,
  ProductRepository,
} from "@technical-challenge/infra";

import { DataRowDto } from "../dtos";

class DataRowInsertService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly orderRepo: OrderRepository,
    private readonly prodRepo: ProductRepository,
  ) {}

  async insert(data: DataRowDto): Promise<void> {
    const userExist = await this.userRepo.existById(data.userId);
    if (!userExist) {
      await this.userRepo.insert({ user_id: data.userId, name: data.userName });
    }

    const orderExist = await this.orderRepo.existById(data.orderId);
    if (!orderExist) {
      await this.orderRepo.insert({
        order_id: data.orderId,
        user_id: data.userId,
        date: data.date,
      });
    }

    await this.prodRepo.insert({
      product_id: data.prodId,
      order_id: data.orderId,
      value: data.value,
    });
  }
}

export default DataRowInsertService;
