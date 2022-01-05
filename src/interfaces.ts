export interface KeyPair {
  publicKey: Buffer | string;
  privateKey: Buffer | string;
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
