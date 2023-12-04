import Hapi from "@hapi/hapi";

import registerControllers from "./controller";

const factoryServer = () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  return registerControllers(server);
};

export default factoryServer;
