import { Sign } from "ed25519";
import { PrivateKey, Signature, _decryptPrivateKey } from ".";

export interface SignOptions {
  privateKey: PrivateKey;
  passphrase: string;
  message: Buffer | string;
  comment: Buffer | string;
}

export function sign(options: SignOptions): Signature | null {
  return {
    comment: options.comment.toString(),
    algorithm: "Ed",
    keyNumber: options.privateKey.keyNumber,
    content: Sign(
      Buffer.from(options.message),
      _decryptPrivateKey({
        privateKey: options.privateKey,
        passphrase: options.passphrase,
      })!.unencryptedContent
    ),
  };
}
