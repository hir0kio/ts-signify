import {
  checkPrivateKey,
  checkPublicKey,
  generateKeyPair,
  parsePrivateKey,
  parsePublicKey,
} from ".";

describe("generateKeyPair()", () => {
  it("returns valid KeyPair object", () => {
    let keyPair = generateKeyPair(),
      privateKey = parsePrivateKey(keyPair.privateKey),
      publicKey = parsePublicKey(keyPair.publicKey);

    expect(checkPrivateKey(privateKey)).toBe(true);
    expect(checkPublicKey(publicKey)).toBe(true);
    expect(privateKey!.comment).toBe("signify private key");
    expect(publicKey!.comment).toBe("signify public key");
  });
});
