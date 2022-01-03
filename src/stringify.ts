import { PrivateKey, PublicKey, Signature, _num2buf } from ".";

function _stringifyContainer<T extends PrivateKey | PublicKey | Signature>(
  container: T,
  stringifyContent: (content: T) => string
) {
  return (
    `untrusted comment: ${container.comment}` +
    "\n" +
    stringifyContent(container) +
    "\n"
  );
}

export function stringifyPublicKey(input: PublicKey) {
  return _stringifyContainer<PublicKey>(input, (publicKey) =>
    Buffer.concat([
      Buffer.from(publicKey.algorithm),
      publicKey.keyNumber,
      publicKey.content,
    ]).toString("base64")
  );
}

export function stringifyPrivateKey(input: PrivateKey) {
  return _stringifyContainer<PrivateKey>(input, (privateKey) =>
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
  return _stringifyContainer<Signature>(input, (signature) =>
    Buffer.concat([
      Buffer.from(signature.algorithm),
      signature.keyNumber,
      signature.content,
    ]).toString("base64")
  );
}
