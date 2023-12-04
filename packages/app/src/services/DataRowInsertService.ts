import {
  IUserRepository,
  IOrderRepository,
  IProductRepository,
} from "@technical-challenge/infra";

import { DataRowDto } from "../dtos";

class DataRowInsertService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly orderRepo: IOrderRepository,
    private readonly prodRepo: IProductRepository,
  ) {}

  async insert(data: DataRowDto): Promise<void> {
    const userExist = await this.userRepo.existById({ user_id: data.userId });
    if (!userExist) {
      await this.userRepo.insert({ user_id: data.userId, name: data.userName });
    }

    const orderExist = await this.orderRepo.existById({
      order_id: data.orderId,
    });
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
