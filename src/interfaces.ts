export interface KeyPair {
  publicKey: Uint8Array | string;
  secretKey: Uint8Array | string;
}

export interface PublicKey {
  comment: string;
  algorithm: string;
  id: Uint8Array;
  content: Uint8Array;
}

export interface SecretKey {
  comment: string;
  algorithm: string;
  kdfAlgorithm: string;
  kdfRounds: number;
  salt: Uint8Array;
  checksum: Uint8Array;
  id: Uint8Array;
  content: Uint8Array;
}

export interface Signature {
  comment: string;
  algorithm: string;
  keyId: Uint8Array;
  content: Uint8Array;
}
