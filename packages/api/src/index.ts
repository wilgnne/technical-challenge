import factoryServer from "./server";
import registerPlugins from "./plugins";

const main = async () => {
  const server = factoryServer();

  await registerPlugins(server);
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

main();
