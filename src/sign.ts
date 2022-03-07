import { Buffer } from "buffer";
import * as nacl from "tweetnacl";
import { decryptSecretKey } from "./decrypt";
import { parseSecretKey } from "./parse";
import { stringifySignature } from "./stringify";

export interface SigningOptions {
  secretKey: Buffer | string;
  passphrase: string;
  message: Buffer | string;
  comment: Buffer | string;
}

export function sign(options: SigningOptions) {
  let secretKey = parseSecretKey(options.secretKey);

  return secretKey
    ? stringifySignature({
        comment: options.comment.toString(),
        algorithm: "Ed",
        keyId: secretKey.id,
        content: nacl.sign.detached(
          Buffer.from(options.message),
          decryptSecretKey({
            secretKey,
            passphrase: options.passphrase,
          })!
        ),
      })
    : null;
}
