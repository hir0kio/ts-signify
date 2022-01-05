import { Sign } from "ed25519";
import { parsePrivateKey, stringifySignature, _decryptPrivateKey } from ".";

export interface SigningOptions {
  privateKey: Buffer | string;
  passphrase: Buffer | string;
  message: Buffer | string;
  comment: Buffer | string;
}

export function sign(options: SigningOptions) {
  let privateKey = parsePrivateKey(options.privateKey);

  return privateKey
    ? stringifySignature({
        comment: options.comment.toString(),
        algorithm: "Ed",
        keyNumber: privateKey.keyNumber,
        content: Sign(
          Buffer.from(options.message),
          _decryptPrivateKey({
            privateKey,
            passphrase: options.passphrase.toString(),
          })!
        ),
      })
    : null;
}
