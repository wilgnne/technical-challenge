import { Server } from "@hapi/hapi";
import Lab from "@hapi/lab";
import { expect } from "@hapi/code";

import { IFileUploadService } from "@technical-challenge/app";

import factoryServer from "../src/server";

const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());

describe("GET /", () => {
  let server: Server;

  beforeEach(async () => {
    const fileUploadServiceFactory = () =>
      Promise.resolve<IFileUploadService>({
        handler() {
          return Promise.resolve({ rowsInserted: 0 });
        },
      });

    server = factoryServer(fileUploadServiceFactory);
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
