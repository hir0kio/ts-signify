import { _buf2num, _num2buf } from "./utilities";

describe("_buf2num()", () => {
  it("returns correct number", () => {
    expect(_buf2num(Buffer.from([0x0, 0x0, 0x4, 0xd2]))).toEqual(1234);
  });
});

describe("_num2buf()", () => {
  it("returns correct Buffer", () => {
    expect(_num2buf(1234, 4)).toEqual(Buffer.from([0x0, 0x0, 0x4, 0xd2]));
  });
});
