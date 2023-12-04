import Hapi from "@hapi/hapi";

import registerControllers from "./controller";
import { FileUploadServiceFactory } from "./factories";

const factoryServer = (fileUploadServiceFactory: FileUploadServiceFactory) => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  return registerControllers(server, fileUploadServiceFactory);
};

export default factoryServer;
