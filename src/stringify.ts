import { Buffer } from "buffer";
import { PublicKey, SecretKey, Signature } from "./interfaces";
import { getBufferFromNumber } from "./utilities";

function stringify<T extends PublicKey | SecretKey | Signature>(
  input: T,
  stringifyContent: (content: T) => string
) {
  return (
    `untrusted comment: ${input.comment}` +
    "\n" +
    stringifyContent(input) +
    "\n"
  );
}

export function stringifyPublicKey(input: PublicKey) {
  return stringify<PublicKey>(input, (publicKey) =>
    Buffer.concat([
      Buffer.from(publicKey.algorithm),
      publicKey.id,
      publicKey.content,
    ]).toString("base64")
  );
}

export function stringifySecretKey(input: SecretKey) {
  return stringify<SecretKey>(input, (secretKey) =>
    Buffer.concat([
      Buffer.from(secretKey.algorithm),
      Buffer.from(secretKey.kdfAlgorithm),
      getBufferFromNumber(secretKey.kdfRounds, 4),
      secretKey.salt,
      secretKey.checksum,
      secretKey.id,
      secretKey.content,
    ]).toString("base64")
  );
}

export function stringifySignature(input: Signature) {
  return stringify<Signature>(input, (signature) =>
    Buffer.concat([
      Buffer.from(signature.algorithm),
      signature.keyId,
      signature.content,
    ]).toString("base64")
  );
}
