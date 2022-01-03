export interface KeyPair {
  publicKey: PublicKey;
  privateKey: PrivateKey;
}

export interface PrivateKey {
  comment: string;
  algorithm: string;
  kdfAlgorithm: string;
  kdfRounds: number;
  salt: Buffer;
  checksum: Buffer;
  keyNumber: Buffer;
  content: Buffer;
}

export interface PublicKey {
  comment: string;
  algorithm: string;
  keyNumber: Buffer;
  content: Buffer;
}

export interface Signature {
  comment: string;
  algorithm: string;
  keyNumber: Buffer;
  content: Buffer;
}

export interface _UnencryptedPrivateKey extends PrivateKey {
  unencryptedContent: Buffer;
}
