import { IFileUploadService } from "@technical-challenge/app";

export type FileUploadServiceFactory = () => Promise<IFileUploadService>;
