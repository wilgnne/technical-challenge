import Hapi from "@hapi/hapi";

import { OrderService } from "@technical-challenge/app";
import registerControllers from "./controller";
import { FileUploadServiceFactory } from "./factories";

const factoryServer = (
  fileUploadServiceFactory: FileUploadServiceFactory,
  orderService: OrderService,
) => {
  const server = Hapi.server({
    port: process.env.PORT ?? 3000,
    host: "0.0.0.0",
  });

  return registerControllers(server, fileUploadServiceFactory, orderService);
};

export default factoryServer;
