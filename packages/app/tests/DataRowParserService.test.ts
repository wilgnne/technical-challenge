import Lab from "@hapi/lab";
import { expect } from "@hapi/code";

import DataRowParserService from "../src/services/DataRowParserService";
import {
  InvalidLengthDataRowParserError,
  InvalidNumberFormatDataRowParserError,
} from "../src/services/DataRowParserService/exeptions";

const { before, describe, it } = (exports.lab = Lab.script());

describe("DataRowParserService", () => {
  let dataRowParserService: DataRowParserService;

  before(() => {
    dataRowParserService = new DataRowParserService();
  });

  it("should parse valid data row with spaces correctly", () => {
    const rawData =
      "0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308";
    const parsedData = dataRowParserService.parse(rawData);

    expect(parsedData.userId).to.equal(70);
    expect(parsedData.userName).to.equal("Palmer Prosacco");
    expect(parsedData.orderId).to.equal(753);
    expect(parsedData.prodId).to.equal(3);
    expect(parsedData.value).to.equal("1836.74");
    expect(parsedData.data).to.equal("20210308");
  });

  it("should throw InvalidLengthDataRowParseError for invalid length", () => {
    const rawData =
      "123456789012345678901234567890123456789012345678901234567890123456789012345678901";

    expect(() => {
      dataRowParserService.parse(rawData);
    }).to.throw(InvalidLengthDataRowParserError);
  });

  it("should throw InvalidNumberFormatDataRowParseError for invalid decimal format in value", () => {
    const rawData =
      "0000000070                              Palmer Prosacco00000007530000000003     1836,7420210308";

    expect(() => {
      dataRowParserService.parse(rawData);
    }).to.throw(InvalidNumberFormatDataRowParserError);
  });

  it("should throw InvalidNumberFormatDataRowParseError for invalid date format in data", () => {
    const rawData =
      "0000000070                              Palmer Prosacco00000007530000000003     1836.742021AB08";

    expect(() => {
      dataRowParserService.parse(rawData);
    }).to.throw(InvalidNumberFormatDataRowParserError);
  });

  it("Throws InvalidNumberFormatDataRowParseError for NaN in userId", () => {
    const rawData =
      "ABC0000070                              Palmer Prosacco00000007530000000003     1836.7420210308";

    expect(() => {
      dataRowParserService.parse(rawData);
    }).to.throw(InvalidNumberFormatDataRowParserError);
  });

  it("Throws InvalidNumberFormatDataRowParseError for NaN in orderId", () => {
    const rawData =
      "0000000070                              Palmer ProsaccoABC00007530000000003     1836.7420210308";

    expect(() => {
      dataRowParserService.parse(rawData);
    }).to.throw(InvalidNumberFormatDataRowParserError);
  });

  it("Throws InvalidNumberFormatDataRowParseError for NaN in prodId", () => {
    const rawData =
      "0000000070                              Palmer Prosacco0000000753ABC0000003     1836.7420210308";

    expect(() => {
      dataRowParserService.parse(rawData);
    }).to.throw(InvalidNumberFormatDataRowParserError);
  });
});
