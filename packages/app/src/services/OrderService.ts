import { IOrderRepository } from "@technical-challenge/infra";
import { UserRelations } from "@technical-challenge/domain";

import { OrderQueryDto } from "../dtos";

class OrderService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async handler(orderQuery: OrderQueryDto): Promise<UserRelations[]> {
    const limit = orderQuery.pageSize ?? 10;
    const offset = (orderQuery.page ?? 0) * limit;

    return this.orderRepo.findAll(
      limit,
      offset,
      orderQuery.orderId,
      orderQuery.startDate,
      orderQuery.endDate,
    );
  }
}

export default OrderService;
