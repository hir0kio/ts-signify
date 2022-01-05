import { buf2num, num2buf } from "./utilities";

describe("buf2num()", () => {
  it("returns correct number", () => {
    expect(buf2num(Buffer.from([0x0, 0x0, 0x4, 0xd2]))).toEqual(1234);
  });
});

describe("num2buf()", () => {
  it("returns correct Buffer", () => {
    expect(num2buf(1234, 4)).toEqual(Buffer.from([0x0, 0x0, 0x4, 0xd2]));
  });
});
