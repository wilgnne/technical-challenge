import { Stream, Writable } from "stream";

const countWrites = (source: Stream) =>
  new Promise<number>((resolve) => {
    let count = 0;
    source
      .pipe(
        new Writable({
          write(_, __, callback) {
            count += 1;
            callback();
          },
        }),
      )
      .on("close", () => resolve(count));
  });

export default countWrites;
