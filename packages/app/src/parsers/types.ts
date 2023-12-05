import { DataRowDto } from "../dtos";

export type DataRowParser = (row: string) => DataRowDto;
