export interface Container<T> {
  comment: string;
  content: T;
}

export interface KeyPair {
  publicKey: PublicKey;
  privateKey: PrivateKey;
}

export interface PrivateKey {
  algorithm: string;
  kdfAlgorithm: string;
  kdfRounds: number;
  salt: Buffer;
  checksum: Buffer;
  keyNumber: Buffer;
  content: Buffer;
}

export interface PublicKey {
  algorithm: string;
  keyNumber: Buffer;
  content: Buffer;
}

export interface Signature {
  algorithm: string;
  keyNumber: Buffer;
  content: Buffer;
}

export interface _UnencryptedPrivateKey extends PrivateKey {
  unencryptedContent: Buffer;
}
