import { PublicKey, Signature } from ".";
import { Verify } from "ed25519";

export interface VerificationOptions {
  publicKey: PublicKey;
  signature: Signature;
  message: Buffer | string;
}

export function verify(options: VerificationOptions) {
  return Verify(
    Buffer.from(options.message),
    options.signature.content,
    options.publicKey.content
  );
}
