import { Writable } from 'stream';

import Lab from '@hapi/lab';
import { expect } from '@hapi/code';

import { SplitStreamTransform } from '../src/services/SplitStreamTransform';

import { ReadableString } from "./utils/ReadableString"

const { describe, it } = exports.lab = Lab.script();

describe('SplitStreamTransform', () => {
  it('split in \\n', async () => {
    const separetor = "\n"
    const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Donec euismod sem lorem, ac finibus diam dignissim ut.
    Phasellus eu fermentum massa, id placerat lorem.
    Aenean et mattis purus, quis condimentum neque.
    Integer lectus nisl, consequat nec orci eget, interdum tristique nunc.
    Integer neque lectus, vehicula vel nulla quis, scelerisque gravida est.`
    const expectedChunkCount = content.split(separetor).length;

    const source = new ReadableString(content);
    const splitTransform = new SplitStreamTransform(separetor);

    const chunkCount = await new Promise((resolve) => {
      let chunkCount = 0
      source
        .pipe(splitTransform)
        .pipe(new Writable({
          write(_, __, callback) {
            chunkCount++;
            callback();
          }
        }))
        .on("close", () => resolve(chunkCount))
    });

    expect(chunkCount).equals(expectedChunkCount)
  });
});
