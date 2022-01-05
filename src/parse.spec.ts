import { checkPrivateKey, checkPublicKey, checkSignature } from "./check";
import { parsePublicKey, parsePrivateKey, parseSignature } from "./parse";

const mockPrivateKey =
    "untrusted comment: signify secret key" +
    "\n" +
    "RWRCSwAAACqJ7f6/CH4FzXB6RaJukrszI6KSOAMlKOpYneRdupGjVdodIBB5HFJ+" +
    "3oAby9p+8olmK90Ltjyb7VTgvwU7eCqdCqYGBizi4EqGY3uj5n723F4bYhYcAjSx" +
    "yy7KLRVbwLE=" +
    "\n",
  mockPublicKey =
    "untrusted comment: signify public key" +
    "\n" +
    "RWRYneRdupGjVQSVGSpr1Om9B6d1XYIaz0SpP/qUQhCv1q2prRgKXNCY" +
    "\n",
  mockSignature =
    "untrusted comment: verify with mock-key.pub" +
    "\n" +
    "RWRYneRdupGjVdv0VsY/ChV0ouN1Nkkb0aJjPmikdatNl9LR93po7F9E8Aq/8xCw" +
    "Ek8yrq2ym8yuY97qQnF1rPpSd/F1bvzTIQI=" +
    "\n";

describe("parsePublicKey()", () => {
  it("returns valid PublicKey object", () => {
    let publicKey = parsePublicKey(mockPublicKey);

    expect(checkPublicKey(publicKey)).toBe(true);
  });

  it("returns null if non-base64 input is given", () => {
    let publicKey = parsePublicKey("[non-base64 input]" + "\n");

    expect(publicKey).toBeNull();
  });
});

describe("parsePrivateKey()", () => {
  it("returns valid PrivateKey object", () => {
    let privateKey = parsePrivateKey(mockPrivateKey);

    expect(checkPrivateKey(privateKey)).toBe(true);
  });

  it("returns null if non-base64 input is given", () => {
    let privateKey = parsePrivateKey("[non-base64 input]" + "\n");

    expect(privateKey).toBeNull();
  });
});

describe("parseSignature()", () => {
  it("returns valid Signature object", () => {
    let signature = parseSignature(mockSignature);

    expect(checkSignature(signature)).toBe(true);
  });

  it("returns null if non-base64 input is given", () => {
    let signature = parseSignature("[non-base64 input]" + "\n");

    expect(signature).toBeNull();
  });
});
