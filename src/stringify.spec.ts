import {
  stringifyContainer,
  stringifyPublicKey,
  stringifyPrivateKey,
  stringifySignature,
  _num2buf,
} from ".";

describe("stringifyContainer()", () => {
  it("returns string with valid format", () => {
    let stringified = stringifyContainer(
      {
        comment: "[mock comment]",
        content: "[mock content]",
      },
      (content) => Buffer.from(content).toString("base64")
    );

    expect(stringified).toEqual(
      "untrusted comment: [mock comment]" +
        "\n" +
        Buffer.from("[mock content]").toString("base64") +
        "\n"
    );
  });
});

describe("stringifyPublicKey()", () => {
  it("returns string with valid format", () => {
    let stringified = stringifyPublicKey({
      comment: "[mock comment]",
      content: {
        algorithm: "Ed",
        keyNumber: Buffer.alloc(8, "b"),
        content: Buffer.alloc(32, "c"),
      },
    });

    expect(stringified).toBe(
      "untrusted comment: [mock comment]" +
        "\n" +
        Buffer.from("Ed" + "b".repeat(8) + "c".repeat(32)).toString("base64") +
        "\n"
    );
  });
});
describe("stringifyPrivateKey()", () => {
  it("returns string with valid format", () => {
    let stringified = stringifyPrivateKey({
      comment: "[mock comment]",
      content: {
        algorithm: "Ed",
        kdfAlgorithm: "BK",
        kdfRounds: 42,
        salt: Buffer.alloc(16, "d"),
        checksum: Buffer.alloc(8, "e"),
        keyNumber: Buffer.alloc(8, "f"),
        content: Buffer.alloc(64, "g"),
      },
    });

    expect(stringified).toBe(
      "untrusted comment: [mock comment]" +
        "\n" +
        Buffer.from(
          "Ed" +
            "BK" +
            _num2buf(42, 4).toString() +
            "d".repeat(16) +
            "e".repeat(8) +
            "f".repeat(8) +
            "g".repeat(64)
        ).toString("base64") +
        "\n"
    );
  });
});

describe("stringifySignature()", () => {
  it("returns string with valid format", () => {
    let stringified = stringifySignature({
      comment: "[mock comment]",
      content: {
        algorithm: "Ed",
        keyNumber: Buffer.alloc(8, "b"),
        content: Buffer.alloc(64, "c"),
      },
    });

    expect(stringified).toBe(
      "untrusted comment: [mock comment]" +
        "\n" +
        Buffer.from("Ed" + "b".repeat(8) + "c".repeat(64)).toString("base64") +
        "\n"
    );
  });
});
