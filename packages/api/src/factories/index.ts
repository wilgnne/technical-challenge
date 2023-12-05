import {
  BasicDataRowInsertStrategy,
  DataRowInsertWritable,
  EIfExist,
  InLineDataRowParser,
  SplitStreamTransform,
  StreamFileUploadService,
  StreamFileUploadTransactionWrapper,
} from "@technical-challenge/app";

import {
  DbProvider,
  OrderRepository,
  ProductRepository,
  UserRepository,
} from "@technical-challenge/infra";

import { FileUploadServiceFactory } from "./types";

export * from "./types";

export const fileUploadServiceFactory: FileUploadServiceFactory = async (
  ifExist?: EIfExist,
) => {
  const client = await DbProvider.getConnection();

  return new StreamFileUploadTransactionWrapper(
    new StreamFileUploadService(
      new SplitStreamTransform("\n"),
      new DataRowInsertWritable(
        InLineDataRowParser,
        new BasicDataRowInsertStrategy(
          new UserRepository(client),
          new OrderRepository(client),
          new ProductRepository(client),
        ),
        ifExist,
      ),
    ),
    client,
  );
};
