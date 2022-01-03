import { Container, PrivateKey, PublicKey, Signature, _num2buf } from ".";

export function stringifyContainer<T>(
  container: Container<T>,
  stringifyContent: (content: T) => string
) {
  return (
    `untrusted comment: ${container.comment}` +
    "\n" +
    stringifyContent(container.content) +
    "\n"
  );
}

export function stringifyPublicKey(input: Container<PublicKey>) {
  return stringifyContainer<PublicKey>(input, (publicKey) =>
    Buffer.concat([
      Buffer.from(publicKey.algorithm),
      publicKey.keyNumber,
      publicKey.content,
    ]).toString("base64")
  );
}

export function stringifyPrivateKey(input: Container<PrivateKey>) {
  return stringifyContainer<PrivateKey>(input, (privateKey) =>
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

export function stringifySignature(input: Container<Signature>) {
  return stringifyContainer<Signature>(input, (signature) =>
    Buffer.concat([
      Buffer.from(signature.algorithm),
      signature.keyNumber,
      signature.content,
    ]).toString("base64")
  );
}
