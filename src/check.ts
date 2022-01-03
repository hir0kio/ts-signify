import {
  KeyPair,
  PrivateKey,
  PublicKey,
  Signature,
  _num2buf,
  _UnencryptedPrivateKey,
} from ".";

export function checkKeyPair(keyPair: KeyPair) {
  return (
    keyPair &&
    checkPrivateKey(keyPair.privateKey) &&
    checkPublicKey(keyPair.publicKey) &&
    Buffer.compare(
      keyPair.privateKey.keyNumber,
      keyPair.publicKey.keyNumber
    ) === 0
  );
}

export function checkPrivateKey(privateKey: PrivateKey) {
  return (
    privateKey &&
    privateKey.algorithm.length === 2 &&
    privateKey.kdfAlgorithm.length === 2 &&
    privateKey.salt.length === 16 &&
    privateKey.checksum.length === 8 &&
    privateKey.keyNumber.length === 8 &&
    privateKey.content.length === 64
  );
}

export function checkPublicKey(publicKey: PublicKey) {
  return (
    publicKey &&
    publicKey.algorithm.length === 2 &&
    publicKey.keyNumber.length === 8 &&
    publicKey.content.length === 32
  );
}

export function checkSignature(signature: Signature) {
  return (
    signature &&
    signature.algorithm.length === 2 &&
    signature.keyNumber.length === 8 &&
    signature.content.length === 64
  );
}
