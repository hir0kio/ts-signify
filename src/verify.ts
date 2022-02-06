import { Buffer } from "buffer";
import * as nacl from "tweetnacl";
import { parsePublicKey, parseSignature } from "./parse";

export interface VerificationOptions {
  publicKey: Buffer | string;
  signature: Buffer | string;
  message: Buffer | string;
}

export function verify(options: VerificationOptions) {
  let publicKey = parsePublicKey(options.publicKey),
    signature = parseSignature(options.signature);

  return nacl.sign.detached.verify(
    Buffer.from(options.message),
    signature!.content,
    publicKey!.content
  );
}
