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
  id: Buffer;
  content: Buffer;
}

export interface PublicKey {
  comment: string;
  algorithm: string;
  id: Buffer;
  content: Buffer;
}

export interface Signature {
  comment: string;
  algorithm: string;
  keyId: Buffer;
  content: Buffer;
}
