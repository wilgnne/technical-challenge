import { Transform, TransformCallback } from "node:stream";

export class SplitStreamTransform extends Transform {
  private internalBuffer: string | undefined = "";

  constructor(private readonly separator: string | RegExp) {
    super();
  }

  _transform(
    chunk: string | Buffer,
    _: BufferEncoding,
    callback: TransformCallback,
  ) {
    const chunkBuffer = chunk.toString();
    const buffer = this.internalBuffer + chunkBuffer;

    const items = buffer.split(this.separator);
    items.slice(0, -1).forEach((item) => this.push(item));

    this.internalBuffer = items[items.length - 1];

    callback(null);
  }

  _flush(callback: TransformCallback): void {
    callback(null, this.internalBuffer);
  }
}
