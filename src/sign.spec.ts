import { sign } from "./sign";

const mockMessage = "[mock message]" + "\n",
  mockPassphrase = "passphrase",
  mockPrivateKey =
    "untrusted comment: signify secret key" +
    "\n" +
    "RWRCSwAAACqJ7f6/CH4FzXB6RaJukrszI6KSOAMlKOpYneRdupGjVdodIBB5HFJ+" +
    "3oAby9p+8olmK90Ltjyb7VTgvwU7eCqdCqYGBizi4EqGY3uj5n723F4bYhYcAjSx" +
    "yy7KLRVbwLE=" +
    "\n",
  mockSignature =
    "untrusted comment: verify with mock-key.pub" +
    "\n" +
    "RWRYneRdupGjVdv0VsY/ChV0ouN1Nkkb0aJjPmikdatNl9LR93po7F9E8Aq/8xCw" +
    "Ek8yrq2ym8yuY97qQnF1rPpSd/F1bvzTIQI=" +
    "\n";

describe("sign()", () => {
  it("returns valid signature", async () => {
    let signature = sign({
      privateKey: mockPrivateKey,
      message: mockMessage,
      passphrase: mockPassphrase,
      comment: "verify with mock-key.pub",
    });

    expect(signature).toBe(mockSignature);
  });
});
