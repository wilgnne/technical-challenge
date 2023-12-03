import { Readable } from "stream";

class ReadableString extends Readable {
  constructor(private readonly content: string) {
    super({
      highWaterMark: 10,
    });
  }

  _read(size: number): void {
    const chunks = this.content.match(new RegExp(`(.|[\r\n]){1,${size}}`, "g"));
    chunks?.forEach((chunk) => this.push(chunk));
    this.push(null);
  }
}

export default ReadableString;
