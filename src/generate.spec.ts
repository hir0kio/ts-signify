import { checkPrivateKey, checkPublicKey } from "./check";
import { generateKeyPair } from "./generate";
import { parsePrivateKey, parsePublicKey } from "./parse";

describe("generateKeyPair()", () => {
  it("returns valid KeyPair object", () => {
    let keyPair = generateKeyPair(),
      privateKey = parsePrivateKey(keyPair.privateKey),
      publicKey = parsePublicKey(keyPair.publicKey);

    expect(checkPrivateKey(privateKey)).toBe(true);
    expect(checkPublicKey(publicKey)).toBe(true);
    expect(privateKey!.comment).toBe("signify secret key");
    expect(publicKey!.comment).toBe("signify public key");
  });
});
