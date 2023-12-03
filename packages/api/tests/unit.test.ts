import { Server } from "@hapi/hapi";
import Lab from "@hapi/lab";
import { expect } from "@hapi/code";

import factoryServer from "../src/server";

const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());

describe("GET /", () => {
  let server: Server;

  beforeEach(async () => {
    server = factoryServer();
    await server.initialize();
  });

  afterEach(async () => {
    await server.stop();
  });

  it("responds with 200", async () => {
    const res = await server.inject({
      method: "get",
      url: "/",
    });
    expect(res.statusCode).to.equal(200);
  });
});
