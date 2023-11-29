import Lab from '@hapi/lab';
import { expect } from '@hapi/code';

import { init } from '../src/server';
import { Server } from '@hapi/hapi';

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();


describe('GET /', () => {
  let server: Server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/'
    });
    expect(res.statusCode).to.equal(200);
  });
});
