import {
  parsePublicKey,
  checkPublicKey,
  parsePrivateKey,
  checkPrivateKey,
  parseSignature,
  checkSignature,
} from ".";

describe("parsePublicKey()", () => {
  it("returns valid Container<PublicKey> object", () => {
    let publicKey = parsePublicKey(
      "untrusted comment: signify public key" +
        "\n" +
        "RWRYneRdupGjVQSVGSpr1Om9B6d1XYIa" +
        "z0SpP/qUQhCv1q2prRgKXNCY" +
        "\n"
    );

    expect(publicKey).toBeTruthy();
    expect(checkPublicKey(publicKey)).toBe(true);
  });

  it("returns null if malformed input is given", () => {
    let publicKey = parsePublicKey("[malformed input]" + "\n");

    expect(publicKey).toBeNull();
  });
});

describe("parsePrivateKey()", () => {
  it("returns valid Container<PrivateKey> object", () => {
    let privateKey = parsePrivateKey(
      "untrusted comment: signify secret key" +
        "\n" +
        "RWRCSwAAACqJ7f6/CH4FzXB6RaJukrsz" +
        "I6KSOAMlKOpYneRdupGjVdodIBB5HFJ+" +
        "3oAby9p+8olmK90Ltjyb7VTgvwU7eCqd" +
        "CqYGBizi4EqGY3uj5n723F4bYhYcAjSx" +
        "yy7KLRVbwLE=" +
        "\n"
    );

    expect(privateKey).toBeTruthy();
    expect(checkPrivateKey(privateKey)).toBe(true);
  });

  it("returns null if malformed input is given", () => {
    let privateKey = parsePrivateKey("[malformed input]" + "\n");

    expect(privateKey).toBeNull();
  });
});

describe("parseSignature()", () => {
  it("returns valid Container<Signature> object", () => {
    let signature = parseSignature(
      "untrusted comment: verify with mock-key.pub" +
        "\n" +
        "RWRYneRdupGjVdv0VsY/ChV0ouN1Nkkb" +
        "0aJjPmikdatNl9LR93po7F9E8Aq/8xCw" +
        "Ek8yrq2ym8yuY97qQnF1rPpSd/F1bvzT" +
        "IQI=" +
        "\n"
    );

    expect(signature).toBeTruthy();
    expect(checkSignature(signature)).toBe(true);
  });

  it("returns null if malformed input is given", () => {
    let signature = parseSignature("[malformed input]" + "\n");

    expect(signature).toBeNull();
  });
});
