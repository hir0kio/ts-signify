import { checkPublicKey, checkSecretKey } from "../src/check";
import { generateKeyPair } from "../src/generate";
import { parsePublicKey, parseSecretKey } from "../src/parse";

describe("generateKeyPair()", () => {
  it("returns valid KeyPair object", () => {
    let keyPair = generateKeyPair(),
      publicKey = parsePublicKey(keyPair.publicKey),
      secretKey = parseSecretKey(keyPair.secretKey);

    expect(checkPublicKey(publicKey)).toBe(true);
    expect(checkSecretKey(secretKey)).toBe(true);
    expect(publicKey!.comment).toBe("signify public key");
    expect(secretKey!.comment).toBe("signify secret key");
  });
});
