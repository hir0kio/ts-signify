import {
  parsePrivateKey,
  parsePublicKey,
  parseSignature,
  sign,
  verify,
} from ".";

const mockMessage = Buffer.from("[mock message]" + "\n");
const mockPassphrase = "passphrase";
const mockPrivateKey = parsePrivateKey(
  "untrusted comment: signify secret key" +
    "\n" +
    "RWRCSwAAACqJ7f6/CH4FzXB6RaJukrszI6KSOAMlKOpYneRdupGjVdodIBB5HFJ+3oAby9p+8olmK90Ltjyb7VTgvwU7eCqdCqYGBizi4EqGY3uj5n723F4bYhYcAjSxyy7KLRVbwLE=" +
    "\n"
);
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

describe("sign()", () => {
  it("returns valid Signature object", async () => {
    let signature = sign({
      privateKey: mockPrivateKey!,
      message: mockMessage,
      passphrase: mockPassphrase,
      comment: "verify with mock-key.pub",
    });

    expect(signature).toBeTruthy();
    expect(signature?.comment).toBe("verify with mock-key.pub");
    expect(signature?.algorithm).toEqual(mockSignature?.algorithm);
    expect(signature?.keyNumber).toEqual(mockSignature?.keyNumber);
    expect(signature?.content).toEqual(mockSignature?.content);

    expect(
      verify({
        signature: signature!,
        publicKey: mockPublicKey!,
        message: mockMessage,
      })
    ).toBe(true);
  });
});
