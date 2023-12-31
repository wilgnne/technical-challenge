import { Stream } from "stream";
import { setTimeout } from "timers/promises";

import { IFileUploadService } from "../services";

class StreamFileUploadTransactionWrapper implements IFileUploadService {
  constructor(
    private readonly base: IFileUploadService,
    private readonly client: {
      query: (query: string) => Promise<void>;
      release: () => void;
    },
  ) {}

  async handler(stream: Stream): Promise<{ rowsInserted: number }> {
    try {
      await this.client.query("BEGIN");
      const response = await this.base.handler(stream);
      await this.client.query("COMMIT");
      return response;
    } catch (error) {
      await setTimeout(100);
      await this.client.query("ROLLBACK");

      throw error;
    } finally {
      this.client.release();
    }
  }
}

export default StreamFileUploadTransactionWrapper;
