import { Server } from "@hapi/hapi";

import { OrderService } from "@technical-challenge/app";
import { FileUploadServiceFactory } from "../factories";

import RootController from "./RootController";
import RawFileUploadController from "./FileUploadController/RawFileUploadController";
import GetOrdersController from "./OrderController/GetOrdersController";

const registerControllers = (
  server: Server,
  fileUploadServiceFactory: FileUploadServiceFactory,
  orderService: OrderService,
) => {
  server.route(new RootController().buildRoute());
  server.route(
    new RawFileUploadController(fileUploadServiceFactory).buildRoute(),
  );
  server.route(new GetOrdersController(orderService).buildRoute());

  return server;
};

export default registerControllers;
