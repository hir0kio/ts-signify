import { PrivateKey, PublicKey, Signature, _num2buf } from ".";

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

export function stringifyPublicKey(input: PublicKey) {
  return stringify<PublicKey>(input, (publicKey) =>
    Buffer.concat([
      Buffer.from(publicKey.algorithm),
      publicKey.keyNumber,
      publicKey.content,
    ]).toString("base64")
  );
}

export function stringifyPrivateKey(input: PrivateKey) {
  return stringify<PrivateKey>(input, (privateKey) =>
    Buffer.concat([
      Buffer.from(privateKey.algorithm),
      Buffer.from(privateKey.kdfAlgorithm),
      _num2buf(privateKey.kdfRounds, 4),
      privateKey.salt,
      privateKey.checksum,
      privateKey.keyNumber,
      privateKey.content,
    ]).toString("base64")
  );
}

export function stringifySignature(input: Signature) {
  return stringify<Signature>(input, (signature) =>
    Buffer.concat([
      Buffer.from(signature.algorithm),
      signature.keyNumber,
      signature.content,
    ]).toString("base64")
  );
}
