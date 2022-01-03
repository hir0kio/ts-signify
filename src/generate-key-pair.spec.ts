import { checkKeyPair, generateKeyPair } from ".";

describe("generateKeyPair()", () => {
  it("returns valid KeyPair object", () => {
    let keyPair = generateKeyPair();

    expect(checkKeyPair(keyPair)).toBe(true);
    expect(keyPair.privateKey.comment).toBe("signify private key");
    expect(keyPair.publicKey.comment).toBe("signify public key");
  });
});
