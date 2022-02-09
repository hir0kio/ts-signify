import { checkPublicKey, checkSecretKey, checkSignature } from "../src/check";
import { parsePublicKey, parseSecretKey, parseSignature } from "../src/parse";

const mockPublicKey =
    "untrusted comment: signify public key" +
    "\n" +
    "RWRYneRdupGjVQSVGSpr1Om9B6d1XYIaz0SpP/qUQhCv1q2prRgKXNCY" +
    "\n",
  mockSecretKey =
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

describe("parseSecretKey()", () => {
  it("returns valid SecretKey object", () => {
    let secretKey = parseSecretKey(mockSecretKey);

    expect(checkSecretKey(secretKey)).toBe(true);
  });

  it("returns null if non-base64 input is given", () => {
    let secretKey = parseSecretKey("[non-base64 input]" + "\n");

    expect(secretKey).toBeNull();
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
