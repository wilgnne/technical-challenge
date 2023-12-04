import { DataRowDto } from "../dtos";

export enum EIfExist {
  SKIP,
  REPLACE,
  ERROR,
}

export interface IDataRowInsertStrategy {
  insert(row: DataRowDto, ifExist: EIfExist): Promise<boolean>;
}
