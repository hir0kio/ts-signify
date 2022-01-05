import { Verify } from "ed25519";
import { parsePublicKey, parseSignature } from "./parse";

export interface VerificationOptions {
  publicKey: Buffer | string;
  signature: Buffer | string;
  message: Buffer | string;
}

export function verify(options: VerificationOptions) {
  let publicKey = parsePublicKey(options.publicKey),
    signature = parseSignature(options.signature);

  return Verify(
    Buffer.from(options.message),
    signature!.content,
    publicKey!.content
  );
}
