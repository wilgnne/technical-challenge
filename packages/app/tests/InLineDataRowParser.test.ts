import Lab from "@hapi/lab";
import { expect } from "@hapi/code";

import {
  InLineDataRowParser,
  InvalidLengthDataRowParserError,
  InvalidNumberFormatDataRowParserError,
} from "../src/parsers";

const { describe, it } = (exports.lab = Lab.script());

describe("InLineDataRowParser", () => {
  it("should parse valid data row with spaces correctly", async () => {
    const rawData =
      "0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308";
    const parsedData = InLineDataRowParser(rawData);

    expect(parsedData.userId).to.equal(70);
    expect(parsedData.userName).to.equal("Palmer Prosacco");
    expect(parsedData.orderId).to.equal(753);
    expect(parsedData.prodId).to.equal(3);
    expect(parsedData.value).to.equal("1836.74");
    expect(parsedData.date).to.equal("20210308");
  });

  it("should throw InvalidLengthDataRowParseError for invalid length", () => {
    const rawData =
      "123456789012345678901234567890123456789012345678901234567890123456789012345678901";

    expect(() => {
      InLineDataRowParser(rawData);
    }).throw(InvalidLengthDataRowParserError);
  });

  it("should throw InvalidNumberFormatDataRowParseError for invalid decimal format in value", () => {
    const rawData =
      "0000000070                              Palmer Prosacco00000007530000000003     1836,7420210308";

    expect(() => {
      InLineDataRowParser(rawData);
    }).to.throw(InvalidNumberFormatDataRowParserError);
  });

  it("should throw InvalidNumberFormatDataRowParseError for invalid date format in data", () => {
    const rawData =
      "0000000070                              Palmer Prosacco00000007530000000003     1836.742021AB08";

    expect(() => {
      InLineDataRowParser(rawData);
    }).to.throw(InvalidNumberFormatDataRowParserError);
  });

  it("Throws InvalidNumberFormatDataRowParseError for NaN in userId", () => {
    const rawData =
      "ABC0000070                              Palmer Prosacco00000007530000000003     1836.7420210308";

    expect(() => {
      InLineDataRowParser(rawData);
    }).to.throw(InvalidNumberFormatDataRowParserError);
  });

  it("Throws InvalidNumberFormatDataRowParseError for NaN in orderId", () => {
    const rawData =
      "0000000070                              Palmer ProsaccoABC00007530000000003     1836.7420210308";

    expect(() => {
      InLineDataRowParser(rawData);
    }).to.throw(InvalidNumberFormatDataRowParserError);
  });

  it("Throws InvalidNumberFormatDataRowParseError for NaN in prodId", () => {
    const rawData =
      "0000000070                              Palmer Prosacco0000000753ABC0000003     1836.7420210308";

    expect(() => {
      InLineDataRowParser(rawData);
    }).to.throw(InvalidNumberFormatDataRowParserError);
  });
});
