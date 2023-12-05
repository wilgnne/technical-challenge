import { Stream } from "node:stream";
import { finished } from "node:stream/promises";

import SplitStreamTransform from "./SplitStreamTransform";
import DataRowInsertWritable from "./DataRowInsertWritable";
import { IFileUploadService } from "./types";

class StreamFileUploadService implements IFileUploadService {
  constructor(
    private readonly splitStreamTransform: SplitStreamTransform,
    private readonly dataRowInsertWritable: DataRowInsertWritable,
  ) {}

  async handler(stream: Stream) {
    await finished(
      stream.pipe(this.splitStreamTransform).pipe(this.dataRowInsertWritable),
    );

    return {
      rowsInserted: this.dataRowInsertWritable.getWritesCount(),
    };
  }
}

export default StreamFileUploadService;
