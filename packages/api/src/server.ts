import Hapi from "@hapi/hapi"

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {

      return 'Hello World!';
  }
});

export const init = async () => {
  await server.initialize();
  return server;
};
