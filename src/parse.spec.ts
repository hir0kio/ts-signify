import {
  parseContainer,
  parsePublicKey,
  checkPublicKey,
  parsePrivateKey,
  checkPrivateKey,
  parseSignature,
  checkSignature,
} from ".";

describe("parseContainer()", () => {
  it("returns valid Container<string> object", () => {
    let container = parseContainer(
      "untrusted comment: [mock comment]" + "\n" + "W21vY2sgY29udGVudF0K" + "\n"
    );

    expect(container).toBeTruthy();
    expect(container!.comment).toBe("[mock comment]");
    expect(Buffer.from(container!.content, "base64").toString()).toBe(
      "[mock content]" + "\n"
    );
  });

  it("returns null if malformed input is given", () => {
    let container = parseContainer("[malformed input]" + "\n");

    expect(container).toBeNull();
  });
});

describe("parsePublicKey()", () => {
  it("returns valid Container<PublicKey> object", () => {
    let publicKey = parsePublicKey(
      "untrusted comment: signify public key" +
        "\n" +
        "RWRYneRdupGjVQSVGSpr1Om9B6d1XYIaz0SpP/qUQhCv1q2prRgKXNCY" +
        "\n"
    );

    expect(publicKey).toBeTruthy();
    expect(checkPublicKey(publicKey?.content!)).toBe(true);
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
        "RWRCSwAAACqJ7f6/CH4FzXB6RaJukrszI6KSOAMlKOpYneRdupGjVdodIBB5HFJ+3oAby9p+8olmK90Ltjyb7VTgvwU7eCqdCqYGBizi4EqGY3uj5n723F4bYhYcAjSxyy7KLRVbwLE=" +
        "\n"
    );

    expect(privateKey).toBeTruthy();
    expect(checkPrivateKey(privateKey?.content!)).toBe(true);
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
        "RWRYneRdupGjVdv0VsY/ChV0ouN1Nkkb0aJjPmikdatNl9LR93po7F9E8Aq/8xCwEk8yrq2ym8yuY97qQnF1rPpSd/F1bvzTIQI=" +
        "\n"
    );

    expect(signature).toBeTruthy();
    expect(checkSignature(signature?.content!)).toBe(true);
  });

  it("returns null if malformed input is given", () => {
    let signature = parseSignature("[malformed input]" + "\n");

    expect(signature).toBeNull();
  });
});
