import { Server } from "@hapi/hapi";

import { FileUploadServiceFactory } from "../factories";

import RootController from "./RootController";
import RawFileUploadController from "./FileUploadController/RawFileUploadController";

const registerControllers = (
  server: Server,
  fileUploadServiceFactory: FileUploadServiceFactory,
) => {
  server.route(new RootController().buildRoute());
  server.route(
    new RawFileUploadController(fileUploadServiceFactory).buildRoute(),
  );

  return server;
};

export default registerControllers;
