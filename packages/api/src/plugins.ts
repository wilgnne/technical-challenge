import { Server } from "@hapi/hapi";
import inert from "@hapi/inert";
import Vision from "@hapi/vision";
import hapiswagger from "hapi-swagger";
import Joi from "joi";

import swaggerOptions from "./config/swagger";

const registerPlugins = async (server: Server): Promise<Server> => {
  await server.register([
    inert,
    Vision,
    {
      plugin: hapiswagger,
      options: swaggerOptions,
    },
  ]);

  server.validator(Joi);

  return server;
};

export default registerPlugins;
