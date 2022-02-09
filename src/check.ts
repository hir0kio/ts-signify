import { PublicKey, SecretKey, Signature } from "./interfaces";

export function checkPublicKey(publicKey: PublicKey | null) {
  return (
    publicKey &&
    publicKey.algorithm.length === 2 &&
    publicKey.id.length === 8 &&
    publicKey.content.length === 32
  );
}

export function checkSecretKey(secretKey: SecretKey | null) {
  return (
    secretKey &&
    secretKey.algorithm.length === 2 &&
    secretKey.kdfAlgorithm.length === 2 &&
    secretKey.salt.length === 16 &&
    secretKey.checksum.length === 8 &&
    secretKey.id.length === 8 &&
    secretKey.content.length === 64
  );
}

export function checkSignature(signature: Signature | null) {
  return (
    signature &&
    signature.algorithm.length === 2 &&
    signature.keyId.length === 8 &&
    signature.content.length === 64
  );
}
