import { PublicKey, Signature } from ".";
import { Verify } from "ed25519";

export interface VerifyOptions {
  publicKey: PublicKey;
  signature: Signature;
  message: Buffer | string;
}

export function verify(options: VerifyOptions) {
  return Verify(
    Buffer.from(options.message),
    options.signature.content,
    options.publicKey.content
  );
}
