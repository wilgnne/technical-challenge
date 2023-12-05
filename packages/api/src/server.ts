import Hapi from "@hapi/hapi";

import { OrderService } from "@technical-challenge/app";
import registerControllers from "./controller";
import { FileUploadServiceFactory } from "./factories";

const factoryServer = (
  fileUploadServiceFactory: FileUploadServiceFactory,
  orderService: OrderService,
) => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  return registerControllers(server, fileUploadServiceFactory, orderService);
};

export default factoryServer;
