import { Writable } from "stream";

import { DataRowParser } from "../parsers";
import { EIfExist, IDataRowInsertStrategy } from "../strategies";

class DataRowInsertWritable extends Writable {
  private count = 0;

  constructor(
    private readonly dataRowParser: DataRowParser,
    private readonly dataRowInsertStrategy: IDataRowInsertStrategy,
    private readonly ifExist = EIfExist.SKIP,
  ) {
    super();
  }

  async _write(
    chunk: string | Buffer,
    _: BufferEncoding,
    callback: (error?: Error | null | undefined) => void,
  ): Promise<void> {
    try {
      const dataRow = this.dataRowParser(chunk.toString());
      const inserted = await this.dataRowInsertStrategy.insert(
        dataRow,
        this.ifExist,
      );

      if (inserted) {
        this.count += 1;
      }
      callback();
    } catch (error) {
      callback(error as Error);
    }
  }

  getWritesCount() {
    return this.count;
  }
}

export default DataRowInsertWritable;
