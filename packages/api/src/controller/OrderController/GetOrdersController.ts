import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";

import { OrderQueryDto, OrderService } from "@technical-challenge/app";

import BaseController from "../BaseController";

class GetOrdersController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super("GET", "/order", {
      description: "Recupera os pedidos",
      tags: ["api", "get", "order"],
      validate: {
        query: Joi.object({
          orderId: Joi.number(),
          startDate: Joi.date(),
          endDate: Joi.date(),
          page: Joi.number(),
          pageSize: Joi.number(),
        }),
      },
      response: {
        schema: Joi.array().items(
          Joi.object({
            user_id: Joi.number(),
            name: Joi.string(),
            orders: Joi.array().items(
              Joi.object({
                order_id: Joi.number(),
                date: Joi.string(),
                total: Joi.string(),
                products: Joi.array().items(
                  Joi.object({
                    product_id: Joi.number(),
                    value: Joi.string(),
                  }),
                ),
              }),
            ),
          }),
        ),
      },
      plugins: {
        "hapi-swagger": {},
      },
    });
  }

  async handler(request: Request, h: ResponseToolkit) {
    try {
      const query = request.query as OrderQueryDto;

      const respose = await this.orderService.handler(query);

      return h.response(respose).code(200);
    } catch (error) {
      if (error instanceof Error) return h.response(error.stack).code(500);

      return h.response().code(500);
    }
  }
}

export default GetOrdersController;
