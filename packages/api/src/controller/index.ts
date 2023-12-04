import { Server } from "@hapi/hapi";

import RootController from "./RootController";

const registerControllers = (server: Server) => {
  server.route(new RootController().buildRoute());

  return server;
};

export default registerControllers;
