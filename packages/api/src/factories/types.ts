import { EIfExist, IFileUploadService } from "@technical-challenge/app";

export type FileUploadServiceFactory = (
  ifExist?: EIfExist,
) => Promise<IFileUploadService>;
