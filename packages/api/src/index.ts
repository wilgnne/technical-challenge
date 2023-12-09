import "./tracing";
import factoryServer from "./server";
import registerPlugins from "./plugins";
import { fileUploadServiceFactory, orderServiceFactory } from "./factories";

const main = async () => {
  const server = factoryServer(
    fileUploadServiceFactory,
    await orderServiceFactory(),
  );

  await registerPlugins(server);
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

main();
