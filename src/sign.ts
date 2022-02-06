import * as nacl from "tweetnacl";
import { decryptPrivateKey } from "./decrypt";
import { parsePrivateKey } from "./parse";
import { stringifySignature } from "./stringify";

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
        keyId: privateKey.id,
        content: nacl.sign.detached(
          Buffer.from(options.message),
          decryptPrivateKey({
            privateKey,
            passphrase: options.passphrase.toString(),
          })!
        ),
      })
    : null;
}
