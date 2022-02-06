import { pbkdf } from "bcrypt-pbkdf";
import * as nacl from "tweetnacl";
import { KeyPair } from "./interfaces";
import { stringifyPrivateKey, stringifyPublicKey } from "./stringify";

const algorithm = "Ed",
  kdfAlgorithm = "BK",
  kdfRounds = 42;

export interface KeyPairGenerationOptions {
  passphrase?: string;
}

export function generateKeyPair(options?: KeyPairGenerationOptions): KeyPair {
  options = options ?? {};

  let id = nacl.randomBytes(8),
    keyPair = nacl.sign.keyPair(),
    salt = nacl.randomBytes(16),
    derivedPrivateKey = Buffer.alloc(64);

  if (options.passphrase) {
    pbkdf(
      Buffer.from(options.passphrase),
      Buffer.from(options.passphrase).length,
      salt,
      salt.length,
      derivedPrivateKey,
      derivedPrivateKey.length,
      kdfRounds
    );
  }

  return {
    privateKey: stringifyPrivateKey({
      comment: "signify secret key",
      algorithm,
      kdfAlgorithm,
      kdfRounds: kdfRounds,
      salt,
      checksum: nacl.hash(keyPair.secretKey).subarray(0, 8),
      id,
      content: Buffer.from(
        Buffer.alloc(64).map(
          (value, index) => derivedPrivateKey[index] ^ keyPair.secretKey[index]
        )
      ),
    }),
    publicKey: stringifyPublicKey({
      comment: "signify public key",
      algorithm,
      id,
      content: keyPair.publicKey,
    }),
  };
}
