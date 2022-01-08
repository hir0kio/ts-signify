import { PrivateKey, PublicKey, Signature } from "./interfaces";

export function checkPrivateKey(privateKey: PrivateKey | null) {
  return (
    privateKey &&
    privateKey.algorithm.length === 2 &&
    privateKey.kdfAlgorithm.length === 2 &&
    privateKey.salt.length === 16 &&
    privateKey.checksum.length === 8 &&
    privateKey.id.length === 8 &&
    privateKey.content.length === 64
  );
}

export function checkPublicKey(publicKey: PublicKey | null) {
  return (
    publicKey &&
    publicKey.algorithm.length === 2 &&
    publicKey.id.length === 8 &&
    publicKey.content.length === 32
  );
}

export function checkSignature(signature: Signature | null) {
  return (
    signature &&
    signature.algorithm.length === 2 &&
    signature.id.length === 8 &&
    signature.content.length === 64
  );
}
