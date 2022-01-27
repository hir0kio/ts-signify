import { getNumberFromBuffer, getBufferFromNumber } from "./utilities";

describe("getNumberFromBuffer()", () => {
  it("returns correct number", () => {
    expect(getNumberFromBuffer(Buffer.from([0x0, 0x0, 0x4, 0xd2]))).toEqual(
      0x4d2
    );
  });
});

describe("getBufferFromNumber()", () => {
  it("returns correct Buffer", () => {
    expect(getBufferFromNumber(0x4d2, 4)).toEqual(
      Buffer.from([0x0, 0x0, 0x4, 0xd2])
    );
  });
});
