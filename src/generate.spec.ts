import { checkKeyPair, generate } from ".";

describe("generate()", () => {
  it("returns valid KeyPair object", async () => {
    let keyPair = await generate();

    expect(checkKeyPair(keyPair)).toBe(true);
    expect(keyPair.privateKey.comment).toBe("signify private key");
    expect(keyPair.publicKey.comment).toBe("signify public key");
  });
});
