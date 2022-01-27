import { PrivateKey, PublicKey, Signature } from "./interfaces";
import { getBufferFromNumber } from "./utilities";

function stringify<T extends PrivateKey | PublicKey | Signature>(
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

export function stringifyPrivateKey(input: PrivateKey) {
  return stringify<PrivateKey>(input, (privateKey) =>
    Buffer.concat([
      Buffer.from(privateKey.algorithm),
      Buffer.from(privateKey.kdfAlgorithm),
      getBufferFromNumber(privateKey.kdfRounds, 4),
      privateKey.salt,
      privateKey.checksum,
      privateKey.id,
      privateKey.content,
    ]).toString("base64")
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

export function stringifySignature(input: Signature) {
  return stringify<Signature>(input, (signature) =>
    Buffer.concat([
      Buffer.from(signature.algorithm),
      signature.keyId,
      signature.content,
    ]).toString("base64")
  );
}
