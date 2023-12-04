import { Stream } from "stream";

export interface IFileUploadService {
  handler(stream: Stream): Promise<{
    rowsInserted: number;
  }>;
}
