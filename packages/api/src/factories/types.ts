import {
  EIfExist,
  IFileUploadService,
  OrderService,
} from "@technical-challenge/app";

export type FileUploadServiceFactory = (
  ifExist?: EIfExist,
) => Promise<IFileUploadService>;

export type OrderServiceFactory = () => Promise<OrderService>;
