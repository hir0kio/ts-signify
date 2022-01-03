import { parsePublicKey, parseSignature, verify } from ".";

const mockMessage = "[mock message]" + "\n";
const mockInvalidMessage = "[mock invalid message]" + "\n";
const mockPublicKey = parsePublicKey(
  "untrusted comment: signify public key" +
    "\n" +
    "RWRYneRdupGjVQSVGSpr1Om9B6d1XYIaz0SpP/qUQhCv1q2prRgKXNCY" +
    "\n"
);
const mockSignature = parseSignature(
  "untrusted comment: verify with mock-key.pub" +
    "\n" +
    "RWRYneRdupGjVdv0VsY/ChV0ouN1Nkkb0aJjPmikdatNl9LR93po7F9E8Aq/8xCwEk8yrq2ym8yuY97qQnF1rPpSd/F1bvzTIQI=" +
    "\n"
);

describe("verify()", () => {
  it("returns true if valid message and Signature objects are given", () => {
    expect(
      verify({
        publicKey: mockPublicKey!,
        signature: mockSignature!,
        message: mockMessage,
      })
    ).toBe(true);
  });

  it("returns false if invalid message or Signature object is given", () => {
    expect(
      verify({
        publicKey: mockPublicKey!,
        signature: mockSignature!,
        message: mockInvalidMessage,
      })
    ).toBe(false);
  });
});
