import Hapi from "@hapi/hapi";
import registerRoutes from "./router";

const factoryServer = () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  return registerRoutes(server);
};

export default factoryServer;
