import { DataRowParser } from "./types";
import {
  InvalidLengthDataRowParserError,
  InvalidNumberFormatDataRowParserError,
} from "./exeptions";

const InLineDataRowParser: DataRowParser = (raw: string) => {
  if (raw.length !== 95) {
    throw new InvalidLengthDataRowParserError();
  }

  const userId = Number(raw.slice(0, 10));
  const userName = raw.slice(10, 55).trim();
  const orderId = Number(raw.slice(55, 65));
  const prodId = Number(raw.slice(65, 75));
  const value = raw.slice(75, 87).trim();
  const date = raw.slice(87, 95).trim();

  if (Number.isNaN(userId) || Number.isNaN(orderId) || Number.isNaN(prodId)) {
    throw new InvalidNumberFormatDataRowParserError();
  }

  // Verifica se 'value' segue o formato decimal
  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    throw new InvalidNumberFormatDataRowParserError(
      "Invalid decimal format for value",
    );
  }

  // Verifica se 'date' segue o formato yyyymmdd
  if (!/^\d{8}$/.test(date)) {
    throw new InvalidNumberFormatDataRowParserError(
      "Invalid date format for data",
    );
  }

  return {
    userId,
    userName,
    orderId,
    prodId,
    value,
    date,
  };
};

export default InLineDataRowParser;
