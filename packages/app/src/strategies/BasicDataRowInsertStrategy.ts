import {
  IOrderRepository,
  IProductRepository,
  IUserRepository,
} from "@technical-challenge/infra";

import { DataRowDto } from "../dtos";
import { EIfExist, IDataRowInsertStrategy } from "./types";

class BasicDataRowInsertStrategy implements IDataRowInsertStrategy {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly orderRepo: IOrderRepository,
    private readonly prodRepo: IProductRepository,
  ) {}

  async insert(data: DataRowDto, ifExist: EIfExist): Promise<boolean> {
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

    const prodExist = await this.prodRepo.existById({
      product_id: data.prodId,
      order_id: data.orderId,
    });

    if (prodExist && ifExist === EIfExist.SKIP) return false;
    if (prodExist && ifExist === EIfExist.REPLACE) {
      await this.prodRepo.update({
        product_id: data.prodId,
        order_id: data.orderId,
        value: data.value,
      });

      return true;
    }

    await this.prodRepo.insert({
      product_id: data.prodId,
      order_id: data.orderId,
      value: data.value,
    });

    return true;
  }
}

export default BasicDataRowInsertStrategy;
