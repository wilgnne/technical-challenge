import { Stream, Writable } from "stream";

export const countWrites = (source: Stream) => new Promise<number>((resolve) => {
  let count = 0;
  source
    .pipe(new Writable({
      write(_, __, callback) {
        count++;
        callback();
      }
    }))
    .on("close", () => resolve(count))
})
