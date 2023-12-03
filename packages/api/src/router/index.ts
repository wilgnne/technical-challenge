import { Server } from "@hapi/hapi";

import RootController from "../controller/RootController";

export const registerRoutes = (server: Server) => {
  const rootControoler = new RootController();

  server.route({
    method: "GET",
    path: "/",
    options: {
      description: "Get Hello World",
      notes: "Returns a string Hello World",
      tags: ["api", "root"],
    },
    handler: rootControoler.get.bind(rootControoler),
  });

  return server;
};
